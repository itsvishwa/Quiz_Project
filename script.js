let index = 0;
let jsonData;
let correctAnswer;
let answers;
let selectedTag;
let score = 0;
let count;

function nextQuestion(){
    if(index == count){
        alert(`Score: ${score}/${count}`);
        index = 0;
    }

    let questionTag = document.getElementById("question");
    let answerTags = [
        document.querySelector("label[for='answer1']"),
        document.querySelector("label[for='answer2']"),
        document.querySelector("label[for='answer3']"),
        document.querySelector("label[for='answer4']"),
    ];

    const questions = jsonData.questions;
    let question = questions[index].question;
    answers = questions[index].answers;
    
    questionTag.innerHTML = index+1 + ") " + question;
    for(let i=0; i<4; i++){
        answerTags[i].innerHTML = answers[i].answer;
        if(answers[i].is_correct){
            correctAnswer = i+1;
        }
    }
    index ++;
}

function checkAnswer(){
    if(correctAnswer == null){
        nextQuestion();
        return;
    }
    const form = document.getElementById('answer-form');
    if (!form.answer.value) {
        alert('Please select an answer!');
        return;
    }
    selectedTag = document.querySelector("input[name='answer']:checked");
    if(selectedTag.value == correctAnswer){
        showAnswerStatus(true);
        score++;
    }else{
        showAnswerStatus(false);
    }
    form.reset();
}

async function showAnswerStatus(isTrue){
    let answerResultBoxTag = document.getElementById("answer-result-box");
    answerResultBoxTag.style.display = "block";
    let answerResulttitleTag = document.getElementById("answer-result-title");
    let answerResultdescTag = document.getElementById("answer-result-desc");
    if(isTrue){
        answerResultBoxTag.style.backgroundColor = "#04d69b";
        answerResulttitleTag.innerHTML = "Correct!";
        answerResultdescTag.innerHTML = `${answers[correctAnswer-1].answer} is the correct answer😼`;
    }else{
        answerResultBoxTag.style.backgroundColor = "#ff2652";
        answerResulttitleTag.innerHTML = "Wrong!";
        answerResultdescTag.innerHTML = `${answers[selectedTag.value-1].answer} is incorrect😿. The correct answer is ${answers[correctAnswer-1].answer}`;
    }
    await delay(2500);
    answerResultBoxTag.style.display = "none";
    nextQuestion();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('qustions.json')
      .then(response => response.json())
      .then(data => {
        jsonData = data;
        count = jsonData.questions.length;
        nextQuestion();
      });
    btn = document.getElementById("continue-btn");
    btn.addEventListener("click", checkAnswer);
});
