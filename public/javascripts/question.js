document.addEventListener("DOMContentLoaded", async (event) => {
    const questionId = document.querySelector('table').id

    const upvoteButtons = document.querySelectorAll('.answerUpvoteButtons');
    console.log(upvoteButtons.length)
    upvoteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const answerId = event.target.id.split('-')[1];
            console.log(answerId)
            const downId = parseInt(answerId)
            const downButton = document.getElementById(`downvote-${downId}`)

            const upvote = await fetch(`http://localhost:8080/questions/answers/${answerId}/upvote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    questionId: `${questionId}`
                }),
            })

            const res = await upvote.json();

            event.target.innerHTML= `🔺 ${res.upvotes.length}`
            downButton.innerHTML= `🔻 ${res.downvotes.length}`
    })})

    const downvoteButtons = document.querySelectorAll('.answerDownvoteButtons');
    downvoteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const answerId = event.target.id.split('-')[1];
            const upButton = document.getElementById(`upvote-${answerId}`)

            const downvote = await fetch(`http://localhost:8080/questions/answers/${answerId}/downvote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    questionId: `${questionId}`
                }),
            })

            const res = await downvote.json();

            event.target.innerHTML= `🔻 ${res.downvotes.length}`
            upButton.innerHTML= `🔺 ${res.upvotes.length}`
    })})

    const tableContainer = document.getElementById('answers');
    const postAnswer = document.getElementById('post-answer');
    const answerField = document.querySelector('.question');
    const _csrf = document.getElementById('csrf').value;

    postAnswer.addEventListener('click', async (event) => {
        event.preventDefault();

        const answer = answerField.value;

        const post = await fetch(`http://localhost:8080/questions/${questionId}/answers`, {
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
        console.log(newAnswer.newAnswer.id)

        tableContainer.innerHTML += `
            <tr>
                <td><div class="buttons">
                    <button id= upvote-${newAnswer.newAnswer.id} class="answerUpvoteButtons"> 🔺${newAnswer.newAnswer.Upvotes.length} </button>
                    <button id= downvote-${newAnswer.newAnswer.id} class="answerDownvoteButtons"> 🔻${newAnswer.newAnswer.Downvotes.length} </button>
                    </div>
                </td>
                <td>${newAnswer.newAnswer.answer}</td>
                <td>${newAnswer.newAnswer.User.username}</td>
                <td>${newAnswer.newAnswer.createdAt}</td>
            </tr>
            `;
        const newUpvoteButton = document.getElementById(`upvote-${newAnswer.newAnswer.id}`);
        const newDownvoteButton = document.getElementById(`downvote-${newAnswer.newAnswer.id}`);

        newUpvoteButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const answerId = event.target.id.split('-')[1];
            const downId = parseInt(answerId)
            const downButton = document.getElementById(`downvote-${downId}`)

            const upvote = await fetch(`http://localhost:8080/questions/answers/${answerId}/upvote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    questionId: `${questionId}`
                }),
            })

            const res = await upvote.json();

            event.target.innerHTML= `🔺 ${res.upvotes.length}`
            downButton.innerHTML= `🔻 ${res.downvotes.length}`
        })

        newDownvoteButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const answerId = event.target.id.split('-')[1];
            const upButton = document.getElementById(`upvote-${answerId}`)

            const downvote = await fetch(`http://localhost:8080/questions/answers/${answerId}/downvote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    questionId: `${questionId}`
                }),
            })

            const res = await downvote.json();

            event.target.innerHTML= `🔻 ${res.downvotes.length}`
            upButton.innerHTML= `🔺 ${res.upvotes.length}`
        })
    })

    const upvoteQuestionButton = document.getElementById('questionUp');
    const downvoteQuestionButton = document.getElementById('questionDown');

    upvoteQuestionButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const upvote = await fetch(`http://localhost:8080/questions/${questionId}/upvote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                questionId: `${questionId}`
            }),
        })

        const res = await upvote.json();

        upvoteQuestionButton.innerHTML= `🔺 ${res.upvotes.length}`
        console.log(res.upvotes.length)
        downvoteQuestionButton.innerHTML = `🔻 ${res.downvotes.length}`
    })

    downvoteQuestionButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const downvote = await fetch(`http://localhost:8080/questions/${questionId}/downvote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                questionId: `${questionId}`
            }),
        })

        const res = await downvote.json();

        downvoteQuestionButton.innerHTML= `🔻 ${res.downvotes.length}`
        upvoteQuestionButton.innerHTML = `🔺 ${res.upvotes.length}`
    })

});
