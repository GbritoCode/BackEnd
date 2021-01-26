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
      });
    });

    Empresa.hasOne(Clientes, { onDelete: 'cascade', hooks: true });
    Clientes.belongsTo(Empresa);

    Empresa.hasOne(Area, { onDelete: 'cascade', hooks: true });
    Area.belongsTo(Empresa);

    Empresa.hasOne(Segmento, { onDelete: 'cascade', hooks: true });
    Segmento.belongsTo(Empresa);

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

    Empresa.hasOne(ContaContabils, { onDelete: 'cascade', hooks: true });
    ContaContabils.belongsTo(Empresa);

    Empresa.hasOne(CentroCustos, { onDelete: 'cascade', hooks: true });
    CentroCustos.belongsTo(Empresa);
    return this;
  }
}
