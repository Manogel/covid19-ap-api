module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'symptoms',
      [
        {
          name: 'Congestão nasal (Nariz entupido)',
          probable: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Corrimento nasal (Nariz escorrendo)',
          probable: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Dificuldade para respirar',
          probable: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Febre (Acima de 37.5°)',
          probable: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Dores pelo corpo',
          probable: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Mal-estar geral',
          probable: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Dor de garganta',
          probable: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Dor de cabeça',
          probable: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Tosse',
          probable: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cansaço',
          probable: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('symptoms', null, {}),
};
