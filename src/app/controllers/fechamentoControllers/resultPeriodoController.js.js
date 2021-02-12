import ResultPeriodo from '../../models/resultPeriodo';

class ResultPeriodoController {
  async store(req, res) {
    return res.status(404).json({ Error: 'Not Found' });
  }

  async get(req, res) {
    const result = await ResultPeriodo.findAll({ where: { ColabId: req.params.id }, order: ['createdAt'] });
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
