import Sequelize from 'sequelize';
import Area from '../app/models/area';
import cliCont from '../app/models/cliCont';
import cliRecDesp from '../app/models/cliRecDesp';
import cliComp from '../app/models/clienteComp';
import Cliente from '../app/models/cliente';
import colabComp from '../app/models/colabComp';
import Colab from '../app/models/colab';
import Empresa from '../app/models/empresa';
import Fornec from '../app/models/fornec';
import itmControle from '../app/models/itmControle';
import Parametros from '../app/models/parametros';
import Produto from '../app/models/produto';
import recDesp from '../app/models/recDesp';
import Representante from '../app/models/representante';
import Segmento from '../app/models/segmento';
import UndNeg from '../app/models/undNeg';
import User from '../app/models/users';
import perfil from '../app/models/perfil';
import condPgmto from '../app/models/condPgmto';
import oportunidade from '../app/models/oportunidade';
import tipoComiss from '../app/models/tipoComiss';
import cotacao from '../app/models/cotacao';
import databaseConfig from '../config/database';
import Recurso from '../app/models/recurso';
import parcela from '../app/models/parcela';

const models = [
  cliCont,
  cliComp,
  cliRecDesp,
  Recurso,
  cotacao,
  parcela,
  oportunidade,
  Cliente,
  Representante,
  Segmento,
  Area,
  UndNeg,
  Produto,
  colabComp,
  Colab,
  Fornec,
  recDesp,
  itmControle,
  Parametros,
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

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
