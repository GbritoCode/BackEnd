import moment from 'moment';
import ResultPeriodoGerencial from '../../models/resultPeriodoGerencial';

class ResultPeriodoController {
  async store(req, res) {
    return res.status(404).json({ Error: 'Not Found' });
  }

  async get(req, res) {
    const ano = moment().year().toString();
    const result = await ResultPeriodoGerencial.findAll({ where: { ano }, order: ['id'] });
    if (result.length === 0) {
      return res.json(new Array(12).fill({ totalHrs: 0, totalDesp: 0, totalReceb: 0 }));
    } if (result.length > 0) {
      return res.json(result);
    }
  }

  async update(req, res) {
    return res.status(404).json({ Error: 'Not Found' });
  }

  async delete(req, res) {
    return res.status(404).json({ Error: 'Not Found' });
  }
}
export default new ResultPeriodoController();
