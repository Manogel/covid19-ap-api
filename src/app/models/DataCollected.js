import Sequelize, { Model } from 'sequelize';

class DataCollected extends Model {
  static init(sequelize) {
    super.init(
      {
        observation: Sequelize.TEXT,
        deleted_at: Sequelize.DATE,
        feedback: Sequelize.TEXT,
      },
      {
        sequelize,
        tableName: 'data_collected',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_feedback',
      as: 'data_user_feedback',
    });
    this.belongsTo(models.Citizen, {
      foreignKey: 'citizen_id',
      as: 'citizen',
    });
    this.belongsToMany(models.Symptom, {
      foreignKey: 'data_collected_id',
      through: 'symptom_data_collected',
      as: 'symptoms',
    });
  }
}

export default DataCollected;
