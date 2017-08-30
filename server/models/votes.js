module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipe_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    upvote: {
      type: DataTypes.STRING,
      allowNull: false
    },
    downvote: {
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
  return Votes;
};
