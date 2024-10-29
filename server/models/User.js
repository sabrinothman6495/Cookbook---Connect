import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 30],
      notEmpty: true,
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100],
    }
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
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  },
  indexes: [
    { unique: true, fields: ['email'] },
    { unique: true, fields: ['username'] }
  ]
});

User.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const setupAssociations = (models) => {
  User.hasMany(models.Recipe, {
    foreignKey: 'userId',
    as: 'recipes',
    onDelete: 'CASCADE'
  });

  User.belongsToMany(models.Recipe, {
    through: 'UserLikes',
    as: 'likedRecipes',
    foreignKey: 'userId',
  });

  User.belongsToMany(User, {
    through: 'UserFollowers',
    as: 'followers',
    foreignKey: 'userId',
  });

  User.belongsToMany(User, {
    through: 'UserFollowers',
    as: 'following',
    foreignKey: 'followerId',
  });
};

const DatabaseManager = {
  async initialize() {
    await sequelize.sync();
  },

  async clear() {
    await User.destroy({ where: {}, truncate: true, cascade: true });
  },

  async seed() {
    const users = [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123',
        bio: 'I love cooking and sharing recipes!',
        profilePicture: 'john_doe.jpg',
      },
      // ... other users
    ];

    await User.bulkCreate(users);
  }
};

export { User as default, setupAssociations, DatabaseManager };



