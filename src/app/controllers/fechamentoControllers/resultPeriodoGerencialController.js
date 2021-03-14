import moment from 'moment';
import ResultPeriodoGerencial from '../../models/resultPeriodoGerencial';

class ResultPeriodoController {
  async store(req, res) {
    return res.status(404).json({ Error: 'Not Found' });
  }

  async get(req, res) {
    const ano = moment().year().toString();
    const result = await ResultPeriodoGerencial.findAll({ where: { ano }, order: ['id'] });
    return res.json(result);
  }

  async update(req, res) {
    return res.status(404).json({ Error: 'Not Found' });
  }

  async delete(req, res) {
    return res.status(404).json({ Error: 'Not Found' });
  }
}
export default new ResultPeriodoController();
