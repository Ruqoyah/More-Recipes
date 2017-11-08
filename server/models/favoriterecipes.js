export default (sequelize, DataTypes) => {
  const favoriteRecipes = sequelize.define('favoriteRecipes', {
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipeId',
      },
    }
  });
  favoriteRecipes.associate = (models) => {
    favoriteRecipes.belongsTo(models.Recipes, {
      foreignKey: 'recipeId'
    });
    favoriteRecipes.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
  };
  return favoriteRecipes;
};

