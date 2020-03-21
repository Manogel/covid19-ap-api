module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'symptoms',
      [
        {
          name: 'Congestão nasal (Nariz entupido)',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Corrimento nasal (Nariz escorrendo)',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Dificuldade para respirar',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Febre (Acima de 37.5°)',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Dores pelo corpo',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Mal-estar geral',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Dor de garganta',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Dor de cabeça',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Tosse',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cansaço',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('symptoms', null, {}),
};
