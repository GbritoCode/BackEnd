import Sequelize, { Model } from 'sequelize';
import Clientes from './cliente.js';
import Area from './area.js';
import Segmento from './segmento.js';
import Itm_Controle from './itm_controle.js';
import Colab from './colab.js';
import Representante from './representante.js';
import Fornec from './fornec.js';
import Parametros from './parametros.js';
import Rec_Desp from './rec_desp';

class Empresa extends Model {
  static init(sequelize) {
    super.init(
      {
        id_federal: Sequelize.STRING,
        nome: Sequelize.STRING,
        license: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
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

    return this;
  }
}
export default Empresa;
