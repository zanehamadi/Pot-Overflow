const express = require('express');
const csrf = require('csurf');

const { Question, Answer, User, Upvote, Downvote } = require('../db/models');
const { requireAuth } = require('../auth');
const { asyncHandler, handleValidationErrors } = require('./util');

const router = express.Router();
const csrfProtection = csrf({ cookie: true })


// router.post('/', asyncHandler(async (req,res,next) => {
//     // res.render('search')
//     console.log("-------------------------------------------------------------------------------------------")
//     console.log(req.json())
//     console.log("-------------------------------------------------------------------------------------------")
//     /*  
//     Get array of keywords
//     Search through ALL questions in the questions table
//     parse through those questions, see if question includes keyword
//     if it does, display that question
//     */

// }))

// let id

router.post('/', asyncHandler(async (req,res,next) => {

    console.log("yo")
    const ids = req.body
    const questions = await Question.findAll({
        where: {
            id: ids
        }
    })
    console.log(ids)

    res.render('search', {questions})

}))

// router.get('/', asyncHandler(async(req,res,next) => {

// }))

router.get('/', asyncHandler(async (req,res,next) => {
    const questions = await Question.findAll()

    return res.json({questions})

}))




module.exports = router;