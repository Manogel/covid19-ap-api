import * as Yup from 'yup';
import DataCollected from '../models/DataCollected';

class FeedbackSituationCitizenController {
  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        feedback: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails!' });
      }

      const { feedback } = req.body;
      const { id } = req.params;

      const symptomColected = await DataCollected.findOne({
        where: {
          id,
          deleted_at: null,
        },
      });

      if (!symptomColected) {
        return res.status(400).json({ error: 'Dados não existentes!' });
      }

      const response = await symptomColected.update({
        feedback,
        user_feedback: req.userId,
      });

      return res.json(response);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const symptomColected = await DataCollected.findOne({
        where: {
          id,
          deleted_at: null,
        },
      });

      if (!symptomColected) {
        return res.status(400).json({ error: 'Dados inexistentes!' });
      }

      const response = await symptomColected.update({
        feedback: null,
        user_feedback: null,
      });

      return res.json(response);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }
}

export default new FeedbackSituationCitizenController();
