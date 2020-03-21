import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import Citizen from '../models/Citizen';
import authConfig from '../../config/auth';

class SessionCitizenController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.string(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { cpf, password } = req.body;

    const isExists = await Citizen.findOne({
      where: {
        cpf,
        deleted_at: null,
      },
    });

    if (!isExists) {
      return res.status(401).json({ error: 'User not found!' });
    }

    if (!(await Citizen.checkPassword(password, isExists.password_hash))) {
      return res.status(401).json({ error: 'Senha não confere!' });
    }

    const { id, name } = isExists;

    return res.json({
      citizen: { id, name, cpf },
      token: jwt.sign({ id, type: 'CLIENT' }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionCitizenController();
