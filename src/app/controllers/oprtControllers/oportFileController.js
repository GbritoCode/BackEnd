import { resolve } from 'path';
import Cotacao from '../../models/cotacao';
import CotacaoFile from '../../models/cotacaoFiles';
import Parcela from '../../models/parcela';

class OportFileController {
  async store(req, res, next) {
    if (req.query.table === 'cotacao') {
      const { originalname: nome, filename: path } = req.file;
      let { oportId } = req.query;
      const cotacaoFile = await CotacaoFile.create({ nome, path });
      oportId = parseInt(oportId, 10);

      const cotacao = await Cotacao.findOne({
        where: { OportunidadeId: oportId },
        limit: 1,
        order: [['createdAt', 'DESC']],
      });

      await cotacao.update({ CotacaoFileId: cotacaoFile.id });

      next();
      return res.json();
    } if (req.query.table === 'parcela') {
      const { originalname: nome, filename: path } = req.file;
      let { oportId } = req.query;
      const cotacaoFile = await CotacaoFile.create({ nome, path });
      oportId = parseInt(oportId, 10);

      const parcela = await Parcela.findOne({
        where: { OportunidadeId: oportId },
        limit: 1,
        order: [['createdAt', 'DESC']],
      });

      await parcela.update({ CotacaoFileId: cotacaoFile.id });

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
