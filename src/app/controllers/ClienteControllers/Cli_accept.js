import databaseConfig from '../../config/database';

class Cli_accept {
  store(req, res) {
    sequelize
      .query('insert into clientes select top 1* from cliente_prospects', {
        type: sequelize.QueryTypes.INSERT,
      })
      .then(function(clientes) {
        res.json(clientes);
      });
  }
}
export default new Cli_accept();
