import { getQuestions, QuestionsList } from "./getAPI";
const questionLine = document.querySelector(".question") as HTMLDivElement;
const answerBoxes = document.querySelectorAll(
  ".answer"
) as NodeListOf<HTMLDivElement>;
const results = document.querySelectorAll(
  ".result .filler"
) as NodeListOf<HTMLDivElement>;
const pageContent = document.querySelector(".answers") as HTMLDivElement;
const questionBox = document.querySelector(".questionBox") as HTMLDivElement;

class QizzApp {
  constructor(private _questionsList: QuestionsList[]) {}

  private _currentLevel = 0;
  private _answerIndex = 0;

  private _decode = (str: string) => {
    const txt = new DOMParser().parseFromString(str, "text/html");
    return txt.documentElement.textContent as string;
  };

  private _showQuestion = (question: QuestionsList) => {
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

  private _checkAnswerHandler = (event: MouseEvent) => {
    const currentElement = event.target as HTMLDivElement;
    questionBox.classList.remove("old-question");
    questionBox.classList.remove("new-question");
    if (
      currentElement.textContent === answerBoxes[this._answerIndex].textContent
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

  private _setCheckAnswerHandler() {
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
