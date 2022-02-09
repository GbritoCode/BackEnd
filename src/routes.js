import { Router } from 'express';

import multer from 'multer';
import sequelize, { Op } from 'sequelize';
import { avatar, oportunidadeFile } from './config/multer';

import clienteController from './app/controllers/ClienteControllers/ClienteController';
// eslint-disable-next-line import/no-unresolved
import cliCompController from './app/controllers/ClienteControllers/clienteComp';
import cliRecDespController from './app/controllers/ClienteControllers/cliRecDesp';
import cliContController from './app/controllers/ClienteControllers/cliCont';

import empresaController from './app/controllers/EmpresaController';

import userController from './app/controllers/Users/UserController';
import sessionController from './app/controllers/sessionController';

import colabController from './app/controllers/ColabControllers/ColabController';
import colabCompController from './app/controllers/ColabControllers/ColabCompController';

import representanteController from './app/controllers/RepresentanteController';

import fornecController from './app/controllers/FornecController';

import areaController from './app/controllers/AreaController';

import segmentoController from './app/controllers/SegmentoController';

import undNegController from './app/controllers/UndNegController';

import prodtController from './app/controllers/ProdtController';

import recDespController from './app/controllers/auxControllers/RecDespController';
import condPgmtoController from './app/controllers/auxControllers/condPgmtoController';
import tipoComissController from './app/controllers/auxControllers/tipoComissController';
import perfilController from './app/controllers/auxControllers/perfilController';

import parametrosController from './app/controllers/ParametrosController';
import oprtController from './app/controllers/oprtControllers/oprtController';
import cotacaoController from './app/controllers/oprtControllers/cotacaoController';
import recursoController from './app/controllers/oprtControllers/recursoController';
import parcelaController from './app/controllers/oprtControllers/parcelaController';

import horasController from './app/controllers/oprtControllers/horasController';
import despesasController from './app/controllers/oprtControllers/despesasController';
import contaContabilController from './app/controllers/auxControllers/contaContabilController';
import centroCustosController from './app/controllers/auxControllers/centroCustosController';
import FechamentoPeriodoController from './app/controllers/fechamentoControllers/periodoController';
import resultPeriodoController from './app/controllers/fechamentoControllers/resultPeriodoController';
import periodoTokenController from './app/controllers/tokensControllers/periodoTokenController';
import resultPeriodoGerencialController from './app/controllers/fechamentoControllers/resultPeriodoGerencialController';
import notificationsController from './app/controllers/Notifications/notificationsController';
import emailController from './app/controllers/email/emailController';
import oportFileController from './app/controllers/oprtControllers/oportFileController';
import emailParametrosController from './app/controllers/email/emailParametrosController';
import followUpController from './app/controllers/ClienteControllers/followUpController';
import campanhaController from './app/controllers/ClienteControllers/campanhaController';
import campoDinamicosProspectController from './app/controllers/ClienteControllers/campoDinamicosProspectController';
import prospectController from './app/controllers/ClienteControllers/prospectController';
import comercialController from './app/controllers/dashboardsControllers/comercialController';
import clienteRelatoriosController from './app/controllers/ClienteControllers/pythonclienteRelatoriosController';
import oportToExcel from './app/controllers/oprtControllers/oportToExcel';
import movimentoCaixaController from './app/controllers/FinanceiraControllers/movimentoCaixaController';
import fechamentoCaixaMensControler from './app/controllers/FinanceiraControllers/fechamentoCaixaMensControler';
import financeiraController from './app/controllers/dashboardsControllers/financeiraController';
import gerencialDashController from './app/controllers/dashboardsControllers/gerencialController';
import clienteDashController from './app/controllers/dashboardsControllers/clienteController';
import Cliente from './app/models/cliente';
import Oportunidade from './app/models/oportunidade';
import CliCont from './app/models/cliCont';
import RecDesp from './app/models/recDesp';
import CondPgmto from './app/models/condPgmto';
import ContaContabils from './app/models/ContaContabil';
import CentroCustos from './app/models/CentroCusto';
import TipoComisse from './app/models/tipoComiss';
import CamposDinamicosProspect from './app/models/camposDinamicosProspects';
import Area from './app/models/area';
import Produto from './app/models/produto';
import UndNeg from './app/models/undNeg';
import Segmento from './app/models/segmento';
import Parametros from './app/models/parametros';
import Empresa from './app/models/empresa';
import User from './app/models/users';
import Colab from './app/models/colab';
import Perfil from './app/models/perfil';
import Fornec from './app/models/fornec';
// import importFromJSONv2 from './app/controllers/importDataControllers/importFromJSONv2';

// import ResultPeriodo from './app/models/resultPeriodo';
// import importFromJSON from './app/controllers/importDataControllers/importFromJSON';

// import authMiddleware from './app/middleware/auth';

const routes = new Router();

const uploadCotacao = multer(oportunidadeFile);

// routes.get('/', (req, res) => res.status(200).json('ok'));
routes.get('/', async (req, res) => {
  const recDesp = await RecDesp.findAll();
  const condPgmto = await CondPgmto.findAll();
  const contaContabil = await ContaContabils.findAll();
  const centroCusto = await CentroCustos.findAll();
  const tipoComiss = await TipoComisse.findAll();
  const motivo = await CamposDinamicosProspect.findAll();
  const area = await Area.findAll();
  const prodt = await Produto.findAll();
  const undNeg = await UndNeg.findAll();
  const segmt = await Segmento.findAll();
  const parametros = await Parametros.findAll();
  const empresa = await Empresa.findAll();
  const user = await User.findOne();
  const colab = await Colab.findOne();
  const perfil = await Perfil.findByPk(1);
  const fornec = await Fornec.findByPk(1);

  return res.status(200).json({
    user,
    empresa,
    perfil,
    fornec,
    colab,
    recDesp,
    condPgmto,
    contaContabil,
    centroCusto,
    tipoComiss,
    motivo,
    area,
    prodt,
    undNeg,
    segmt,
    parametros,
  });
});

routes.get('/2', async (req, res) => {
  const data = {
    user: {
      nome: 'Juliano Silva',
      email: 'jsilva@aidera.com.br',
      profile: 1,
      senha: 'Aidera@2022',
      aniver: '1978-07-22',
      isFirstLogin: false,
      AvatarId: null,
      createdAt: '2021-03-08T13:18:03.613Z',
      updatedAt: '2021-03-25T13:39:06.412Z',
    },
    empresa:
      {
        idFederal: '44339009000105',
        nome: 'SEVIA PLUS TECNOLOGIA LTDA',
        license: '1',
        UserId: 1,
        createdAt: '2021-01-26T20:13:16.766Z',
        updatedAt: '2021-01-26T20:13:16.766Z',
      },
    perfil: {
      EmpresaId: 1,
      desc: 'Admnistrador',
      cod: 'admin',
      permittedPages: 'Pessoal Dash,Gerencial Dash,Comercial Dash,Parametros Up,Emails Up,Perfis Tab,Períodos Tab,Liberar Períodos Tab,Prospecção,acessoTotal,Condição de Pagamento Tab,Tipos de Comissão Tab,Conta Contábil Tab,Centro de Custo Tab,Receita e Despesa Tab,Representante Tab,Clientes Tab,acessoTotalCli,Prospects Tab,acessoTotalProsp,Campanhas Tab,Campos Dinâmicos Tab,Fornecedor Tab,Colaborador Tab,Area Tab,Empresa Tab,Produto Tab,Unidade de Negócio Tab,Segmento Tab,Projetos Tab,Oportunidades Tab,Finalizadas Tab,Dashboards,Administração,Vendas,Cadastros,Apontamentos,Oportunidades side,Financeira Dash,Cliente Dash,Movimento Caixa tab,ParcelasLiqui Tab,Historico side,MovCaixaLiqui Tab,',
      createdAt: '2021-01-26T20:13:16.798Z',
      updatedAt: '2022-02-08T18:27:33.031Z',
    },
    fornec: {
      CNPJ: '44339009000105',
      EmpresaId: 1,
      CondPgmtoId: 1,
      RecDespId: 1,
      nome: 'SEVIA PLUS TECNOLOGIA LTDA',
      nomeConta: 'SEVIA001',
      fone: '99999999999',
      cep: '09.725-000',
      rua: 'R JURUBATUBA',
      numero: '1350',
      complemento: '',
      bairro: 'CENTRO',
      cidade: 'SAO BERNARDO DO CAMPO',
      uf: 'SP',
      banco: '341',
      agencia: '1661',
      conta: '19619-4',
      createdAt: '2021-01-26T20:13:48.336Z',
      updatedAt: '2021-01-26T20:13:48.336Z',
    },
    colab: {
      CPF: '85079391120',
      FornecId: 1,
      PerfilId: 1,
      EmpresaId: 1,
      UserId: 1,
      nome: 'Juliano Silva',
      dtAdmiss: '2018-01-01',
      cel: '11954235073',
      skype: 'live:julianoaugustus.silva',
      email: 'jsilva@aidera.com.br',
      espec: 'Administrativo, Manufatura',
      aniver: '1978-07-22',
      recebeFixo: false,
      vlrFixo: null,
      PeriodToken: '',
      createdAt: '2021-01-27T14:51:15.093Z',
      updatedAt: '2022-02-08T23:16:10.583Z',
    },
    contaContabil: [
      {
        EmpresaId: 1,
        cod: '1112006',
        desc: 'Receitas Financeiras',
        createdAt: '2022-01-19T01:17:22.801Z',
        updatedAt: '2022-01-19T01:17:22.801Z',
      },
      {
        EmpresaId: 1,
        cod: '5129001',
        desc: 'Despesas Financeiras',
        createdAt: '2021-01-26T22:30:29.410Z',
        updatedAt: '2022-01-19T01:18:33.921Z',
      },
      {
        EmpresaId: 1,
        cod: '5123012',
        desc: 'Pagamento de Emprestimos',
        createdAt: '2021-01-26T22:35:02.409Z',
        updatedAt: '2022-01-19T17:53:39.130Z',
      },
      {
        EmpresaId: 1,
        cod: '5128001',
        desc: 'Despesas com Doacoes',
        createdAt: '2022-01-19T17:56:07.002Z',
        updatedAt: '2022-01-19T17:56:20.239Z',
      },
      {
        EmpresaId: 1,
        cod: '2112005',
        desc: 'Taxas Municipais',
        createdAt: '2022-01-20T14:26:28.808Z',
        updatedAt: '2022-01-20T14:26:28.808Z',
      },
      {
        EmpresaId: 1,
        cod: '5126012',
        desc: 'Outras Despesas',
        createdAt: '2021-01-26T22:29:25.681Z',
        updatedAt: '2021-01-26T22:29:25.681Z',
      },
      {
        EmpresaId: 1,
        cod: '5124003',
        desc: 'Descontos Concedidos',
        createdAt: '2021-01-26T22:30:19.296Z',
        updatedAt: '2021-01-26T22:30:19.296Z',
      },
      {
        EmpresaId: 1,
        cod: '5129002',
        desc: 'Juros e Multas',
        createdAt: '2021-01-26T22:30:39.763Z',
        updatedAt: '2021-01-26T22:30:39.763Z',
      },
      {
        EmpresaId: 1,
        cod: '5121001',
        desc: 'Adiantamento a Fornecedores',
        createdAt: '2021-01-26T22:30:51.516Z',
        updatedAt: '2021-01-26T22:30:51.516Z',
      },
      {
        EmpresaId: 1,
        cod: '5121005',
        desc: 'Alugueis',
        createdAt: '2021-01-26T22:31:15.587Z',
        updatedAt: '2021-01-26T22:31:15.587Z',
      },
      {
        EmpresaId: 1,
        cod: '5121007',
        desc: 'Internet',
        createdAt: '2021-01-26T22:31:57.298Z',
        updatedAt: '2021-01-26T22:31:57.298Z',
      },
      {
        EmpresaId: 1,
        cod: '5123001',
        desc: 'Premiacoes',
        createdAt: '2021-01-26T22:34:13.064Z',
        updatedAt: '2021-01-26T22:34:13.064Z',
      },
      {
        EmpresaId: 1,
        cod: '5123003',
        desc: 'Pro-Labore',
        createdAt: '2021-01-26T22:34:31.089Z',
        updatedAt: '2021-01-26T22:34:31.089Z',
      },
      {
        EmpresaId: 1,
        cod: '5123013',
        desc: 'Treinamentos',
        createdAt: '2021-01-26T22:35:11.959Z',
        updatedAt: '2021-01-26T22:35:11.959Z',
      },
      {
        EmpresaId: 1,
        cod: '2116005',
        desc: 'Distribuicao de Lucros',
        createdAt: '2021-01-26T22:35:40.434Z',
        updatedAt: '2021-01-26T22:35:40.434Z',
      },
      {
        EmpresaId: 1,
        cod: '2112001',
        desc: 'Simples Nacional',
        createdAt: '2021-01-26T22:35:49.634Z',
        updatedAt: '2021-01-26T22:35:49.634Z',
      },
      {
        EmpresaId: 1,
        cod: '2112002',
        desc: 'IRFF',
        createdAt: '2021-01-26T22:35:59.574Z',
        updatedAt: '2021-01-26T22:35:59.574Z',
      },
      {
        EmpresaId: 1,
        cod: '2112003',
        desc: 'Previdencia Social',
        createdAt: '2021-01-26T22:36:08.328Z',
        updatedAt: '2021-01-26T22:36:08.328Z',
      },
      {
        EmpresaId: 1,
        cod: '2112004',
        desc: 'ISS Retido',
        createdAt: '2021-01-26T22:36:19.380Z',
        updatedAt: '2021-01-26T22:36:19.380Z',
      },
      {
        EmpresaId: 1,
        cod: '1112002',
        desc: 'Revenda de Softwares',
        createdAt: '2021-01-26T22:36:54.195Z',
        updatedAt: '2021-01-26T22:36:54.195Z',
      },
      {
        EmpresaId: 1,
        cod: '1112003',
        desc: 'Prestacao de Servicos',
        createdAt: '2021-01-26T22:37:03.305Z',
        updatedAt: '2021-01-26T22:37:03.305Z',
      },
      {
        EmpresaId: 1,
        cod: '1112005',
        desc: 'Venda de Softwares',
        createdAt: '2021-01-26T22:37:15.063Z',
        updatedAt: '2021-01-26T22:37:15.063Z',
      },
      {
        EmpresaId: 1,
        cod: '5126001',
        desc: 'Honorarios',
        createdAt: '2021-01-26T22:28:17.561Z',
        updatedAt: '2021-01-26T22:59:14.965Z',
      },
      {
        EmpresaId: 1,
        cod: '5121004',
        desc: 'Servicos de Terceiros',
        createdAt: '2021-01-26T22:31:04.500Z',
        updatedAt: '2021-01-26T22:59:40.060Z',
      },
      {
        EmpresaId: 1,
        cod: '5121009',
        desc: 'Telefonia',
        createdAt: '2021-01-26T22:32:07.006Z',
        updatedAt: '2021-01-26T22:59:57.665Z',
      },
      {
        EmpresaId: 1,
        cod: '5126008',
        desc: 'Material de Expediente',
        createdAt: '2021-01-26T22:29:03.859Z',
        updatedAt: '2021-01-26T23:01:15.303Z',
      },
      {
        EmpresaId: 1,
        cod: '5121016',
        desc: 'Despesas Consultor',
        createdAt: '2021-01-26T22:33:11.537Z',
        updatedAt: '2021-01-26T23:02:52.703Z',
      },
      {
        EmpresaId: 1,
        cod: '5126013',
        desc: 'Manutencao',
        createdAt: '2021-01-26T22:29:39.176Z',
        updatedAt: '2021-01-26T23:09:54.367Z',
      },
      {
        EmpresaId: 1,
        cod: '5127001',
        desc: 'Ativo Imobilizado',
        createdAt: '2021-01-26T22:27:01.907Z',
        updatedAt: '2021-01-26T23:37:08.141Z',
      },
    ],
    centroCusto: [
      {
        EmpresaId: 1,
        cod: '000',
        desc: 'Sem Centro de Custo',
        createdAt: '2021-01-26T20:13:16.788Z',
        updatedAt: '2021-01-26T20:13:16.788Z',
      },
      {
        EmpresaId: 1,
        cod: '1010101',
        desc: 'Diretoria',
        createdAt: '2021-01-26T22:47:35.655Z',
        updatedAt: '2021-01-26T22:47:35.655Z',
      },
      {
        EmpresaId: 1,
        cod: '1010201',
        desc: 'Administrativo',
        createdAt: '2021-01-26T22:48:11.564Z',
        updatedAt: '2021-01-26T22:48:11.564Z',
      },
      {
        EmpresaId: 1,
        cod: '1010501',
        desc: 'Recursos Humanos',
        createdAt: '2021-01-26T22:48:27.525Z',
        updatedAt: '2021-01-26T22:48:27.525Z',
      },
      {
        EmpresaId: 1,
        cod: '1010601',
        desc: 'Servicos Gerais',
        createdAt: '2021-01-26T22:48:42.904Z',
        updatedAt: '2021-01-26T22:48:42.904Z',
      },
      {
        EmpresaId: 1,
        cod: '1030102',
        desc: 'Administracao de Vendas',
        createdAt: '2021-01-26T22:48:57.308Z',
        updatedAt: '2021-01-26T22:48:57.308Z',
      },
    ],
    recDesp: [
      {
        EmpresaId: 1,
        desc: 'Servico de Consultoria',
        recDesp: 'Rec',
        tipoItem: 'Receitas Operacionais',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T22:52:37.536Z',
        updatedAt: '2021-01-26T22:52:37.536Z',
      },
      {
        EmpresaId: 1,
        desc: 'Servicos de Tecnologia',
        recDesp: 'Rec',
        tipoItem: 'Receitas Operacionais',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T22:53:00.521Z',
        updatedAt: '2021-01-26T22:53:00.521Z',
      },
      {
        EmpresaId: 1,
        desc: 'Servicos de Desenvolvimento',
        recDesp: 'Rec',
        tipoItem: 'Receitas Operacionais',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T22:53:24.404Z',
        updatedAt: '2021-01-26T22:53:24.404Z',
      },
      {
        EmpresaId: 1,
        desc: 'DAS',
        recDesp: 'Desp',
        tipoItem: 'Impostos',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T22:55:52.681Z',
        updatedAt: '2021-01-26T22:55:52.681Z',
      },
      {
        EmpresaId: 1,
        desc: 'GPS',
        recDesp: 'Desp',
        tipoItem: 'Impostos',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T22:56:33.596Z',
        updatedAt: '2021-01-26T22:56:33.596Z',
      },
      {
        EmpresaId: 1,
        desc: 'IRRF',
        recDesp: 'Desp',
        tipoItem: 'Impostos',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T22:56:56.938Z',
        updatedAt: '2021-01-26T22:56:56.938Z',
      },
      {
        EmpresaId: 1,
        desc: 'Débito em Conta',
        recDesp: 'Desp',
        tipoItem: 'Ajuste de Saldo',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2022-01-19T01:19:02.386Z',
        updatedAt: '2022-01-19T01:19:02.386Z',
      },
      {
        EmpresaId: 1,
        desc: 'Celular',
        recDesp: 'Desp',
        tipoItem: 'Despesas Administrativas',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T23:08:01.960Z',
        updatedAt: '2021-01-26T23:08:01.960Z',
      },
      {
        EmpresaId: 1,
        desc: 'Cartorio',
        recDesp: 'Desp',
        tipoItem: 'Despesas Administrativas',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T23:08:41.511Z',
        updatedAt: '2021-01-26T23:08:41.511Z',
      },
      {
        EmpresaId: 1,
        desc: 'Currier',
        recDesp: 'Desp',
        tipoItem: 'Despesas Administrativas',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T23:09:01.949Z',
        updatedAt: '2021-01-26T23:09:01.949Z',
      },
      {
        EmpresaId: 1,
        desc: 'Manutencao de Sistemas',
        recDesp: 'Desp',
        tipoItem: 'Despesas Administrativas',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T23:10:16.581Z',
        updatedAt: '2021-01-26T23:10:16.581Z',
      },
      {
        EmpresaId: 1,
        desc: 'Manutencao de Equipamentos',
        recDesp: 'Desp',
        tipoItem: 'Despesas Administrativas',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T23:10:47.241Z',
        updatedAt: '2021-01-26T23:10:47.241Z',
      },
      {
        EmpresaId: 1,
        desc: 'Contrato Prospeccao',
        recDesp: 'Desp',
        tipoItem: 'Despesas Comerciais',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T23:12:42.399Z',
        updatedAt: '2021-01-26T23:12:42.399Z',
      },
      {
        EmpresaId: 1,
        desc: 'Contabilidade',
        recDesp: 'Desp',
        tipoItem: 'Despesas Administrativas',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T23:12:56.193Z',
        updatedAt: '2021-01-26T23:12:56.193Z',
      },
      {
        EmpresaId: 1,
        desc: 'Despesas Bancarias',
        recDesp: 'Desp',
        tipoItem: 'Despesas Administrativas',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T23:13:49.618Z',
        updatedAt: '2021-01-26T23:13:49.618Z',
      },
      {
        EmpresaId: 1,
        desc: 'Locacao de Automovies',
        recDesp: 'Desp',
        tipoItem: 'Despesas Administrativas',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T23:32:58.356Z',
        updatedAt: '2021-01-26T23:32:58.356Z',
      },
      {
        EmpresaId: 1,
        desc: 'Locacao de Salas',
        recDesp: 'Desp',
        tipoItem: 'Despesas Administrativas',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T23:33:24.529Z',
        updatedAt: '2021-01-26T23:33:24.529Z',
      },
      {
        EmpresaId: 1,
        desc: 'Treinamentos e Capacitações',
        recDesp: 'Desp',
        tipoItem: 'Despesas Administrativas',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2022-01-19T01:40:07.732Z',
        updatedAt: '2022-01-19T01:40:07.732Z',
      },
      {
        EmpresaId: 1,
        desc: 'Contrato Consultoria',
        recDesp: 'Desp',
        tipoItem: 'Despesas Operacionais',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T22:57:48.864Z',
        updatedAt: '2021-01-26T23:38:33.075Z',
      },
      {
        EmpresaId: 1,
        desc: 'Pacote de Horas',
        recDesp: 'Rec',
        tipoItem: 'Receitas Operacionais',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-27T00:07:51.119Z',
        updatedAt: '2021-01-27T00:07:51.119Z',
      },
      {
        EmpresaId: 1,
        desc: 'Venda de Software',
        recDesp: 'Rec',
        tipoItem: 'Receitas Operacionais',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-07-15T13:06:38.930Z',
        updatedAt: '2021-07-15T13:06:38.930Z',
      },
      {
        EmpresaId: 1,
        desc: 'Alimentacao',
        recDesp: 'Desp',
        tipoItem: 'Despesas Operacionais',
        lancFlag: true,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T23:06:26.330Z',
        updatedAt: '2022-01-19T00:42:45.629Z',
      },
      {
        EmpresaId: 1,
        desc: 'Quilometragem',
        recDesp: 'Desp',
        tipoItem: 'Despesas Operacionais',
        lancFlag: true,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T23:06:43.853Z',
        updatedAt: '2022-01-19T00:42:51.832Z',
      },
      {
        EmpresaId: 1,
        desc: 'Pedagio',
        recDesp: 'Desp',
        tipoItem: 'Despesas Operacionais',
        lancFlag: true,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T23:07:02.266Z',
        updatedAt: '2022-01-19T00:42:57.031Z',
      },
      {
        EmpresaId: 1,
        desc: 'Hospedagem',
        recDesp: 'Desp',
        tipoItem: 'Despesas Operacionais',
        lancFlag: true,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T23:07:30.957Z',
        updatedAt: '2022-01-19T00:43:02.852Z',
      },
      {
        EmpresaId: 1,
        desc: 'Estacionamento',
        recDesp: 'Desp',
        tipoItem: 'Despesas Operacionais',
        lancFlag: true,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2022-01-17T21:56:05.919Z',
        updatedAt: '2022-01-19T00:43:07.024Z',
      },
      {
        EmpresaId: 1,
        desc: 'Passagem',
        recDesp: 'Desp',
        tipoItem: 'Despesas Operacionais',
        lancFlag: true,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2022-01-17T21:57:17.236Z',
        updatedAt: '2022-01-19T00:43:11.973Z',
      },
      {
        EmpresaId: 1,
        desc: 'Benefícios Salariais',
        recDesp: 'Desp',
        tipoItem: 'Despesas Operacionais',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2022-01-19T01:08:51.371Z',
        updatedAt: '2022-01-19T01:08:51.371Z',
      },
      {
        EmpresaId: 1,
        desc: 'Crédito em Conta',
        recDesp: 'Rec',
        tipoItem: 'Ajuste de Saldo',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2022-01-19T01:18:15.009Z',
        updatedAt: '2022-01-19T01:18:15.009Z',
      },
      {
        EmpresaId: 1,
        desc: 'Comissao Recebida',
        recDesp: 'Rec',
        tipoItem: 'Receitas Comerciais',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2021-01-26T22:54:22.600Z',
        updatedAt: '2022-01-19T02:55:48.359Z',
      },
      {
        EmpresaId: 1,
        desc: 'Comissao Paga',
        recDesp: 'Desp',
        tipoItem: 'Despesas Comerciais',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2022-01-19T02:55:02.871Z',
        updatedAt: '2022-01-19T02:55:57.741Z',
      },
      {
        EmpresaId: 1,
        desc: 'Ação Social',
        recDesp: 'Desp',
        tipoItem: 'Despesas Administrativas',
        lancFlag: true,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2022-01-19T17:57:10.706Z',
        updatedAt: '2022-01-19T17:57:10.706Z',
      },
      {
        EmpresaId: 1,
        desc: 'Licenças e Taxas Municipais',
        recDesp: 'Desp',
        tipoItem: 'Despesas Administrativas',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2022-01-20T14:27:31.904Z',
        updatedAt: '2022-01-20T14:27:31.904Z',
      },
      {
        EmpresaId: 1,
        desc: 'Antecipacao de Lucros e Dividendos',
        recDesp: 'Desp',
        tipoItem: 'Despesas Administrativas',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2022-01-24T14:11:11.532Z',
        updatedAt: '2022-01-24T14:11:11.532Z',
      },
      {
        EmpresaId: 1,
        desc: 'Lucros e Dividendos',
        recDesp: 'Desp',
        tipoItem: 'Despesas Administrativas',
        lancFlag: false,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2022-01-24T14:11:42.277Z',
        updatedAt: '2022-01-24T14:11:42.277Z',
      },
      {
        EmpresaId: 1,
        desc: 'Telefonia',
        recDesp: 'Desp',
        tipoItem: 'Despesas Administrativas',
        lancFlag: true,
        ContaContabilId: 1,
        CentroCustoId: 1,
        createdAt: '2022-02-01T22:59:02.159Z',
        updatedAt: '2022-02-01T22:59:02.159Z',
      },
    ],
    condPgmto: [
      {
        EmpresaId: 1,
        cod: '000',
        diasPrazo: 0,
        desc: 'Condição Padrão',
        createdAt: '2021-01-26T20:13:16.793Z',
        updatedAt: '2021-01-26T20:13:16.793Z',
      },
      {
        EmpresaId: 1,
        cod: '10DD',
        diasPrazo: 10,
        desc: 'Dez Dias Direto',
        createdAt: '2021-01-26T20:37:37.238Z',
        updatedAt: '2021-01-26T20:37:37.238Z',
      },
      {
        EmpresaId: 1,
        cod: '15DD',
        diasPrazo: 15,
        desc: 'Quinze Dias Direto',
        createdAt: '2021-01-26T20:37:51.269Z',
        updatedAt: '2021-01-26T20:37:51.269Z',
      },
      {
        EmpresaId: 1,
        cod: '20DD',
        diasPrazo: 20,
        desc: 'Vinte Dias Direto',
        createdAt: '2021-01-26T20:38:04.720Z',
        updatedAt: '2021-01-26T20:38:04.720Z',
      },
      {
        EmpresaId: 1,
        cod: '30DD',
        diasPrazo: 30,
        desc: 'Trinta Dias Direto',
        createdAt: '2021-01-26T20:38:17.225Z',
        updatedAt: '2021-01-26T20:38:17.225Z',
      },
    ],
    tipoComiss: [
      {
        EmpresaId: 1,
        desc: '4',
        prcnt: 0,
        bsComiss: 4,
        createdAt: '2021-01-26T20:38:37.062Z',
        updatedAt: '2021-01-26T20:38:37.062Z',
      },
      {
        EmpresaId: 1,
        desc: '1',
        prcnt: 300,
        bsComiss: 3,
        createdAt: '2021-01-26T20:39:03.796Z',
        updatedAt: '2021-01-26T20:39:03.796Z',
      },
      {
        EmpresaId: 1,
        desc: '3',
        prcnt: 1000,
        bsComiss: 1,
        createdAt: '2021-01-26T20:39:25.487Z',
        updatedAt: '2021-01-26T20:39:25.487Z',
      },
    ],
    motivo: [
      {
        EmpresaId: 1,
        nome: 'RA01',
        valor: 'Reunião Agendada',
        createdAt: '2021-08-10T17:27:18.505Z',
        updatedAt: '2021-08-10T17:27:18.505Z',
      },
      {
        EmpresaId: 1,
        nome: 'RC01',
        valor: 'Reunião Cancelada - Cliente',
        createdAt: '2021-08-10T17:27:34.469Z',
        updatedAt: '2021-08-10T17:27:34.469Z',
      },
      {
        EmpresaId: 1,
        nome: 'RC02',
        valor: 'Reunião Cancelada - Aidera',
        createdAt: '2021-08-10T17:28:40.634Z',
        updatedAt: '2021-08-10T17:28:40.634Z',
      },
      {
        EmpresaId: 1,
        nome: 'OP01',
        valor: 'Oportunidade de Negócio',
        createdAt: '2021-08-10T17:29:04.695Z',
        updatedAt: '2021-08-10T17:29:04.695Z',
      },
      {
        EmpresaId: 1,
        nome: 'SI01',
        valor: 'Sem Interesse - Possui Similar',
        createdAt: '2021-08-10T17:29:42.743Z',
        updatedAt: '2021-08-10T17:29:42.743Z',
      },
      {
        EmpresaId: 1,
        nome: 'SI02',
        valor: 'Sem Interesse - Equipe Própria',
        createdAt: '2021-08-10T17:30:07.074Z',
        updatedAt: '2021-08-10T17:30:07.074Z',
      },
      {
        EmpresaId: 1,
        nome: 'SI03',
        valor: 'Sem Interesse - Atendido Pela Totvs',
        createdAt: '2021-08-10T17:30:58.151Z',
        updatedAt: '2021-08-10T17:30:58.151Z',
      },
      {
        EmpresaId: 1,
        nome: 'SI04',
        valor: 'Sem Interesse - Atendido Outra Consultoria',
        createdAt: '2021-08-10T17:31:11.695Z',
        updatedAt: '2021-08-10T17:31:11.695Z',
      },
      {
        EmpresaId: 1,
        nome: 'PP01',
        valor: 'Projetos Paralisados',
        createdAt: '2021-08-10T17:31:39.573Z',
        updatedAt: '2021-08-10T17:31:39.573Z',
      },
      {
        EmpresaId: 1,
        nome: 'CT01',
        valor: 'Contrato Realizado Pela Matriz',
        createdAt: '2021-08-10T17:33:22.584Z',
        updatedAt: '2021-08-10T17:33:22.584Z',
      },
      {
        EmpresaId: 1,
        nome: 'OS01',
        valor: 'Utiliza Outro ERP',
        createdAt: '2021-08-24T20:18:30.058Z',
        updatedAt: '2021-08-24T20:21:17.289Z',
      },
      {
        EmpresaId: 1,
        nome: 'AE01',
        valor: 'Apresentação Enviada',
        createdAt: '2021-08-24T20:21:00.718Z',
        updatedAt: '2021-08-24T20:21:28.429Z',
      },
      {
        EmpresaId: 1,
        nome: 'NL01',
        valor: 'Não Ligar - Entrará em Contato',
        createdAt: '2021-08-10T17:34:04.948Z',
        updatedAt: '2021-08-24T20:35:37.377Z',
      },
      {
        EmpresaId: 1,
        nome: 'NC01',
        valor: 'Não Estabelecido Contato',
        createdAt: '2021-10-06T15:42:39.445Z',
        updatedAt: '2021-10-06T15:42:39.445Z',
      },
    ],
    area: [
      {
        EmpresaId: 1,
        descArea: 'Manufatura',
        createdAt: '2021-01-26T23:40:39.672Z',
        updatedAt: '2021-01-26T23:40:39.672Z',
      },
      {
        EmpresaId: 1,
        descArea: 'Financeiro',
        createdAt: '2021-01-26T23:40:48.318Z',
        updatedAt: '2021-01-26T23:40:48.318Z',
      },
      {
        EmpresaId: 1,
        descArea: 'Recursos Humanos',
        createdAt: '2021-01-26T23:40:59.654Z',
        updatedAt: '2021-01-26T23:40:59.654Z',
      },
      {
        EmpresaId: 1,
        descArea: 'Controladoria',
        createdAt: '2021-01-26T23:41:14.925Z',
        updatedAt: '2021-01-26T23:41:14.925Z',
      },
      {
        EmpresaId: 1,
        descArea: 'Comercial',
        createdAt: '2021-01-26T23:41:42.370Z',
        updatedAt: '2021-01-26T23:41:42.370Z',
      },
      {
        EmpresaId: 1,
        descArea: 'Fiscal',
        createdAt: '2021-01-26T23:41:54.379Z',
        updatedAt: '2021-01-26T23:41:54.379Z',
      },
      {
        EmpresaId: 1,
        descArea: 'Suprimentos',
        createdAt: '2021-01-26T23:42:17.156Z',
        updatedAt: '2021-01-26T23:42:17.156Z',
      },
      {
        EmpresaId: 1,
        descArea: 'Geral',
        createdAt: '2021-01-27T00:10:48.985Z',
        updatedAt: '2021-01-27T00:10:48.985Z',
      },
    ],
    prodt: [
      {
        EmpresaId: 1,
        descProdt: 'Datasul',
        createdAt: '2021-01-26T23:42:37.648Z',
        updatedAt: '2021-01-26T23:42:37.648Z',
      },
      {
        EmpresaId: 1,
        descProdt: 'Tovo',
        createdAt: '2021-01-26T23:42:43.035Z',
        updatedAt: '2021-01-26T23:42:43.035Z',
      },
      {
        EmpresaId: 1,
        descProdt: 'Fluig',
        createdAt: '2021-01-26T23:42:47.829Z',
        updatedAt: '2021-01-26T23:42:47.829Z',
      },
      {
        EmpresaId: 1,
        descProdt: 'Sevia Supply',
        createdAt: '2021-07-15T13:05:19.407Z',
        updatedAt: '2021-10-07T19:27:57.077Z',
      },
      {
        EmpresaId: 1,
        descProdt: 'Sevia Docs',
        createdAt: '2021-10-07T19:28:05.914Z',
        updatedAt: '2021-10-07T19:28:05.914Z',
      },
    ],
    undNeg: [
      {
        EmpresaId: 1,
        descUndNeg: 'Totvs',
        createdAt: '2021-01-26T23:42:54.077Z',
        updatedAt: '2021-01-26T23:42:54.077Z',
      },
      {
        EmpresaId: 1,
        descUndNeg: 'Aidera',
        createdAt: '2021-01-26T23:42:58.096Z',
        updatedAt: '2021-01-26T23:42:58.096Z',
      },
      {
        EmpresaId: 1,
        descUndNeg: 'Sevia Plus',
        createdAt: '2021-07-15T13:07:35.731Z',
        updatedAt: '2021-07-15T13:07:35.731Z',
      },
    ],
    segmt: [
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Produção',
        createdAt: '2021-01-26T23:43:14.043Z',
        updatedAt: '2021-01-26T23:43:14.043Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Engenharia',
        createdAt: '2021-01-26T23:43:24.549Z',
        updatedAt: '2021-01-26T23:43:24.549Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Manutenção',
        createdAt: '2021-01-26T23:43:40.894Z',
        updatedAt: '2021-01-26T23:43:40.894Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Contas a Receber',
        createdAt: '2021-01-26T23:43:50.965Z',
        updatedAt: '2021-01-26T23:43:50.965Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Contas a Pagar',
        createdAt: '2021-01-26T23:44:02.174Z',
        updatedAt: '2021-01-26T23:44:02.174Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'eSocial',
        createdAt: '2021-01-26T23:44:39.801Z',
        updatedAt: '2021-01-26T23:44:39.801Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Folha de Pagamento',
        createdAt: '2021-01-26T23:44:54.622Z',
        updatedAt: '2021-01-26T23:44:54.622Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Beneficios',
        createdAt: '2021-01-26T23:45:11.100Z',
        updatedAt: '2021-01-26T23:45:11.100Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Ponto Eletronico',
        createdAt: '2021-01-26T23:45:21.823Z',
        updatedAt: '2021-01-26T23:45:21.823Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Orcamento',
        createdAt: '2021-01-26T23:44:27.910Z',
        updatedAt: '2021-01-26T23:45:34.580Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Contabilidade',
        createdAt: '2021-01-26T23:45:47.809Z',
        updatedAt: '2021-01-26T23:45:47.809Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Custos',
        createdAt: '2021-01-26T23:46:00.803Z',
        updatedAt: '2021-01-26T23:46:00.803Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Compras',
        createdAt: '2021-01-26T23:46:18.305Z',
        updatedAt: '2021-01-26T23:46:18.305Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Estoque',
        createdAt: '2021-01-26T23:46:28.419Z',
        updatedAt: '2021-01-26T23:46:28.419Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Vendas',
        createdAt: '2021-01-26T23:46:55.154Z',
        updatedAt: '2021-01-26T23:46:55.154Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Logistica',
        createdAt: '2021-01-26T23:47:07.627Z',
        updatedAt: '2021-01-26T23:47:07.627Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Obrigações Fiscais',
        createdAt: '2021-01-26T23:58:38.175Z',
        updatedAt: '2021-01-26T23:58:38.175Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Livros Fiscais',
        createdAt: '2021-01-26T23:58:58.675Z',
        updatedAt: '2021-01-26T23:58:58.675Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Geral',
        createdAt: '2021-01-27T00:11:05.224Z',
        updatedAt: '2021-01-27T00:11:05.224Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'CRM',
        createdAt: '2021-01-27T01:20:37.845Z',
        updatedAt: '2021-01-27T01:20:37.845Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Faturamento',
        createdAt: '2021-02-11T18:55:33.400Z',
        updatedAt: '2021-02-11T18:55:33.400Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Recebimento',
        createdAt: '2021-05-18T12:57:36.385Z',
        updatedAt: '2021-05-18T12:57:36.385Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Agendamento de Entregas',
        createdAt: '2021-07-15T13:11:40.994Z',
        updatedAt: '2021-07-15T13:11:40.994Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Portal de Boletos',
        createdAt: '2021-10-07T19:28:33.176Z',
        updatedAt: '2021-10-07T19:28:33.176Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Horas Complementares',
        createdAt: '2022-01-19T01:24:41.564Z',
        updatedAt: '2022-01-19T01:24:41.564Z',
      },
      {
        EmpresaId: 1,
        UndNegId: 1,
        ProdutoId: 1,
        AreaId: 1,
        descSegmt: 'Despesas Complementares',
        createdAt: '2022-02-01T22:55:47.046Z',
        updatedAt: '2022-02-01T22:55:47.046Z',
      },
    ],
    parametros: [
      {
        EmpresaId: 1,
        IRPJ: 45,
        CSLL: 39,
        COFINS: 153,
        PIS: 33,
        INSS: 486,
        ISS: 364,
        PSProLabor: 179322,
        IRRFProLabor: 121969,
        vlrMinHr: 10000,
        vlrBsHr: 6000,
        vlrBsDesp: 3000,
        adiantaPgmto: 'Sim',
        percAdiantaPgmto: 30,
        compHrs: 160,
        pgmtoVenc: 15,
        compFlag: true,
        RecDespCompHrs: 31,
        color: 'blue',
        createdAt: '2021-01-26T20:13:16.781Z',
        updatedAt: '2022-01-21T02:02:57.582Z',
      },
    ],
  };
  try {
    await User.create(data.user);
    await Empresa.create(data.empresa);
    for (let i = 0; i < data.contaContabil.length; i++) {
      await ContaContabils.create(data.contaContabil[i]);
    }
    for (let i = 0; i < data.centroCusto.length; i++) {
      await CentroCustos.create(data.centroCusto[i]);
    }
    for (let i = 0; i < data.recDesp.length; i++) {
      await RecDesp.create(data.recDesp[i]);
    }
    await Fornec.create(data.fornec);
    await Perfil.create(data.perfil);
    await Colab.create(data.colab);
    for (let i = 0; i < data.condPgmto.length; i++) {
      await CondPgmto.create(data.condPgmto[i]);
    }
    for (let i = 0; i < data.tipoComiss.length; i++) {
      await TipoComisse.create(data.tipoComiss[i]);
    }
    for (let i = 0; i < data.motivo.length; i++) {
      await CamposDinamicosProspect.create(data.motivo[i]);
    }
    for (let i = 0; i < data.area.length; i++) {
      await Area.create(data.area[i]);
    }
    for (let i = 0; i < data.prodt.length; i++) {
      await Produto.create(data.prodt[i]);
    }
    for (let i = 0; i < data.undNeg.length; i++) {
      await UndNeg.create(data.undNeg[i]);
    }
    for (let i = 0; i < data.segmt.length; i++) {
      await Segmento.create(data.segmt[i]);
    }
    for (let i = 0; i < data.parametros.length; i++) {
      await Parametros.create(data.parametros[i]);
    }
    return res.status(200).json('ok');
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// routes.get('/', importFromJSON.store);

routes.get('/comercialDash', comercialController.get);
routes.get('/gerencialDash', gerencialDashController.get);
routes.get('/clienteDash', clienteDashController.get);
routes.get('/financeiraDash_anual', financeiraController.getAnual);
routes.get('/financeiraDash_mensal', financeiraController.getMensal);
routes.post('/oportExcel', oportToExcel.store);

routes.post('/movCaixa', movimentoCaixaController.store);
routes.put('/movCaixa_liquid/', movimentoCaixaController.liquida);
routes.get('/movCaixa/table_liquid', movimentoCaixaController.getLiquid);
routes.get('/movCaixa/table_aberto', movimentoCaixaController.getAberto);
routes.delete('/movCaixa/:id', movimentoCaixaController.delete);

routes.post('/fechCaixa', fechamentoCaixaMensControler.store);

routes.post('/oportExcel', oportToExcel.store);
routes.post('/email', emailController.store);
routes.post('/emailResend/oport/cotacao', emailController.resendMail);
routes.post('/emailParams', emailParametrosController.store);
routes.get('/emailParams', emailParametrosController.get);
routes.put('/emailParams/:id', emailParametrosController.update);
routes.post('/files/oport/cotacao', uploadCotacao.array('file'), oportFileController.store, emailController.store);
routes.get('/download/oport/:method/:id', oportFileController.download);

routes.get('/notifications/:colabId', notificationsController.index);
routes.put('/notifications/:id', notificationsController.update);

routes.post('/liberaPeriodo', periodoTokenController.store);
routes.delete('/liberaPeriodo/:ColabId', periodoTokenController.delete);

routes.post('/resultPeriodo', resultPeriodoController.store);
routes.get('/resultPeriodo/:id?', resultPeriodoController.get);
routes.put('/resultPeriodo/:id?', resultPeriodoController.update);
routes.delete('/resultPeriodo/:id?', resultPeriodoController.delete);

routes.post('/resultPeriodoGerencial', resultPeriodoGerencialController.store);
routes.get('/resultPeriodoGerencial/:id?', resultPeriodoGerencialController.get);
routes.put('/resultPeriodoGerencial/:id?', resultPeriodoGerencialController.update);
routes.delete('/resultPeriodoGerencial/:id?', resultPeriodoGerencialController.delete);

routes.post('/fechamentoPeriodo', FechamentoPeriodoController.store);
routes.get('/fechamentoPeriodo/:id?', FechamentoPeriodoController.get);
routes.put('/fechamentoPeriodo/:id?', FechamentoPeriodoController.update);
routes.delete('/fechamentoPeriodo/:id?', FechamentoPeriodoController.delete);

routes.post('/contaContabil', contaContabilController.store);
routes.get('/contaContabil/:id?', contaContabilController.get);
routes.put('/contaContabil/:id?', contaContabilController.update);
routes.delete('/contaContabil/:id?', contaContabilController.delete);

routes.post('/centroCusto', centroCustosController.store);
routes.get('/centroCusto/:id?', centroCustosController.get);
routes.put('/centroCusto/:id?', centroCustosController.update);
routes.delete('/centroCusto/:id?', centroCustosController.delete);

routes.post('/oportunidade', oprtController.store);
routes.get('/oportunidade/:id?', oprtController.get);
routes.put('/oportunidade/:id', oprtController.update);
routes.post('/cotacao', uploadCotacao.array('file'), cotacaoController.store);
routes.get('/cotacao/:id?/:update?', cotacaoController.get);
routes.put('/cotacao/:id?', cotacaoController.update);
routes.post('/recurso', recursoController.store);
routes.get('/recurso/:id?/:update?', recursoController.get);
routes.put('/recurso/:id?', recursoController.update);
routes.delete('/recurso/:id?', recursoController.delete);
routes.post('/parcela', parcelaController.store);
routes.get('/parcela_ped/:oportId/', parcelaController.buscaPedCli);
routes.get('/parcela/:id?/:update?', parcelaController.get);
routes.put('/parcela/:id?', parcelaController.update);
routes.put('/parcela_fatura/:id?', parcelaController.fatura);
routes.put('/parcela_pgmto/:id?', parcelaController.pagamento);
routes.delete('/parcela/:id?', parcelaController.delete);

routes.post('/horas', horasController.store);
routes.get('/horas/:id?', horasController.get);
routes.put('/horas/:id?', horasController.update);
routes.delete('/horas/:id?', horasController.delete);
routes.post('/despesas', despesasController.store);
routes.get('/despesas/:id?', despesasController.get);
routes.put('/despesas/:id?', despesasController.update);
routes.delete('/despesas/:id?', despesasController.delete);

routes.get('/cliente/export', clienteRelatoriosController.exportResume);

routes.post('/followUp', followUpController.store);
routes.post('/followUp/meeting', followUpController.meeting);
routes.get('/followUp/:id/:update', followUpController.get);
routes.put('/followUp/:id', followUpController.update);
routes.delete('/followUp/:id', followUpController.delete);
routes.post('/campanha', campanhaController.store);
routes.post('/campanha/relate', campanhaController.relateNewCli);
routes.get('/campanha/:id?/:update?', campanhaController.get);
routes.put('/campanha/:id', campanhaController.update);
routes.delete('/campanha/:id', campanhaController.delete);
routes.post('/camposDinamicos', campoDinamicosProspectController.store);
routes.get('/camposDinamicos/:id?/:update?', campoDinamicosProspectController.get);
routes.put('/camposDinamicos/:id', campoDinamicosProspectController.update);
routes.delete('/camposDinamicos/:id', campoDinamicosProspectController.delete);
routes.post('/prospect', prospectController.store);
routes.post('/cliente', clienteController.store);
routes.get('/cliente/:id?', clienteController.get);
routes.put('/cliente/:id', clienteController.update);
routes.delete('/cliente/:id', clienteController.delete);
routes.post('/cliente/complem', cliCompController.store);
routes.put('/cliente/complem/:id', cliCompController.update);
routes.get('/cliente/complem/:id/:update?', cliCompController.get);
routes.post('/cliente/rec_desp', cliRecDespController.store);
routes.get('/cliente/rec_desp/:id/:update?', cliRecDespController.get);
routes.put('/cliente/rec_desp/:id', cliRecDespController.update);
routes.post('/cliente/cont', cliContController.store);
routes.get('/cliente/cont/:id?/:update?', cliContController.get);
routes.put('/cliente/cont/:id', cliContController.update);
routes.delete('/cliente/cont/:id', cliContController.delete);

routes.post('/empresa', empresaController.store);
routes.put('/empresa/:id', empresaController.update);
routes.get('/empresa/:id?', empresaController.get);

routes.post('/users', userController.store);
routes.get('/users/:id?', userController.get);
routes.put('/users/:id', userController.update);
routes.put('/users_pass', userController.forgotPass);
routes.delete('/users/:id', userController.delete);
routes.post('/sessions', sessionController.store);

routes.post('/colab', colabController.store);
routes.get('/colab/:id?', colabController.get);
routes.put('/colab/:id', colabController.update);
routes.delete('/colab/:id', colabController.delete);
routes.post('/colab/comp', colabCompController.store);
routes.get('/colab/comp/:id/:update?', colabCompController.get);
routes.put('/colab/comp/:id', colabCompController.update);

routes.post('/representante', representanteController.store);
routes.get('/representante/:id?', representanteController.get);
routes.put('/representante/:id', representanteController.update);
routes.delete('/representante/:id', representanteController.delete);

routes.post('/fornec', fornecController.store);
routes.get('/fornec/:id?', fornecController.get);
routes.put('/fornec/:id', fornecController.update);
routes.delete('/fornec/:id', fornecController.delete);

routes.post('/area', areaController.store);
routes.get('/area/:id?', areaController.get);
routes.put('/area/:id', areaController.update);
routes.delete('/area/:id', areaController.delete);

routes.post('/und_neg', undNegController.store);
routes.get('/und_neg/:id?', undNegController.get);
routes.put('/und_neg/:id', undNegController.update);
routes.delete('/und_neg/:id', undNegController.delete);

routes.post('/prodt', prodtController.store);
routes.get('/prodt/:id?', prodtController.get);
routes.put('/prodt/:id', prodtController.update);
routes.delete('/prodt/:id', prodtController.delete);

routes.post('/segmento', segmentoController.store);
routes.get('/segmento/:id?', segmentoController.get);
routes.put('/segmento/:id', segmentoController.update);
routes.delete('/segmento/:id', segmentoController.delete);

routes.post('/rec_desp', recDespController.store);
routes.get('/rec_desp/:id?', recDespController.get);
routes.put('/rec_desp/:id', recDespController.update);
routes.delete('/rec_desp/:id', recDespController.delete);

routes.post('/condPgmto', condPgmtoController.store);
routes.get('/condPgmto/:id?', condPgmtoController.get);
routes.put('/condPgmto/:id', condPgmtoController.update);
routes.delete('/condPgmto/:id', condPgmtoController.delete);

routes.post('/tipoComiss', tipoComissController.store);
routes.get('/tipoComiss/:id?', tipoComissController.get);
routes.put('/tipoComiss/:id', tipoComissController.update);
routes.delete('/tipoComiss/:id', tipoComissController.delete);

routes.post('/perfil', perfilController.store);
routes.get('/perfil/:id?', perfilController.get);
routes.put('/perfil/:id', perfilController.update);
routes.delete('/perfil/:id', perfilController.delete);

routes.post('/parametros', parametrosController.store);
routes.get('/parametros/:id?', parametrosController.get);
routes.put('/parametros/:id', parametrosController.update);

export default routes;
