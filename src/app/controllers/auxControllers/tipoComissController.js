import * as yup from 'yup';
import tipoComiss from '../../models/tipoComiss';
import Empresa from '../../models/empresa';
import Cliente from '../../models/cliente';
import Representante from '../../models/representante';

class TipoComissController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      desc: yup.string().required(),
      prcnt: yup.number().required(),
      bsComiss: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      EmpresaId, desc, prcnt, bsComiss,
    } = await tipoComiss.create(req.body);

    return res.json({
      EmpresaId,
      desc,
      prcnt,
      bsComiss,
    });
  }

  async get(req, res) {
    if (!req.params.id) {
      const TipoComiss = await tipoComiss.findAll({ include: Empresa });
      return res.json(TipoComiss);
    }
    const TipoComiss = await tipoComiss.findOne({
      where: { id: req.params.id },
    });
    return res.json(TipoComiss);
  }

  async update(req, res) {
    const TipoComiss = await tipoComiss.findByPk(req.params.id);
    const {
      EmpresaId, desc, prcnt, bsComiss,
    } = await TipoComiss.update(req.body);

    return res.json({
      EmpresaId,
      desc,
      prcnt,
      bsComiss,
    });
  }

  async delete(req, res) {
    const TipoComiss = await tipoComiss.findOne({
      where: { id: req.params.id },
      include: [Cliente, Representante],
    });
    if (TipoComiss.Cliente === null && TipoComiss.Representante === null) {
      TipoComiss.destroy();
      return res.status(200).json(`Registro ${TipoComiss.desc} foi deletado com Sucesso!`);
    }
    return res.status(400).json({ error: 'Você não pode Excluir esse registro pois ele tem dependências' });
  }
}
export default new TipoComissController();
