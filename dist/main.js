var _a;
import { getQuestions } from "./getAPI.js";
const questionLine = document.querySelector(".question");
const answerBoxes = document.querySelectorAll(".answer");
const results = document.querySelectorAll(".result .filler");
const pageContent = document.querySelector(".answers");
const questionBox = document.querySelector(".questionBox");
class QizzApp {
  static _setCheckAnswerHandler() {
    answerBoxes.forEach((answer) => {
      answer.addEventListener("click", this._checkAnswerHandler);
    });
  }
  static async Run() {
    this._questionsList = await this._getQuestions();
    this._setCheckAnswerHandler();
    this._showQuestion(this._questionsList[this._currentLevel]);
  }
}
_a = QizzApp;
QizzApp._questionsList = [];
QizzApp._getQuestions = async () => {
  return await getQuestions();
};
QizzApp._currentLevel = 0;
QizzApp._answerIndex = 0;
QizzApp._decode = (str) => {
  const txt = new DOMParser().parseFromString(str, "text/html");
  return txt.documentElement.textContent;
};
QizzApp._showQuestion = (question) => {
  let answersNumber = question.incorrect_answers.length;
  if (answersNumber === 1) {
    pageContent.children[2].classList.add("two-answer");
    pageContent.children[3].classList.add("two-answer");
  } else {
    pageContent.children[2].classList.remove("two-answer");
    pageContent.children[3].classList.remove("two-answer");
  }
  _a._answerIndex = Math.floor(Math.random() * (answersNumber + 1));
  let wrongAnswerIndex = 0;
  questionLine.textContent = _a._decode(question.question);
  answerBoxes[_a._answerIndex].textContent = _a._decode(
    question.correct_answer
  );
  for (let i = 0; i <= answersNumber; i++) {
    if (i === _a._answerIndex) {
      continue;
    } else {
      answerBoxes[i].textContent = _a._decode(
        question.incorrect_answers[wrongAnswerIndex]
      );
      wrongAnswerIndex++;
    }
  }
};
QizzApp._checkAnswerHandler = (event) => {
  const currentElement = event.target;
  questionBox.classList.remove("old-question");
  questionBox.classList.remove("new-question");
  if (currentElement.textContent === answerBoxes[_a._answerIndex].textContent) {
    answerBoxes[_a._answerIndex].classList.add("correct-answer");
    results[_a._currentLevel].classList.add("correct-answer");
    results[_a._currentLevel].classList.add("showed-result");
  } else {
    answerBoxes[_a._answerIndex].classList.toggle("correct-answer");
    currentElement.classList.toggle("wrong-answer");
    results[_a._currentLevel].classList.add("showed-result");
  }
  _a._currentLevel++;
  setTimeout(() => {
    questionBox.classList.add("old-question");
  }, 1300);
  setTimeout(() => {
    if (_a._currentLevel === 4) {
      pageContent.textContent = "";
      questionLine.textContent = "The Exam is finished.";
    } else {
      currentElement.classList.remove("wrong-answer");
      answerBoxes[_a._answerIndex].classList.remove("correct-answer");
      _a._showQuestion(_a._questionsList[_a._currentLevel]);
    }
    questionBox.classList.add("new-question");
  }, 2100);
};
QizzApp.Run();
//# sourceMappingURL=main.js.map
