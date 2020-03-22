import Sequelize, { Model } from 'sequelize';

class SymptomDataCollected extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        deleted_at: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'symptom_data_collected',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.DataCollected, {
      foreignKey: 'data_collected_id',
      as: 'data_collected',
    });
    this.belongsTo(models.Symptom, {
      foreignKey: 'symptom_id',
      as: 'symptom',
    });
  }
}

export default SymptomDataCollected;
