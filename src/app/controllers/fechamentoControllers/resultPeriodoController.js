import ResultPeriodo from '../../models/resultPeriodo';

class ResultPeriodoController {
  async store(req, res) {
    return res.status(404).json({ Error: 'Not Found' });
  }

  async get(req, res) {
    const thisYear = new Date().getFullYear();
    const result = await ResultPeriodo.findAll(
      {
        where: {
          ColabId: req.params.id,
          ano: `${thisYear}`,
        },
        order: ['id'],
      },
    );
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
