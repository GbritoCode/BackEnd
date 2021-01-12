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
      senha: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, senha } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [{ model: Empresas },
        { model: Colabs }],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(senha))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const {
      id, nome, profile, Empresa, Colab,
    } = user;

    return res.json({
      user: {
        id,
        nome,
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
