import MailComposer from 'nodemailer/lib/mail-composer';
import AWS from 'aws-sdk';
import Campanhas from '../../models/campanhas';
import CliCont from '../../models/cliCont';
import Cliente from '../../models/cliente';
import Colab from '../../models/colab';
import ParametrosEmail from '../../models/emailParametros';
import FollowUps from '../../models/FollowUps';
import SequelizeDelete from '../_ErrorControllers/sequelizeNeedsDelete';

const sesConfig = {
  apiVersion: '2019-09-27',
  accessKeyId: process.env.AWS_SES_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION,
};

class CampanhaController {
  async store(req, res) {
    try {
      const followUps = await FollowUps.create(req.body);
      const followUpEmail = await FollowUps.findByPk(followUps.getDataValue('id'), {
        include: [{ model: Cliente }, { model: Campanhas }, { model: Colab }],
      });

      if (req.body.proxPasso === '10') {
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

        const from = parametros.fromEmailCRM;
        let Bcc = parametros.bccEmailCRM.split(',');
        Bcc = Bcc.filter((v) => v !== '');

        const exampleSendEmail = async () => {
          const message = {
            fromEmail: from,
            to: [from],
            cc: [],
            bcc: Bcc,
            subject: 'Prospecção em campanha finalizada',
            bodyTxt: '',
            bodyHtml: `<h4> Encerramento de Cliente na campanha </h4>
            <p> cliente: ${followUpEmail.Cliente.nomeAbv}   </p>
            <p> campanha: ${followUpEmail.Campanha.cod}   </p>
            <p> responsável: ${followUpEmail.Colab.nome}   </p>
            <p> motivo: ${followUpEmail.detalhes}   </p>
            <p> data: ${followUpEmail.dataContato}   </p>
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
          console.log(params.Destination);
          try {
            const response = await ses.sendEmail(params).promise();
            console.log(response);
            return res.status(200).json({ message: 'Email Enviado' });
          } catch (err) {
            throw new SequelizeDelete(err, followUps);
          }
        };
        try {
          const response = await exampleSendEmail();
          console.log(response);
          return res.status(200).json({ message: 'Email Enviado' });
        } catch (err) {
          console.log(err.message);
          console.log(err);
          err.sequelizeObject.destroy();
          return res.status(500).json({ error: 'Erro Interno do Servidor' });
        }
      }
      return res.json(followUps);
    } catch (err) {
      return res.status(500).json({ error: 'Erro Interno do Servidor, Email não enviado' });
    }
  }

  async get(req, res) {
    try {
      const { update, id } = req.params;
      const { ClienteId, CampanhaId } = req.query;
      if (update === 'true') {
        const followUps = await FollowUps.findOne({
          where: { id },
        });
        return res.json(followUps);
      }
      if (id && update !== 'true') {
        const followUps = await FollowUps.findAll(
          {
            where: { ClienteId, CampanhaId },
            include: [{ model: Cliente }, { model: CliCont }],
          },
        );

        for (let i = 0; i < followUps.length; i++) {
          const newDateContact = followUps[i].dataContato.split('-');
          followUps[i].dataValues.dataContato = `${newDateContact[2]}/${newDateContact[1]}/${newDateContact[0]}`;
          const newDateProxContact = followUps[i].dataProxContato.split('-');
          followUps[i].dataValues.dataProxContato = `${newDateProxContact[2]}/${newDateProxContact[1]}/${newDateProxContact[0]}`;
        }

        return res.json(followUps);
      }
      return res.end();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro interno de Servidor' });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    const followUps = await FollowUps.findByPk(id);
    const followUpsUpdated = await followUps.update(req.body);

    return res.json(followUpsUpdated);
  }

  async delete(req, res) {
    const { id } = req.params;
    const followUps = await FollowUps.findOne({
      where: { id },
    });
    followUps.destroy();
    return res.status(200).json(`Registro ${followUps.cod} foi deletado com Sucesso!`);
  }
}
export default new CampanhaController();
