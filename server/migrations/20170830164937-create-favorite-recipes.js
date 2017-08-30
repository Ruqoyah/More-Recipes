module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('favoriteRecipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      recipe_Id: {
        type: Sequelize.INTEGER
      },
      user_Id: {
        type: Sequelize.INTEGER
      },
      favorite_recipe: {
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
  down: queryInterface => queryInterface.dropTable('Favorite_Recipes'),
};
