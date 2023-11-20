'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Books', [
      {
        title: 'Harry Potter and the Philosopher Stone',
        author: 'J.K Rowling',
        stock: 20,
        description: 'Petualangan Harry Potter dkk',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Lord of the Rings',
        author: 'J.R.R Tolkien',
        stock: 25,
        description: 'Petualangan Bilbo Baggins dkk',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Books', null, {});
  },
};
