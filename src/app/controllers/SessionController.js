import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { email, password } = req.body;

    const isExists = await User.findOne({
      where: {
        email,
      },
    });

    if (!isExists) {
      res.status(401).json({ error: 'User not found!' });
    }

    if (!(await User.checkPassword(password, isExists.password_hash))) {
      res.status(401).json({ error: 'Password does not match!' });
    }

    const { id, name } = isExists;

    return res.json({
      user: { id, name, email },
      token: jwt.sign({ id, type: 'ADMIN' }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
