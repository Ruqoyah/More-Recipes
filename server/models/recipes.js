export default (sequelize, DataTypes) => {
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
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
  Recipes.associate = (models) => {
    Recipes.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
    Recipes.hasMany(models.Reviews, {
      foreignKey: 'recipeId'
    });
    Recipes.hasMany(models.favoriteRecipes, {
      foreignKey: 'recipeId'
    });
    Recipes.hasMany(models.Votes, {
      foreignKey: 'recipeId'
    });
  };
  return Recipes;
};
