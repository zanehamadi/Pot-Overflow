const express = require('express');
const bcrypt = require('bcryptjs')
const csrf = require('csurf');
const db = require('../db/models');

const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('./util');
const { loginUser, logoutUser } = require('../auth');


const router = express.Router();
const csrfProtection = csrf({cookie:true});

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

  check("password")
    .exists({ checkFalsy: true })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage("Please provide a password."),

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





/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});



router.get('/login', (req,res,next) => {
  res.render('login')
});



router.post('login', csrfProtection, validateUserLogin, handleValidationErrors, asyncHandler(async(req,res,next) => {
  const {username, password} = req.body;

  let errors = [];
  const validatorErrors = validationResult(req);

  // if(validatorErrors.length === 0) {
  //   const user = await db.User.findOne({
  //     where: username
  //   })

  //   if(user !== null) {
  //     const passwordCheck = await bcrypt.compare(password, user.hashedPassword.toString());

  //     if(passwordCheck) {
  //       loginUser(req, res, user);
  //       res.redirect('/');
  //       return;
  //     }
  //   }

  //   errors.push('Login credentials were invalid');
  // } else {
  //     errors = validatorErrors.array().map((error) => error.msg);
  //     res.render('user-login', {
  //       username,
  //       errors,
  //       csrfToken: req.csrfToken()
  //     })
  //   }
  res.render('user-login')
}))



module.exports = router;
