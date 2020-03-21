import * as Yup from 'yup';
import Symptom from '../models/Symptom';

class SymptomController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails!' });
      }

      const symptom = await Symptom.create(req.body);

      return res.json(symptom);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async index(req, res) {
    try {
      const symptoms = await Symptom.findAll({
        where: {
          active: true,
        },
      });

      return res.json(symptoms);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async update(req, res) {
    try {
      const symptom = await Symptom.findByPk(req.params.id);

      const response = await symptom.update(req.body);

      return res.json(response);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async destroy(req, res) {
    try {
      const symptom = await Symptom.findByPk(req.params.id);

      const response = await symptom.update({ active: false });

      return res.json(response);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }
}

export default new SymptomController();
