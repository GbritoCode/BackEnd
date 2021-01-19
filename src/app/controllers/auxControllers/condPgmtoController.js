import * as yup from 'yup';
import CliComp from '../../models/clienteComp';
import condPgmto from '../../models/condPgmto';
import Empresa from '../../models/empresa';
import Fornec from '../../models/fornec';

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

  async delete(req, res) {
    const condPgmtos = await condPgmto.findOne({
      where: { id: req.params.id },
      include: [CliComp, Fornec],
    });
    if (condPgmtos.CliComp === null && condPgmtos.Fornec === null) {
      condPgmtos.destroy();
      return res.status(200).json(`Registro ${condPgmtos.desc} foi deletado com Sucesso!`);
    }
    return res.status(400).json({ error: 'Você não pode Excluir esse registro pois ele tem dependências' });
  }
}
export default new CondPgmtoController();
