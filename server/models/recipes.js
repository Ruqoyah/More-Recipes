export default (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Recipes', {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredient: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
      required: true,
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
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    downvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    views: {
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
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    Recipes.hasMany(models.favoriteRecipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    Recipes.hasMany(models.Votes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Recipes;
};
