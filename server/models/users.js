export default(sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpassword: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        Users.hasMany(models.favoriteRecipes, {
          foreignKey: 'userId'
        });
        Users.hasMany(models.Votes, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return Users;
};
