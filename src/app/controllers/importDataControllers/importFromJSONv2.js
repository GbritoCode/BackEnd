/* eslint-disable no-restricted-syntax */
import json from './teste.json';
import Campanhas_Clientes from '../../models/Campanhas_Clientes';
import CliCont from '../../models/cliCont';
import Cliente from '../../models/cliente';
import Queue from './queue';

class ImportFromJSON {
  async store(req, res) {
    async function up(record) {
      try {
        // console.log(json);

        const createdCli = await Cliente.create({
          CNPJ: record.CNPJ,
          nomeAbv: record.nomeAbv,
          rzSoc: record.rzSoc,
          fantasia: record.fantasia,
          RepresentanteId: 1,
          TipoComisseId: null,
          EmpresaId: 1,
          prospect: true,
          site: record.site,
          fone: record.fone,
          ramo: record.ramo,
          setor: record.setor,
          erp: record.erp,
          database: record.database,
          qtdFuncionarios: record.qtdFuncionarios,
          sigla: record.sigla,
          atvPrincipal: record.atvPrincipal,
        });
        console.log(createdCli.id);

        for (const cont of record.CliConts) {
          await CliCont.create({
            ClienteId: createdCli.getDataValue('id'),
            nome: cont.nome,
            cel: cont.cel,
            fone: cont.fone,
            skype: cont.skype,
            email: cont.email,
            aniver: cont.aniver,
            linkedin: cont.linkedin,
            cargo: cont.cargo,
            ramal: cont.ramal,
          });
        }

        const camp_cli = await Campanhas_Clientes.create({
          ClienteId: createdCli.getDataValue('id'),
          CampanhaId: 8,
        });

        await new Promise((res) => setTimeout(res, 60000));
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Erro Interno Do Servidor' });
      }
    }
    const q = new Queue(3);
    for (let i = 0; i < json.length; i++) {
      console.log(json[i]);
      q.enqueue(() => up(json[i]));
    }
  }
}

export default new ImportFromJSON();
