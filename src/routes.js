import { Router } from 'express';

import clienteController from './app/controllers/ClienteControllers/ClienteController.js';
import cliCompController from './app/controllers/ClienteControllers/Cliente_Comp.js';
import cliRecDespController from './app/controllers/ClienteControllers/Cli_rec_desp.js';
import cliContController from './app/controllers/ClienteControllers/Cli_Cont.js';

import empController from './app/controllers/EmpController.js';
import empresaController from './app/controllers/EmpresaController.js';

import userController from './app/controllers/UserController.js';
import sessionController from './app/controllers/sessionController.js';

import colabController from './app/controllers/ColabControllers/ColabController.js';
import colabCompController from './app/controllers/ColabControllers/ColabCompController.js';

import representanteController from './app/controllers/RepresentanteController.js';

import fornecController from './app/controllers/FornecController.js';

import areaController from './app/controllers/AreaController.js';

import segmentoController from './app/controllers/SegmentoController.js';

import undNegController from './app/controllers/UndNegController.js';

import itmControleController from './app/controllers/ItmControleController.js';

import prodtController from './app/controllers/ProdtController.js';

import recDespController from './app/controllers/auxControllers/RecDespController.js';
import condPgmtoController from './app/controllers/auxControllers/condPgmtoController.js';
import tipoComissController from './app/controllers/auxControllers/tipoComissController.js';
import perfilController from './app/controllers/auxControllers/perfilController.js';

import parametrosController from './app/controllers/ParametrosController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

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

routes.post('/emp', empController.store);
routes.post('/empresa', empresaController.store);
routes.put('/empresa/:id', empresaController.update);
routes.get('/empresa/:id?', empresaController.get);

routes.post('/users', userController.store);
routes.get('/users', userController.get);
routes.post('/sessions', sessionController.store);

routes.post('/colab', colabController.store);
routes.get('/colab/:id?', colabController.get);
routes.put('/colab/:id', colabController.update);
routes.post('/colab/comp', colabCompController.store);
routes.get('/colab/comp/:id/:update?', colabCompController.get);
routes.put('/colab/comp/:id', colabCompController.update);

routes.post('/representante', representanteController.store);
routes.get('/representante/:id?', representanteController.get);
routes.put('/representante/:id', representanteController.update);

routes.post('/fornec', fornecController.store);
routes.get('/fornec/:id?', fornecController.get);
routes.put('/fornec/:id', fornecController.update);

routes.post('/area', areaController.store);
routes.get('/area/:id?', areaController.get);
routes.put('/area/:id', areaController.update);

routes.post('/und_neg', undNegController.store);
routes.get('/und_neg/:id?', undNegController.get);
routes.put('/und_neg/:id', undNegController.update);

routes.post('/prodt', prodtController.store);
routes.get('/prodt/:id?', prodtController.get);
routes.put('/prodt/:id', prodtController.update);

routes.post('/segmento', segmentoController.store);
routes.get('/segmento/:id?', segmentoController.get);
routes.put('/segmento/:id', segmentoController.update);

routes.post('/itm_controle', itmControleController.store);
routes.get('/itm_controle/:id?', itmControleController.get);
routes.put('/itm_controle/:id', itmControleController.update);

routes.post('/rec_desp', recDespController.store);
routes.get('/rec_desp/:id?', recDespController.get);
routes.put('/rec_desp/:id', recDespController.update);

routes.post('/condPgmto', condPgmtoController.store);
routes.get('/condPgmto/:id?', condPgmtoController.get);
routes.put('/condPgmto/:id', condPgmtoController.update);

routes.post('/tipoComiss', tipoComissController.store);
routes.get('/tipoComiss/:id?', tipoComissController.get);
routes.put('/tipoComiss/:id', tipoComissController.update);

routes.post('/perfil', perfilController.store);
routes.get('/perfil/:id?', perfilController.get);
routes.put('/perfil/:id', perfilController.update);

routes.post('/parametros', parametrosController.store);
routes.get('/parametros/:id?', parametrosController.get);
routes.put('/parametros/:id', parametrosController.update);

routes.put('/users', userController.update);

export default routes;
