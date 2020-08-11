'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Versions',
      [
        {
          wgt_url: '/public/wgt/__UNI__F3FD86A.wgt',
          android_pkg_url: '/public/pkg/android/__UNI__E958B35_0724090830.apk',
          ios_pkg_url: '',
          app_version: '1.0.0',
          createdAt: '2020-08-11',
          updatedAt: '2020-08-11',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
