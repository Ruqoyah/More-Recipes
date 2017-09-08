export default(sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Reviews.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
        Reviews.hasMany(models.Recipes, {
          foreignKey: 'recipeId',
        });
      }
    }
  });
  return Reviews;
};
