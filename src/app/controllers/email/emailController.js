import AWS from 'aws-sdk';
import MailComposer from 'nodemailer/lib/mail-composer';
import { resolve } from 'path';
import budgetEmail from './budgetEmail';
import reviewEmail from './reviewEmail';
import billEmail from './billEmail';
import Cotacao from '../../models/cotacao';
import Oportunidade from '../../models/oportunidade';
import CotacaoFiles from '../../models/cotacaoFiles';
import CliCont from '../../models/cliCont';
import Parcela from '../../models/parcela';
import EmailParametros from '../../models/emailParametros';
import ParcelaFiles from '../../models/parcelaFile';
import EmailHists from '../../models/emailHist';

const sesConfig = {
  apiVersion: '2019-09-27',
  accessKeyId: process.env.AWS_SES_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION,
};
const checkCobranca = (value) => {
  switch (value) {
    case 1:
      return 'Por Hora';
    case 2:
      return 'Por Projeto';
    default:
  }
};
class AwsSesController {
  async store(req, res) {
    const generateRawMailData = (message) => {
      const mailOptions = {
        from: message.fromEmail,
        to: message.to,
        cc: message.cc,
        bcc: message.bcc,
        subject: message.subject,
        text: message.bodyTxt,
        html: message.bodyHtml,
        attachments: message.attachments.map((f) => ({ filename: f.name, path: f.data, encoding: 'base64' })),
      };
      return new MailComposer(mailOptions).compile().build();
    };

    const parametros = await EmailParametros.findOne({
      order: [['createdAt', 'DESC']],
    });

    if (req.query.tipo === 'cotacao' && req.query.situacao === 'orcamento') {
      let { Cc } = req.query;
      const { id } = req.query;
      const from = parametros.fromEmailOrc;
      let Bcc = parametros.bccEmailOrc.split(',');
      Bcc = Bcc.filter((v) => v !== '');
      Cc = Cc.split(',');
      Cc = Cc.filter((v) => v !== '');
      const cotacao = await Cotacao.findOne({
        where: { id },
        include: [{ model: Oportunidade }, { model: CotacaoFiles }],
      });

      const contato = await CliCont.findOne({ where: { id: cotacao.Oportunidade.contato } });

      const dataBudget = {
        codOport: cotacao.Oportunidade.cod,
        vlrLiqOport: (cotacao.vlrLiq / 100).toFixed(2),
        descOport: cotacao.Oportunidade.desc,
        parcelasOport: cotacao.numParcelas,
        tipoCobrancaOport: checkCobranca(cotacao.tipoCobranca),
        cotacaoDesc: cotacao.desc,
      };
      const filesArray = cotacao.CotacaoFiles.map(((arr) => ({
        name: `${arr.nome}`,
        data: resolve(__dirname, `../../../../tmp/uploads/oportunidades/${arr.path}`),
      })));
      let filesAux = '';
      for (const file of filesArray) {
        const slice = file.data.search('cotacao');
        filesAux = `${filesAux + file.data.slice(slice)},`;
      }

      await EmailHists.create({
        copias: Cc === [] ? Cc : '', file: filesAux, tipo: req.query.tipo, idAux: parseInt(id, 10),
      });
      const exampleSendEmail = async () => {
        const message = {
          fromEmail: from,
          to: [contato.email],
          cc: Cc,
          bcc: Bcc,
          subject: `Orçamento | ${cotacao.Oportunidade.cod} - ${cotacao.Oportunidade.desc}`,
          bodyTxt: '',
          bodyHtml: budgetEmail(dataBudget),
          attachments: filesArray,
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
        return ses.sendEmail(params).promise();
      };
      try {
        const response = await exampleSendEmail();
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else if (req.query.tipo === 'cotacao' && req.query.situacao === 'revisao') {
      let { Cc } = req.query;
      const { id } = req.query;
      const from = parametros.fromEmailRev;
      let Bcc = parametros.bccEmailRev.split(',');
      Bcc = Bcc.filter((v) => v !== '');
      Cc = Cc.split(',');
      Cc = Cc.filter((v) => v !== '');
      const cotacao = await Cotacao.findOne({
        where: { id },
        include: [{ model: Oportunidade }, { model: CotacaoFiles }],
      });
      const contato = await CliCont.findOne({ where: { id: cotacao.Oportunidade.contato } });
      const dataReview = {
        codOport: cotacao.Oportunidade.cod,
        descOport: cotacao.Oportunidade.desc,
        parcelasOport: cotacao.numParcelas,
        vlrLiqOport: (parseInt(cotacao.vlrLiq, 10) / 100).toFixed(2),
        cotacaoDesc: cotacao.desc,
      };

      const filesArray = cotacao.CotacaoFiles.map(((arr) => ({
        name: `${arr.nome}`,
        data: resolve(__dirname, `../../../../tmp/uploads/oportunidades/${arr.path}`),
      })));
      let filesAux = '';
      for (const file of filesArray) {
        const slice = file.data.search('cotacao');
        filesAux = `${filesAux + file.data.slice(slice)},`;
      }
      console.log(Cc === [] ? Cc : '');
      await EmailHists.create({
        copias: Cc === [] ? Cc : '', file: filesAux, tipo: req.query.tipo, idAux: parseInt(id, 10),
      });

      const exampleSendEmail = async () => {
        const message = {
          fromEmail: from,
          to: [contato.email],
          cc: Cc,
          bcc: Bcc,
          subject: `Revisão | ${cotacao.Oportunidade.cod} - ${cotacao.Oportunidade.desc}`,
          bodyTxt: '',
          bodyHtml: reviewEmail(dataReview),
          attachments: cotacao.CotacaoFiles.map((arr) => ({
            name: `${arr.nome}`,
            data: resolve(__dirname, `../../../../tmp/uploads/oportunidades/${arr.path}`),
          })),
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
      } catch (err) {
        console.log(err);
      }
    } else if (req.query.tipo === 'parcela' && req.query.situacao === 'fatura') {
      let { Cc } = req.query;
      const CcAux = Cc;
      const { id } = req.query;
      const from = parametros.fromEmailFat;
      let Bcc = parametros.bccEmailFat.split(',');
      Bcc = Bcc.filter((v) => v !== '');
      Cc = Cc.split(',');
      Cc = Cc.filter((v) => v !== '');

      const parcela = await Parcela.findOne({
        where: { id },
        include: [{ model: Oportunidade }, { model: ParcelaFiles }],
      });

      const parcelaDateAux = parcela.dtVencimento.split('-');
      const dateAux = `${parcelaDateAux[2]}/${parcelaDateAux[1]}/${parcelaDateAux[0]}`;

      const contato = await CliCont.findOne({ where: { id: parcela.Oportunidade.contato } });

      const dataBill = {
        codOport: parcela.Oportunidade.cod,
        descOport: parcela.Oportunidade.desc,
        parcelasOport: parcela.parcela,
        vlrParcelaOport: (parcela.vlrParcela / 100).toFixed(2),
        dtVencParcela: dateAux,
        NFeParcela: parcela.notaFiscal,
        pedidoCliOport: parcela.pedidoCliente || 'Não Informado',
      };

      const filesArray = parcela.ParcelaFiles.map(((arr) => ({
        name: `${arr.nome}`,
        data: resolve(__dirname, `../../../../tmp/uploads/oportunidades/${arr.path}`),
      })));
      let filesAux = '';
      for (const file of filesArray) {
        const slice = file.data.search('parcela');
        filesAux = `${filesAux + file.data.slice(slice)},`;
      }

      await EmailHists.create({
        copias: CcAux, file: filesAux, tipo: req.query.tipo, idAux: parseInt(id, 10),
      });

      const exampleSendEmail = async () => {
        const message = {
          fromEmail: from,
          to: [contato.email],
          cc: Cc,
          bcc: Bcc,
          subject: `Faturamento | ${parcela.Oportunidade.cod} - ${parcela.Oportunidade.desc}`,
          bodyTxt: '',
          bodyHtml: billEmail(dataBill),
          attachments: filesArray,
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

        return ses.sendEmail(params).promise();
      };
      try {
        const response = await exampleSendEmail();
        console.log(response);
      } catch (err) {
        console.log(`erro ${err}`);
      }
    }
    return res.json();
  }

  async resendMail(req, res) {
    const generateRawMailData = (message) => {
      const mailOptions = {
        from: message.fromEmail,
        to: message.to,
        cc: message.cc,
        bcc: message.bcc,
        subject: message.subject,
        text: message.bodyTxt,
        html: message.bodyHtml,
        attachments: message.attachments.map((f) => ({ filename: f.name, path: f.data, encoding: 'base64' })),
      };
      return new MailComposer(mailOptions).compile().build();
    };

    const parametros = await EmailParametros.findOne({
      order: [['createdAt', 'DESC']],
    });

    if (req.query.tipo === 'cotacao' && req.query.situacao === 'orcamento') {
      let { Cc } = req.query;
      const { id } = req.query;
      const from = parametros.fromEmailOrc;
      let Bcc = parametros.bccEmailOrc.split(',');
      Bcc = Bcc.filter((v) => v !== '');
      Cc = Cc.split(',');
      Cc = Cc.filter((v) => v !== '');
      const cotacao = await Cotacao.findOne({
        where: { id },
        include: [{ model: Oportunidade }, { model: CotacaoFiles }],
      });
      const contato = await CliCont.findOne({ where: { id: cotacao.Oportunidade.contato } });

      const dataBudget = {
        codOport: cotacao.Oportunidade.cod,
        vlrLiqOport: (cotacao.vlrLiq / 100).toFixed(2),
        descOport: cotacao.Oportunidade.desc,
        parcelasOport: cotacao.numParcelas,
        tipoCobrancaOport: checkCobranca(cotacao.tipoCobranca),
        cotacaoDesc: cotacao.desc,
      };
      const filesArray = cotacao.CotacaoFiles.map(((arr) => ({
        name: `${arr.nome}`,
        data: resolve(__dirname, `../../../../tmp/uploads/oportunidades/${arr.path}`),
      })));

      const exampleSendEmail = async () => {
        const message = {
          fromEmail: from,
          to: [contato.email],
          cc: Cc,
          bcc: Bcc,
          subject: `Orçamento | ${cotacao.Oportunidade.cod} - ${cotacao.Oportunidade.desc}`,
          bodyTxt: '',
          bodyHtml: budgetEmail(dataBudget),
          attachments: filesArray,
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
        return ses.sendEmail(params).promise();
      };
      try {
        const response = await exampleSendEmail();
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else if (req.query.tipo === 'cotacao' && req.query.situacao === 'revisao') {
      let { Cc } = req.query;
      const { id } = req.query;
      const from = parametros.fromEmailRev;
      let Bcc = parametros.bccEmailRev.split(',');
      Bcc = Bcc.filter((v) => v !== '');
      Cc = Cc.split(',');
      Cc = Cc.filter((v) => v !== '');
      const cotacao = await Cotacao.findOne({
        where: { id },
        include: [{ model: Oportunidade }, { model: CotacaoFiles }],
      });
      const contato = await CliCont.findOne({ where: { id: cotacao.Oportunidade.contato } });
      const dataReview = {
        codOport: cotacao.Oportunidade.cod,
        descOport: cotacao.Oportunidade.desc,
        parcelasOport: cotacao.numParcelas,
        vlrLiqOport: (parseInt(cotacao.vlrLiq, 10) / 100).toFixed(2),
        cotacaoDesc: cotacao.desc,
      };

      const filesArray = cotacao.CotacaoFiles.map(((arr) => ({
        name: `${arr.nome}`,
        data: resolve(__dirname, `../../../../tmp/uploads/oportunidades/${arr.path}`),
      })));
      let filesAux = '';
      for (const file of filesArray) {
        const slice = file.data.search('cotacao');
        filesAux = `${filesAux + file.data.slice(slice)},`;
      }

      await EmailHists.create({
        copias: Cc === [] ? Cc : '', file: filesAux, tipo: req.query.tipo, idAux: parseInt(id, 10),
      });

      const exampleSendEmail = async () => {
        const message = {
          fromEmail: from,
          to: [contato.email],
          cc: Cc,
          bcc: Bcc,
          subject: `Revisão | ${cotacao.Oportunidade.cod} - ${cotacao.Oportunidade.desc}`,
          bodyTxt: '',
          bodyHtml: reviewEmail(dataReview),
          attachments: cotacao.CotacaoFiles.map((arr) => ({
            name: `${arr.nome}`,
            data: resolve(__dirname, `../../../../tmp/uploads/oportunidades/${arr.path}`),
          })),
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
      } catch (err) {
        console.log(err);
      }
    } else if (req.query.tipo === 'parcela' && req.query.situacao === 'fatura') {
      const { id } = req.query;
      const from = parametros.fromEmailFat;
      let Bcc = parametros.bccEmailFat.split(',');
      Bcc = Bcc.filter((v) => v !== '');

      const parcela = await Parcela.findOne({
        where: { id },
        include: [{ model: Oportunidade }, { model: ParcelaFiles }],
      });
      const parcelaDateAux = parcela.dtVencimento.split('-');
      const dateAux = `${parcelaDateAux[2]}/${parcelaDateAux[1]}/${parcelaDateAux[0]}`;
      const contato = await CliCont.findOne({ where: { id: parcela.Oportunidade.contato } });

      const firstEmailData = await EmailHists.findOne(
        { where: { tipo: req.query.tipo, idAux: id } },
      );
      let Cc = firstEmailData.copias;
      Cc = Cc.split(',');
      Cc = Cc.filter((v) => v !== '');

      const filesArray = parcela.ParcelaFiles.map(((arr) => ({
        name: `${arr.nome}`,
        data: resolve(__dirname, `../../../../tmp/uploads/oportunidades/${arr.path}`),
      })));

      const dataBill = {
        codOport: parcela.Oportunidade.cod,
        descOport: parcela.Oportunidade.desc,
        parcelasOport: parcela.parcela,
        vlrParcelaOport: (parcela.vlrParcela / 100).toFixed(2),
        dtVencParcela: dateAux,
        NFeParcela: parcela.notaFiscal,
        pedidoCliOport: parcela.pedidoCliente || 'Não Informado',
      };
      const exampleSendEmail = async () => {
        const message = {
          fromEmail: from,
          to: [contato.email],
          cc: Cc,
          bcc: Bcc,
          subject: `Faturamento | ${parcela.Oportunidade.cod} - ${parcela.Oportunidade.desc}`,
          bodyTxt: '',
          bodyHtml: billEmail(dataBill),
          attachments: filesArray,
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

        return ses.sendEmail(params).promise();
      };
      try {
        const response = await exampleSendEmail();
        console.log(response);
      } catch (err) {
        console.log(`erro ${err}`);
      }
    }
    return res.json();
  }
} export default new AwsSesController();
