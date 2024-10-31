// config/migrations/20231031-create-users.js
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.fn('gen_random_uuid'),
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING(30),
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bio: {
      type: Sequelize.TEXT,
      defaultValue: '',
    },
    profilePicture: {
      type: Sequelize.STRING,
      defaultValue: 'default-avatar.png',
    },
    dateJoined: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('users');
}

