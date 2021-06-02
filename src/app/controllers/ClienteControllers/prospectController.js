import CliCont from '../../models/cliCont';
import Cliente from '../../models/cliente';
import CliComp from '../../models/clienteComp';

class ProspectController {
  async store(req, res) {
    try {
      const { Endereço: endereco, 'Informações básicas': basicInfo, Contato: contato } = req.body;

      basicInfo.CNPJ = basicInfo.CNPJ.replace(/[^\d]+/g, '');
      console.log(basicInfo);
      console.log(endereco);
      console.log(contato);

      const cliente = await Cliente.create(basicInfo);
      contato.ClienteId = cliente.id;
      const delay = (ms) => new Promise((resp) => setTimeout(resp, ms));
      await delay(250);
      const createdCli = await CliComp.update({
        CondPgmtoId: endereco.CondPgmtoId,
        inscMun: endereco.inscMun,
        inscEst: endereco.inscEst,
        complemento: endereco.complemento,
      }, { where: { ClienteId: cliente.id } });
      console.log(createdCli);

      const cont = await CliCont.create(contato);
      console.log(cont);

      return res.json(cliente);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }
}
export default new ProspectController();