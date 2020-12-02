import { Model } from 'sequelize';
import ClienteComp from './clienteComp';
import cliCont from './cliCont';
import CliRecDesp from './cliRecDesp';
import Oportunidade from './oportunidade';

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
      },
    );

    Cliente.hasOne(ClienteComp, { onDelete: 'cascade', hooks: true });
    ClienteComp.belongsTo(Cliente);

    Cliente.hasOne(cliCont, { onDelete: 'cascade', hooks: true });
    cliCont.belongsTo(Cliente);

    Cliente.hasOne(CliRecDesp, { onDelete: 'cascade', hooks: true });
    CliRecDesp.belongsTo(Cliente);

    Cliente.hasOne(Oportunidade, { onDelete: 'cascade', hooks: true });
    Oportunidade.belongsTo(Cliente);

    return this;
  }
}
export default Cliente;
