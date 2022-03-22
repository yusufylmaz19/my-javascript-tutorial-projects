const Quiz=[
    {   
        questions:"what day is it? ",
        a:"wed",
        b:"mon",
        c:"tus",
        d:"fri",
        correct:"c"
    },
    {   
        questions:"what is 3 square? ",
        a:3,
        b:6,
        c:9,
        d:12,
        correct:"c"
    },
    {   
        questions:"how many people lives on earth?(billion) ",
        a:3,
        b:8,
        c:1,
        d:10,
        correct:"b"
    },
]

const answers= document.querySelectorAll(".answer");
const quizEl= document.getElementById("quiz");
let answer=undefined;

let currentQ=0;
let score=0;
const questionStand=document.getElementById("questionStand");
const a_text=document.getElementById("a_text");
const b_text=document.getElementById("b_text");
const c_text=document.getElementById("c_text");
const d_text=document.getElementById("d_text");
const btn=document.getElementById("button");

function showQ(){
    deselect();
    const currentQuestionData=Quiz[currentQ];
    questionStand.innerText=currentQuestionData.questions;
    a_text.innerText=currentQuestionData.a;
    b_text.innerText=currentQuestionData.b;
    c_text.innerText=currentQuestionData.c;
    d_text.innerText=currentQuestionData.d;
}        
function getSelected(){

    answers.forEach((answerEl)=>{
        if(answerEl.checked){
            answer=answerEl.id;
        }
    })

    return answer;
}
showQ();

function deselect(){

    answers.forEach((answerEl)=>{
            answerEl.checked=false;
    })
}

btn.addEventListener("click",()=>{

    const answer=getSelected();

    if(answer){
        
    if(answer===Quiz[currentQ].correct){
        score++;   
    }
    
        currentQ++;
        if(currentQ<Quiz.length){
            showQ();
        }
        else{
            quizEl.innerHTML=`Your answerd <br><br> correctly at ${score}/${Quiz.length}
             question<br><br> <button onclick="location.reload()">Reload</button>`
            quizEl.style.fontSize="2.4rem";
            quizEl.style.display="flex";
            quizEl.style.justifyContent="center";
            quizEl.style.alignItems="center";
        }
    }
    console.log(score);
});