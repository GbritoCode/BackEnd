import * as yup from 'yup';
import users from '../models/users';

class UserController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await users.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'users already exists' });
    }

    const {
      id, name, email, profile,
    } = await users.create(req.body);

    return res.json({
      id,
      name,
      email,
      profile,
    });
  }

  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      oldPassword: yup.string().min(6),
      password: yup
        .string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => (oldPassword ? field.required() : field)),
      confirmPassword: yup
        .string()
        .when('password', (password, field) => (password ? field.required().oneOf([yup.ref('password')]) : field)),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await users.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await users.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'users already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, profile } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      profile,
    });
  }

  async get(req, res) {
    if (!req.params.id) {
      const user = await users.findAll({});
      return res.json(user);
    }
    const user = await users.findOne({ where: { id: req.params.id } });
    return res.json(user);
  }
}
export default new UserController();
