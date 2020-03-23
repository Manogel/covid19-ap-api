import * as Yup from 'yup';
import axios from 'axios';
import Tip from '../models/Tip';

class TipController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        introduction: Yup.string().required(),
        description: Yup.string().required(),
        link: Yup.string().url(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails!' });
      }
      const { filename: path } = req.file;

      const tip = await Tip.create({ file: path, ...req.body });

      return res.json(tip);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string(),
        introduction: Yup.string(),
        description: Yup.string(),
        link: Yup.string().url(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails!' });
      }

      const tip = await Tip.findByPk(req.params.id);

      const response = await tip.update(req.body);

      return res.json(response);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async destroy(req, res) {
    try {
      const tip = await Tip.findByPk(req.params.id);

      const { id, title, deleted_at } = await tip.update({
        deleted_at: new Date(),
      });

      return res.json({ id, title, deleted_at });
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async index(req, res) {
    try {
      const tips = await Tip.findAll({
        where: {
          deleted_at: null,
        },
        order: [['id', 'asc']],
      });

      return res.json(tips);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }

  async sus(req, res) {
    try {
      const { data } = await axios.post(
        'http://mobileapps.saude.gov.br/coronavirus/classes/dicas',
        {
          where: {},
          limit: 2000,
          order: '-updatedAt',
          _method: 'GET',
          _ApplicationId: '123242d9f6164a2d1b6eb0266010f1b1',
          _JavaScriptKey: 'W1ccHDYbSQSeSWJxrdzWGjrSbXxeYMyW5BDGIbVo',
          _ClientVersion: 'js2.11.0',
          _InstallationId: '61f2908b-6943-4cb6-953f-46fc83d34b9b',
        }
      );

      return res.json(data.results);
    } catch (e) {
      return res.status(400).json({ error: 'Internal error!', mensage: e });
    }
  }
}

export default new TipController();
