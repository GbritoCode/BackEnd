import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import authConfig from '../../config/auth';
import Colabs from '../models/colab';
import Empresas from '../models/empresa';
import User from '../models/users';

class SessionController {
  async store(req, res) {
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [{ model: Empresas },
        { model: Colabs }],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const {
      id, name, profile, Empresa, Colab,
    } = user;

    return res.json({
      user: {
        id,
        name,
        profile,
        Empresa,
        Colab,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
