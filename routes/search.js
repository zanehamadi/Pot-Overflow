const express = require('express');
const csrf = require('csurf');
const { Op } = require('sequelize');

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

router.post('/', asyncHandler(async (req, res, next) => {
    const { searchBar } = req.body
    let words = searchBar.split(" ")
    console.log(words)

    let qArray = []
    let idArray = []

    for (let i = 0; i < words.length; i++) {

        const questions = await Question.findAll({
            where: {
                question: {
                    [Op.substring]: words[i]
                }
            },
            include: User
            
        })

        if (questions[0] && !idArray.includes(questions[0].id)) {
            idArray.push(questions[0].id)
            qArray.push(...questions)
        }
    }
    res.render('search', { qArray })
}))

router.get('/', asyncHandler(async (req, res, next) => {
    // const questions = await Question.findAll()

    // return res.json({ questions })

}))




module.exports = router;