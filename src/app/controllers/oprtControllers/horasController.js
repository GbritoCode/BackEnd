import Colab from '../../models/colab';
import Oportunidade from '../../models/oportunidade';
import Hora from '../../models/horas';

class HoraController {
  async store(req, res) {
    const {
      OportunidadeId,
      ColabId,
      horaInic,
      horaIntrv,
      horaFim,
      dataLancamento,
      totalApont,
      totalAcum,
      horaInicAudit,
      horaIntrvAudit,
      horaFimAudit,
      dataLancamentoAudit,
      totalApontAudit,
      totalAcumAudit,
      solicitante,
      AreaId,
      desc,
    } = await Hora.create(req.body);
    return res.json({
      OportunidadeId,
      ColabId,
      horaInic,
      horaIntrv,
      horaFim,
      dataLancamento,
      totalApont,
      totalAcum,
      horaInicAudit,
      horaIntrvAudit,
      horaFimAudit,
      dataLancamentoAudit,
      totalApontAudit,
      totalAcumAudit,
      solicitante,
      AreaId,
      desc,
    });
  }

  async get(req, res) {
    if (req.params.id && req.params.update) {
      const hora = await Hora.findOne({
        where: { id: req.params.update },
        include: [{ model: Oportunidade }, { model: Colab }],
      });
      return res.json(hora);
    } if (req.params.id) {
      const hora = await Hora.findAll({
        where: {
          OportunidadeId: req.params.id,
        },
        include: [{ model: Oportunidade }, { model: Colab }],
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
      horaInic,
      horaIntrv,
      horaFim,
      dataLancamento,
      totalApont,
      totalAcum,
      horaInicAudit,
      horaIntrvAudit,
      horaFimAudit,
      dataLancamentoAudit,
      totalApontAudit,
      totalAcumAudit,
      solicitante,
      AreaId,
      desc,
    } = await hora.update(req.body);

    return res.json({
      OportunidadeId,
      ColabId,
      horaInic,
      horaIntrv,
      horaFim,
      dataLancamento,
      totalApont,
      totalAcum,
      horaInicAudit,
      horaIntrvAudit,
      horaFimAudit,
      dataLancamentoAudit,
      totalApontAudit,
      totalAcumAudit,
      solicitante,
      AreaId,
      desc,
    });
  }
}
export default new HoraController();
