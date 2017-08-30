module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipe_id: {
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
        // associations can be defined here
      }
    }
  });
  return Reviews;
};
