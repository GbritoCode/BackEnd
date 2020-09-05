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

import recDespController from './app/controllers/RecDespController.js';

import parametrosController from './app/controllers/ParametrosController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/cliente', clienteController.store);
routes.get('/cliente/:id?', clienteController.get);
routes.put('/cliente/:id', clienteController.update);
routes.post('/cliente/complem', cliCompController.store);
routes.get('/cliente/complem/:id', cliCompController.get);
routes.post('/cliente/rec_desp', cliRecDespController.store);
routes.get('/cliente/rec_desp', cliRecDespController.get);
routes.post('/cliente/cont', cliContController.store);
routes.get('/cliente/cont/:id', cliContController.get);
routes.put('/cliente/cont/:id', cliContController.update);

routes.post('/emp', empController.store);
routes.post('/empresa', empresaController.store);
routes.get('/empresa', empresaController.get);

routes.post('/users', userController.store);
routes.post('/sessions', sessionController.store);

routes.post('/colab', colabController.store);
routes.get('/colab', colabController.get);
routes.post('/colab/comp', colabCompController.store);
routes.get('/colab/comp', colabCompController.get);

routes.post('/representante', representanteController.store);
routes.get('/representante', representanteController.get);

routes.post('/fornec', fornecController.store);
routes.get('/fornec', fornecController.get);

routes.post('/area', areaController.store);
routes.get('/area', areaController.get);

routes.post('/und_neg', undNegController.store);
routes.get('/und_neg', undNegController.get);

routes.post('/prodt', prodtController.store);
routes.get('/prodt', prodtController.get);

routes.post('/segmento', segmentoController.store);
routes.get('/segmento', segmentoController.get);

routes.post('/itm_controle', itmControleController.store);
routes.get('/itm_controle', itmControleController.get);

routes.post('/rec_desp', recDespController.store);
routes.get('/rec_desp', recDespController.get);

routes.post('/parametros', parametrosController.store);
routes.get('/parametros', parametrosController.get);

routes.put('/users', userController.update);

export default routes;
