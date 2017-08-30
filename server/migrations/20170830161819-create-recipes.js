module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_Id: {
        type: Sequelize.INTEGER
      },
      recipe_name: {
        type: Sequelize.STRING
      },
      ingredient: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => queryInterface.dropTable('Recipes'),
};
