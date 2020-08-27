import Sequelize from 'sequelize';
import Area from '../app/models/area';
import Cli_cont from '../app/models/cli_cont';
import Cli_rec_desp from '../app/models/cli_rec_desp';
import Cliente_comp from '../app/models/cliente_comp';
import Cliente from '../app/models/cliente';
import Colab_comp from '../app/models/colab_comp';
import Colab from '../app/models/colab';
import Empresa from '../app/models/empresa';
import Fornec from '../app/models/fornec';
import Itm_controle from '../app/models/itm_controle';
import Parametros from '../app/models/parametros';
import Produto from '../app/models/produto';
import Rec_desp from '../app/models/rec_desp';
import Representante from '../app/models/representante';
import Segmento from '../app/models/segmento';
import Und_neg from '../app/models/und_neg';
import User from '../app/models/users';
import databaseConfig from '../config/database';

const models = [
  Cli_cont,
  Cliente_comp,
  Cli_rec_desp,
  Cliente,
  Area,
  Und_neg,
  Produto,
  Colab,
  Colab_comp,
  Fornec,
  Itm_controle,
  Parametros,
  Rec_desp,
  Representante,
  Segmento,
  Empresa,
  User,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
