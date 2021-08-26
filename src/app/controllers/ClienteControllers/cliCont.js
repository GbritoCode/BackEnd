import * as yup from 'yup';
import CliCont from '../../models/cliCont';
import FollowUps from '../../models/FollowUps';

class CliContController {
  async store(req, res) {
    try {
      const cont = await CliCont.create(req.body);

      return res.json({
        message: `contato ${cont.nome} foi criado com sucesso`,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async get(req, res) {
    if (req.params.id && req.params.update) {
      const contato = await CliCont.findOne({
        where: { id: req.params.update },
      });
      return res.json(contato);
    } if (req.params.id) {
      const contato = await CliCont.findAll({
        where: {
          ClienteId: req.params.id,
        },
      });
      return res.json(contato);
    }
  }

  async update(req, res) {
    try {
      const cliCont = await CliCont.findByPk(req.params.id);
      const cont = await cliCont.update(req.body);
      return res.json({
        message: `Registro ${cont.nome} atualizado com sucesso`,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async delete(req, res) {
    try {
      const cliCont = await CliCont.findOne({
        where: { id: req.params.id },
        include: [{ model: FollowUps }],
      });
      if (cliCont.FollowUps.length !== 0) {
        return res.status(400).json({ error: 'Registro Possui Dependências' });
      }
      cliCont.destroy();
      return res.status(200).json(`Registro ${cliCont.nome} foi deletado com Sucesso!`);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }
}
export default new CliContController();
