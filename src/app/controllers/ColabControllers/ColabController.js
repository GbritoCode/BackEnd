import { Op } from 'sequelize';
import moment from 'moment';
import { getDaysInMonth } from 'date-fns';
import Colab from '../../models/colab';
import Perfil from '../../models/perfil';
import Empresa from '../../models/empresa';
import fornec from '../../models/fornec';
import Horas from '../../models/horas';
import Recurso from '../../models/recurso';
import Oportunidade from '../../models/oportunidade';
import Despesas from '../../models/despesas';
import Parametros from '../../models/parametros';

class ColabController {
  async store(req, res) {
    try {
      const colab = await Colab.create(req.body);

      return res.status(200).json({
        colab, message: `Colaborador ${colab.getDataValue('nome')} criado com sucesso!`,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async get(req, res) {
    try {
      if (req.query.idColab) {
        const { idColab } = req.query;
        const colab = await Colab.findOne({
          where: { id: idColab },
        });
        return res.json(colab);
      } if (req.query.vlrHrMes === 'true' && req.query.tipo === 'gerencial') {
        const year = moment().year();
        const month = moment().month();
        const lastDayMonth = getDaysInMonth(new Date(year, month));
        const colab = await Colab.findAll({
          include: [{
            model: Recurso,
            required: true,
            include: [{
              model: Horas,
              where: {
                dataAtivd: {
                  [Op.between]: [`${year}-${month + 1}-${1}`, `${year}-${month + 1}-${lastDayMonth}`],
                },
              },
              required: true,
            }],
          }],
        });
        if (colab === null) {
          return res.json(0);
        }
        let sum = 0;
        for (let i = 0; i < colab.length; i++) {
          for (let j = 0; j < colab[i].Recursos.length; j++) {
            for (let k = 0; k < colab[i].Recursos[j].Horas.length; k++) {
              sum += (colab[i].Recursos[j].Horas[k].dataValues.totalApont / 60)
              * colab[i].Recursos[j].dataValues.colabVlrHr;
            }
          }
        }
        return res.json(Math.trunc(sum));
      } if (req.query.vlrHrMes === 'true' && !req.query.gerencial) {
        const year = moment().year();
        const month = moment().month();
        const lastDayMonth = getDaysInMonth(new Date(year, month));
        const colab = await Colab.findOne({
          where: { id: req.params.id },
          include: [{
            model: Recurso,
            required: true,
            include: [{
              model: Horas,
              where: {
                dataAtivd: {
                  [Op.between]: [`${year}-${month + 1}-${1}`, `${year}-${month + 1}-${lastDayMonth}`],
                },
              },
              required: true,
            }],
          }],
        });
        if (colab === null) {
          return res.json(0);
        }
        let sum = 0;
        for (let i = 0; i < colab.Recursos.length; i++) {
          for (let j = 0; j < colab.Recursos[i].Horas.length; j++) {
            sum += (colab.Recursos[i].Horas[j].dataValues.totalApont / 60)
          * colab.Recursos[i].dataValues.colabVlrHr;
          }
        }
        return res.json(Math.trunc(sum));
      } if (req.query.data === 'true') {
        const { oport } = req.query;
        const colab = await Colab.findAll({
          include: [{
            model: Recurso,
            required: true,
            include: [{
              model: Horas,
              where: { OportunidadeId: oport },
              required: true,
            }],
          }],
        });
        if (colab === null) {
          return res.json(0);
        }
        let sum = 0;
        for (let g = 0; g < colab.length; g++) {
          for (let i = 0; i < colab[g].Recursos.length; i++) {
            for (let j = 0; j < colab[g].Recursos[i].Horas.length; j++) {
              sum += (colab[g].Recursos[i].Horas[j].dataValues.totalApont / 60)
          * colab[g].Recursos[i].dataValues.colabVlrHr;
            }
          }
        }
        return res.json(Math.trunc(sum));
      }
      if (!req.params.id) {
        const colab = await Colab.findAll({
          include: [{ model: fornec }, { model: Empresa }, { model: Perfil }],
          order: [['nome']],
        });
        return res.json(colab);
      }
      const colab = await Colab.findOne({ where: { id: req.params.id } });
      return res.json(colab);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async update(req, res) {
    const colab = await Colab.findByPk(req.params.id);
    let recursoComp = false; let paramCompHrs = false;
    if (req.body.recebeFixo) {
      paramCompHrs = await Parametros.findOne(
        {
          where: {
            compFlag: true,
          },
        },
      );
      if (paramCompHrs) {
        recursoComp = await Recurso.findOne(
          {
            where: {
              tipoAtend: 4,
              ColabId: req.params.id,
            },
          },
        );
      }
    }

    if (recursoComp) {
      return res.status(400).json({ error: 'Colaborador está cadastrado em horas complementares, não é possível receber fixo' });
    }
    const updatedColab = await colab.update(req.body);

    return res.json({ updatedColab, message: `Colaborador ${updatedColab.getDataValue('nome')} atualizado com Sucesso` });
  }

  async delete(req, res) {
    try {
      const colab = await Colab.findOne({
        where: { id: req.params.id },
        include: [Oportunidade, Recurso, Horas, Despesas],
      });
      if (colab.Oportunidade === null && colab.Recurso === null && colab.Horas === null
        && colab.Despesas === null) {
        colab.destroy();
        return res.status(200).json(`Registro ${colab.nome} foi deletado com Sucesso!`);
      }
      return res.status(400).json({ error: 'Registro possui dependências. Exclusão não permitida' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }
}
export default new ColabController();
