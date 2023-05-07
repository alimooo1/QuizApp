import { getQuestions } from "./getAPI.js";
const questionLine = document.querySelector(".question");
const answerBoxes = document.querySelectorAll(".answer");
const results = document.querySelectorAll(".result .filler");
const pageContent = document.querySelector(".answers");
const questionBox = document.querySelector(".questionBox");
class QizzApp {
  constructor(_questionsList) {
    this._questionsList = _questionsList;
    this._currentLevel = 0;
    this._answerIndex = 0;
    this._decode = (str) => {
      const txt = new DOMParser().parseFromString(str, "text/html");
      return txt.documentElement.textContent;
    };
    this._showQuestion = (question) => {
      let answersNumber = question.incorrect_answers.length;
      if (answersNumber === 1) {
        pageContent.children[2].classList.add("two-answer");
        pageContent.children[3].classList.add("two-answer");
      } else {
        pageContent.children[2].classList.remove("two-answer");
        pageContent.children[3].classList.remove("two-answer");
      }
      this._answerIndex = Math.floor(Math.random() * (answersNumber + 1));
      let wrongAnswerIndex = 0;
      questionLine.textContent = this._decode(question.question);
      answerBoxes[this._answerIndex].textContent = this._decode(
        question.correct_answer
      );
      for (let i = 0; i <= answersNumber; i++) {
        if (i === this._answerIndex) {
          continue;
        } else {
          answerBoxes[i].textContent = this._decode(
            question.incorrect_answers[wrongAnswerIndex]
          );
          wrongAnswerIndex++;
        }
      }
    };
    this._checkAnswerHandler = (event) => {
      const currentElement = event.target;
      questionBox.classList.remove("old-question");
      questionBox.classList.remove("new-question");
      if (
        currentElement.textContent ===
        answerBoxes[this._answerIndex].textContent
      ) {
        answerBoxes[this._answerIndex].classList.add("correct-answer");
        results[this._currentLevel].classList.add("correct-answer");
        results[this._currentLevel].classList.add("showed-result");
      } else {
        answerBoxes[this._answerIndex].classList.toggle("correct-answer");
        currentElement.classList.toggle("wrong-answer");
        results[this._currentLevel].classList.add("showed-result");
      }
      this._currentLevel++;
      setTimeout(() => {
        questionBox.classList.add("old-question");
      }, 1300);
      setTimeout(() => {
        if (this._currentLevel === 4) {
          pageContent.textContent = "";
          questionLine.textContent = "The Exam is finished.";
        } else {
          currentElement.classList.remove("wrong-answer");
          answerBoxes[this._answerIndex].classList.remove("correct-answer");
          this._showQuestion(this._questionsList[this._currentLevel]);
        }
        questionBox.classList.add("new-question");
      }, 2100);
    };
  }
  _setCheckAnswerHandler() {
    answerBoxes.forEach((answer) => {
      answer.addEventListener("click", this._checkAnswerHandler);
    });
  }
  Run() {
    this._setCheckAnswerHandler();
    this._showQuestion(this._questionsList[this._currentLevel]);
  }
}
const myQuiz = new QizzApp(await getQuestions());
myQuiz.Run();
//# sourceMappingURL=main.js.map
