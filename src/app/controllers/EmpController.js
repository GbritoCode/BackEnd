const Sequelize = require('sequelize');
import databaseConfig from '../../config/database';

const sequelize = new Sequelize(databaseConfig);
class EmpController {
  store(req, res) {
    sequelize
      .query('db_create :emp', {
        replacements: { emp: req.body.emp },
        type: sequelize.QueryTypes.SELECT,
      })
      .then(result => {
        res.json(result);
      });
  }
}

export default new EmpController();
