/* eslint-disable no-restricted-syntax */
import json from '../../../../../../../teste.json';
import Campanhas_Clientes from '../../models/Campanhas_Clientes';
import CliCont from '../../models/cliCont';
import Cliente from '../../models/cliente';
import Queue from './queue';

class ImportFromJSON {
  async store(req, res) {
    async function up(record) {
      try {
        // console.log(json);

        for (let i = 0; i < 1; i++) {
          console.log(record);
          const cnpjDb = record.CNPJ.replace(/[^\d]+/g, '');
          const foneDb = record.FONE === null ? '9999999999' : record.FONE.replace(/[^\d]+/g, '');
          const contCelDb = record.CELULAR === null ? '99999999999' : record.CELULAR.replace(/[^\d]+/g, '');
          const contFoneDb = record['FONE CONTATO'] === null ? '9999999999' : record['FONE CONTATO'].replace(/[^\d]+/g, '');

          const createdCli = await Cliente.create({
            CNPJ: cnpjDb,
            nomeAbv: record['NOME ABREVIADO'],
            rzSoc: record['RAZÃO'],
            fantasia: record.NOME_FANTASIA,
            RepresentanteId: 1,
            EmpresaId: 1,
            prospect: true,
            site: record.SITE,
            fone: foneDb,
            ramo: record.RAMO,
            setor: record.SETOR,
          });
          console.log(createdCli.id);

          const createdCont = await CliCont.create({
            ClienteId: createdCli.getDataValue('id'),
            nome: record.CONTATOS,
            cel: contCelDb,
            fone: contFoneDb,
            email: record.EMAIL === null ? 'erro@semEmail.na.planilha' : record.EMAIL,
            cargo: record.CARGO,
          });

          const camp_cli = await Campanhas_Clientes.create({
            ClienteId: createdCli.getDataValue('id'),
            CampanhaId: 1,
          });
        }
        await new Promise((res) => setTimeout(res, 60000));
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Erro Interno Do Servidor' });
      }
    }
    const q = new Queue(3);
    for (let i = 0; i < 6; i++) {
      console.log(json[i]);
      q.enqueue(() => up(json[i]));
    }
  }
}

export default new ImportFromJSON();
