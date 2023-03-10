import { getQuestions } from "./getAPI.js"
const questionLine = document.querySelector(".question")
const answerBoxes = document.querySelectorAll(".answer")
const results = document.querySelectorAll(".result .filler")
const pageContent = document.querySelector(".answers")
const questionBox = document.querySelector(".questionBox")
let questionsList = await getQuestions()
let currentLevel  = 0
let answerIndex = null

function decode(str) {
    let txt = new DOMParser().parseFromString(str, "text/html");
    return txt.documentElement.textContent;
    }

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
    questionLine.textContent = decode(question.question)
    answerBoxes[answerIndex].textContent = decode(question.correct_answer)
    for (let i = 0; i<=answersNumber ; i++) {
        if(i === answerIndex) {
            continue
        } else {
            answerBoxes[i].textContent = decode(question.incorrect_answers[wrongAnswerIndex])
            wrongAnswerIndex++
        }
    }
}

const checkAnswerHandler = (event) => {
    questionBox.classList.remove("old-question")
    questionBox.classList.remove("new-question")
    if (event.target.textContent === answerBoxes[answerIndex].textContent) {
        answerBoxes[answerIndex].classList.add("correct-answer")
        results[currentLevel].classList.add("correct-answer") 
        results[currentLevel].classList.add("showed-result")
    } else {
        answerBoxes[answerIndex].classList.toggle("correct-answer")
        event.target.classList.toggle("wrong-answer")
        results[currentLevel].classList.add("showed-result")
    }
    currentLevel++

    setTimeout(()=>{
        questionBox.classList.add("old-question")
    },1300)

    setTimeout(()=>{
        if (currentLevel === 4) {
            pageContent.textContent = ""
            questionLine.textContent = "The Exam is finished."
        } else {
            event.target.classList.remove("wrong-answer")    
            answerBoxes[answerIndex].classList.remove("correct-answer")
            showQuestion(questionsList[currentLevel])
        }
        questionBox.classList.add("new-question")
    },2100)
}

answerBoxes.forEach(answer => {
    answer.addEventListener("click", checkAnswerHandler)
})

showQuestion(questionsList[currentLevel])