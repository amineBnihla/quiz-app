// bring all the elements needed
let category = document.querySelector(".quiz-head .category span");
let number = document.querySelector(".quiz-head .number span");
let question = document.querySelector(".quiz-body .the-question");
let ansewrs = document.querySelector(".quiz-body .answers");
let message= document.querySelector(".quiz-footer .status .message");
let bullets= document.querySelector(".quiz-footer .bullets");
let questionsData = [];
let currentQuestion = 0;
let correctAnswers =0;
let failedAnswers =0;
let rightAnswer = "";
//fetch data
async function fetchQuestions(){
 questionsData =  await fetch("./quesions/html_questions.json")
    .then((res)=>res.json())
    .then((data)=>{
       return data 
    });
    displayQuestions();
}
//function for bringing data
fetchQuestions();

 function displayQuestions(){
   ansewrs.innerHTML = "";
   bullets.innerHTML="";
   question.innerHTML="";
   message.querySelector('.correctAnswers').innerHTML = "";
   message.querySelector('.numberOfAnswers').innerHTML ="";
    //start creating the element
   if(questionsData.length > 0){
       number.innerHTML = questionsData.length
       //set the quetion
       question.textContent = questionsData[currentQuestion].title;
    //    loop through the answers to create elements and save the right answer into a variable
    for(let [key,value] of Object.entries(questionsData[currentQuestion])){
        if(key.startsWith('answer')){
            let answerLabel = document.createElement('label');
            answerLabel.className = "custom-radio";
            let radio = document.createElement('input');
            radio.name = "answer";
            radio.type="radio";
            let span = document.createElement("span");
            span.appendChild(document.createTextNode(value));
            answerLabel.appendChild(radio);
            answerLabel.appendChild(span);
            ansewrs.appendChild(answerLabel);
        }
        if(key.startsWith('right')){
            rightAnswer =value;
            console.log(rightAnswer);
        }
    }
    //set the message 
    console.log( message.querySelector('.title').classList);
        message.querySelector('.correctAnswers').innerHTML = correctAnswers;
    message.querySelector('.numberOfAnswers').innerHTML =  questionsData.length;

    //create bullets
    questionsData.forEach((element,index) => {
        let bullet = document.createElement("span");
        bullet.className = "bullet";
        if(index == currentQuestion){
            bullet.classList.add("active");
        }
        bullets.appendChild(bullet);
    });


   }
} 

// watch the check event and compare the answer
document.addEventListener("click",function(e){

   if(e.target.getAttribute("name") == "answer"){
     let answer =e.target.parentElement.children[1];

     if(answer.textContent == rightAnswer){
          answer.style.backgroundColor = "green";
      setTimeout(()=>{ 
          console.log(currentQuestion);
          console.log(questionsData.length -1);
           correctAnswers++; 
           if(correctAnswers == 0){
            changetitle() 
        }else if(correctAnswers > 0 && correctAnswers< 5){
    changetitle("not-bad")
        }else if(correctAnswers == 5){
       changetitle("good")
        }else if(correctAnswers > 5){
   changetitle("perfect")
        }
          if(currentQuestion == (questionsData.length-1)){
              console.log("finish")
              
            alertMeg()
          
        }else{
              currentQuestion++;
       
        displayQuestions();
        }
           
        
       
       
      },1000)
       
      
    
     }else{
          failedAnswers++;
         answer.style.backgroundColor = "red";
          if(correctAnswers == 0){
            changetitle() 
        }else if(correctAnswers > 0 && correctAnswers< 5){
    changetitle("not-bad")
        }else if(correctAnswers == 5){
       changetitle("good")
        }else if(correctAnswers > 5){
   changetitle("perfect")
        }
         setTimeout(()=>{
                if(currentQuestion == (questionsData.length-1)){
              
            alertMeg()
          
        }else{
             currentQuestion++;
              displayQuestions();
        }
            
         },1000)
     }
    
   }
});
function changetitle(status = "start"){
    let title =  message.querySelector('.title');
  title.innerHTML = status == "not-bad" ? status.split("-").join(" "): status;
  title.classList.remove(...title.classList);
  title.classList.add("title",status.toLowerCase());
}
function alertMeg(){
    let container = document.createElement("div");
    container.className ="alertMsg";
    let mainMsg = document.createElement("div");
    mainMsg.className ="mainMsg";
    mainMsg.appendChild(document.createTextNode("you've finished your game"))

    let answersQuestion = document.createElement("div");
    answersQuestion.className ="answers-question";
    answersQuestion.appendChild(document.createTextNode("Questions :"))
    let questionSpan = document.createElement('span');
    questionSpan.innerHTML = questionsData.length;
    answersQuestion.appendChild(questionSpan); 
    
        let answersCorrect = document.createElement("div");
    answersCorrect.className ="answers-correct";
    answersCorrect.appendChild(document.createTextNode("Correct Answers :"))
    let correctSpan = document.createElement('span');
    correctSpan.innerHTML = correctAnswers;
    answersCorrect.appendChild(correctSpan); 

      let answersFailed = document.createElement("div");
    answersFailed.className ="answers-failed";
    answersFailed.appendChild(document.createTextNode("Failed Answers :"))
    let failedSpan = document.createElement('span');
    failedSpan.innerHTML = failedAnswers;
    answersFailed.appendChild(failedSpan); 
    
    container.appendChild(mainMsg);
    container.appendChild(answersQuestion);
    container.appendChild(answersCorrect);
    container.appendChild(answersFailed);
    console.log(container);
    ansewrs.appendChild(container);

     

}


