module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Categories', [{
    id: 1,
    name: 'vestidos',
    createdAt: '2019-10-30T00:00:00'
  }]),

  down: (queryInterface) => queryInterface.bulkDelete('Categories', [{
    id: 1,
  }], {}),
};
