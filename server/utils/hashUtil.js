const bcrypt = require('bcrypt');

// Hash a password
const hashPassword = async (password) => {
  try {
    const holder = 10; // define the complexity of the hashing algorithm
    const hash = await bcrypt.hash(password, holder);
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error); // spits out error message
    throw new Error('Could not hash the password.');
  }
};

// Compare a password with a hash
const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword); // Compares the current password entered to the hashed password
    return isMatch;
  } catch (error) {
    console.error('Error comparing password:', error); // spits out error message if not the same
    throw new Error('Could not compare the password.');
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};