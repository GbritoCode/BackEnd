import * as yup from 'yup';
import Parametros from '../models/parametros';
import Empresa from '../models/empresa';

class ParametrosController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      IRPJ: yup.number().required(),
      CSLL: yup.number().required(),
      COFINS: yup.number().required(),
      PIS: yup.number().required(),
      INSS: yup.number().required(),
      ISS: yup.number().required(),
      PSProLabor: yup.number().required(),
      IRRFProLabor: yup.number().required(),
      vlrMinHr: yup.number().required(),
      vlrBsHr: yup.number().required(),
      vlrBsDesp: yup.number().required(),
      adiantaPgmto: yup.string().required(),
      percAdiantaPgmto: yup.number().required(),
      compHrs: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const param = await Parametros.create(req.body);
    return res.json({
      param,
      message: 'Parâmetro criado com sucesso',
    });
  }

  async get(req, res) {
    if (req.query.one === 'true') {
      const parametros = await Parametros.findOne({
        order: [['createdAt', 'DESC']],
      });
      return res.json(parametros);
    }
    if (!req.params.id) {
      const parametros = await Parametros.findAll({ include: Empresa });
      return res.json(parametros);
    }
    const parametros = await Parametros.findOne({
      where: { id: req.params.id },
    });
    return res.json(parametros);
  }

  async update(req, res) {
    const parametros = await Parametros.findByPk(req.params.id);
    console.log(req.body);
    const paramUp = await parametros.update(req.body);

    return res.json({
      paramUp,
      message: 'Parâmetro atualizado com sucesso',
    });
  }
}
export default new ParametrosController();
