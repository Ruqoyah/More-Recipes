module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vote: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Votes.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
        Votes.belongsTo(models.Recipes, {
          foreignKey: 'recipeId',
        });
      }
    }
  });
  return Votes;
};
