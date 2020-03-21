module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('citizens', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      social_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      sex: {
        type: Sequelize.CHAR(1),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token: Sequelize.STRING,
      suspicious_contact: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      confirmed_contact: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      been_outside: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      situation_id: {
        type: Sequelize.INTEGER,
        references: { model: 'situations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
        defaultValue: 1,
      },
      latitude: Sequelize.FLOAT,
      longitude: Sequelize.FLOAT,
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: Sequelize.DATE,
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('citizens');
  },
};
