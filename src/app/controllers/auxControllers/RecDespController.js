import * as yup from 'yup';
import RecDesp from '../../models/recDesp';
import Empresa from '../../models/empresa';
import CliRecDesp from '../../models/cliRecDesp';
import Oportunidade from '../../models/oportunidade';
import CentroCustos from '../../models/CentroCusto';
import ContaContabils from '../../models/ContaContabil';

class RecDespController {
  async store(req, res) {
    const { body } = req;
    try {
      const { recDesp } = await RecDesp.create(body);
      return res.json({
        recDesp, message: 'Rec/Desp Criada com Sucesso!',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async get(req, res) {
    const { params, query } = req;
    try {
      if (query.rec) {
        const recDesp = await RecDesp.findAll({
          where: { recDesp: 'Rec' },
          include: [{ model: Empresa }],
        });
        return res.json(recDesp);
      }

      if (query.desp === 'true') {
        const recDesp = await RecDesp.findAll({
          where: { recDesp: 'Desp' },
          include: [{ model: Empresa }],
        });
        return res.json(recDesp);
      }

      if (query.apont === 'true') {
        const recDesp = await RecDesp.findAll({
          where: { lancFlag: true },
          include: [{ model: Empresa }],
        });
        return res.json(recDesp);
      }

      if (!params.id) {
        const recDesp = await RecDesp.findAll({
          include: [{ model: Empresa }, { model: ContaContabils }, { model: CentroCustos }],
        });
        return res.json(recDesp);
      }
      const recDesp = await RecDesp.findOne({ where: { id: req.params.id } });
      return res.json(recDesp);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async update(req, res) {
    const recdesp = await RecDesp.findByPk(req.params.id);
    const {
      EmpresaId, desc, recDesp,
      tipoItem,
      CentroCustoId,
      ContaContabilId,
    } = await recdesp.update(req.body);

    return res.json({
      EmpresaId,
      desc,
      recDesp,
      tipoItem,
      CentroCustoId,
      ContaContabilId,
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
    return res.status(400).json({ error: 'Registro possui dependências. Exclusão não permitida' });
  }
}
export default new RecDespController();
