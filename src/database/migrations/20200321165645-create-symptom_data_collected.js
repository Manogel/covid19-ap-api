module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('symptom_data_collected', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      data_collected_id: {
        type: Sequelize.INTEGER,
        references: { model: 'data_collected', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      symptom_id: {
        type: Sequelize.INTEGER,
        references: { model: 'symptoms', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
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
    return queryInterface.dropTable('symptom_data_collected');
  },
};
