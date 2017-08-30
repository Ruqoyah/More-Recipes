module.exports = (sequelize, DataTypes) => {
  const favoriteRecipes = sequelize.define('favoriteRecipes', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipe_Id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ufavorite_recipe: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return favoriteRecipes;
};

