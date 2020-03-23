import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

// import User from '../app/models/User';
// import File from '../app/models/File';

import User from '../app/models/User';
import Citizen from '../app/models/Citizen';
import Situation from '../app/models/Situation';
import Symptom from '../app/models/Symptom';
import Tip from '../app/models/Tip';

import DataCollected from '../app/models/DataCollected';
import SymptomDataCollected from '../app/models/SymptomDataCollected';

// tem que adicionar todos os models aqui
const models = [
  Citizen,
  Situation,
  Symptom,
  DataCollected,
  SymptomDataCollected,
  Tip,
  User,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .forEach(model => {
        try {
          model.associate(this.connection.models);
        } catch (e) {
          //
        }
      });
  }
}

export default new Database();
