import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import Area from '../app/models/area';
import cliCont from '../app/models/cliCont';
import cliRecDesp from '../app/models/cliRecDesp';
import cliComp from '../app/models/clienteComp';
import Cliente from '../app/models/cliente';
import colabComp from '../app/models/colabComp';
import Colab from '../app/models/colab';
import Empresa from '../app/models/empresa';
import Fornec from '../app/models/fornec';
import Parametros from '../app/models/parametros';
import Produto from '../app/models/produto';
import recDesp from '../app/models/recDesp';
import Representante from '../app/models/representante';
import Segmento from '../app/models/segmento';
import UndNeg from '../app/models/undNeg';
import users from '../app/models/users';
import perfil from '../app/models/perfil';
import condPgmto from '../app/models/condPgmto';
import oportunidade from '../app/models/oportunidade';
import tipoComiss from '../app/models/tipoComiss';
import cotacao from '../app/models/cotacao';
import databaseConfig from '../config/database';
import Recurso from '../app/models/recurso';
import parcela from '../app/models/parcela';
import Horas from '../app/models/horas';
import Despesas from '../app/models/despesas';
import ContaContabil from '../app/models/ContaContabil';
import CentroCustos from '../app/models/CentroCusto';
import FechamentoPeriodo from '../app/models/fechamentoPeriodos';
import ResultPeriodo from '../app/models/resultPeriodo';
import ResultPeriodoGerencial from '../app/models/resultPeriodoGerencial';
import CotacaoFiles from '../app/models/cotacaoFiles';
import EmailParametros from '../app/models/emailParametros';
import ParcelaFiles from '../app/models/parcelaFile';
import EmailHists from '../app/models/emailHist';
import FollowUps from '../app/models/FollowUps';
import CamposDinamicosProspect from '../app/models/camposDinamicosProspects';
import Campanhas from '../app/models/campanhas';
import Campanhas_Clientes from '../app/models/Campanhas_Clientes';

const models = [
  FollowUps,
  CamposDinamicosProspect,
  EmailHists,
  EmailParametros,
  cliCont,
  cliComp,
  cliRecDesp,
  Horas,
  Recurso,
  CotacaoFiles,
  ParcelaFiles,
  cotacao,
  parcela,
  Despesas,
  oportunidade,
  Campanhas,
  Cliente,
  Campanhas_Clientes,
  Representante,
  Segmento,
  Area,
  UndNeg,
  Produto,
  ResultPeriodo,
  ResultPeriodoGerencial,
  colabComp,
  Colab,
  Fornec,
  recDesp,
  ContaContabil,
  CentroCustos,
  Parametros,
  tipoComiss,
  condPgmto,
  perfil,
  FechamentoPeriodo,
  Empresa,
  users,
];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.forEach((model) => model.init(this.connection));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
  }
}

export default new Database();
