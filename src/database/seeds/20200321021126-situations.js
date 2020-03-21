module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'situations',
      [
        {
          name: 'SUSPEITA',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'DESCARTADO',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('situations', null, {}),
};
