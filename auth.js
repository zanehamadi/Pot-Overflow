const db = require('./db/models')

//login a user
const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id,
  };
};

//log out a user
const logoutUser = (req, res) => {
  delete req.session.auth;
}

//require authentication
const requireAuth = (req, res, next) => {
  if(!res.locals.authenticated) {
    return res.redirect('/user/login');
  }
  return next();
}

//restore user
const restoreUser = async (req, res, next) => {
  if (req.session.auth) {
    const { userId } = req.session.auth;

    try {
      const user = await db.User.findByPk(userId);

      if (user) {
        res.locals.authenticated = true;
        res.locals.user = user;
        next();
      }
    } catch (err) {
      res.locals.authenticated = false;
      next(err);
    }
  } else {
    res.locals.authenticated = false;
    next();
  }
};

module.exports = {
  loginUser,
  restoreUser,
  logoutUser,
  requireAuth,
};