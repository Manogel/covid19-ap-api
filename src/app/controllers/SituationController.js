import * as Yup from 'yup';
import Situation from '../models/Situation';

class SituationController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails!' });
      }

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
        attributes: ['id', 'name', 'active'],
        order: [['id', 'asc']],
      });

      return res.json(situations);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async update(req, res) {
    try {
      const situation = await Situation.findByPk(req.params.id);

      const response = await situation.update(req.body);

      return res.json(response);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async destroy(req, res) {
    try {
      const situation = await Situation.findByPk(req.params.id);

      const response = await situation.update({ active: false });

      return res.json(response);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }
}

export default new SituationController();
