function changeBackgroundColor(element){ 
    element.style.backgroundColor = 'green';  
    setTimeout(function() { 
        element.style.backgroundColor = '';  
    },150); 
}

const numbersDisplay=document.querySelector(".numbers-display");

// Variables that we need
let answer=null;
let  firstOperand=null;
let secondOperand=null;
let operator=null;

let displayValue='0';
let waitingForSecondOperand=false;
let expression='';

// Creating initial stage
function initial(){
    displayValue='0';
    firstOperand=null;
    secondOperand=null;
    operator=null;
    answer=null;
    expression='';
    waitingForSecondOperand=false;
    updateDisplay();
}

initial();

const ac=document.querySelector("[ac]");

ac.addEventListener("click",()=>{
    initial();
});

function handleNumber(value){
    if(waitingForSecondOperand){
        displayValue=value;
        waitingForSecondOperand=false;
    }
    else{
        displayValue=displayValue==='0'? value : displayValue + value;
    }
    expression=expression+value;
    updateDisplay();
}

function handleOperator(nextOperator){
    const currentValue=parseFloat(displayValue);

    if(operator && waitingForSecondOperand){
        operator=nextOperator;
        expression=expression.slice(0,-1) + nextOperator;
        updateDisplay();
        return;
    }

    if(firstOperand==null){
        firstOperand=currentValue;
    }
    else if(operator){
        secondOperand=currentValue;
        answer=performCalculation[operator](firstOperand,secondOperand);
        displayValue=String(answer);
        firstOperand=answer;
    }

    waitingForSecondOperand=true;
    operator=nextOperator;

    if(nextOperator!=='='){
    expression=expression+nextOperator;
    }
    else { 
        expression = `${answer}`;  
        firstOperand = null; 
        secondOperand = null; 
        operator = null; 
        waitingForSecondOperand = false; 
    } 
    updateDisplay();
}

const performCalculation={
    '/': (firstOperand,secondOperand)=>firstOperand/secondOperand,
    '*': (firstOperand,secondOperand)=>firstOperand*secondOperand,
    '+': (firstOperand,secondOperand)=>firstOperand+secondOperand,
    '-': (firstOperand,secondOperand)=>firstOperand-secondOperand,
    '%': (firstOperand,secondOperand)=>firstOperand%secondOperand,
    '=': (firstOperand,secondOperand)=>firstOperand
}

const boxes=document.querySelectorAll(".box");

function updateDisplay(){
    numbersDisplay.innerText=expression;
    
    // numbersDisplay.innerText=displayValue;
}

boxes.forEach(box =>{
    box.addEventListener("click",()=>{
        const value = box.innerText;

        if(box.classList.contains('operator')){
            if(value==='AC'){
                initial();
            }
            else{
                handleOperator(value);
            }
        }
        else{
            handleNumber(value);
        }
        updateDisplay();
    });
});
updateDisplay();