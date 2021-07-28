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
        include: [ User, Answer, Upvote, Downvote ]
    })

    const answers = await Answer.findAll({
        where: questionId,
        include: [ User, Upvote, Downvote ]
    })

    res.render('question', { question, answers })
}));




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

router.get('/answers/:id/votes', asyncHandler(async (req, res) => {
    const answerId = req.params.id;

    const upvotes = await Upvote.findAll({
        where: answerId
    })

    const downvotes = await Downvote.findAll({
        where: answerId
    })

    return res.json({ upvotes, downvotes })
}));

router.post('/answers/:id(\\d+)/upvote', asyncHandler(async (req, res) => {
    console.log(req.body)
    const { questionId } = req.body;
    const answerId = req.params.id;
    const { userId } = req.session.auth;

    // console.log(questionId, answerId, userId)

    // const upvote = await Upvote.create({
    //     userId,
    //     answerId,
    //     questionId
    // })

    // return res.json({ upvotes, downvotes })
}));

router.post('/answers/:id(\\d+)/downvote', asyncHandler(async (req, res) => {
    console.log(req.body)
    const { questionId } = req.body;
    const answerId = req.params.id;
    const { userId } = req.session.auth;

    // console.log(questionId, answerId, userId)

    // const upvote = await Upvote.create({
    //     userId,
    //     answerId,
    //     questionId
    // })

    // return res.json({ upvotes, downvotes })
}));


module.exports = router;
