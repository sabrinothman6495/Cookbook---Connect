import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashUtils = {
  async hashPassword(password) {
    try {
      return await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
      throw new Error('Password hashing failed');
    }
  },

  async comparePassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new Error('Password comparison failed');
    }
  }
};

export default hashUtils;


