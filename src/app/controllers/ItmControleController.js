import * as yup from 'yup';
import ItmControle from '../models/itmControle';
import Empresa from '../models/empresa';

class ItmControleController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      descItem: yup.string().required(),
      tipoItem: yup.string().required(),
      contaContabil: yup.string().required(),
      centCusto: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      EmpresaId,
      descItem,
      tipoItem,
      contaContabil,
      centCusto,
    } = await ItmControle.create(req.body);
    return res.json({
      EmpresaId,
      descItem,
      tipoItem,
      contaContabil,
      centCusto,
    });
  }

  async get(req, res) {
    if (!req.params.id) {
      const itmCtrl = await ItmControle.findAll({ include: Empresa });
      return res.json(itmCtrl);
    }
    const itmCtrl = await ItmControle.findOne({
      where: { id: req.params.id },
    });
    return res.json(itmCtrl);
  }

  async update(req, res) {
    const itmCtrl = await ItmControle.findByPk(req.params.id);
    const {
      EmpresaId,
      descItem,
      tipoItem,
      contaContabil,
      centCusto,
    } = await itmCtrl.update(req.body);

    return res.json({
      EmpresaId,
      descItem,
      tipoItem,
      contaContabil,
      centCusto,
    });
  }
}
export default new ItmControleController();
