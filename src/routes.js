import { Router } from 'express';
import multer from 'multer';

import CitizenController from './app/controllers/CitizenController';
import SituationController from './app/controllers/SituationController';
import SymptomController from './app/controllers/SymptomController';
import SessionController from './app/controllers/SessionController';
import SessionCitizenController from './app/controllers/SessionCitizenController';
import TipController from './app/controllers/TipController';
import CollectSymptomsController from './app/controllers/CollectSymptomsController';
import SymptomsCollectedController from './app/controllers/SymptomsCollectedController';

import authMiddleware from './app/middlewares/auth';
import uploadConfig from './config/upload';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.post('/sessions/citizens', SessionCitizenController.store);

routes.post('/citizens', CitizenController.store);
routes.get('/citizens', CitizenController.index);
routes.delete('/citizens/:id', CitizenController.destroy);
routes.get('/citizens/:id', CitizenController.show);

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

routes.post('/citizens/:id/collect_symptoms', CollectSymptomsController.store);

routes.get('/symptoms_collected', SymptomsCollectedController.index);
routes.get('/symptoms_collected/:id', SymptomsCollectedController.show);
routes.delete('/symptoms_collected/:id', SymptomsCollectedController.destroy);

routes.use(authMiddleware);
// Rotas privadas apartir daqui

routes.put('/citizens', CitizenController.update);

export default routes;
