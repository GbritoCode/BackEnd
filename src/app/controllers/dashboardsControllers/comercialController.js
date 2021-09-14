import { Op } from 'sequelize';
import { differenceInHours, parseISO } from 'date-fns';
import { normalizeDatetime } from '../../../normalize';
import Campanhas_Clientes from '../../models/Campanhas_Clientes';
import Cliente from '../../models/cliente';
import FollowUps from '../../models/FollowUps';
import Campanhas from '../../models/campanhas';
import CliCont from '../../models/cliCont';
import CliComp from '../../models/clienteComp';
import CamposDinamicos from '../../models/camposDinamicosProspects';
import Colab from '../../models/colab';
import Representante from '../../models/representante';

class ComercialController {
  async get(req, res) {
    const { query } = req;
    const { camp, dataInic, dataFim } = query;

    try {
      const createdCli = await Cliente.findAndCountAll({
        where: {
          createdAt: { [Op.between]: [dataInic, dataFim] },
        },
        include: [
          { model: CliComp },
          { model: Representante },
          { model: CliCont },
          { model: Campanhas },
        ],
      });
      const cliJoinedCamp = await Campanhas_Clientes.findAndCountAll({
        where: {
          CampanhaId: camp,
          createdAt: { [Op.between]: [dataInic, dataFim] },
        },
        include: [
          {
            model: Cliente,
            include: [
              { model: CliComp },
              { model: Representante },
              { model: CliCont },
            ],
          },
          { model: Campanhas }],
      });
      for (let i = 0; i < cliJoinedCamp.rows.length; i += 1) {
        cliJoinedCamp.rows[i].dataValues.createdAt = normalizeDatetime(cliJoinedCamp.rows[i].dataValues.createdAt);
      }

      const Fups = await FollowUps.findAndCountAll({
        where: {
          CampanhaId: camp,
          dataContato: { [Op.between]: [dataInic, dataFim] },
        },
        include: [{ model: Cliente }, { model: CliCont }, { model: Campanhas }, { model: Colab }],
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
        include: [
          {
            model: Cliente,
            include: [{ model: CliComp }, { model: Representante }],
          },
          { model: CliCont },
          { model: Campanhas },
          { model: CamposDinamicos },
        ],
      });

      for (let i = 0; i < finalizedFups.rows.length; i += 1) {
        const created = new Date(finalizedFups.rows[i].dataValues.createdAt)
          .toLocaleString().slice(0, 10);
        finalizedFups.rows[i].dataValues.createdAt = created;
      }

      const cliStatusPassing = await Campanhas_Clientes.findAndCountAll({
        where: {
          CampanhaId: camp,
          [Op.or]: [
            { reuniaoAgend: { [Op.between]: [dataInic, dataFim] } },
            { orcamentoSolict: { [Op.between]: [dataInic, dataFim] } },
            { efetivacao: { [Op.between]: [dataInic, dataFim] } },
            { createdAt: { [Op.between]: [dataInic, dataFim] } },
          ],
        },
        include: [
          {
            model: Cliente,
            include: [
              { model: CliComp },
              { model: Representante },
              { model: CliCont },
            ],
          },
          { model: Campanhas }],
      });

      return res.json({
        cliJoinedCamp, Fups, finalizedFups, cliStatusPassing, createdCli,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Erro Interno do Servidor' });
    }
  }
}
export default new ComercialController();
