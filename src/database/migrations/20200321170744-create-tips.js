module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tips', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      introduction: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      file: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link: Sequelize.STRING,
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
    return queryInterface.dropTable('tips');
  },
};
