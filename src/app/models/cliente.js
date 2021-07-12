import { Model, DataTypes } from 'sequelize';
import axios from 'axios';

import ClienteComp from './clienteComp';
import cliCont from './cliCont';
import CliRecDesp from './cliRecDesp';
import Oportunidade from './oportunidade';
import FollowUps from './FollowUps';
import Campanhas from './campanhas';
import Campanhas_Clientes from './Campanhas_Clientes';

export default class Cliente extends Model {
  static init(sequelize) {
    super.init(
      {
        CNPJ: DataTypes.STRING,
        nomeAbv: DataTypes.STRING,
        rzSoc: DataTypes.STRING,
        fantasia: DataTypes.STRING,
        RepresentanteId: DataTypes.STRING,
        TipoComisseId: DataTypes.INTEGER,
        EmpresaId: DataTypes.INTEGER,
        prospect: DataTypes.BOOLEAN,
        CustomField1: DataTypes.STRING,
        CustomField2: DataTypes.STRING,
        CustomField3: DataTypes.STRING,
        CustomField4: DataTypes.STRING,
        CustomField5: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    this.addHook('afterCreate', async (cliente) => {
      const response = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cliente.CNPJ}`);
      if (response.data.status === 'OK') {
        cliente.sequelize.models.CliComp.create({
          ClienteId: cliente.id,
          CondPgmtoId: 1,
          cep: response.data.cep,
          rua: response.data.logradouro,
          numero: response.data.numero,
          complemento: response.data.complemento,
          bairro: response.data.bairro,
          cidade: response.data.municipio,
          uf: response.data.uf,
          inscMun: 'Isento',
          inscEst: 'Isento',
        });
      }
      if (response.data.status === 'ERROR') {
        cliente.destroy();
        return Promise.reject(new Error('Há um erro no CNPJ, cliente não criado, por favor verifique os dados e tente novamente'));
      }
    });

    Cliente.belongsToMany(Campanhas, { through: 'Campanhas_Clientes', foreignKey: 'ClienteId' });
    Campanhas.belongsToMany(Cliente, { through: 'Campanhas_Clientes', foreignKey: 'CampanhaId' });

    Cliente.hasOne(ClienteComp, { onDelete: 'cascade', hooks: true });
    ClienteComp.belongsTo(Cliente);

    Cliente.hasMany(cliCont, { onDelete: 'cascade', hooks: true });
    cliCont.belongsTo(Cliente);

    Cliente.hasOne(CliRecDesp, { onDelete: 'cascade', hooks: true });
    CliRecDesp.belongsTo(Cliente);

    Cliente.hasMany(Oportunidade, { onDelete: 'cascade', hooks: true });
    Oportunidade.belongsTo(Cliente);

    Cliente.hasMany(FollowUps, { onDelete: 'cascade', hooks: true });
    FollowUps.belongsTo(Cliente);

    return this;
  }
}
