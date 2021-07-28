document.addEventListener("DOMContentLoaded", (event) => {
    
    const upvoteButtons = document.querySelectorAll('.upvoteButtons');
    upvoteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
        console.log(event.target.id)
    })})

    const downvoteButtons = document.querySelectorAll('.downvoteButtons');
    downvoteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
        console.log(event.target.id)
    })})


});
