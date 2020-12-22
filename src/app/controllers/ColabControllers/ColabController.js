import { Op } from 'sequelize';
import moment from 'moment';
import { getDaysInMonth } from 'date-fns';
import * as yup from 'yup';
import Colab from '../../models/colab';
import Empresa from '../../models/empresa';
import fornec from '../../models/fornec';
import Horas from '../../models/horas';
import Recurso from '../../models/recurso';

class ColabController {
  async store(req, res) {
    const schema = yup.object().shape({
      CPF: yup.number().required(),
      FornecId: yup.number().required(),
      EmpresaId: yup.string().required(),
      nome: yup.string().required(),
      dtAdmiss: yup.date().required(),
      cel: yup.string().required(),
      PerfilId: yup.number().required(),
      skype: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      espec: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      CPF,
      FornecId,
      EmpresaId,
      nome,
      dtAdmiss,
      cel,
      PerfilId,
      skype,
      email,
      espec,
    } = await Colab.create(req.body);
    return res.json({
      CPF,
      FornecId,
      EmpresaId,
      nome,
      dtAdmiss,
      cel,
      PerfilId,
      skype,
      email,
      espec,
    });
  }

  async get(req, res) {
    if (req.query.email) {
      const { email } = req.query;
      const colab = await Colab.findOne({
        where: { email },
      });
      return res.json(colab);
    } if (req.query.vlrHrMes === 'true') {
      const year = moment().year();
      const month = moment().month() + 1;
      const lastDayMonth = getDaysInMonth(new Date(year, month));
      const colab = await Colab.findAll({
        where: { id: req.params.id },
        include: [{ model: Recurso, required: true },
          {
            model: Horas,
            where: {
              dataAtivd: {
                [Op.between]: [`${year}-${month}-${1}`, `${year}-${month}-${lastDayMonth}`],
              },
            },
            required: true,
          }],
      });
      let sum = 0;
      for (let i = 0; i < colab.length; i++) {
        sum += (colab[i].Hora.dataValues.totalApont / 60) * colab[i].Recurso.dataValues.colabVlrHr;
      }
      return res.json(sum);
    } if (req.query.data === 'true') {
      const { oport } = req.query;
      const colab = await Colab.findAll({
        include: [{ model: Recurso, where: { OportunidadeId: oport }, required: true },
          { model: Horas, where: { OportunidadeId: oport }, required: true }],
      });
      let sum = 0;
      for (let i = 0; i < colab.length; i++) {
        sum += (colab[i].Hora.dataValues.totalApont / 60) * colab[i].Recurso.dataValues.colabVlrHr;
      }
      return res.json(sum);
    }
    if (!req.params.id) {
      const colab = await Colab.findAll({
        include: [{ model: fornec }, { model: Empresa }],
      });
      return res.json(colab);
    }
    const colab = await Colab.findOne({ where: { id: req.params.id } });
    return res.json(colab);
  }

  async update(req, res) {
    const colab = await Colab.findByPk(req.params.id);
    const {
      CPF,
      FornecId,
      EmpresaId,
      nome,
      dtAdmiss,
      cel,
      PerfilId,
      skype,
      email,
      espec,
    } = await colab.update(req.body);

    return res.json({
      CPF,
      FornecId,
      EmpresaId,
      nome,
      dtAdmiss,
      cel,
      PerfilId,
      skype,
      email,
      espec,
    });
  }
}
export default new ColabController();
