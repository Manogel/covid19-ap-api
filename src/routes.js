import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import CitizenController from './app/controllers/CitizenController';
import SituationController from './app/controllers/SituationController';
import SymptomController from './app/controllers/SymptomController';
import SessionController from './app/controllers/SessionController';
import SessionCitizenController from './app/controllers/SessionCitizenController';
import TipController from './app/controllers/TipController';
import CollectSymptomsController from './app/controllers/CollectSymptomsController';
import SymptomsCollectedController from './app/controllers/SymptomsCollectedController';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';
import uploadConfig from './config/upload';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);
routes.post('/sessions/citizens', SessionCitizenController.store);

routes.post('/users', UserController.store);

routes.post('/citizens', CitizenController.store);

routes.get('/situations', SituationController.index);

routes.post('/symptoms', SymptomController.store);
routes.get('/symptoms', SymptomController.index);

routes.get('/tips', TipController.index);
routes.get('/tips/sus', TipController.sus);

routes.post('/citizens/:id/collect_symptoms', CollectSymptomsController.store);

routes.get('/symptoms_collected', SymptomsCollectedController.index);
routes.get('/symptoms_collected/:id', SymptomsCollectedController.show);
routes.delete('/symptoms_collected/:id', SymptomsCollectedController.destroy);

routes.use(authMiddleware);

routes.put('/citizens', CitizenController.update);
routes.get('/citizens/:id', CitizenController.show);
routes.get('/citizens', CitizenController.index);

routes.use(adminMiddleware);

routes.delete('/citizens/:id', CitizenController.destroy);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.get('/users/:id', UserController.show);
routes.delete('/users/:id', UserController.destory);

routes.post('/situations', SituationController.store);
routes.put('/situations/:id', SituationController.update);
routes.delete('/situations/:id', SituationController.destroy);

routes.put('/symptoms/:id', SymptomController.update);
routes.delete('/symptoms/:id', SymptomController.destroy);

routes.post('/tips', upload.single('file'), TipController.store);
routes.put('/tips/:id', TipController.update);
routes.delete('/tips/:id', TipController.destroy);

export default routes;
