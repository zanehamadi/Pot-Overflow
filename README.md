# Pot Overflow
By Sean Cotter, Zane Hamadi, Jacky Hao

[Visit Pot Overflow](https://aa-pot-overflow.herokuapp.com/)

## Summary
Pot Overflow is a web application, inspired by Stack Overflow, that allows users to:

* log in/log out/demo app

* ask questions

* answer questions

* search for questions

* upvote/downvote questions

### Technologies Used:
**Backend**:
Pot Overflow was built utilizing the Express framework for Node.js and the PostgreSQL RDBMS. The API was created following RESTful conventions and data is sent from and received by the API as JSON payloads.

**Frontend**:
Pot Overflow was built entirely in Vanilla JS and utilizes Pug.js as the HTML templating engine for rendering frontend views.

**Languages**:
HTML, CSS, JavaScript

## Database Structure
dbdiagram.png![dbdiagram](https://user-images.githubusercontent.com/78773152/127695082-3786bd24-9156-46b1-8641-4dff628a9930.png)

## Pot Overflow in Action
homepage.png![homepage](https://i.imgur.com/3TEI78d.gif)

## Implementation Details
* An important feature of Pot Overflow is the ability for users to search for questions related to their own to look for existing answers, rather than ask a previously asked question again. Upon a form submission, the Pot Overflow API destructures the search request and checks each word in the request against existing questions in the database, rendering and returning matching questions through a Pug template. Sequelize, a promise-based Node.js ORM (object-relational mapping) allows for interaction with the Postgres database using Javascript rather than SQL.
```js 
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
```
* Another important detail lies in dynamically rewriting the current web page with new data from the server when a user upvotes a question or answer, downvotes a question or answer, and answers a question. These features rely on awaiting a fetch request to the API and updating the view, based on data returned from the server, using DOM manipulation.
```js 
const post = await fetch(`/questions/${questionId}/answers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    answer,
                    _csrf
                })
            })

const newAnswer = await post.json();
const tr = document.createElement('tr');

tr.innerHTML = `
   <td><div class="buttons">
   <button id= upvote-${newAnswer.newAnswer.id} class="answerUpvoteButtons"><i class="far fa-thumbs-up fa-lg"></i> ${newAnswer.newAnswer.Upvotes.length}</button>
   <button id= downvote-${newAnswer.newAnswer.id} class="answerDownvoteButtons"><i class="far fa-thumbs-down fa-lg"></i> ${newAnswer.newAnswer.Downvotes.length}    </button>
   </div>
   </td>
   <td>${newAnswer.newAnswer.answer}</td>
   <td>${newAnswer.newAnswer.User.username}</td>
   <td>${new Date(newAnswer.newAnswer.createdAt).toDateString()}</td>
`;

tableContainer.appendChild(tr)
```

## Final Thoughts
