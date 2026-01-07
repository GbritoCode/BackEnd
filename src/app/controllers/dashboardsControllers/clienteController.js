import sequelize, { Op } from 'sequelize';
import moment from 'moment';
import { endOfMonth, getDaysInMonth, startOfMonth } from 'date-fns';
import Cliente from '../../models/cliente';
import Cotacao from '../../models/cotacao';
import Oportunidade from '../../models/oportunidade';
import Horas from '../../models/horas';
import CliRecDesp from '../../models/cliRecDesp';

class ClienteDashController {
  async get(req, res) {
    try {
      const { cliId } = req.query;
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

      const selectedClient = await Cliente.findByPk(cliId, { attributes: ['nomeAbv'] });

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
        ],
      });

      return res.status(200).json(
        {
          oportsGraph: {
            oportsArray,
            oportsTotal,
          },
          oportsForTable,
          clientName: selectedClient.dataValues.nomeAbv,
        },
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Erro Interno do Servidor' });
    }
  }

  async getDebtsAmount(req, res) {
    try {
      const { cliId, selectedMonth, selectedYear } = req.params;

      const monthStart = startOfMonth(new Date(selectedYear, Number(selectedMonth) - 1));
      const monthEnd = endOfMonth(new Date(selectedYear, Number(selectedMonth) - 1));
      let sum = 0;

      const packageOportId = process.env.PACKAGE_OPORT_ID;
      const consultancyRecId = process.env.CONSULTANCY_REC_ID;

      const oport = await Oportunidade.findOne({
        attributes: ['totalHoras'],
        where: {
          ClienteId: cliId,
          RecDespId: packageOportId,
          data: { [Op.between]: [monthStart, monthEnd] },
        },
        include: [
          {
            model: Cotacao,
            attributes: ['id', 'vlrLiq', 'hrsPrevst', 'createdAt'],
            duplicating: false,
          },
          {
            model: Cliente,
            attributes: ['id'],
            include: [
              {
                model: CliRecDesp,
                where: {
                  RecDespId: consultancyRecId,
                },
              },
            ],
          },
        ],
        group: ['Oportunidade.id', 'Cotacaos.id', 'Cliente.id', 'Cliente.CliRecDesp.id'],
        order: [
          [Cotacao, 'createdAt', 'DESC'],
        ],
      });

      if (!oport || !oport.Cotacaos.length || !oport.Cliente) {
        return res.json({ debt: 0 });
      }

      const consultancyValue = oport.Cliente.CliRecDesp.valorRec;
      const { hrsPrevst, vlrLiq } = oport.Cotacaos[0];
      const totalHrs = (oport.dataValues.totalHoras / 60 || 0).toFixed(2);
      const differenceInHours = (totalHrs - hrsPrevst).toFixed(2);
      sum += vlrLiq;

      // check if total hrs is higher than the limit on the oport budget
      if (differenceInHours > 0) {
      // in this case we sum the value of the remaining hours with consultancy value
        sum += (differenceInHours * consultancyValue).toFixed(2);
      }
      return res.json({ debt: sum });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Erro Interno do Servidor' });
    }
  }
}

export default new ClienteDashController();
