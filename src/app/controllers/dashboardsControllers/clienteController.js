import { Op } from 'sequelize';
import Cliente from '../../models/cliente';
import Cotacao from '../../models/cotacao';
import Oportunidade from '../../models/oportunidade';

class ClienteDashController {
  async get(req, res) {
    const { cliId } = req.query;
    console.log(cliId);
    if (!cliId) {
      try {
        const cli = await Cliente.findAll(
          {
            where: { prospect: false },
          },
        );
        return res.status(200).json({ cli, message: 'ok' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Erro Interno do Servidor' });
      }
    }

    try {
      const oportsArray = new Array(3).fill(0);
      let oportsTotal = 0;
      const oports = await Oportunidade.findAll({
        where: {
          fase: { [Op.lt]: 5 },
          ClienteId: cliId,
        },
        attributes: ['id', 'fase'],
        include: [{ model: Cotacao, attributes: ['id'] }],
      });

      // eslint-disable-next-line no-restricted-syntax
      for (const oport of oports) {
        if (oport.fase === 1) {
          oportsArray[0] += 1;
        } else if ((oport.fase > 1 && oport.fase < 4) && oport.Cotacaos.length > 0) {
          oportsArray[1] += 1;
        } else if (oport.fase === 4) {
          oportsArray[2] += 1;
        }
        oportsTotal += 1;
      }

      const oportsForTable = await Oportunidade.findAll({
        where: {
          fase: 4,
          ClienteId: cliId,
        },
        include: [
          {
            model: Cliente,
          },
          {
            model: Cotacao,
            order: [['id', 'DESC']],
            separate: true,
          },
        ],
      });

      for (let i = 0; i < oportsForTable.length; i++) {
        if (oportsForTable[i].Cotacaos[0] === undefined) {
          oportsForTable.splice(i, 1);
        }

        if (oportsForTable[i].Cotacaos[0] !== undefined) {
          oportsForTable[i].dataValues.percentHrs = Math.floor(
            ((oportsForTable[i].totalHoras / 60) * 100) / oportsForTable[i].Cotacaos[0].hrsPrevst,
          );
        }
      }

      return res.status(200).json(
        {
          oportsGraph: {
            oportsArray,
            oportsTotal,
          },
          oportsForTable,
        },
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Erro Interno do Servidor' });
    }
  }
}
export default new ClienteDashController();
