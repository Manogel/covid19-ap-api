import * as Yup from 'yup';
import { or } from 'sequelize';
import Citizen from '../models/Citizen';
import Situation from '../models/Situation';
import Symptom from '../models/Symptom';
import DataCollected from '../models/DataCollected';

class CitizenController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        contact: Yup.string().required(),
        cpf: Yup.string().required(),
        birthday: Yup.string().required(),
        sex: Yup.string().required(),
        address: Yup.string().required(),
        suspicious_contact: Yup.boolean().required(),
        confirmed_contact: Yup.boolean().required(),
        been_outside: Yup.boolean().required(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .required()
          .min(4),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails!' });
      }

      const isExists = await Citizen.findOne({
        where: or({ cpf: req.body.cpf }, { email: req.body.email }),
      });

      if (isExists) {
        const target_error =
          isExists.email === req.body.email ? 'email' : 'cpf';
        return res
          .status(400)
          .json({ error: `Endereço de ${target_error} já em uso!` });
      }

      const user = await Citizen.create({ ...req.body, situation_id: 1 });

      const response = await Citizen.findByPk(user.id, {
        attributes: [
          'id',
          'name',
          'social_name',
          'latitude',
          'longitude',
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
            required: false,
          },
        ],
      });

      return res.json(response);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async index(req, res) {
    try {
      const users = await Citizen.findAll({
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
          'createdAt',
          'updatedAt',
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
        order: [['id', 'asc']],
      });

      return res.json(users);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async show(req, res) {
    try {
      const user = await Citizen.findOne({
        attributes: [
          'id',
          'name',
          'social_name',
          'latitude',
          'longitude',
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
          id: req.params.id,
        },
        include: [
          {
            model: Situation,
            as: 'situation',
            attributes: ['id', 'name'],
            required: false,
          },
          {
            model: DataCollected,
            as: 'last_data_collection',
            required: false,
            attributes: ['id', 'observation', 'createdAt'],
            order: [['id', 'desc']],
            include: [
              {
                model: Symptom,
                as: 'symptoms',
                required: true,
                attributes: ['id', 'name', 'probable'],
                through: { attributes: [] },
              },
            ],
          },
        ],
        order: [['last_data_collection', 'id', 'desc']],
      });

      if (!user) {
        return res.status(400).json({
          error: 'Usuário nâo encontrado!',
        });
      }

      return res.json(user);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        contact: Yup.string(),
        cpf: Yup.string(),
        birthday: Yup.string(),
        sex: Yup.string(),
        address: Yup.string(),
        suspicious_contact: Yup.boolean(),
        confirmed_contact: Yup.boolean(),
        been_outside: Yup.boolean(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(4),
        password: Yup.string()
          .min(4)
          .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails!' });
      }

      const { email, cpf, oldPassword } = req.body;

      const user = await Citizen.findByPk(req.userId);

      if (email !== user.email) {
        const isExists = await Citizen.findOne({
          where: { email },
        });

        if (isExists) {
          return res.status(400).json({
            error: 'Email já esta sendo utilizado por outro usuário!',
          });
        }
      }

      if (cpf !== user.cpf) {
        const isExists = await Citizen.findOne({
          where: { cpf },
        });

        if (isExists) {
          return res.status(400).json({
            error: 'CPF já esta sendo utilizado por outro usuário!',
          });
        }
      }

      if (
        oldPassword &&
        !(await Citizen.checkPassword(oldPassword, user.password_hash))
      ) {
        return res
          .status(401)
          .json({ error: 'Esta senha não coincide com este usuário!' });
      }

      const response = await user.update(req.body);

      return res.json(response);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const user = await Citizen.findByPk(id);

      const { name, cpf, deleted_at } = await user.update({
        deleted_at: new Date(),
      });

      return res.json({ name, cpf, deleted_at });
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }
}

export default new CitizenController();
