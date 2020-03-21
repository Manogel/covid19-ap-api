import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Citizen extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        social_name: Sequelize.STRING,
        email: Sequelize.STRING,
        contact: Sequelize.STRING,
        cpf: Sequelize.STRING(15),
        birthday: Sequelize.DATE,
        sex: Sequelize.CHAR(1),
        address: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        confirmed_contact: Sequelize.BOOLEAN,
        suspicious_contact: Sequelize.BOOLEAN,
        been_outside: Sequelize.BOOLEAN,
        latitude: Sequelize.FLOAT,
        longitude: Sequelize.FLOAT,
        deleted_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async citizen => {
      if (citizen.password) {
        citizen.password_hash = await bcrypt.hash(citizen.password, 8);
      }
    });

    return this;
  }

  static checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  static associate(models) {
    this.belongsTo(models.Situation, {
      foreignKey: 'situation_id',
      as: 'situation',
    });
  }
}

export default Citizen;
