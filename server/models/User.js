const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  profilePicture: {
    type: DataTypes.STRING,
    defaultValue: 'default-avatar.png',
  },
  dateJoined: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

User.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

User.associate = (models) => {
  User.hasMany(models.Recipe, {
    foreignKey: 'userId',
    as: 'recipes',
  });
  User.belongsToMany(models.Recipe, {
    through: 'UserLikes',
    as: 'likedRecipes',
    foreignKey: 'userId',
  });
  User.belongsToMany(models.User, {
    through: 'UserFollowers',
    as: 'followers',
    foreignKey: 'userId',
  });
  User.belongsToMany(models.User, {
    through: 'UserFollowers',
    as: 'following',
    foreignKey: 'followerId',
  });
};

module.exports = User;