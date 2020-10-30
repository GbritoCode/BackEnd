import * as yup from 'yup';
import Parametros from '../models/parametros';
import Empresa from '../models/empresa';

class parametrosController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      impostos: yup.number().required(),
      vlrMinHr: yup.number().required(),
      vlrBsHr: yup.number().required(),
      vlrBsDesp: yup.number().required(),
      adiantaPgmto: yup.string().required(),
      percAdiantaPgmto: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      EmpresaId,
      impostos,
      vlrMinHr,
      vlrBsHr,
      vlrBsDesp,
      adiantaPgmto,
      percAdiantaPgmto,
    } = await Parametros.create(req.body);
    return res.json({
      EmpresaId,
      impostos,
      vlrMinHr,
      vlrBsHr,
      vlrBsDesp,
      adiantaPgmto,
      percAdiantaPgmto,
    });
  }
  async get(req, res) {
    if (!req.params.id) {
      const parametros = await Parametros.findAll({ include: Empresa });
      return res.json(parametros);
    } else {
      const parametros = await Parametros.findOne({
        where: { id: req.params.id },
      });
      return res.json(parametros);
    }
  }
  async update(req, res) {
    const parametros = await Parametros.findByPk(req.params.id);
    const {
      EmpresaId,
      impostos,
      vlrMinHr,
      vlrBsHr,
      vlrBsDesp,
      adiantaPgmto,
      percAdiantaPgmto,
    } = await parametros.update(req.body);

    return res.json({
      EmpresaId,
      impostos,
      vlrMinHr,
      vlrBsHr,
      vlrBsDesp,
      adiantaPgmto,
      percAdiantaPgmto,
    });
  }
}
export default new parametrosController();
