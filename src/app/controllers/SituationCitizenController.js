import * as Yup from 'yup';
import Citizen from '../models/Citizen';
import Situation from '../models/Situation';
import DataCollected from '../models/DataCollected';

class SituationCitizenController {
  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        situation_id: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails!' });
      }

      const { situation_id } = req.body;
      const { id } = req.params;

      const situation = await Situation.findOne({
        where: {
          id: situation_id,
          active: true,
        },
      });

      if (!situation) {
        return res.status(400).json({ error: 'Situção inválida!' });
      }

      const user = await Citizen.findOne({
        where: {
          id,
          deleted_at: null,
        },
      });

      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado!' });
      }

      const { name, cpf, contact } = await user.update({ situation_id });

      return res.json({ name, cpf, contact, situation_id });
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }
}

export default new SituationCitizenController();
