import { Op } from 'sequelize';
import { differenceInHours, parseISO } from 'date-fns';
import Campanhas_Clientes from '../../models/Campanhas_Clientes';
import Cliente from '../../models/cliente';
import FollowUps from '../../models/FollowUps';
import Campanhas from '../../models/campanhas';
import CliCont from '../../models/cliCont';
import CliComp from '../../models/clienteComp';
import CamposDinamicos from '../../models/camposDinamicosProspects';
import { normalizeDatetime } from '../../../normalize';

class ComercialController {
  async get(req, res) {
    const { query } = req;
    const { camp, dataInic, dataFim } = query;

    try {
      const cliJoinedCamp = await Campanhas_Clientes.findAndCountAll({
        where: {
          CampanhaId: camp,
          createdAt: { [Op.between]: [dataInic, dataFim] },
        },
        include: [{ model: Cliente, include: [{ model: CliComp }, { model: CliCont }] }, { model: Campanhas }],
      });
      for (let i = 0; i < cliJoinedCamp.rows.length; i += 1) {
        cliJoinedCamp.rows[i].dataValues.createdAt = normalizeDatetime(cliJoinedCamp.rows[i].dataValues.createdAt);
      }

      const Fups = await FollowUps.findAndCountAll({
        where: {
          CampanhaId: camp,
          dataContato: { [Op.between]: [dataInic, dataFim] },
        },
        include: [{ model: Cliente }, { model: CliCont }, { model: Campanhas }],
        order: [['id', 'DESC']],
      });
      // return res.json(Fups);
      for (let i = 0; i < Fups.rows.length; i++) {
        Fups.rows[i].dataValues.distanceFromToday = Math.ceil(
          differenceInHours(
            parseISO(Fups.rows[i].dataValues.dataContato), new Date(),
          ) / 24,
        ) || 0;
        const newDateContact = Fups.rows[i].dataContato.split('-');
        Fups.rows[i].dataValues.dataContato = `${newDateContact[2]}/${newDateContact[1]}/${newDateContact[0]}`;
        const newDateProxContact = Fups.rows[i].dataProxContato.split('-');
        Fups.rows[i].dataValues.dataProxContato = `${newDateProxContact[2]}/${newDateProxContact[1]}/${newDateProxContact[0]}`;
      }

      const finalizedFups = await FollowUps.findAndCountAll({
        where: {
          CampanhaId: camp,
          dataContato: { [Op.between]: [dataInic, dataFim] },
          proxPasso: 10,
        },
        include: [{ model: Cliente, include: [CliComp] }, { model: CliCont }, { model: Campanhas }, { model: CamposDinamicos }],
      });
      for (let i = 0; i < finalizedFups.rows.length; i += 1) {
        const created = new Date(finalizedFups.rows[i].dataValues.createdAt)
          .toLocaleString().slice(0, 10);
        finalizedFups.rows[i].dataValues.createdAt = created;
      }

      return res.json({ cliJoinedCamp, Fups, finalizedFups });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Erro Interno do Servidor' });
    }
  }
}
export default new ComercialController();
