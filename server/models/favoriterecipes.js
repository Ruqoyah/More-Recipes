module.exports = (sequelize, DataTypes) => {
  const favoriteRecipes = sequelize.define('favoriteRecipes', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        favoriteRecipes.BelongsTo(models.Recipes, {
          foreignKey: 'recipeId',
          onDelete: 'CASCADE'
        });
        favoriteRecipes.BelongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return favoriteRecipes;
};

