import { resolve } from 'path';
import Cotacao from '../../models/cotacao';
import CotacaoFile from '../../models/cotacaoFiles';
import Parcela from '../../models/parcela';
import ParcelaFiles from '../../models/parcelaFile';

class OportFileController {
  async store(req, res, next) {
    if (req.query.table === 'cotacao') {
      const { files, query } = req;
      // eslint-disable-next-line no-restricted-syntax
      for (const file of files) {
        const { originalname: nome, filename: path, size } = file;

        // eslint-disable-next-line no-await-in-loop
        const cotacao = await Cotacao.findOne({
          where: { id: query.id },
        });

        // eslint-disable-next-line no-await-in-loop
        const cotacaoFile = await CotacaoFile.create({
          nome, path, CotacaoId: cotacao.id, size,
        });

        // eslint-disable-next-line no-await-in-loop
        console.log(cotacaoFile);
      }
      next();
      return res.json();
    } if (req.query.table === 'parcela') {
      const { query, files } = req;
      // eslint-disable-next-line no-restricted-syntax
      for (const file of files) {
        const { originalname: nome, filename: path, size } = file;

        const parcela = await Parcela.findOne({
          where: { id: query.id },
        });
        const parcelaFile = await ParcelaFiles.create({
          nome, path, ParcelaId: parcela.id, size,
        });
        console.log(parcelaFile);
      }
      next();
    }
    return res.json();
  }

  async download(req, res) {
    const { params, query } = req;
    if (params.method === 'getPreview') {
      if (query.table === 'parcelas') {
        const { id } = params;

        const files = await ParcelaFiles.findAll({ where: { ParcelaId: parseInt(id, 10) } });

        return res.json(files);
      }
      return res.end();
    } if (params.method === 'download') {
      if (query.table === 'parcelas') {
        const { id } = params;

        const file = await ParcelaFiles.findByPk(id);

        const directoryPath = resolve(__dirname, `../../../../tmp/uploads/oportunidades/${file.path}`);
        res.download(directoryPath, file.nome, (err) => {
          if (err) {
            res.status(500).send({
              message: `Could not download the file. ${err}`,
            });
          }
        });
      }
    }
  }
}
export default new OportFileController();
