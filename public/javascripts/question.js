document.addEventListener("DOMContentLoaded", async (event) => {
    const questionId = document.querySelector('table').id

    const upvoteButtons = document.querySelectorAll('.answerUpvoteButtons');
    upvoteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const answerId = event.target.id.split('-')[1];
            const downId = parseInt(answerId)
            const downButton = document.getElementById(`downvote-${downId}`)

            const upvote = await fetch(`/questions/answers/${answerId}/upvote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    questionId: `${questionId}`
                }),
            })

            const res = await upvote.json();

            event.target.innerHTML= `<i class="far fa-thumbs-up fa-lg"></i> ${res.upvotes.length}`
            downButton.innerHTML= `<i class="far fa-thumbs-down fa-lg"></i> ${res.downvotes.length}`
    })})

    const downvoteButtons = document.querySelectorAll('.answerDownvoteButtons');
    downvoteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const answerId = event.target.id.split('-')[1];
            const upButton = document.getElementById(`upvote-${answerId}`)

            const downvote = await fetch(`/questions/answers/${answerId}/downvote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    questionId: `${questionId}`
                }),
            })

            const res = await downvote.json();

            event.target.innerHTML= `<i class="far fa-thumbs-down fa-lg"></i> ${res.downvotes.length}`
            upButton.innerHTML= `<i class="far fa-thumbs-up fa-lg"></i> ${res.upvotes.length}`
    })})

    const tableContainer = document.getElementById('answers');
    const postAnswer = document.getElementById('post-answer');
    const answerField = document.querySelector('.question');
    const _csrf = document.getElementById('csrf').value;

    postAnswer.addEventListener('click', async (event) => {
        event.preventDefault();

        const answer = answerField.value;

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
                    <button id= downvote-${newAnswer.newAnswer.id} class="answerDownvoteButtons"><i class="far fa-thumbs-down fa-lg"></i> ${newAnswer.newAnswer.Downvotes.length}</button>
                    </div>
                </td>
                <td>${newAnswer.newAnswer.answer}</td>
                <td>${newAnswer.newAnswer.User.username}</td>
                <td>${newAnswer.newAnswer.createdAt}</td>
            `;
        tableContainer.appendChild(tr)


        const newUpvoteButton = document.getElementById(`upvote-${newAnswer.newAnswer.id}`);
        const newDownvoteButton = document.getElementById(`downvote-${newAnswer.newAnswer.id}`);

        newUpvoteButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const answerId = event.target.id.split('-')[1];
            const downId = parseInt(answerId)
            const downButton = document.getElementById(`downvote-${downId}`)

            const upvote = await fetch(`/questions/answers/${answerId}/upvote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    questionId: `${questionId}`
                }),
            })

            const res = await upvote.json();

            event.target.innerHTML= `<i class="far fa-thumbs-up fa-lg"></i> ${res.upvotes.length}`
            downButton.innerHTML= `<i class="far fa-thumbs-down fa-lg"></i> ${res.downvotes.length}`
        })

        newDownvoteButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const answerId = event.target.id.split('-')[1];
            const upButton = document.getElementById(`upvote-${answerId}`)

            const downvote = await fetch(`/questions/answers/${answerId}/downvote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    questionId: `${questionId}`
                }),
            })

            const res = await downvote.json();

            event.target.innerHTML= `<i class="far fa-thumbs-down fa-lg"></i> ${res.downvotes.length}`
            upButton.innerHTML= `<i class="far fa-thumbs-up fa-lg"></i> ${res.upvotes.length}`
        })
    })

    const upvoteQuestionButton = document.getElementById('questionUp');
    const downvoteQuestionButton = document.getElementById('questionDown');

    upvoteQuestionButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const upvote = await fetch(`/questions/${questionId}/upvote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                questionId: `${questionId}`
            }),
        })

        const res = await upvote.json();

        upvoteQuestionButton.innerHTML= `<i class="far fa-thumbs-up fa-lg"></i> ${res.upvotes.length}`
        downvoteQuestionButton.innerHTML = `<i class="far fa-thumbs-down fa-lg"></i> ${res.downvotes.length}`
    })

    downvoteQuestionButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const downvote = await fetch(`/questions/${questionId}/downvote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                questionId: `${questionId}`
            }),
        })

        const res = await downvote.json();

        downvoteQuestionButton.innerHTML= `<i class="far fa-thumbs-down fa-lg"></i> ${res.downvotes.length}`
        upvoteQuestionButton.innerHTML = `<i class="far fa-thumbs-up fa-lg"></i> ${res.upvotes.length}`
    })

});
