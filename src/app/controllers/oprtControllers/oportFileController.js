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
        const { originalname: nome, filename: path } = file;

        // eslint-disable-next-line no-await-in-loop
        const cotacao = await Cotacao.findOne({
          where: { id: query.id },
        });

        // eslint-disable-next-line no-await-in-loop
        const cotacaoFile = await CotacaoFile.create({ nome, path, CotacaoId: cotacao.id });

        // eslint-disable-next-line no-await-in-loop
        console.log(cotacaoFile);
      }
      next();
      return res.json();
    } if (req.query.table === 'parcela') {
      const { query, files } = req;
      // eslint-disable-next-line no-restricted-syntax
      for (const file of files) {
        const { originalname: nome, filename: path } = file;

        const parcela = await Parcela.findOne({
          where: { id: query.id },
        });
        const parcelaFile = await ParcelaFiles.create({ nome, path, ParcelaId: parcela.id });
        console.log(parcelaFile);
      }
      next();
    }
    return res.json();
  }

  async download(req, res) {
    const { id } = req.params;

    const file = await CotacaoFile.findByPk(id);

    const directoryPath = resolve(__dirname, `../../../../tmp/uploads/oportunidades/${file.path}`);
    res.download(directoryPath, file.path, (err) => {
      if (err) {
        res.status(500).send({
          message: `Could not download the file. ${err}`,
        });
      }
    });
  }
}
export default new OportFileController();
