const express = require('express');
const router = express.Router();
const { asyncHandler, handleValidationErrors } = require('./util');
const csrf = require('csurf');
const csrfProtection = csrf({cookie:true});
const db = require('../db/models');
const bcrypt = require('bcryptjs')

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
  const user = await db.User.findOne({
    where: username
  });

  if(!user){
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["The username was not found."];
    return next(err)
  };
  
  const passwordChecker = await bcrypt.compare(password, user.hashedPassword)

  if(passwordChecker){
    loginUser(req,res,user)
    res.redirect('/')
    return
  }

  else{
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["Credentials were invalid"]
    return next()
  };
  
}))



/* if (!user || !user.validatePassword(password)) {
  const err = new Error("Login failed");
  err.status = 401;
  err.title = "Login failed";
  err.errors = ["The provided credentials were invalid."];
  return next(err);
}
*/
module.exports = router;
