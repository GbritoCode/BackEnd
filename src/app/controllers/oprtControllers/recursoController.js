import Cliente from '../../models/cliente';
import Colab from '../../models/colab';
import Notifications from '../../models/notifications';
import Oportunidade from '../../models/oportunidade';
import Recurso from '../../models/recurso';

class RecursoController {
  async store(req, res) {
    try {
      let colabRecebeFixo = false;
      if (req.body.tipoAtend === '4') {
        colabRecebeFixo = await Colab.findOne(
          {
            where: {
              id: req.body.ColabId,
              recebeFixo: true,
            },
          },
        );
      }
      console.log(colabRecebeFixo);
      if (colabRecebeFixo) {
        return res.status(400).json({ error: 'Colaborador tem salário fixo, não é possível cadastrar horas complementares' });
      }

      const recurso = await Recurso.create(req.body);

      const oport = await Oportunidade.findOne({
        where: { id: req.body.OportunidadeId },
        include: [{ model: Cliente }],
      });

      await Notifications.create({
        EmpresaId: oport.EmpresaId,
        content: `Você foi cadastrado em uma nova oportunidade,${oport.Cliente.nomeAbv} - ${oport.cod}, ${oport.desc}`,
        ColabId: req.body.ColabId,
      });

      return res.json({ recurso, message: 'Recurso criado com sucesso' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  /*  async get(req, res) {
    sequelize
      .query('select * from cliConts where id 1', {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function(rec) {
        res.json(rec);
      });
  }
*/
  async get(req, res) {
    try {
      if (req.params.id && req.params.update) {
        const rec = await Recurso.findOne({
          where: { id: req.params.update },
          include: [{ model: Oportunidade }, { model: Colab }],
        });
        return res.json(rec);
      } if (req.query.total === 'true') {
        const rec = await Recurso.sum('custoPrev', {
          where: { OportunidadeId: req.params.id },
        });
        return res.json(rec);
      }
      if (req.params.id) {
        const rec = await Recurso.findAll({
          where: {
            OportunidadeId: req.params.id,
          },
          include: [{ model: Oportunidade }, { model: Colab }],
        });
        return res.json(rec);
      }
      return res.json();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async update(req, res) {
    try {
      const rec = await Recurso.findByPk(req.params.id);

      const updatedRecurso = await rec.update(req.body);

      return res.json({
        updatedRecurso,
        message: 'Recurso atualizado com sucesso',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async delete(req, res) {
    try {
      const rec = await Recurso.findOne({
        where: { id: req.params.id },
      });
      rec.destroy();
      return res.status(200).json(`Registro de ${rec.dataInclusao} foi deletado com Sucesso!`);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }
}
export default new RecursoController();
