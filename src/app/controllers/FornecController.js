import * as yup from 'yup';
import Fornec from '../models/fornec';
import condPgmto from '../models/condPgmto';
import Empresa from '../models/empresa';
import Colab from '../models/colab';

class FornecController {
  async store(req, res) {
    try {
      const fornec = await Fornec.create(req.body);
      return res.json({
        fornec, message: 'Fornecedor Criado com Sucesso!',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async get(req, res) {
    if (!req.params.id) {
      const fornec = await Fornec.findAll({
        include: [{ model: condPgmto }, { model: Empresa }],
      });
      return res.json(fornec);
    }
    const fornec = await Fornec.findOne({ where: { id: req.params.id } });
    return res.json(fornec);
  }

  async update(req, res) {
    const fornec = await Fornec.findByPk(req.params.id);
    const {
      CNPJ,
      EmpresaId,
      nome,
      CondPgmtoId,
      nomeConta,
      fone,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      banco,
      agencia,
      conta,
    } = await fornec.update(req.body);

    return res.json({
      CNPJ,
      EmpresaId,
      nome,
      CondPgmtoId,
      nomeConta,
      fone,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      banco,
      agencia,
      conta,
    });
  }

  async delete(req, res) {
    const fornec = await Fornec.findOne({
      where: { id: req.params.id },
      include: [{ model: Colab }],
    });
    if (fornec.Colab === null) {
      fornec.destroy();
      return res.status(200).json(`Registro ${fornec.nome} foi deletado com Sucesso!`);
    }
    return res.status(400).json({ error: 'Registro possui dependências. Exclusão não permitida' });
  }
}
export default new FornecController();
