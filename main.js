import { getQuestions } from "./getAPI.js"
const questionLine = document.querySelector(".question")
const answerBoxes = document.querySelectorAll(".answer")
const results = document.querySelectorAll(".result .filler")
const pageContent = document.querySelector(".answers")
let questionsList = await getQuestions()
let currentLevel  = 0
let answerIndex = null

const showQuestion = question => {
    const answersNumber = question.incorrect_answers.length
    if(answersNumber === 1) {
        pageContent.children[2].classList.add("two-answer")
        pageContent.children[3].classList.add("two-answer")
    } else {
        pageContent.children[2].classList.remove("two-answer")
        pageContent.children[3].classList.remove("two-answer")
    }
    answerIndex = Math.floor(Math.random()*(answersNumber+1))
    let wrongAnswerIndex = 0
    questionLine.innerHTML = question.question
    answerBoxes[answerIndex].innerHTML = question.correct_answer
    for (let i = 0; i<=answersNumber ; i++) {
        if(i === answerIndex) {
            continue
        } else {
            answerBoxes[i].innerHTML = question.incorrect_answers[wrongAnswerIndex]
            wrongAnswerIndex++
        }
    }
}

const checkAnswerHandler = (event) => {
    if (event.target.innerHTML === answerBoxes[answerIndex].innerHTML) {
        results[currentLevel].classList.add("correct-answer")
        results[currentLevel].classList.add("showed-result")
    } else {
        results[currentLevel].classList.add("showed-result")
    }
    currentLevel++
    if (currentLevel === 4) {
        pageContent.innerHTML = ""
        questionLine.innerHTML = "The Exam is finished."
    }
    showQuestion(questionsList[currentLevel])
}

answerBoxes.forEach(answer => {
    answer.addEventListener("click", checkAnswerHandler)
})

showQuestion(questionsList[currentLevel])