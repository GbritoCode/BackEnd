import ParametrosEmail from '../../models/emailParametros';

class ParametrosController {
  async store(req, res) {
    const param = await ParametrosEmail.create(req.body);
    return res.json({
      param,
    });
  }

  async get(req, res) {
    if (req.query.one === 'true') {
      const parametros = await ParametrosEmail.findOne({
        order: [['createdAt', 'DESC']],
      });
      return res.json(parametros);
    }
    const parametros = await ParametrosEmail.findOne({
      where: { id: req.params.id },
    });
    return res.json(parametros);
  }

  async update(req, res) {
    const parametros = await ParametrosEmail.findByPk(req.params.id);
    const {
      EmpresaId,
      bccEmailOrc,
      bccEmailRev,
      bccEmailFat,
      fromEmailOrc,
      fromEmailRev,
      fromEmailFat,
    } = req.body;
    console.log(EmpresaId,
      bccEmailOrc);

    const param = await parametros.update(req.body);

    return res.json(param);
  }
}
export default new ParametrosController();
