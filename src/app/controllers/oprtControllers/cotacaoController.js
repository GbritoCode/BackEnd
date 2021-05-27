import * as yup from 'yup';
import { extname, resolve } from 'path';
import { rename, unlink } from 'fs';
import AWS from 'aws-sdk';
import MailComposer from 'nodemailer/lib/mail-composer';
import Cotacao from '../../models/cotacao';
import CotacaoFiles from '../../models/cotacaoFiles';
import Oportunidade from '../../models/oportunidade';
import CliCont from '../../models/cliCont';
import EmailHists from '../../models/emailHist';

import budgetEmail from '../email/budgetEmail';
import reviewEmail from '../email/reviewEmail';
import ParametrosEmail from '../../models/emailParametros';

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
class CotacaoController {
  async store(req, res, next) {
    try {
      const schema = yup.object().shape({
        EmpresaId: yup.number().required(),
        OportunidadeId: yup.number().required(),
        probVend: yup.number().required(),
        tipoCobranca: yup.number().required(),
        hrsPrevst: yup.number().required(),
        vlrProp: yup.number().required(),
        vlrDesc: yup.number().required(),
        vlrLiq: yup.number().required(),
        recLiq: yup.number().required(),
        prevLucro: yup.number().required(),
        numParcelas: yup.number().required(),
        motivo: yup.string().required(),
        desc: yup.string(),
      });
      const { files, query, body } = req;
      if (!(await schema.isValid(JSON.parse(req.body.body)))) {
        return res.status(400).json({ error: 'Validation Fails' });
      }

      const cotacao = await Cotacao.create(JSON.parse(body.body));
      await Oportunidade.update({ fase: 3 }, { where: { id: cotacao.OportunidadeId } });
      // eslint-disable-next-line no-restricted-syntax
      for (const file of files) {
        const date = new Date().toLocaleString('pt-br').replace(/\//g, '-').slice(0, 10);
        const path = `${query.tipo}Id=${
          cotacao.id}_oportId=${cotacao.OportunidadeId}_${date}_${
          Math.round(Math.random() * 1E9)}${extname(file.originalname)}`;
        // eslint-disable-next-line no-await-in-loop
        await rename(file.path, `${file.destination}/${path}`,
          (err) => {
            if (err) throw err;
            console.log('Rename complete!');
          });
        const { originalname: nome, size } = file;
        // eslint-disable-next-line no-await-in-loop
        await CotacaoFiles.create({
          nome, path, CotacaoId: cotacao.id, size,
        });

        // eslint-disable-next-line no-await-in-loop
      }

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

      const parametros = await ParametrosEmail.findOne({
        order: [['createdAt', 'DESC']],
      });

      const cotacaoEmail = await Cotacao.findOne({
        where: { id: cotacao.id },
        include: [{ model: Oportunidade }, { model: CotacaoFiles }],
      });

      if (req.query.tipo === 'cotacao' && req.query.situacao === 'orcamento') {
        let { Cc } = req.query;
        const from = parametros.fromEmailOrc;
        let Bcc = parametros.bccEmailOrc.split(',');
        Bcc = Bcc.filter((v) => v !== '');
        Cc = Cc.split(',');
        Cc = Cc.filter((v) => v !== '');

        const contato = await CliCont.findOne({ where: { id: cotacaoEmail.Oportunidade.contato } });

        const dataBudget = {
          codOport: cotacaoEmail.Oportunidade.cod,
          vlrLiqOport: (cotacaoEmail.vlrLiq / 100).toFixed(2),
          descOport: cotacaoEmail.Oportunidade.desc,
          parcelasOport: cotacaoEmail.numParcelas,
          tipoCobrancaOport: checkCobranca(cotacaoEmail.tipoCobranca),
          cotacaoDesc: cotacaoEmail.desc,
        };
        const filesArray = cotacaoEmail.CotacaoFiles.map(((arr) => ({
          name: `${arr.nome}`,
          data: resolve(__dirname, `../../../../tmp/uploads/oportunidades/${arr.path}`),
        })));
        let filesAux = '';
        // eslint-disable-next-line no-restricted-syntax
        for (const file of filesArray) {
          const slice = file.data.search('cotacaoEmail');
          filesAux = `${filesAux + file.data.slice(slice)},`;
        }

        await EmailHists.create({
          copias: Cc === [] ? Cc : '', file: filesAux, tipo: req.query.tipo, idAux: cotacao.id,
        });
        const exampleSendEmail = async () => {
          const message = {
            fromEmail: from,
            to: [contato.email],
            cc: Cc,
            bcc: Bcc,
            subject: `Orçamento | ${cotacaoEmail.Oportunidade.cod} - ${cotacaoEmail.Oportunidade.desc}`,
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
        const from = parametros.fromEmailRev;
        let Bcc = parametros.bccEmailRev.split(',');
        Bcc = Bcc.filter((v) => v !== '');
        Cc = Cc.split(',');
        Cc = Cc.filter((v) => v !== '');

        const contato = await CliCont.findOne({ where: { id: cotacaoEmail.Oportunidade.contato } });
        const dataReview = {
          codOport: cotacaoEmail.Oportunidade.cod,
          descOport: cotacaoEmail.Oportunidade.desc,
          parcelasOport: cotacaoEmail.numParcelas,
          vlrLiqOport: (parseInt(cotacaoEmail.vlrLiq, 10) / 100).toFixed(2),
          cotacaoDesc: cotacaoEmail.desc,
        };

        const filesArray = cotacaoEmail.CotacaoFiles.map(((arr) => ({
          name: `${arr.nome}`,
          data: resolve(__dirname, `../../../../tmp/uploads/oportunidades/${arr.path}`),
        })));
        let filesAux = '';
        // eslint-disable-next-line no-restricted-syntax
        for (const file of filesArray) {
          const slice = file.data.search('cotacaoEmail');
          filesAux = `${filesAux + file.data.slice(slice)},`;
        }
        console.log(Cc === [] ? Cc : '');
        await EmailHists.create({
          copias: Cc === [] ? Cc : '', file: filesAux, tipo: req.query.tipo, idAux: cotacao.id,
        });

        const exampleSendEmail = async () => {
          const message = {
            fromEmail: from,
            to: [contato.email],
            cc: Cc,
            bcc: Bcc,
            subject: `Revisão | ${cotacaoEmail.Oportunidade.cod} - ${cotacaoEmail.Oportunidade.desc}`,
            bodyTxt: '',
            bodyHtml: reviewEmail(dataReview),
            attachments: cotacaoEmail.CotacaoFiles.map((arr) => ({
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
      }
      return res.json('tudo ok');
      // next();
    } catch (err) {
      console.log(err);
      const { files } = req;
      // eslint-disable-next-line no-restricted-syntax
      for (const file of files) {
        // eslint-disable-next-line no-await-in-loop
        unlink(file.path, (error) => {
          if (error) throw err;
          console.log('file deleted');
        });
        // eslint-disable-next-line no-await-in-loop
      }
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async get(req, res) {
    if (req.params.id && req.params.update) {
      const cot = await Cotacao.findOne({
        where: { id: req.params.update },
        include: [{ model: Oportunidade }, { model: CotacaoFiles }],
      });
      return res.json(cot);
    } if (req.query.one === 'true') {
      const cot = await Cotacao.findAll({
        where: { OportunidadeId: req.params.id },
        limit: 1,
        order: [['createdAt', 'DESC']],
      });
      return res.json(cot);
    } if (req.query.last === 'true') {
      const cot = await Cotacao.findOne({
        limit: 1,
        order: [['createdAt', 'DESC']],
      });
      return res.json(cot);
    } if (req.params.id) {
      const cot = await Cotacao.findAll({
        where: {
          OportunidadeId: req.params.id,
        },
        include: [{ model: Oportunidade }],
      });
      return res.json(cot);
    }
    return res.json();
  }

  async update(req, res) {
    const cot = await Cotacao.findByPk(req.params.id);

    const {
      EmpresaId,
      OportunidadeId,
      probVend,
      tipoCobranca,
      hrsPrevst,
      vlrProp,
      vlrDesc,
      vlrLiq,
      recLiq,
      prevLucro,
      numParcelas,
      motivo,
      desc,
    } = await cot.update(req.body);

    return res.json({
      EmpresaId,
      OportunidadeId,
      probVend,
      tipoCobranca,
      hrsPrevst,
      vlrProp,
      vlrDesc,
      vlrLiq,
      recLiq,
      prevLucro,
      numParcelas,
      motivo,
      desc,
    });
  }
}
export default new CotacaoController();
