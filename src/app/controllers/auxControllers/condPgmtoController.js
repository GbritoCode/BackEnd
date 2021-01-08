import * as yup from 'yup';
import condPgmto from '../../models/condPgmto';
import Empresa from '../../models/empresa';

class CondPgmtoController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      cod: yup.string().required(),
      diasPrazo: yup.number().required(),
      desc: yup.string().required(),
    });

    const {
      EmpresaId, cod, diasPrazo, desc,
    } = await condPgmto.create(req.body);

    return res.json({
      EmpresaId,
      cod,
      diasPrazo,
      desc,
    });
  }

  async get(req, res) {
    if (!req.params.id) {
      const condPgmtos = await condPgmto.findAll({ include: Empresa });
      return res.json(condPgmtos);
    }
    const condPgmtos = await condPgmto.findOne({
      where: { id: req.params.id },
    });
    return res.json(condPgmtos);
  }

  async update(req, res) {
    const condPgmtos = await condPgmto.findByPk(req.params.id);
    const {
      EmpresaId, cod, diasPrazo, desc,
    } = await condPgmtos.update(req.body);

    return res.json({
      EmpresaId,
      cod,
      diasPrazo,
      desc,
    });
  }
}
export default new CondPgmtoController();
