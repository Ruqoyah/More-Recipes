export default (sequelize, DataTypes) => {
  const favoriteRecipes = sequelize.define('favoriteRecipes', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  favoriteRecipes.associate = (models) => {
    favoriteRecipes.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    favoriteRecipes.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return favoriteRecipes;
};

