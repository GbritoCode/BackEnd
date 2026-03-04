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

      const { situacao, nome, ano } = checkPeriodo.dataValues;
      body.periodo = monthFullToNumber[nome];
      body.recDesp = body.FornecId === null ? 'Rec' : 'Desp';
      body.ano = ano;

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
        where: { status: { [Op.in]: [3, 4] } },
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
          status: { [Op.in]: [1, 2] },
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
                      vlrPago: Math.round(movCx.total * 100),
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
                const vlrSingleCents = Math.round(vlrSingle * 100);
                const totalCents = Math.round(mov.total * 100);
                const saldoCents = Math.round(mov.saldo * 100);

                await Parcela.update(
                  {
                    vlrPago: totalCents - (saldoCents - vlrSingleCents),
                    saldo: saldoCents - vlrSingleCents,
                    dtLiquidacao: dtLiqui,
                    status: saldoCents - vlrSingleCents > 0 ? 3 : 4,
                  },
                  {
                    where: { id: mov.ParcelaId },
                  },
                );
              }

              const saldoRemainingClosed = parseFloat((mov.saldo - vlrSingle).toFixed(2));

              await MovimentoCaixa.update({
                vlrPago: vlrSingle,
                saldo: saldoRemainingClosed,
                dtLiqui,
                status: saldoRemainingClosed > 0 ? 2 : 3,
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
                  vlrPago: Math.round(movCx.total * 100),
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
            const vlrSingleCents = Math.round(vlrSingle * 100);
            const totalCents = Math.round(mov.total * 100);
            const saldoCents = Math.round(mov.saldo * 100);

            await Parcela.update(
              {
                vlrPago: totalCents - (saldoCents - vlrSingleCents),
                saldo: saldoCents - vlrSingleCents,
                dtLiquidacao: dtLiqui,
                situacao: saldoCents - vlrSingleCents > 0 ? 3 : 4,
              },
              {
                where: { id: mov.ParcelaId },
              },
            );
          }

          const saldoRemaining = parseFloat((mov.saldo - vlrSingle).toFixed(2));

          await MovimentoCaixa.update({
            vlrPago: vlrSingle,
            saldo: saldoRemaining,
            dtLiqui,
            status: saldoRemaining > 0 ? 2 : 3,
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

  async estornoLiquid(req, res) {
    try {
      const { params, body } = req;

      const mov = await MovimentoCaixa.findOne({
        where: { id: params.id },
        include: [{ model: RecDesp }],
      });

      if (!mov) {
        return res.status(404).json({ error: 'Movimento de caixa não encontrado' });
      }

      const currentStatus = mov.getDataValue('status');
      if (currentStatus !== 3) {
        return res.status(400).json({
          error: 'Apenas movimentos liquidados (status=3) podem ser estornados por este método.',
        });
      }

      // Prevent refunding a refund movement
      if (mov.RecDesp.tipoItem.toLowerCase() === 'estorno') {
        return res.status(400).json({
          error: 'Não é possível estornar um movimento que já é um estorno.',
        });
      }

      // Find inverse RecDesp (Estorno with opposite type)
      const originalRecDesp = mov.RecDesp;
      const inverseType = originalRecDesp.recDesp.toLowerCase() === 'rec' ? 'Desp' : 'Rec';
      const inverseTypeLabel = inverseType === 'Rec' ? 'Receita' : 'Despesa';

      const inverseRecDesp = await RecDesp.findOne({
        where: {
          tipoItem: { [Op.iLike]: 'estorno' },
          recDesp: { [Op.iLike]: inverseType },
        },
      });

      if (!inverseRecDesp) {
        return res.status(400).json({
          error: `Não foi encontrado o registro de Estorno. Verifique se existe uma Receita/Despesa com tipo='Estorno' e categoria='${inverseTypeLabel}'.`,
        });
      }

      const originalDtVenc = mov.getDataValue('dtVenc');
      const originalDtLiqui = mov.getDataValue('dtLiqui');

      // Create inverse movement
      const newMov = await MovimentoCaixa.create({
        EmpresaId: mov.EmpresaId,
        RecDespId: inverseRecDesp.id,
        ColabCreate: body.ColabId,
        ColabLiqui: body.ColabId,
        ColabPgmto: mov.ColabPgmto,
        FornecId: inverseType === 'Desp' ? mov.FornecId || mov.ClienteId : null,
        ClienteId: inverseType === 'Rec' ? mov.ClienteId || mov.FornecId : null,
        ParcelaId: null,
        recDesp: inverseType,
        ano: mov.ano,
        periodo: mov.periodo,
        valor: mov.valor,
        saldo: 0,
        dtVenc: originalDtVenc,
        dtLiqui: originalDtLiqui,
        status: 3, // Already liquidated
        desc: `Estorno do movimento #${mov.id} - ${originalRecDesp.desc}`,
        referencia: mov.referencia,
        autoCreated: true,
      });

      // Liquidate the new movement
      const liquid = await liquidMovCaixaController.liquidaMov({
        movId: newMov.id,
        valor: inverseType === 'Desp' ? -mov.valor : mov.valor,
        dtLiqui: originalDtLiqui,
        recDesp: inverseType,
      });

      if (!liquid.status) {
        // Rollback: delete the created movement
        await newMov.destroy();
        return res.status(500).json({ error: liquid.err || 'Erro ao liquidar o movimento de estorno' });
      }

      // Mark original movement as estornado
      await mov.update({
        status: 4,
      });

      return res.json({
        mov: newMov,
        message: 'Movimento estornado com sucesso. Um novo movimento inverso foi criado e liquidado.',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno Do Servidor' });
    }
  }

  async estorno(req, res) {
    try {
      const { params, body } = req;

      const mov = await MovimentoCaixa.findOne({
        where: { id: params.id },
      });

      if (!mov) {
        return res.status(404).json({ error: 'Movimento de caixa não encontrado' });
      }

      const currentStatus = mov.getDataValue('status');
      if (currentStatus !== 1) {
        return res.status(400).json({
          error: `Não é possível estornar este movimento. Status atual: ${currentStatus}. Apenas movimentos não pagos (status=1) podem ser estornados.`,
        });
      }

      const dtVenc = mov.getDataValue('dtVenc');
      const checkPeriodo = await FechamentoPeriodo.findOne({
        where: {
          [Op.and]: [{
            dataFim: {
              [Op.gte]: dtVenc,
            },
          },
          {
            dataInic: {
              [Op.lte]: dtVenc,
            },
          }],
        },
      });

      if (!checkPeriodo) {
        return res.status(400).json({
          error: 'Não existe período criado para a data do apontamento',
        });
      }

      const { situacao } = checkPeriodo.dataValues;

      if (situacao !== 'Aberto') {
        const colab = await Colab.findByPk(body.ColabId);
        if (!colab) {
          return res.status(500).json({ error: 'Erro interno de servidor' });
        }
        try {
          const token = colab.getDataValue('PeriodToken');
          const decoded = await promisify(jwt.verify)(token, process.env.TOKENS_SECRET);

          if (decoded.periodo !== checkPeriodo.getDataValue('nome')) {
            throw 'error';
          }
        } catch (err) {
          return res.status(401).json({
            error: 'O período já está fechado, contate o administrador',
          });
        }
      }

      const now = new Date();
      await mov.update({
        status: 4,
        dtLiqui: now,
      });

      return res.json({ mov, message: 'Movimento estornado com sucesso' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno Do Servidor' });
    }
  }
}

export default new MovimentoCaixaController();
