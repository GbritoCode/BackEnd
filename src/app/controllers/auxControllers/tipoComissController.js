import * as yup from 'yup';
import tipoComiss from '../../models/tipoComiss.js';
import Empresa from '../../models/empresa.js';

class tipoComissController {
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

    const { EmpresaId,  desc, prcnt, bsComiss } = await tipoComiss.create(req.body);

    return res.json({
      EmpresaId,
      desc,
      prcnt,
      bsComiss
    });
  }
  async get(req, res) {
    if (!req.params.id) {
      const TipoComiss = await tipoComiss.findAll({ include: Empresa });
      return res.json(TipoComiss);
    } else {
      const TipoComiss = await tipoComiss.findOne({
        where: { id: req.params.id },
      });
      return res.json(TipoComiss);
    }
  }
  async update(req, res) {
    const TipoComiss = await tipoComiss.findByPk(req.params.id);
    const { EmpresaId,  desc,prcnt,bsComiss } = await TipoComiss.update(req.body);

    return res.json({
      EmpresaId,
      desc,
      prcnt,
      bsComiss
    });
  }
}
export default new tipoComissController();
