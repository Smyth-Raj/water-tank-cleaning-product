const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key';

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, {
    expiresIn: '1h',
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
  SECRET_KEY
};
