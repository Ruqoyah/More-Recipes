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
