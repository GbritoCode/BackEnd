import Oportunidade from '../../models/oportunidade';
import Empresas from '../../models/empresa';
import Cliente from '../../models/cliente';
import UndNeg from '../../models/undNeg';
import Colab from '../../models/colab';
import Representantes from '../../models/representante';
import Segmento from '../../models/segmento';
import Recurso from '../../models/recurso';
import Area from '../../models/area';
import RecDesp from '../../models/recDesp';
import Campanhas_Clientes from '../../models/Campanhas_Clientes';
import CliCont from '../../models/cliCont';

const { Op } = require('sequelize');

class OportToExcel {
  async store(req, res) {
    try {
      const oport = await Oportunidade.findAll();
      const clientes = await Cliente.findAll();
      const sgmts = await Segmento.findAll();
      const undNeg = await UndNeg.findAll();
      const colabs = await Colab.findAll();
      const contatos = await CliCont.findAll();
      const recDesps = await RecDesp.findAll();

      for (let i = 0; i < oport.length; i += 1) {
        const cli = clientes.find((a) => a.id === oport[i].dataValues.ClienteId);
        const sgmt = sgmts.find((a) => a.id === oport[i].dataValues.SegmentoId);
        const uNeg = undNeg.find((a) => a.id === oport[i].dataValues.UndNegId);
        const colab = colabs.find((a) => a.id === oport[i].dataValues.ColabId);
        const contato = contatos.find((a) => a.id === oport[i].dataValues.contato);
        const recDesp = recDesps.find((a) => a.id === oport[i].dataValues.RecDespId);
        const aux = {
          cliNome: '',
          sgmtNome: '',
          uNegNome: '',
          recDespNome: '',
          contatoNome: '',
          colabNome: '',
        };
        aux.cliNome = cli.nomeAbv;
        aux.sgmtNome = sgmt.descSegmt;
        aux.uNegNome = uNeg.descUndNeg;
        aux.recDespNome = recDesp.desc;
        aux.contatoNome = contato.nome;
        aux.colabNome = colab.nome;
        Object.assign(oport[i].dataValues, aux);
      }

      return res.json(oport);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }
}
export default new OportToExcel();
