/* eslint-disable no-nested-ternary */
import excel4node from 'excel4node';
import { Op } from 'sequelize';
import { readdirSync, rmSync } from 'fs';
import path from 'path';
import {
  normalizeCnpj, normalizeDate, normalizeDatetime, normalizeFone,
} from '../../../normalize';
import Campanhas from '../../models/campanhas';
import CliCont from '../../models/cliCont';
import Cliente from '../../models/cliente';
import CliComp from '../../models/clienteComp';
import FollowUps from '../../models/FollowUps';
import Colab from '../../models/colab';
import CamposDinamicosProspect from '../../models/camposDinamicosProspects';

const { spawnSync, spawn } = require('child_process');

class ClienteRelatorioController {
  async exportResume(req, res) {
    function checkPrefCont(cont) {
      switch (cont) {
        case 1:
          return 'Email';
        case 2:
          return 'Telefone';
        case 3:
          return 'Whatsapp';
        case 4:
          return 'Skype';
        default:
      }
      return 0;
    }
    function checkProxPasso(cont) {
      switch (cont) {
        case 1:
          return 'Retornar Contato';
        case 2:
          return 'Agendar Reunião';
        case 3:
          return 'Solicitar Orçamento';
        case 4:
          return 'Iniciar Contato';
        case 5:
          return 'Analisar Reunião';
        case 10:
          return 'Finalizar';
        default:
      }
      return 0;
    }

    try {
      let cliente;
      const {
        filter, campId, inicDate, endDate, finalized, totalFUP, repeat,
      } = req.query;
      if (filter === 'true' && finalized === 'false' && totalFUP === 'true') {
        cliente = await Cliente.findAll({
          include: [
            {
              model: CliComp,
            },
            {
              model: CliCont,
            },
            {
              model: Campanhas,
              where: {
                id: campId,
              },
              include: [
                {
                  model: FollowUps,
                  where: {
                    dataContato: { [Op.between]: [inicDate, endDate] },
                  },
                  required: true,
                  include: [{ model: Colab }, { model: CamposDinamicosProspect }],
                },
              ],
            },
          ],
        });
      } else if (filter === 'true' && finalized === 'false') {
        cliente = await Cliente.findAll({
          include: [
            {
              model: CliComp,
            },
            {
              model: CliCont,
            },
            {
              model: Campanhas,
              where: {
                id: campId,
              },
              include: [
                {
                  model: FollowUps,
                  where: {
                    dataContato: { [Op.between]: [inicDate, endDate] },
                  },
                  include: [{ model: Colab }, { model: CamposDinamicosProspect }],
                },
              ],
            },
          ],
        });
      } else if (filter === 'true' && finalized === 'true') {
        cliente = await Cliente.findAll({
          include: [
            {
              model: CliComp,
            },
            {
              model: CliCont,
            },
            {
              model: Campanhas,
              where: {
                id: campId,
              },
              include: [
                {
                  model: FollowUps,
                  where: {
                    dataContato: { [Op.between]: [inicDate, endDate] },
                    proxPasso: 10,
                  },
                  required: true,
                  include: [{ model: Colab }, { model: CamposDinamicosProspect }],
                },
              ],
            },
          ],
        });
      } else if (filter === 'false') {
        cliente = await Cliente.findAll({
          include: [
            { model: CliComp },
            { model: CliCont },
            {
              model: Campanhas,
              include: [
                {
                  model: FollowUps,
                  include: [
                    { model: Colab }, { model: CamposDinamicosProspect }],
                },
              ],
            },
          ],
        });
      }

      for (let i = 0; i < cliente.length; i += 1) {
        for (let j = 0; j < cliente[i].Campanhas.length; j += 1) {
          const cliId = cliente[i].dataValues.id;
          cliente[i].Campanhas[j].dataValues.FollowUps = cliente[i]
            .Campanhas[j].FollowUps
            .filter((arr) => arr.ClienteId === cliId);
        }
      }

      // return res.json(cliente);
      const cliMapped = cliente.map((cli) => ({
        Cliente: {
          CNPJ: normalizeCnpj(cli.CNPJ),
          'Nome Abreviado': cli.nomeAbv,
          'Razao Social': cli.rzSoc,
          Telefone: normalizeFone(cli.fone),
          Site: cli.site,
          'Atividade Principal': cli.atvPrincipal,
          Ramo: cli.ramo,
          Setor: cli.setor,
          ERP: cli.erp,
          'Banco de Dados': cli.database,
          'Quantidade de Funcionarios': cli.qtdFuncionarios,
          Bairro: cli.CliComp.bairro,
          Cidade: cli.CliComp.cidade,
          UF: cli.CliComp.uf,
          Campanhas: cli.Campanhas.map((camp) => ({
            Codigo: camp.cod,
            Descrição: camp.desc,
            'Entrada Campanha': normalizeDatetime(camp.Campanhas_Clientes.createdAt),
            Situacao: camp.Campanhas_Clientes.ativo ? 'Em Prospecção' : 'Finalizada',
            follow: camp.FollowUps.filter((arr) => arr.ClienteId === cli.id).map((fup) => ({
              Colaborador: fup.Colab.nome,
              'Data Contato': normalizeDate(fup.dataContato),
              Contato: cli.CliConts.find((a) => a.id === fup.CliContId) ? cli.CliConts.find((a) => a.id === fup.CliContId).nome : '',
              'Cargo Contato': cli.CliConts.find((a) => a.id === fup.CliContId) ? cli.CliConts.find((a) => a.id === fup.CliContId).cargo : '',
              'Email Contato': cli.CliConts.find((a) => a.id === fup.CliContId) ? cli.CliConts.find((a) => a.id === fup.CliContId).email : '',
              'Preferencia de Contato': checkPrefCont(fup.prefContato),
              Reação: fup.reacao,
              'Proximo Passo': checkProxPasso(fup.proxPasso),
              'Data Proximo Contato': normalizeDate(fup.dataProxContato),
              Detalhes: fup.detalhes,
              'Motivo Codigo': fup.CamposDinamicosProspect ? fup.CamposDinamicosProspect.nome : '',
              Motivo: fup.CamposDinamicosProspect ? fup.CamposDinamicosProspect.valor : '',
            })),
          })),
        },

      }));
      let dataToSend;
      let today = JSON.stringify(new Date().toLocaleString('pt-br'));
      today = today.split('/').join('-');
      today = today.split(':').join('.');
      today = today.split('\"').join('');
      // console.log(JSON.stringify(cliMapped));
      // spawn new child process to call the python script
      const python = spawnSync('python', ['src/app/controllers/ClienteControllers/generateExcel.py', JSON.stringify(cliMapped), `${today}`]);
      // collect data from script
      // python.stdout.on('data', (data) => {
      //   console.log('Pipe data from python script ...');
      //   dataToSend = data.toString();
      // });
      // in close event we are sure that stream from child process is closed
      if (python.stderr.toString('utf-8')) {
        throw new Error(python.stderr.toString('utf-8'));
      }
      // python.stdout.on('close', (code) => {
      //   console.log(`child process close all stdio with code ${code}`);
      //   // send data to browser
      //   res.send(dataToSend);
      // });
      let dir; let
        file;
      try {
        dir = readdirSync(path.resolve(__dirname, './excelFiles/'));
        console.log(dir);
        file = dir.findIndex((arr) => arr === `excel${today}.xlsx`);
        console.log(file);
        console.log(`excel${today}.xlsx`);
      } catch (err) {
        throw new Error(err);
      }

      await res.download(path.resolve(__dirname, `./excelFiles/${dir[file]}`), `excel${today}.xlsx`, (err) => {
        if (err) {
          res.status(500).send({
            message: `Could not download the file. ${err}`,
          });
        }
        try {
          rmSync(path.resolve(__dirname, `./excelFiles/${dir[file]}`));
        } catch (error) {
          throw new Error(error);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}
export default new ClienteRelatorioController();
