import { Op } from 'sequelize';
import { getDaysInMonth } from 'date-fns';
import Colab from '../../models/colab';
import Oportunidade from '../../models/oportunidade';
import Hora from '../../models/horas';

class HoraController {
  async store(req, res) {
    const {
      OportunidadeId,
      ColabId,
      dataAtivd,
      horaInic,
      horaIntrv,
      horaFim,
      dataLancamento,
      totalApont,
      horaInicAudit,
      horaIntrvAudit,
      horaFimAudit,
      dataAtivdAudit,
      totalApontAudit,
      solicitante,
      AreaId,
      desc,
    } = await Hora.create(req.body);
    return res.json({
      OportunidadeId,
      ColabId,
      dataAtivd,
      horaInic,
      horaIntrv,
      horaFim,
      dataLancamento,
      totalApont,
      horaInicAudit,
      horaIntrvAudit,
      horaFimAudit,
      dataAtivdAudit,
      totalApontAudit,
      solicitante,
      AreaId,
      desc,
    });
  }

  async get(req, res) {
    if (req.query.total === 'true' && req.query.tipo === 'month' && req.params.id) {
      const [year, month] = new Date().toLocaleDateString('pt-BR').split('-');
      const lastDayMonth = getDaysInMonth(new Date(year, month - 1));
      const hora = await Hora.sum('totalApont', {
        where: {
          ColabId: req.params.id,
          dataAtivd: {
            [Op.between]: [`${year}-${month}-${1}`, `${year}-${month}-${lastDayMonth}`],
          },
        },
      });
      const apontHr = `0${Math.trunc(hora / 60)}`.slice(-2);
      const apontMin = `0${Math.trunc(hora % 60)}`.slice(-2);
      return res.json(`${apontHr}:${apontMin}`);
    } if (req.query.total === 'true' && req.query.tipo === 'project' && req.params.id) {
      const { oport } = req.query;
      const hora = await Hora.sum('totalApont', {
        where: {
          ColabId: req.params.id,
          OportunidadeId: oport,
        },
      });
      const apontHr = `0${Math.trunc(hora / 60)}`.slice(-2);
      const apontMin = `0${Math.trunc(hora % 60)}`.slice(-2);
      return res.json(`${apontHr}:${apontMin}`);
    }
    if (req.params.id && req.query.update) {
      const hora = await Hora.findOne({
        where: { id: req.params.id },
        include: [{ model: Oportunidade }, { model: Colab }],
      });
      return res.json(hora);
    } if (req.params.id) {
      const hora = await Hora.findAll({
        where: {
          ColabId: req.params.id,
        },
        include: [{ model: Oportunidade }],
      });
      return res.json(hora);
    }
    return res.json();
  }

  async update(req, res) {
    const hora = await Hora.findByPk(req.params.id);
    const {
      OportunidadeId,
      ColabId,
      dataAtivd,
      horaInic,
      horaIntrv,
      horaFim,
      dataLancamento,
      totalApont,
      horaInicAudit,
      horaIntrvAudit,
      horaFimAudit,
      dataAtivdAudit,
      totalApontAudit,
      solicitante,
      AreaId,
      desc,
      apontDiff,
    } = await hora.update(req.body);

    return res.json({
      OportunidadeId,
      ColabId,
      dataAtivd,
      horaInic,
      horaIntrv,
      horaFim,
      dataLancamento,
      totalApont,
      horaInicAudit,
      horaIntrvAudit,
      horaFimAudit,
      dataAtivdAudit,
      totalApontAudit,
      solicitante,
      AreaId,
      desc,
      apontDiff,
    });
  }
}
export default new HoraController();
