/* eslint-disable no-restricted-syntax */
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { promisify } from 'util';
import { monthFullToNumber } from '../../../generalVar';
import Cliente from '../../models/cliente';
import Colab from '../../models/colab';
import FechamentoPeriodo from '../../models/fechamentoPeriodos';
import Fornec from '../../models/fornec';
import MovimentoCaixa from '../../models/movimentoCaixa';
import Oportunidade from '../../models/oportunidade';
import Parcela from '../../models/parcela';
import RecDesp from '../../models/recDesp';
import liquidMovCaixaController from './liquidMovCaixaController';

class MovimentoCaixaController {
  async store(req, res) {
    try {
      const { body } = req;

      const checkPeriodo = await FechamentoPeriodo.findOne({
        where: {
          [Op.and]: [{
            dataFim: {
              [Op.gte]: body.dtVenc,
            },
          },
          {
            dataInic: {
              [Op.lte]: body.dtVenc,
            },
          }],
        },
      });
      if (!checkPeriodo) {
        return res.status(400).json({
          error: 'Não existe período criado para a data do apontamento',
        });
      }

      const { situacao, nome } = checkPeriodo.dataValues;
      body.periodo = monthFullToNumber[nome];
      if (situacao !== 'Aberto') {
        const colab = await Colab.findByPk(body.ColabId);
        if (!colab) {
          console.log('err Colab');
          return res.status(500).json({ error: 'Erro interno de servidor' });
        }
        try {
          const token = colab.getDataValue('PeriodToken');
          const decoded = await promisify(jwt.verify)(token, process.env.TOKENS_SECRET);
          if (decoded.periodo === checkPeriodo.getDataValue('nome')) {
            try {
              const mov = await MovimentoCaixa.create(body);

              if (body.liquida) {
                const liquid = await liquidMovCaixaController.liquidaMov({
                  movId: mov.id,
                  valor: body.FornecId === null ? body.saldo : -body.saldo,
                  dtLiqui: body.dtVenc,
                  recDesp: body.FornecId === null ? 'Rec' : 'Desp',
                });

                if (!liquid.status) {
                  throw new Error(liquid.err);
                }

                await MovimentoCaixa.update({
                  vlrPago: body.saldo,
                  saldo: 0,
                  dtLiqui: body.dtVenc,
                  status: 3,
                }, {
                  where: { id: mov.id },
                });
              }

              return res.json({ mov, message: 'Movimento criado com sucesso!' });
            } catch (err) {
              console.log(err);
              return res.status(500).json({ error: 'Erro Interno Do Servidor' });
            }
          }
          throw 'error';
        } catch (err) {
          console.log(err);
          return res.status(401).json({
            error: `O período ${checkPeriodo.nome} já está fechado, contate o administrador`,
          });
        }
      } else {
        try {
          const mov = await MovimentoCaixa.create(body);

          if (body.liquida) {
            const liquid = await liquidMovCaixaController.liquidaMov({
              movId: mov.id,
              valor: body.FornecId === null ? body.saldo : -body.saldo,
              dtLiqui: body.dtVenc,
              recDesp: body.FornecId === null ? 'Rec' : 'Desp',
            });

            if (!liquid.status) {
              throw new Error(liquid.err);
            }

            await MovimentoCaixa.update({
              vlrPago: body.saldo,
              saldo: 0,
              dtLiqui: body.dtVenc,
              status: 3,
            }, {
              where: { id: mov.id },
            });
          }

          return res.json({ message: 'Documento Criado com Sucesso', mov });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ error: 'Erro Interno do Servidor' });
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno Do Servidor' });
    }
  }

  async getLiquid(req, res) {
    try {
      const mov = await MovimentoCaixa.findAll({
        where: { status: 3 },
        include: [
          { model: RecDesp },
          'ColabCreated',
          'ColabLiquid',
          'ColabPgmt',
          { model: Parcela, include: [{ model: Oportunidade }] },
          { model: Fornec },
          { model: Cliente },
        ],
      });

      return res.json(mov);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno Do Servidor' });
    }
  }

  async getAberto(req, res) {
    try {
      const mov = await MovimentoCaixa.findAll({
        where: {
          status: { [Op.lt]: 3 },
        },
        include: [
          { model: RecDesp },
          'ColabCreated',
          'ColabLiquid',
          'ColabPgmt',
          { model: Parcela, include: [{ model: Oportunidade }] },
          { model: Fornec },
          { model: Cliente },
        ],
      });

      return res.json(mov);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno Do Servidor' });
    }
  }

  async update(req, res) {
    const { params, body } = req;

    const checkPeriodo = await FechamentoPeriodo.findOne({
      where: {
        [Op.and]: [{
          dataFim: {
            [Op.gte]: body.dtLiqui,
          },
        },
        {
          dataInic: {
            [Op.lte]: body.dtLiqui,
          },
        }],
      },
    });
    if (!checkPeriodo) {
      return res.status(400).json({
        error: 'Não existe período criado para a data do apontamento',
      });
    }
    const aberto = checkPeriodo.getDataValue('situacao');
    if (aberto !== 'Aberto') {
      const colab = await Colab.findByPk(body.ColabId);
      if (!colab) {
        return res.status(500).json({ error: 'Erro interno de servidor' });
      }
      try {
        const token = colab.getDataValue('PeriodToken');
        const decoded = await promisify(jwt.verify)(token, process.env.TOKENS_SECRET);
        if (decoded.periodo === checkPeriodo.getDataValue('nome')) {
          try {
            const mov = await MovimentoCaixa.findOne({
              where: {
                id: params.id,
              },
            });

            await mov.update(body.mov);

            return res.json(mov);
          } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro Interno Do Servidor' });
          }
        }
        throw 'error';
      } catch (err) {
        return res.status(401).json({
          error: `O período ${checkPeriodo.nome} já está fechado, contate o administrador`,
        });
      }
    }
  }

  async liquida(req, res) {
    const { body } = req;
    let {
      vlrSingle, dtLiqui, ColabId, mov, multiple,
    } = body;

    try {
      const checkPeriodo = await FechamentoPeriodo.findOne({
        where: {
          [Op.and]: [{
            dataFim: {
              [Op.gte]: body.dtLiqui,
            },
          },
          {
            dataInic: {
              [Op.lte]: body.dtLiqui,
            },
          }],
        },
      });
      if (!checkPeriodo) {
        return res.status(400).json({
          error: 'Não existe período criado para a data de liquidação',
        });
      }
      const { dataInic, dataFim } = checkPeriodo.dataValues;
      const aberto = checkPeriodo.getDataValue('situacao');
      let abertoAux = aberto;

      if (aberto === 'Aberto') {
        if (dataInic > dtLiqui || dataFim < dtLiqui) {
          abertoAux = 'Fechado';
        }
      }

      if (aberto !== 'Aberto' || abertoAux !== 'Aberto') {
        const colab = await Colab.findByPk(body.ColabId);
        if (!colab) {
          return res.status(500).json({ error: 'Erro interno de servidor' });
        }
        const token = colab.getDataValue('PeriodToken');
        const decoded = await promisify(jwt.verify)(token, process.env.TOKENS_SECRET);
        if (decoded.periodo === checkPeriodo.getDataValue('nome')) {
          try {
            if (multiple === true) {
              for (const movCx of body.movs) {
                const liquid = await liquidMovCaixaController.liquidaMov({
                  movId: movCx.id,
                  valor: movCx.recDesp === 'Desp' ? -movCx.saldo : movCx.saldo,
                  dtLiqui,
                  recDesp: movCx.recDesp,
                });

                if (!liquid.status) {
                  throw new Error(liquid.err);
                }

                if (movCx.ParcelaId) {
                  await Parcela.update(
                    {
                      vlrPago: movCx.total * 100,
                      saldo: 0,
                      dtLiquidacao: dtLiqui,
                      status: 4,
                    },
                    {
                      where: { id: movCx.ParcelaId },
                    },
                  );
                }

                await MovimentoCaixa.update({
                  vlrPago: movCx.total,
                  saldo: 0,
                  dtLiqui,
                  status: 3,
                }, {
                  where: { id: movCx.id },
                });
              }
            } else if (multiple === false) {
              const liquid = await liquidMovCaixaController.liquidaMov({
                movId: mov.id,
                valor: mov.recDesp === 'Desp' ? -vlrSingle : vlrSingle,
                dtLiqui,
                recDesp: mov.recDesp,
              });

              if (!liquid.status) {
                throw new Error(liquid.err);
              }

              if (mov.ParcelaId) {
                await Parcela.update(
                  {
                    vlrPago: (mov.total - (mov.saldo - vlrSingle)) * 100,
                    saldo: (mov.saldo - vlrSingle) * 100,
                    dtLiquidacao: dtLiqui,
                    status: mov.saldo - vlrSingle > 0 ? 3 : 4,
                  },
                  {
                    where: { id: mov.ParcelaId },
                  },
                );
              }

              await MovimentoCaixa.update({
                vlrPago: vlrSingle,
                saldo: mov.saldo - vlrSingle,
                dtLiqui,
                status: mov.saldo - vlrSingle > 0 ? 2 : 3,
              }, {
                where: { id: mov.id },
              });
            }

            return res.json({ error: 'Erro Interno do Servidor' });
          } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro Interno do Servidor' });
          }
        }
        throw 'error';
      } else {
        if (multiple === true) {
          console.log(multiple);
          for (const movCx of body.movs) {
            const liquid = await liquidMovCaixaController.liquidaMov({
              movId: movCx.id,
              valor: movCx.recDesp === 'Desp' ? -movCx.saldo : movCx.saldo,
              dtLiqui: body.dtLiqui,
              recDesp: movCx.recDesp,
            });

            if (!liquid.status) {
              throw new Error(liquid.err);
            }

            if (movCx.ParcelaId) {
              await Parcela.update(
                {
                  vlrPago: movCx.total * 100,
                  saldo: 0,
                  dtLiquidacao: dtLiqui,
                  situacao: 4,
                },
                {
                  where: { id: movCx.ParcelaId },
                },
              );
            }

            await MovimentoCaixa.update({
              vlrPago: movCx.total,
              saldo: 0,
              dtLiqui: body.dtLiqui,
              status: 3,
            }, {
              where: { id: movCx.id },
            });
          }
        } else if (multiple === false) {
          const liquid = await liquidMovCaixaController.liquidaMov({
            movId: mov.id,
            valor: mov.recDesp === 'Desp' ? -vlrSingle : vlrSingle,
            dtLiqui,
            recDesp: mov.recDesp,
          });

          if (!liquid.status) {
            throw new Error(liquid.err);
          }

          if (mov.ParcelaId) {
            vlrSingle *= 100;
            mov.total *= 100;
            mov.saldo *= 100;

            await Parcela.update(
              {
                vlrPago: (mov.total - (mov.saldo - vlrSingle)),
                saldo: (mov.saldo - vlrSingle),
                dtLiquidacao: dtLiqui,
                situacao: mov.saldo - vlrSingle > 0 ? 3 : 4,
              },
              {
                where: { id: mov.ParcelaId },
              },
            );
          }

          await MovimentoCaixa.update({
            vlrPago: vlrSingle / 100,
            saldo: (mov.saldo - vlrSingle) / 100,
            dtLiqui,
            status: mov.saldo - vlrSingle > 0 ? 2 : 3,
          }, {
            where: { id: mov.id },
          });
        }

        return res.json({ error: 'Erro Interno do Servidor' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async delete(req, res) {
    try {
      const { params } = req;
      const mov = await MovimentoCaixa.findOne({
        where: { id: params.id },
      });
      await mov.destroy();
      return res.json({ mov, message: 'Movimento excluído com sucesso' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno Do Servidor' });
    }
  }
}

export default new MovimentoCaixaController();
