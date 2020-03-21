import * as Yup from 'yup';
import Citizen from '../models/Citizen';
import Situation from '../models/Situation';

class CitizenController {
  async store(req, res) {
    try {
      const isExists = await Citizen.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (isExists) {
        return res.status(400).json({ error: 'Endereço de email já em uso!' });
      }

      const user = await Citizen.create(req.body);

      return res.json(user);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async index(req, res) {
    try {
      const users = await Citizen.findAll({
        attributes: [
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
        where: {
          deleted_at: null,
        },
        include: [
          {
            model: Situation,
            as: 'situation',
            attributes: ['id', 'name'],
          },
        ],
      });

      return res.json(users);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }
}

export default new CitizenController();

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
