const express = require('express');
const csrf = require('csurf');
const { Op } = require('sequelize');

const { Question, User, Upvote, Downvote } = require('../db/models');
const { asyncHandler } = require('./util');

const router = express.Router();


router.post('/', asyncHandler(async (req, res, next) => {
    const { searchBar } = req.body
    let words = searchBar.split(" ")

    let qArray = []
    let idArray = []

    for (let i = 0; i < words.length; i++) {

        const questions = await Question.findAll({
            where: {
                question: {
                    [Op.substring]: words[i]
                }
            },
            include: [User, Upvote, Downvote]

        })

        if (questions[0] && !idArray.includes(questions[0].id)) {
            idArray.push(questions[0].id)
            qArray.push(...questions)
        }
    }
    res.render('search', { qArray })
}))




module.exports = router;
