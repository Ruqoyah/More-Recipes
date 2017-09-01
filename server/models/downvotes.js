module.exports = (sequelize, DataTypes) => {
  const Downvotes = sequelize.define('Downvotes', {
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
        Downvotes.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Downvotes;
};
