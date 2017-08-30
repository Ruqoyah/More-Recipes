module.exports = (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Recipes', {
    user_Id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipe_name: {
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
      }
    }
  });
  return Recipes;
};
