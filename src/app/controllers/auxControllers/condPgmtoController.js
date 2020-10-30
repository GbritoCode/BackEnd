import * as yup from 'yup';
import condPgmto from '../../models/condPgmto.js';
import Empresa from '../../models/empresa.js';

class condPgmtoController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      diasPrazo: yup.number().required(),
      desc: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { EmpresaId, diasPrazo, desc } = await condPgmto.create(req.body);

    return res.json({
      EmpresaId,
       diasPrazo,
      desc,
    });
  }
  async get(req, res) {
    if (!req.params.id) {
      const condPgmtos = await condPgmto.findAll({ include: Empresa });
      return res.json(condPgmtos);
    } else {
      const condPgmtos = await condPgmto.findOne({
        where: { id: req.params.id },
      });
      return res.json(condPgmtos);
    }
  }
  async update(req, res) {
    const condPgmtos = await condPgmto.findByPk(req.params.id);
    const { EmpresaId, diasPrazo, desc } = await condPgmtos.update(req.body);

    return res.json({
      EmpresaId,
      diasPrazo,
      desc,
    });
  }
}
export default new condPgmtoController();
