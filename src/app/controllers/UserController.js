import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
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

      const isExists = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (isExists) {
        return res
          .status(400)
          .json({ error: 'Já existe um usuário com este endereço de email!' });
      }

      const user = await User.create(req.body);

      return res.json(user);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
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

    const { email, oldPassword } = req.body;

    // userId passado pelo middleware
    const user = await User.findByPk(req.userId);
    // console.log(email, user.email);

    if (email !== user.email) {
      const isExists = await User.findOne({
        where: { email },
      });

      if (isExists) {
        return res
          .status(400)
          .json({ error: 'Já existe um usuário com este endereço de email!' });
      }
    }

    if (
      oldPassword &&
      !(await User.checkPassword(oldPassword, user.password_hash))
    ) {
      return res.status(401).json({ error: 'Senha nâo confere!' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async show(req, res) {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email'],
    });

    return res.json(user);
  }

  async destory(req, res) {
    const user = await User.findByPk(req.params.id);

    const { deleted_at, name, email } = await user.update({
      deleted_at: new Date(),
    });
    return res.json({ deleted_at, name, email });
  }

  async index(req, res) {
    const user = await User.findAll({
      where: {
        deleted_at: null,
      },
      attributes: ['id', 'name', 'email'],
      order: [['id', 'asc']],
    });

    return res.json(user);
  }
}

export default new UserController();
