import * as Yup from 'yup';
import { Op } from 'sequelize';
import Symptom from '../models/Symptom';
import DataCollected from '../models/DataCollected';
import Citizen from '../models/Citizen';

class CollectSymptomsController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        observation: Yup.string(),
        symptoms: Yup.array(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails!' });
      }

      const { id: citizen_id } = req.params;
      const { observation, symptoms } = req.body;

      const user = await Citizen.findByPk(citizen_id);

      if (!user) {
        return res.status(400).json({
          error: 'Usuário nâo encontrado!',
        });
      }

      const dataCollected = await DataCollected.create({
        citizen_id,
        observation,
      });

      const symptomCollected = await Symptom.findAll({
        where: {
          id: {
            [Op.in]: symptoms,
          },
        },
      });

      const symptomsCollected = await dataCollected.addSymptoms(
        symptomCollected
      );

      return res.json(symptomsCollected);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async index(req, res) {
    try {
      const symptomCollected = await DataCollected.findByPk(req.params.id, {
        where: {
          deleted_at: null,
        },
        include: [
          {
            model: Symptom,
            as: 'symptoms',
            attributes: ['id', 'name', 'probable', 'active'],
          },
        ],
      });

      return res.json(symptomCollected);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }
}

export default new CollectSymptomsController();
