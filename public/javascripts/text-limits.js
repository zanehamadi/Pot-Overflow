document.addEventListener("DOMContentLoaded", (event) => {
    const askQuestionField = document.querySelector(".ask-question");
    askQuestionField.addEventListener("input", (event) => {
        if (event.target.value.length >= 254) {
            alert('Post can not be longer than 255 characters');
        }
    })

    const askQuestionAdditionalInfo = document.querySelector(".ask-input");
    askQuestionAdditionalInfo.addEventListener("input", (event) => {
        if (event.target.value.length >= 254) {
            alert('Additional content can not be longer than 255 characters');
        }
    })
})
