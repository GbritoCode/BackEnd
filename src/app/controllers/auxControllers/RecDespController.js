import * as yup from 'yup';
import RecDesp from '../../models/recDesp';
import Empresa from '../../models/empresa';
import CliRecDesp from '../../models/cliRecDesp';
import Oportunidade from '../../models/oportunidade';

class RecDespController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      desc: yup.string().required(),
      recDesp: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      EmpresaId, desc, recDesp,
    } = await RecDesp.create(req.body);
    return res.json({
      EmpresaId,
      desc,
      recDesp,
    });
  }

  async get(req, res) {
    if (req.query.rec) {
      const recDesp = await RecDesp.findAll({
        where: { recDesp: 'Rec' },
        include: [{ model: Empresa }],
      });
      return res.json(recDesp);
    }

    if (!req.params.id) {
      const recDesp = await RecDesp.findAll({
        include: [{ model: Empresa }],
      });
      return res.json(recDesp);
    }
    const recDesp = await RecDesp.findOne({ where: { id: req.params.id } });
    return res.json(recDesp);
  }

  async update(req, res) {
    const recdesp = await RecDesp.findByPk(req.params.id);
    const {
      EmpresaId, desc, recDesp,
    } = await recdesp.update(req.body);

    return res.json({
      EmpresaId,
      desc,
      recDesp,
    });
  }

  async delete(req, res) {
    const recdesp = await RecDesp.findOne({
      where: { id: req.params.id },
      include: [CliRecDesp, Oportunidade],
    });
    if (recdesp.CliRecDesp === null && recdesp.Oportunidade === null) {
      recdesp.destroy();
      return res.status(200).json(`Registro ${recdesp.desc} foi deletado com Sucesso!`);
    }
    return res.status(400).json({ error: 'Você não pode Excluir esse registro pois ele tem dependências' });
  }
}
export default new RecDespController();
