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
          .min(6),
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
        return res.status(400).json({ error: 'User is exists!' });
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
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
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
        return res.status(400).json({ error: 'User is exists!' });
      }
    }

    if (
      oldPassword &&
      !(await User.checkPassword(oldPassword, user.password_hash))
    ) {
      return res.status(401).json({ error: 'Password does not match!' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
