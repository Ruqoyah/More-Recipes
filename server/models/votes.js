export default(sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
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
        Votes.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
        Votes.belongsToMany(models.Recipes, {
          foreignKey: 'recipeId',
        });
      }
    }
  });
  return Votes;
};
