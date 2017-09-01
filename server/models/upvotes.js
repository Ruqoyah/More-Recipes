module.exports = (sequelize, DataTypes) => {
  const Upvotes = sequelize.define('Upvotes', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Upvotes.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Upvotes;
};
