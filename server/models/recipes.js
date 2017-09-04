module.exports = (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Recipes', {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Recipes.hasMany(models.favoriteRecipes, {
          foreignKey: 'recipeId'
        });
        Recipes.belongsToMany(models.Users, {
          foreignKey: 'recipeId'
        });
        Recipes.hasMany(models.Votes, {
          foreignKey: 'recipeId'
        });
      }
    }
  });
  return Recipes;
};
