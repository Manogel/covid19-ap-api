import { Router } from 'express';
import multer from 'multer';

import CitizenController from './app/controllers/CitizenController';
import SituationController from './app/controllers/SituationController';
import SymptomController from './app/controllers/SymptomController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import SessionCitizenController from './app/controllers/SessionCitizenController';
import TipController from './app/controllers/TipController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';
import uploadConfig from './config/upload';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.post('/sessions/citizens', SessionCitizenController.store);

routes.post('/citizens', CitizenController.store);
routes.get('/citizens', CitizenController.index);
routes.delete('/citizens/:id', CitizenController.destroy);

routes.post('/situations', SituationController.store);
routes.put('/situations/:id', SituationController.update);
routes.delete('/situations/:id', SituationController.destroy);
routes.get('/situations', SituationController.index);

routes.post('/symptoms', SymptomController.store);
routes.put('/symptoms/:id', SymptomController.update);
routes.delete('/symptoms/:id', SymptomController.destroy);
routes.get('/symptoms', SymptomController.index);

routes.post('/tips', upload.single('file'), TipController.store);
routes.put('/tips/:id', TipController.update);
routes.delete('/tips/:id', TipController.destroy);
routes.get('/tips', TipController.index);

routes.post('/users', UserController.store);

routes.post('/files', upload.single('file'), FileController.store);

//routes.use(authMiddleware);
// Rotas privadas apartir daqui
routes.put('/users', UserController.update);

routes.put('/citizens', CitizenController.update);

export default routes;
