import * as yup from 'yup';
import Colab from '../models/colab';
import Empresa from '../models/empresa';
import users from '../models/users';

class UserController {
  async store(req, res) {
    const schema = yup.object().shape({
      nome: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      senha: yup
        .string()
        .required()
        .min(6),
    });

    const userExists = await users.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'users already exists' });
    }

    const {
      id, nome, email, profile,
    } = await users.create(req.body);

    return res.json({
      id,
      nome,
      email,
      profile,
    });
  }

  async update(req, res) {
    const schema = yup.object().shape({
      nome: yup.string(),
      email: yup.string(),
      senhaAntiga: yup.string().min(6),
      senha: yup
        .string()
        .min(6)
        .when('senhaAntiga', (senhaAntiga, field) => (senhaAntiga ? field.required() : field)),
      confirmSenha: yup
        .string()
        .when('senha', (senha, field) => (senha ? field.required().oneOf([yup.ref('senha')]) : field)),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, senhaAntiga } = req.body;

    const user = await users.findByPk(req.params.id);

    if (email !== user.email) {
      const userExists = await users.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'users already exists' });
      }
    }

    if (senhaAntiga && !(await user.checkPassword(senhaAntiga))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, nome, profile } = await user.update(req.body);

    return res.json({
      id,
      nome,
      email,
      profile,
    });
  }

  async get(req, res) {
    if (!req.params.id) {
      const user = await users.findAll({});
      return res.json(user);
    }

    const user = await users.findOne({
      where: { id: req.params.id },
      include: [{ model: Empresa },
        { model: Colab }],
    });
    return res.json(user);
  }

  async delete(req, res) {
    const user = await users.findOne({
      where: { id: req.params.id },
      include: [Empresa, Colab],
    });
    if (user.Colab === null && user.Empresa === null) {
      user.destroy();
      return res.status(200).json(`Registro ${user.nome} foi deletado com Sucesso!`);
    }
    return res.status(400).json({ error: 'Você não pode Excluir esse registro pois ele tem dependências' });
  }
}
export default new UserController();
