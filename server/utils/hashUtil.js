import bcrypt from 'bcrypt';

// Hash a password
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // Define the complexity of the hashing algorithm
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Could not hash the password.');
  }
};

// Compare a password with a hash
export const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error('Error comparing password:', error);
    throw new Error('Could not compare the password.');
  }
};