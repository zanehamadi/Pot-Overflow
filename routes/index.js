const express = require('express');
const bcrypt = require('bcryptjs')
const csrf = require('csurf');
const db = require('../db/models');

const { check, validationResult } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('./util');
const { loginUser, logoutUser } = require('../auth');

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

const validateUserRegister = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email.")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),

  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),

  check('confirm-password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    }),

  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username")
    .custom((value) => {
      return db.User.findOne({ where: { username: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided username is already in use by another account');
          }
        });
    }),
];

const validateUserLogin = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for username :('),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('You forgot to type a password :)'),
];


/* Log in */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});


router.get('/login', csrfProtection, (req, res, next) => {
  res.render('login', {
    csrfToken: req.csrfToken(),
  })
})


router.post('/login', csrfProtection, validateUserLogin, asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.errors.length === 0) {

    const user = await db.User.findOne({
      where: { username }
    })

    if (user !== null) {

      const passwordCheck = await bcrypt.compare(password, user.hashedPassword.toString());

      if (passwordCheck) {
        loginUser(req, res, user);
        res.redirect('/questions/');
        return;
      }
    }

    errors.push('Login credentials were invalid');
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }

  res.render('login', {
    username,
    errors,
    csrfToken: req.csrfToken()
  })
}))

/* Register */
router.get('/register', csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render('register', {
    user,
    csrfToken: req.csrfToken()
  })
})

router.post('/register', csrfProtection, validateUserRegister, asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  const user = db.User.build({
    email, username
  })

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 12);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res, user);
    res.redirect('/');
  } else {
    console.log('here')
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('register', {
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));

/* Log out */
router.post('/logout', (req, res) => {
  logoutUser(req, res);

  req.session.save(()=> res.redirect('/'))
});

/* Demo Log In */
router.post('/demo', asyncHandler(async (req, res) => {
  const user = await db.User.findOne({
    where: {
      username: 'Demo'
    }
  })

  loginUser(req, res, user);
  req.session.save(()=> res.redirect('/questions'))
}));

module.exports = router;
