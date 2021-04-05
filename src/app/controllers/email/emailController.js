import AWS from 'aws-sdk';
import MailComposer from 'nodemailer/lib/mail-composer';
import { resolve } from 'path';
import budgetEmail from './budgetEmail';
import billEmail from './billEmail';
import reviewEmail from './reviewEmail';
import Cotacao from '../../models/cotacao';
import Oportunidade from '../../models/oportunidade';
import CotacaoFiles from '../../models/cotacaoFiles';
import CliCont from '../../models/cliCont';
import Parcela from '../../models/parcela';

class AwsSesController {
  async store(req, res) {
    const sesConfig = {
      apiVersion: '2019-09-27',
      accessKeyId: process.env.AWS_SES_KEY_ID,
      secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
      region: process.env.AWS_SES_REGION,
    };

    //   const emailCli = 'gabrielcabeca26@gmail.com';
    //   const cod = '153878';

    //   const params = {
    //     Source: 'contato@tovoit.com.br',
    //     Destination: {
    //       ToAddresses: [emailCli],
    //     },
    //     Message: {
    //       Body: {
    //         Html: {
    //           Charset: 'UTF-8',
    //           Data: `
    //           <h1>teste</h1>
    //           <p> o email enviou para ${emailCli} </p>
    //           `,
    //         },
    //       },
    //       Subject: {
    //         Charset: 'UTF-8',
    //         Data: `cotação ${cod}`,
    //       },
    //     },
    //   };
    //   const response = await new AWS
    //     .SES(sesConfig)
    //     .sendEmail(params)
    //     .promise()
    //     .then((result) => result);
    //   return res.json(response);

    const generateRawMailData = (message) => {
      const mailOptions = {
        from: message.fromEmail,
        to: message.to,
        subject: message.subject,
        text: message.bodyTxt,
        html: message.bodyHtml,
        attachments: message.attachments.map((f) => ({ filename: f.name, path: f.data, encoding: 'base64' })),
      };
      return new MailComposer(mailOptions).compile().build();
    };

    if (req.query.tipo === 'cotacao' && req.query.situacao === 'orcamento') {
      let { cotacaoId } = req.query;
      cotacaoId = parseInt(cotacaoId, 10);
      const cotacao = await Cotacao.findOne({
        where: { id: cotacaoId }, include: [{ model: Oportunidade }, { model: CotacaoFiles }],
      });
      const contato = await CliCont.findOne({ where: { id: cotacao.Oportunidade.contato } });

      const dataBudget = {
        codOport: cotacao.Oportunidade.cod,
        vlrLiqOport: (cotacao.vlrLiq / 100).toFixed(2),
        descOport: cotacao.Oportunidade.desc,
        parcelasOport: cotacao.numParcelas,
        tipoCobrancaOport: cotacao.tipoCobranca,
        cotacaoDesc: cotacao.desc,
      };

      const exampleSendEmail = async () => {
        const message = {
          fromEmail: 'contato@tovoit.com.br',
          to: [contato.email, 'jsilva@aidera.com.br', 'cbrito@aidera.com.br'],
          subject: 'Message title',
          bodyTxt: 'Plaintext version of the message',
          bodyHtml: budgetEmail(dataBudget),
          attachments: [{
            name: `${cotacao.CotacaoFile.path}`,
            data: resolve(__dirname, `../../../../tmp/uploads/oportunidades/${cotacao.CotacaoFile.path}`),
          }],
        };

        const ses = new AWS.SESV2(sesConfig);
        const params = {
          Content: { Raw: { Data: await generateRawMailData(message) } },
          Destination: {
            ToAddresses: message.to,
            BccAddresses: message.bcc,
          },
          FromEmailAddress: message.fromEmail,
          ReplyToAddresses: message.replyTo,
        };

        return ses.sendEmail(params).promise();
      };
      try {
        const response = await exampleSendEmail();
        return res.json(response);
      } catch (err) {
        return res.json(err);
      }
    } else if (req.query.tipo === 'cotacao' && req.query.situacao === 'revisao') {
      let { cotacaoId } = req.query;
      cotacaoId = parseInt(cotacaoId, 10);
      const cotacao = await Cotacao.findOne({
        where: { id: cotacaoId }, include: [{ model: Oportunidade }, { model: CotacaoFiles }],
      });
      const contato = await CliCont.findOne({ where: { id: cotacao.Oportunidade.contato } });
      console.log(contato);
      const dataReview = {
        codOport: cotacao.Oportunidade.cod,
        descOport: cotacao.Oportunidade.desc,
        parcelasOport: cotacao.numParcelas,
        vlrLiqOport: (parseInt(cotacao.vlrLiq, 10) / 100).toFixed(2),
        cotacaoDesc: cotacao.desc,
      };

      const exampleSendEmail = async () => {
        const message = {
          fromEmail: 'contato@tovoit.com.br',
          to: [contato.email, 'jsilva@aidera.com.br', 'cbrito@aidera.com.br'],
          subject: 'Message title',
          bodyTxt: 'Plaintext version of the message',
          bodyHtml: reviewEmail(dataReview),
          attachments: [{
            name: `${cotacao.CotacaoFile.path}`,
            data: resolve(__dirname, `../../../../tmp/uploads/oportunidades/${cotacao.CotacaoFile.path}`),
          }],
        };

        const ses = new AWS.SESV2(sesConfig);
        const params = {
          Content: { Raw: { Data: await generateRawMailData(message) } },
          Destination: {
            ToAddresses: message.to,
            BccAddresses: message.bcc,
          },
          FromEmailAddress: message.fromEmail,
          ReplyToAddresses: message.replyTo,
        };

        return ses.sendEmail(params).promise();
      };
      try {
        const response = await exampleSendEmail();
        return res.json(response);
      } catch (err) {
        return res.json(err);
      }
    } else if (req.query.tipo === 'parcela' && req.query.situacao === 'fatura') {
      let { parcelaId } = req.query;
      parcelaId = parseInt(parcelaId, 10);
      const parcela = await Parcela.findOne({
        where: { id: parcelaId },
        include:
         [
           { model: Oportunidade }, { model: CotacaoFiles },
         ],
      });
      const contato = await CliCont.findOne({ where: { id: parcela.Oportunidade.contato } });

      const dataBill = {
        codOport: parcela.Oportunidade.cod,
        descOport: parcela.Oportunidade.desc,
        parcelasOport: parcela.parcela,
        vlrParcelaOport: (parcela.vlrParcela / 100).toFixed(2),
        dtVencParcela: parcela.dtVencimento,
        NFeParcela: parcela.notaFiscal,
        pedidoCliOport: parcela.pedidoCliente,
      };

      const exampleSendEmail = async () => {
        const message = {
          fromEmail: 'contato@tovoit.com.br',
          to: [contato.email, 'jsilva@aidera.com.br', 'cbrito@aidera.com.br'],
          subject: 'Message title',
          bodyTxt: 'Plaintext version of the message',
          bodyHtml: billEmail(dataBill),
          attachments: [{
            name: `${parcela.CotacaoFile.path}`,
            data: resolve(__dirname, `../../../../tmp/uploads/oportunidades/${parcela.CotacaoFile.path}`),
          }],
        };

        const ses = new AWS.SESV2(sesConfig);
        const params = {
          Content: { Raw: { Data: await generateRawMailData(message) } },
          Destination: {
            ToAddresses: message.to,
            BccAddresses: message.bcc,
          },
          FromEmailAddress: message.fromEmail,
          ReplyToAddresses: message.replyTo,
        };

        return ses.sendEmail(params).promise();
      };
      try {
        const response = await exampleSendEmail();
        return res.json(response);
      } catch (err) {
        return res.json(err);
      }
    }
  }
} export default new AwsSesController();