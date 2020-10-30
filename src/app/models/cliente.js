import { Model } from 'sequelize';
import Cliente_comp from './cliente_comp.js';
import Cli_cont from './cli_cont.js';
import Cli_rec_desp from './cli_rec_desp.js';
const { DataTypes } = require('sequelize');

class Cliente extends Model {
  static init(sequelize) {
    super.init(
      {
        CNPJ: DataTypes.STRING,
        nomeAbv: DataTypes.STRING,
        RepresentanteId: DataTypes.STRING,
        TipoComisseId: DataTypes.INTEGER,
        EmpresaId: DataTypes.INTEGER,
        prospect: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    Cliente.hasOne(Cliente_comp, { onDelete: 'cascade', hooks: true });
    Cliente_comp.belongsTo(Cliente);

    Cliente.hasOne(Cli_cont, { onDelete: 'cascade', hooks: true });
    Cli_cont.belongsTo(Cliente);

    Cliente.hasOne(Cli_rec_desp, { onDelete: 'cascade', hooks: true });
    Cli_rec_desp.belongsTo(Cliente);

    return this;
  }
}
export default Cliente;
