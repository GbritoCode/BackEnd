import { Model } from 'sequelize';

import recDesp from './recDesp';
import Clientes from './cliente';
import Area from './area';
import UndNeg from './undNeg';
import Produto from './produto';
import Segmento from './segmento';
import itmControle from './itmControle';
import Colab from './colab';
import Representante from './representante';
import Fornec from './fornec';
import Parametros from './parametros';
import perfil from './perfil';
import condPgmto from './condPgmto';
import tipoComiss from './tipoComiss';
import oportunidade from './oportunidade';

const { DataTypes } = require('sequelize');

class Empresa extends Model {
  static init(sequelize) {
    super.init(
      {
        idFederal: DataTypes.STRING,
        nome: DataTypes.STRING,
        license: DataTypes.STRING,
        UserId: DataTypes.INTEGER,
      },
      {
        sequelize,
      },
    );
    Empresa.hasOne(Clientes, { onDelete: 'cascade', hooks: true });
    Clientes.belongsTo(Empresa);

    Empresa.hasOne(Area, { onDelete: 'cascade', hooks: true });
    Area.belongsTo(Empresa);

    Empresa.hasOne(Segmento, { onDelete: 'cascade', hooks: true });
    Segmento.belongsTo(Empresa);

    Empresa.hasOne(itmControle, { onDelete: 'cascade', hooks: true });
    itmControle.belongsTo(Empresa);

    Empresa.hasOne(Colab, { onDelete: 'cascade', hooks: true });
    Colab.belongsTo(Empresa);

    Empresa.hasOne(Representante, { onDelete: 'cascade', hooks: true });
    Representante.belongsTo(Empresa);

    Empresa.hasOne(Fornec, { onDelete: 'cascade', hooks: true });
    Fornec.belongsTo(Empresa);

    Empresa.hasOne(Parametros, { onDelete: 'cascade', hooks: true });
    Parametros.belongsTo(Empresa);

    Empresa.hasOne(recDesp, { onDelete: 'cascade', hooks: true });
    recDesp.belongsTo(Empresa);

    Empresa.hasOne(perfil, { onDelete: 'cascade', hooks: true });
    perfil.belongsTo(Empresa);

    Empresa.hasOne(condPgmto, { onDelete: 'cascade', hooks: true });
    condPgmto.belongsTo(Empresa);

    Empresa.hasOne(tipoComiss, { onDelete: 'cascade', hooks: true });
    tipoComiss.belongsTo(Empresa);

    Empresa.hasOne(Produto, { onDelete: 'cascade', hooks: true });
    Produto.belongsTo(Empresa);

    Empresa.hasOne(UndNeg, { onDelete: 'cascade', hooks: true });
    UndNeg.belongsTo(Empresa);

    Empresa.hasOne(oportunidade, { onDelete: 'cascade', hooks: true });
    oportunidade.belongsTo(Empresa);

    return this;
  }
}
export default Empresa;
