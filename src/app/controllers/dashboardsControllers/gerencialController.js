import { Op } from 'sequelize';
import Cliente from '../../models/cliente';
import Cotacao from '../../models/cotacao';
import Oportunidade from '../../models/oportunidade';

class GerencialDashController {
  async get(req, res) {
    try {
      const oportsArray = new Array(4).fill(0);
      let oportsTotal = 0;
      const oports = await Oportunidade.findAll({
        where: {
          fase: { [Op.lt]: 4 },
        },
        attributes: ['id', 'fase'],
        include: [{ model: Cotacao, attributes: ['probVend'] }],
      });

      // eslint-disable-next-line no-restricted-syntax
      for (const oport of oports) {
        if (oport.fase === 1) {
          oportsArray[0] += 1;
        } else if (oport.fase > 1 && oport.Cotacaos.length > 0) {
          if (oport.Cotacaos[oport.Cotacaos.length - 1].probVend === 3) {
            oportsArray[1] += 1;
          } else if (oport.Cotacaos[oport.Cotacaos.length - 1].probVend === 2) {
            oportsArray[2] += 1;
          } else if (oport.Cotacaos[oport.Cotacaos.length - 1].probVend === 1) {
            oportsArray[3] += 1;
          }
        }
        oportsTotal += 1;
      }

      const oportsForTable = await Oportunidade.findAll({
        where: {
          fase: 4,
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
        if (oportsForTable[i].Cotacaos[0] !== undefined) {
          oportsForTable[i].dataValues.percentHrs = Math.floor(
            ((oportsForTable[i].totalHoras / 60) * 100) / oportsForTable[i].Cotacaos[0].hrsPrevst,
          );
        }
      }
      for (let i = 0; i < oportsForTable.length; i++) {
        if (oportsForTable[i].Cotacaos[0] === undefined) {
          oportsForTable.splice(i, 1);
          i--;
        }
      }
      oportsForTable.sort((a, b) => parseFloat(b.getDataValue('percentHrs')) - parseFloat(a.getDataValue('percentHrs')));

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
export default new GerencialDashController();
