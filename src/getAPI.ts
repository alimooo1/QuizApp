interface Response {
  response_code: number;
  results: QuestionsList[];
}

export interface QuestionsList {
  type: "mulitple" | "boolean";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export async function getQuestions() {
  const data = await fetch("https://opentdb.com/api.php?amount=4");
  const result: Response = await data.json();
  return result.results as QuestionsList[];
}
