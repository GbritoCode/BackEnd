import { Router } from 'express';

import multer from 'multer';
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
import clienteRelatoriosController from './app/controllers/ClienteControllers/clienteRelatoriosController';
import oportToExcel from './app/controllers/oprtControllers/oportToExcel';

// import authMiddleware from './app/middleware/auth';

const routes = new Router();

const uploadCotacao = multer(oportunidadeFile);

routes.get('/', (req, res) => res.send('okok'));

routes.get('/comercialDash', comercialController.get);

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
routes.get('/parcela/:id?/:update?', parcelaController.get);
routes.put('/parcela/:id?', parcelaController.update);
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
