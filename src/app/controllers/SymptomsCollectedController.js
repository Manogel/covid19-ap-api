import { fn, col } from 'sequelize';
import Symptom from '../models/Symptom';
import DataCollected from '../models/DataCollected';
import Citizen from '../models/Citizen';
import Situation from '../models/Situation';

class SymptomsCollectedController {
  async index(req, res) {
    try {
      const symptomCollected = await DataCollected.findAll({
        where: {
          deleted_at: null,
        },
        order: [['created_at', 'desc']],
        attributes: [
          'id',
          'observation',
          'created_at',
          // [fn('COUNT', col('Symptom.id'))],
        ],
        include: [
          {
            model: Symptom,
            as: 'symptoms',
            attributes: ['name'],
            through: { attributes: [] },
          },
          {
            model: Citizen,
            as: 'citizen',
            attributes: ['id', 'name', 'cpf', 'birthday', 'sex'],

            include: [
              {
                model: Situation,
                as: 'situation',
                attributes: ['name'],
              },
            ],
          },
        ],
      });

      return res.json(symptomCollected);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async show(req, res) {
    try {
      const symptomCollected = await DataCollected.findOne({
        where: {
          deleted_at: null,
          id: req.params.id,
        },

        attributes: ['id', 'observation', 'created_at'],
        include: [
          {
            model: Symptom,
            as: 'symptoms',
            attributes: ['id', 'name', 'probable', 'active'],
            through: { attributes: [] },
          },
          {
            model: Citizen,
            as: 'citizen',
            attributes: [
              'id',
              'name',
              'social_name',
              'email',
              'contact',
              'cpf',
              'birthday',
              'sex',
              'address',
              'confirmed_contact',
              'suspicious_contact',
              'been_outside',
            ],

            include: [
              {
                model: Situation,
                as: 'situation',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      });

      if (!symptomCollected) {
        return res.status(400).json({ error: 'Laudo nâo encontrado' });
      }

      return res.json(symptomCollected);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async destroy(req, res) {
    try {
      const symptomCollected = await DataCollected.findOne({
        where: {
          deleted_at: null,
          id: req.params.id,
        },
      });

      if (!symptomCollected) {
        return res.status(400).json({ error: 'Laudo nâo encontrado' });
      }

      const response = await symptomCollected.update({
        deleted_at: new Date(),
      });

      return res.json(response);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }
}

export default new SymptomsCollectedController();
