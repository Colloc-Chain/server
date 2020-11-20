const jwt = require('jsonwebtoken');
const { getUserByJwt } = require('@libs/mongo/users');
// eslint-disable-next-line camelcase
const { __jwt_secret__ } = require('@libs/config');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401);
      throw new Error('Header does not contain any token');
    }

    const { _id } = jwt.verify(token, __jwt_secret__);

    const user = await getUserByJwt(_id, token);

    if (!user) {
      res.status(401);
      throw new Error('Not authorized to access this resources');
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.redirect('http://localhost:3000/sign-in');
      return;
    }

    next(error);
  }
};

module.exports = { auth };
