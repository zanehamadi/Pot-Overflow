const express = require('express');
const csrf = require('csurf');

const { Question, Answer, User, Upvote, Downvote } = require('../db/models');
const { requireAuth } = require('../auth');
const { asyncHandler, handleValidationErrors } = require('./util');

const router = express.Router();
const csrfProtection = csrf({ cookie: true })


router.get('/', requireAuth, asyncHandler(async (req,res,next) => {

    const questions = await Question.findAll({
        where: {userId: res.locals.user.id}
    })
    const answers = await Answer.findAll({
        where: {userId: res.locals.user.id},
        include: Question
    })

    const upvotes = await Upvote.findAll({
        where: {userId: res.locals.user.id},
        include: Question
    })

    const user = res.locals.user
    res.render('profile', {questions, answers, upvotes, user})
}))




module.exports = router;