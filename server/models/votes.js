export default (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    upvote: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    downvote: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  Votes.associate = (models) => {
    Votes.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Votes.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
    });
  };
  return Votes;
};
