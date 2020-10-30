import { Model } from 'sequelize';
const { DataTypes } = require('sequelize');

import Clientes from './cliente.js';
import Area from './area.js';
import UndNeg from './UndNeg.js';
import Produto from './produto.js';
import Segmento from './segmento.js';
import Itm_Controle from './itm_controle.js';
import Colab from './colab.js';
import Representante from './representante.js';
import Fornec from './fornec.js';
import Parametros from './parametros.js';
import Rec_Desp from './rec_desp';
import perfil from './perfil';
import condPgmto from './condPgmto';
import tipoComiss from './tipoComiss';

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
      }
    );
    Empresa.hasOne(Clientes, { onDelete: 'cascade', hooks: true });
    Clientes.belongsTo(Empresa);

    Empresa.hasOne(Area, { onDelete: 'cascade', hooks: true });
    Area.belongsTo(Empresa);

    Empresa.hasOne(Segmento, { onDelete: 'cascade', hooks: true });
    Segmento.belongsTo(Empresa);

    Empresa.hasOne(Itm_Controle, { onDelete: 'cascade', hooks: true });
    Itm_Controle.belongsTo(Empresa);

    Empresa.hasOne(Colab, { onDelete: 'cascade', hooks: true });
    Colab.belongsTo(Empresa);

    Empresa.hasOne(Representante, { onDelete: 'cascade', hooks: true });
    Representante.belongsTo(Empresa);

    Empresa.hasOne(Fornec, { onDelete: 'cascade', hooks: true });
    Fornec.belongsTo(Empresa);

    Empresa.hasOne(Parametros, { onDelete: 'cascade', hooks: true });
    Parametros.belongsTo(Empresa);

    Empresa.hasOne(Rec_Desp, { onDelete: 'cascade', hooks: true });
    Rec_Desp.belongsTo(Empresa);

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
    return this;
  }
}
export default Empresa;
