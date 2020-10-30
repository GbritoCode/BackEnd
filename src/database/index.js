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
import UndNeg from '../app/models/UndNeg';
import User from '../app/models/users';
import perfil from '../app/models/perfil';
import condPgmto from '../app/models/condPgmto';
import tipoComiss from '../app/models/tipoComiss';
import databaseConfig from '../config/database';

const models = [
  Cli_cont,
  Cliente_comp,
  Cli_rec_desp,
  Cliente,
  Representante,
  Segmento,
  Area,
  UndNeg,
  Produto,
  Colab_comp,
  Colab,
  Fornec,
  Itm_controle,
  Parametros,
  Rec_desp,
  tipoComiss,
  condPgmto,
  perfil,
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
