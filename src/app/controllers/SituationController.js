import * as Yup from 'yup';
import Situation from '../models/Situation';

class SituationController {
  async store(req, res) {
    try {
      const situation = await Situation.create(req.body);

      return res.json(situation);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async index(req, res) {
    try {
      const situations = await Situation.findAll({
        where: {
          active: true,
        },
      });

      return res.json(situations);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }
}

export default new SituationController();

/*  const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .required()
          .min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails!' });
      }
 */
