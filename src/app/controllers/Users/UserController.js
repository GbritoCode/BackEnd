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
      return res.status(401).json({ error: 'A senha atual está incorreta' });
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
          to: [email],
          cc: [],
          bcc: [],
          subject: 'Alteração de senha',
          bodyTxt: '',
          bodyHtml:
         `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Recuperção De Senha</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin: 0; padding: 0;" class="vsc-initialized">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding: 10px 0 20px 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="860" style="border: 1px solid #cccccc; border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td align="center" style="color: #0071bc; font-size: 40px; font-weight: bold; font-family: Arial, sans-serif; background-color: #0071bc; height: 60px;">
                                Equipe Tovo
                                <table border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td align="center" style="color: #888888; font-family: Arial, sans-serif; font-size: 14px; background-color: #ffffff; width: 800px; height: 30px;">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 1px 30px; background-color: #ffffff;">
                                <table border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td align="left" valign="top" style="color: #0071bc; font-family: Arial, sans-serif; background-color: #ffffff; width: 900px; height: 40px; padding: 5px 0px 5px 20px;">
                                            <span style="font-size: 24px;">
                                                <strong><span style="font-size: 35px; color: #333333;">Recuperação</span> <br/>de Senha </strong></span>
                                            </td>
                                            <td>
                                            <img src="https://app.tovoit.com.br/favicon.ico" alt="Tovo" width="100" height="100" style="display: block; padding: 10px 10px 10px 10px; float: right;" />&nbsp; &nbsp;
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td style="color: #595959; font-family: Segoe UI Light; background-color: #ffffff; width: 960px; height: 30px; text-align: center;"> Olá <strong>${user.nome}</strong> <br> Foi solicitado uma alteração de senha para o seu usuário no aplicativo Tovo.<br />
          Caso essa solicitação não tenha sido feita por você, entre em contato com o administrador do sistema.<br />
          Segue abaixo sua nova senha. Informe-a como senha atual e no primeiro login efetue a alteração.<br />
                                            <span style="font-size: 10px;">Equipe Suporte Tovo.</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tbody>
                                        <tr>
                                            <td>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td valign="top" style="width: 260px;">
                                                        <table width="100%" style="solid #cccccc; cellpadding=;" cellspacing="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center" style="color: #ffffff; padding: 2px 0px; font-family: Segoe UI Light; font-size: 16px; line-height: 20px; background-color: #0071bc;">
                                                                    <p><strong>${pass}</strong></p>
                                                          </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 20px; background-color: #fff;">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td style="color: #000; font-family: Arial, sans-serif; font-size: 10px; width: 75%;">
                                                        &copy; Copyright Tovoit 2021. Todos os direitos reservados<br />
                                                        </td>
                                                        <td align="right" style="width: 25%;">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 5px;">
                                    <tbody>
                                        <tr>
                                            <td style="color: #888888; font-family: Segoe UI Light; text-align: center;"><span style="background-color: #ffffff; font-family: Segoe UI Light; font-size: 13px; color: #153643;">N&atilde;o se deixem vencer pelo mal, mas ven&ccedil;am o mal com o bem.</span></td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="color: #888888; font-family: Segoe UI Light; font-size: 10px;"><span style="color: #262626;">
                                            Romanos 12:21</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
</html>`,

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
