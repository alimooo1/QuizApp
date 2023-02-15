export async function getQuestions () {
    const data = await fetch("https://opentdb.com/api.php?amount=4")
    const result = await data.json();
    return result.results
}

