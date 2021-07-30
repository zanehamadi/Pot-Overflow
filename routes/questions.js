const express = require('express');
const csrf = require('csurf');

const { Question, Answer, User, Upvote, Downvote } = require('../db/models');
const { requireAuth } = require('../auth');
const { asyncHandler, handleValidationErrors } = require('./util');


const router = express.Router();
const csrfProtection = csrf({ cookie: true })


// Render questions route(displays questions)

router.get('/', asyncHandler(async (req, res, next) => {
    const questions = await Question.findAll({
        include: [ User, Upvote, Downvote ]
    })

    res.render('questions', { questions })
}))


// Render specific question

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {

    const questionId = parseInt(req.params.id, 10);

    const question = await Question.findByPk(questionId, {
        include: [User, Answer],
    })

    const questionUpvotes = await Upvote.findAll({
        where: {
            answerId: null,
            questionId
        }
    })

    const questionDownvotes = await Downvote.findAll({
        where: {
            answerId: null,
            questionId
        }
    })

    const answers = await Answer.findAll({
        where: { questionId },
        include: [User, Upvote, Downvote]
    })

    res.render('question', { question, answers, questionUpvotes, questionDownvotes, csrfToken: req.csrfToken() })
}));


// ask question form page

router.get('/ask', csrfProtection, requireAuth, handleValidationErrors, (req, res) => {
    res.render('ask', {
        csrfToken: req.csrfToken()
    });
});


// post new question

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


// post new answer to question

router.post('/:id/answers', csrfProtection, requireAuth, handleValidationErrors, asyncHandler(async (req, res) => {
    const { answer } = req.body;
    const questionId = req.params.id;
    const { userId } = req.session.auth;

    const createAnswer = await Answer.create({
        answer,
        questionId,
        userId
    })

    const newId = createAnswer.id;

    const newAnswer = await Answer.findOne({
        where: {
            id: newId
        },
        include: [Upvote, Downvote, User]
    })

    return res.json({ newAnswer, userId })
}))


// get all votes up and down

router.get('/:id(\\d+)/votes', asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id);

    const upvotes = await Upvote.findAll({
        where: questionId
    })

    const downvotes = await Downvote.findAll({
        where: questionId
    })

    return res.json({ upvotes, downvotes })
}))

// add up vote to question

router.post('/:id(\\d+)/upvote', requireAuth, asyncHandler(async (req, res) => {
    const { questionId } = req.body;
    const answerId = null;
    const { userId } = req.session.auth;


    const prevVote = await Upvote.findOne({
        where: {
            questionId: parseInt(questionId),
            answerId,
            userId
        }
    })

    const opVote = await Downvote.findOne({
        where: {
            questionId: parseInt(questionId),
            answerId,
            userId
        }
    })

    if (!prevVote && opVote) {
        const upvote = await Upvote.create({
            userId,
            answerId,
            questionId: parseInt(questionId)
        })
        await opVote.destroy();
    } else if (!prevVote && !opVote) {
        const upvote = await Upvote.create({
            userId,
            answerId,
            questionId: parseInt(questionId)
        })
    } else {
        await prevVote.destroy();
    }


    const upvotes = await Upvote.findAll({
        where: {
            questionId,
            answerId
        }
    })

    const downvotes = await Downvote.findAll({
        where: {
            questionId,
            answerId
        }
    })

    return res.json({ upvotes, downvotes })
}))

// add down vote to question

router.post('/:id(\\d+)/downvote', requireAuth, asyncHandler(async (req, res, next) => {
    const { questionId } = req.body;
    const answerId = null;
    const { userId } = req.session.auth;


    const prevVote = await Downvote.findOne({
        where: {
            questionId: parseInt(questionId),
            answerId,
            userId
        }
    })

    const opVote = await Upvote.findOne({
        where: {
            questionId: parseInt(questionId),
            answerId,
            userId
        }
    })

    if (!prevVote && opVote) {
        const downvote = await Downvote.create({
            userId,
            answerId,
            questionId: parseInt(questionId)
        })
        await opVote.destroy();
    } else if (!prevVote) {
        const downvote = await Downvote.create({
            userId,
            answerId,
            questionId: parseInt(questionId)
        })
    } else {
        await prevVote.destroy();
    }


    const downvotes = await Downvote.findAll({
        where: {
            answerId,
            questionId
        }
    })

    const upvotes = await Upvote.findAll({
        where: {
            answerId,
            questionId
        }
    })

    return res.json({ downvotes, upvotes });
}));


// add up vote to specific answer

router.post('/answers/:id(\\d+)/upvote', requireAuth, asyncHandler(async (req, res, next) => {
    const { questionId } = req.body;
    const answerId = req.params.id;
    const { userId } = req.session.auth;


    const prevVote = await Upvote.findOne({
        where: {
            questionId: parseInt(questionId),
            answerId,
            userId
        }
    })

    const opVote = await Downvote.findOne({
        where: {
            questionId: parseInt(questionId),
            answerId,
            userId
        }
    })

    if (!prevVote && opVote) {
        const upvote = await Upvote.create({
            userId,
            answerId,
            questionId: parseInt(questionId)
        })
        await opVote.destroy();
    } else if (!prevVote) {
        const upvote = await Upvote.create({
            userId,
            answerId,
            questionId: parseInt(questionId)
        })
    } else {
        await prevVote.destroy();
    }

    const upvotes = await Upvote.findAll({
        where: {
            answerId
        }
    })

    const downvotes = await Downvote.findAll({
        where: {
            answerId
        }
    })

    return res.json({ upvotes, downvotes });
}));


// add down vote to specific answer

router.post('/answers/:id(\\d+)/downvote', requireAuth, asyncHandler(async (req, res) => {
    const { questionId } = req.body;
    const answerId = req.params.id;
    const { userId } = req.session.auth;

    const prevVote = await Downvote.findOne({
        where: {
            questionId: parseInt(questionId),
            answerId,
            userId
        }
    })

    const opVote = await Upvote.findOne({
        where: {
            questionId: parseInt(questionId),
            answerId,
            userId
        }
    })

    if (!prevVote && opVote) {
        const downvote = await Downvote.create({
            userId,
            answerId,
            questionId: parseInt(questionId)
        })
        await opVote.destroy();
    } else if (!prevVote) {
        const downvote = await Downvote.create({
            userId,
            answerId,
            questionId: parseInt(questionId)
        })
    } else {
        await prevVote.destroy();
    }


    const downvotes = await Downvote.findAll({
        where: {
            answerId
        }
    })

    const upvotes = await Upvote.findAll({
        where: {
            answerId
        }
    })

    return res.json({ downvotes, upvotes });
}));


module.exports = router;
