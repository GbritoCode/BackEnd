import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import authConfig from '../../config/auth';
import Colabs from '../models/colab';
import Empresas from '../models/empresa';
import Parametros from '../models/parametros';
import Perfil from '../models/perfil';
import User from '../models/users';

class SessionController {
  async store(req, res) {
    try {
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
        { model: Colabs, include: [{ model: Perfil }] }],
      });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      if (!(await user.checkPassword(senha))) {
        return res.status(401).json({ error: 'O usuário ou senha estão incorretos. Verifique os dados' });
      }

      const {
        id, nome, profile, isFirstLogin, Colab, Empresa,
      } = user;
      const empresa = Colab === null ? '' : await Empresas.findByPk(Colab.EmpresaId);

      const permittedPages = Colab === null ? '' : Colab.Perfil === null ? '' : Colab.Perfil.permittedPages.split(',');

      const param = await Parametros.findOne();

      const color = param.getDataValue('color');

      return res.json({
        user: {
          id,
          nome,
          profile,
          isFirstLogin,
          empresa,
          Colab,
          xpto: '6584',
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
        color,
        acessible: permittedPages,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }
}

export default new SessionController();
