const express = require('express');
const csrf = require('csurf');

const { Question, Answer, User, Upvote, Downvote } = require('../db/models');
const { requireAuth } = require('../auth');
const { asyncHandler, handleValidationErrors } = require('./util');


const router = express.Router();
const csrfProtection = csrf({ cookie: true })


// Render questions route(displays questions)

router.get('/', asyncHandler(async (req,res,next) => {
    const questions = await Question.findAll({
        include: User
    })

    res.render('questions', {questions})
}))


// Render specific question

router.get('/:id(\\d+)', asyncHandler(async (req,res) => {

    const questionId = parseInt(req.params.id, 10);

    const question = await Question.findByPk(questionId, {
        include: User
    })

    res.render('question', {question})

}))



router.get('/ask', csrfProtection, requireAuth, handleValidationErrors, (req, res) => {
    res.render('ask', {
        csrfToken: req.csrfToken()
    });
});

router.post('/ask', csrfProtection, requireAuth, handleValidationErrors, asyncHandler(async (req, res) => {
    const { question, additional_info } = req.body;
    const { userId } = req.session.auth;

    if (userId) {
        const newQuestion = await Question.create({
            question,
            additional_info,
            userId
        })

        res.redirect('/questions/')
    } else {
        res.redirect('login');
    }
}))



module.exports = router;
