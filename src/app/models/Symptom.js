import Sequelize, { Model } from 'sequelize';

class Symptom extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        probable: Sequelize.BOOLEAN,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.DataCollected, {
      foreignKey: 'symptom_id',
      through: 'symptom_data_collected',
      as: 'collected_data',
    });
  }
}

export default Symptom;
