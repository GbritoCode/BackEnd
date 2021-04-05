import Cotacao from '../../models/cotacao';
import CotacaoFile from '../../models/cotacaoFiles';
import Parcela from '../../models/parcela';

class OportFileController {
  async store(req, res, next) {
    if (req.query.table === 'cotacao') {
      const { originalname: nome, filename: path } = req.file;
      let { cotacaoId } = req.query;
      const cotacaoFile = await CotacaoFile.create({ nome, path });

      cotacaoId = parseInt(cotacaoId, 10);

      await Cotacao.update({ CotacaoFileId: cotacaoFile.id }, { where: { id: cotacaoId } });

      next();
      return res.json();
    } if (req.query.table === 'parcela') {
      const { originalname: nome, filename: path } = req.file;
      let { parcelaId } = req.query;
      const cotacaoFile = await CotacaoFile.create({ nome, path });

      parcelaId = parseInt(parcelaId, 10);

      await Parcela.update({ CotacaoFileId: cotacaoFile.id }, { where: { id: parcelaId } });

      next();
    }
    return res.json();
  }
}
export default new OportFileController();
