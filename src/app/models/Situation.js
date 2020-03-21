import Sequelize, { Model } from 'sequelize';

class Situation extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Citizen, {
      foreignKey: 'situation_id',
      as: 'citizens',
    });
  }
}

export default Situation;
