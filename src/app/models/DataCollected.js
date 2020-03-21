import Sequelize, { Model } from 'sequelize';

class DataCollected extends Model {
  static init(sequelize) {
    super.init(
      {
        observation: Sequelize.TEXT,
        deleted_at: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'data_collected',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Citizen, {
      foreignKey: 'citizen_id',
      as: 'citizen',
    });
    this.hasMany(models.SymptomDataCollected, {
      foreignKey: 'data_collected_id',
      as: 'symptoms_collected',
    });
  }
}

export default DataCollected;
