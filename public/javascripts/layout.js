// document.addEventListener("DOMContentLoaded", (e) => {
    // const searchButton = document.getElementById("searchButton");
    // const searchBar = document.getElementById("searchBar");
    // let searchValue;

    // window.open("", null, "height=200,width=400,status=yes,toolbar=no,menubar=no,location=no");


    // searchButton.addEventListener("click", async (e) => {
    //     e.preventDefault()
        

    //     searchValue = searchBar.value
    //     const res = await fetch('http://localhost:8080/search', {
    //         method: "GET"
    //     })

    //     const questions = await res.json()
    //     let searchAlg = (questions, searchValue) => {

    //         let searchArr = searchValue.split(' ')
    //         let accurateQ = []
    //         let questionArr = questions.questions
    //         for (let i = 0; i < questionArr.length; i++) {

    //             let question = questionArr[i].question
    //             for (let j = 0; j < searchArr.length; j++) {
    //                 let word = searchArr[j]
    //                 if (question.includes(word)) {
    //                     accurateQ.push(questionArr[i].id)
    //                     break
    //                 }
    //             }

    //         }
    //         return accurateQ
    //     }


    //     let filtered = searchAlg(questions, searchValue)
    //     console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    //     console.log(filtered)


    //     let send = await fetch('http://localhost:8080/search', {
    //         method: "POST",
    //         headers: { "content-type": "application/json" },
    //         body: JSON.stringify(filtered)
    //     })

    //     let results = await send.json()
    //     console.log(results)

    // });


// })
