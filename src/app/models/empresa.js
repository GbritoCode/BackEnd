import { Model, DataTypes } from 'sequelize';

import recDesp from './recDesp';
import Clientes from './cliente';
import Area from './area';
import UndNeg from './undNeg';
import Produto from './produto';
import Segmento from './segmento';
import Colab from './colab';
import Representante from './representante';
import Fornec from './fornec';
import Parametros from './parametros';
import perfil from './perfil';
import condPgmto from './condPgmto';
import tipoComiss from './tipoComiss';
import oportunidade from './oportunidade';
import ContaContabils from './ContaContabil';
import CentroCustos from './CentroCusto';
import FechamentoPerido from './fechamentoPeriodos';
import ResultPeriodo from './resultPeriodo';
import EmailParametros from './emailParametros';
import FollowUps from './FollowUps';
import Campanhas from './campanhas';
import CamposDinamicosProspect from './camposDinamicosProspects';

export default class Empresa extends Model {
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

    this.addHook('afterSave', async (empresa) => {
      const user = await empresa.sequelize.models.users.findByPk(empresa.UserId);
      await empresa.sequelize.models.ParametrosEmail.create({
        EmpresaId: empresa.id,
        bccEmailOrc: user.email,
        bccEmailRev: user.email,
        bccEmailFat: user.email,
        bccEmailCRM: user.email,
        fromEmailOrc: user.email,
        fromEmailRev: user.email,
        fromEmailFat: user.email,
        fromEmailCRM: user.email,
      });
      await empresa.sequelize.models.Parametros.create({
        EmpresaId: empresa.id,
        IRPJ: 0,
        CSLL: 0,
        COFINS: 0,
        PIS: 0,
        INSS: 0,
        ISS: 0,
        PSProLabor: 0,
        IRRFProLabor: 0,
        vlrMinHr: 0,
        vlrBsHr: 0,
        vlrBsDesp: 0,
        adiantaPgmto: 'Não',
        percAdiantaPgmto: 0,
      });
      await empresa.sequelize.models.CentroCustos.create({
        EmpresaId: empresa.id,
        cod: '000',
        desc: 'Sem Centro de Custo',
      });
      await empresa.sequelize.models.CondPgmto.create({
        EmpresaId: empresa.id,
        cod: '000',
        desc: 'Condição Padrão',
        diasPrazo: 0,
      });
      await empresa.sequelize.models.Perfil.create({
        EmpresaId: empresa.id,
        desc: 'Admnistrador',
        cod: 'admin',
        permittedPages: 'Pessoal Dash,Gerencial Dash,Comercial Dash,Parametros Up,Emails Up,Perfis Tab,Períodos Tab,Liberar Períodos Tab,Prospecção,acessoTotal,Condição de Pagamento Tab,Tipos de Comissão Tab,Conta Contábil Tab,Centro de Custo Tab,Receita e Despesa Tab,Representante Tab,Clientes Tab,Prospects Tab,Campanhas Tab,Campos Dinâmicos Tab,Fornecedor Tab,Colaborador Tab,Area Tab,Empresa Tab,Produto Tab,Unidade de Negócio Tab,Segmento Tab,Projetos Tab,Oportunidades Tab,Finalizadas Tab,Dashboards,Administração,Vendas,Cadastros,Apontamentos,Oportunidades,',
      });
    });

    Empresa.hasMany(Clientes, { onDelete: 'cascade', hooks: true });
    Clientes.belongsTo(Empresa);

    Empresa.hasMany(Area, { onDelete: 'cascade', hooks: true });
    Area.belongsTo(Empresa);

    Empresa.hasMany(Segmento, { onDelete: 'cascade', hooks: true });
    Segmento.belongsTo(Empresa);

    Empresa.hasMany(Colab, { onDelete: 'cascade', hooks: true });
    Colab.belongsTo(Empresa);

    Empresa.hasMany(Representante, { onDelete: 'cascade', hooks: true });
    Representante.belongsTo(Empresa);

    Empresa.hasMany(Fornec, { onDelete: 'cascade', hooks: true });
    Fornec.belongsTo(Empresa);

    Empresa.hasMany(Parametros, { onDelete: 'cascade', hooks: true });
    Parametros.belongsTo(Empresa);

    Empresa.hasMany(recDesp, { onDelete: 'cascade', hooks: true });
    recDesp.belongsTo(Empresa);

    Empresa.hasMany(perfil, { onDelete: 'cascade', hooks: true });
    perfil.belongsTo(Empresa);

    Empresa.hasMany(condPgmto, { onDelete: 'cascade', hooks: true });
    condPgmto.belongsTo(Empresa);

    Empresa.hasMany(tipoComiss, { onDelete: 'cascade', hooks: true });
    tipoComiss.belongsTo(Empresa);

    Empresa.hasMany(Produto, { onDelete: 'cascade', hooks: true });
    Produto.belongsTo(Empresa);

    Empresa.hasMany(UndNeg, { onDelete: 'cascade', hooks: true });
    UndNeg.belongsTo(Empresa);

    Empresa.hasMany(oportunidade, { onDelete: 'cascade', hooks: true });
    oportunidade.belongsTo(Empresa);

    Empresa.hasMany(ContaContabils, { onDelete: 'cascade', hooks: true });
    ContaContabils.belongsTo(Empresa);

    Empresa.hasMany(CentroCustos, { onDelete: 'cascade', hooks: true });
    CentroCustos.belongsTo(Empresa);

    Empresa.hasMany(FechamentoPerido, { onDelete: 'cascade', hooks: true });
    FechamentoPerido.belongsTo(Empresa);

    Empresa.hasMany(ResultPeriodo, { onDelete: 'cascade', hooks: true });
    ResultPeriodo.belongsTo(Empresa);

    Empresa.hasMany(EmailParametros, { onDelete: 'cascade', hooks: true });
    EmailParametros.belongsTo(Empresa);

    Empresa.hasMany(FollowUps, { onDelete: 'cascade', hooks: true });
    FollowUps.belongsTo(Empresa);

    Empresa.hasMany(Campanhas, { onDelete: 'cascade', hooks: true });
    Campanhas.belongsTo(Empresa);

    Empresa.hasMany(CamposDinamicosProspect, { onDelete: 'cascade', hooks: true });
    CamposDinamicosProspect.belongsTo(Empresa);
    return this;
  }
}
