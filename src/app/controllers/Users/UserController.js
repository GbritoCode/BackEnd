import * as yup from 'yup';
import crypto from 'crypto';
import MailComposer from 'nodemailer/lib/mail-composer';
import AWS from 'aws-sdk';
import Colab from '../../models/colab';
import Empresa from '../../models/empresa';
import users from '../../models/users';
import ParametrosEmail from '../../models/emailParametros';

const sesConfig = {
  apiVersion: '2019-09-27',
  accessKeyId: process.env.AWS_SES_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION,
};

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
    const colabExists = await Colab.findOne({ where: { CPF: req.body.CPF } });
    if (userExists || colabExists) {
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
      aniver: yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      email, senhaAntiga, ColabId, CPF,
    } = req.body;

    const user = await users.findByPk(req.params.id);
    const colab = await Colab.findByPk(ColabId);
    if (email !== user.email) {
      const userExists = await users.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Este email já está cadastrado em outro colaborador' });
      }
    }

    if (CPF !== colab.CPF) {
      const colabExists = await Colab.findOne({ where: { CPF } });
      if (colabExists) {
        return res.status(400).json({ error: 'O CPF já está cadastrado em outro colaborador' });
      }
    }

    if (senhaAntiga && !(await user.checkPassword(senhaAntiga))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await colab.update({ aniver: req.body.aniver });

    const { id, nome, profile } = await user.update(req.body);

    return res.json({
      id,
      nome,
      email,
      profile,
    });
  }

  async forgotPass(req, res) {
    const schema = yup.object().shape({
      email: yup.string().required(),
    });
    try {
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const {
        email,
      } = req.body;

      const user = await users.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const Password = {

        pattern: /[a-zA-Z0-9_\-\+\.]/,

        getRandomByte() {
          // http://caniuse.com/#feat=getrandomvalues
          const result = crypto.randomFillSync(new Uint32Array(1));
          return result[0];
        },

        generate(length) {
          return Array.apply(null, { length })
            .map(() => {
              let result;
              while (true) {
                result = String.fromCharCode(this.getRandomByte());
                if (this.pattern.test(result)) {
                  return result;
                }
              }
            }, this)
            .join('');
        },

      };
      const pass = Password.generate(16);

      const userUpdated = await user.update({
        forgotPass: true,
        isFirstLogin: true,
        senha: pass,
      });

      const generateRawMailData = (message) => {
        const mailOptions = {
          from: message.fromEmail,
          to: message.to,
          cc: message.cc,
          bcc: message.bcc,
          subject: message.subject,
          text: message.bodyTxt,
          html: message.bodyHtml,
        };
        return new MailComposer(mailOptions).compile().build();
      };

      const parametros = await ParametrosEmail.findOne({
        order: [['createdAt', 'DESC']],
      });

      const from = parametros.fromEmailFat;
      const exampleSendEmail = async () => {
        const message = {
          fromEmail: 'suporte@tovoit.com.br',
          to: ['gabrielcabeca26@gmail.com'],
          cc: [],
          bcc: [],
          subject: 'Alteração de senha',
          bodyTxt: '',
          bodyHtml: `Olá <strong>${user.nome}</strong> <br> Foi solicitado uma alteração de senha para o seu usuário no aplicativo Tovo,<br>
          caso essa alteração não tenha sido solicitada por você, altere sua senha e entre em contato com o admnistrador<br>
          segue sua nova senha, é aconselhável alterá-la ao fazer login no sistema.<br>
          <strong style="margin-left: 25%" > ${pass}<strong>
          `,
        };
        const ses = new AWS.SESV2(sesConfig);
        const params = {
          Content: { Raw: { Data: await generateRawMailData(message) } },
          Destination: {
            ToAddresses: message.to,
            BccAddresses: message.bcc,
            CcAddresses: message.cc,
          },
          FromEmailAddress: message.fromEmail,
          ReplyToAddresses: message.replyTo,
        };
        return ses.sendEmail(params).promise();
      };
      try {
        const response = await exampleSendEmail();
        console.log(response);
        return res.json({
          data: userUpdated,
          message: `Senha do usuário ${userUpdated.nome} foi alterada!`,
        });
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: 'Erro Interno do Servidor' });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
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
    return res.status(400).json({ error: 'Registro possui dependências. Exclusão não permitida' });
  }
}
export default new UserController();
