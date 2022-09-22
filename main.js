const output = document.querySelector('.output');
const userInput = [];

let dotUsed = false;
let operatorUsed = false;
let argument1 = '';
let userOperator = '';
let argument2 = '';

function operate(arg1,arg2,operator){
    let result = 0; 

     operator == '+' ? result = arg1 + arg2
    :operator == '-' ? result = arg1 - arg2
    :operator == '*' ? result = arg1 * arg2
    :operator == '/' ? result = arg1 / arg2
    :console.log('operate() error'), reusl = 'error';

    return result;    
}

function inputCall(){    
    let currentInput = this.innerText;                                                                                         

    (/[0-9]/.test(currentInput) && output.innerHTML.length <=14) ? userInput.push(currentInput)                                                                                                             
   :(currentInput == '.' && dotUsed == false && userInput.length > 0)           ? (dotUsed = true, userInput.push(currentInput))                                                                                                     
   :(/x|÷|-|\+/.test(currentInput) && !operatorUsed && userInput.length > 0)    ? (addOperator(), setOperator(currentInput))           
   :(currentInput == 'Clear')  ? removeAll()
   :(currentInput == 'Del')    ? removeSingle()
   : currentInput == '='       ? parseInput()                                                                                                                     
   :console.log('Go NaN yourfelf');                                                                                                                                                                      

    output.innerText = userInput.join('');
    console.log('dot used : ' + dotUsed + '// operator used : ' + operatorUsed);                                                                                                                                                              
}

function removeAll(){
    userInput.length = 0;
    dotUsed = false;
    operatorUsed = false;  
}

function removeSingle(){
    let lastInputKey = userInput[userInput.length-1];

    (/x|÷|-|\+/.test(lastInputKey)) ? removeOperator()
    :(lastInputKey == '.') ? dotUsed = false
    :console.log('removeSingle()   ///=>' + lastInputKey)

    userInput.pop();
    output.innerText = userInput.join('');
}

function removeOperator(){
    operatorUsed = false;
    dotUsed = true;
}

function addOperator(){
    operatorUsed = true;
    dotUsed = false    
}

function setOperator(arg){
    argument1 = userInput.join(''), userInput.push(' ' + arg + ' ');
    (arg == '+' || arg == '-') ? userOperator = arg
    :arg == 'x' ? userOperator = '*'
    :arg == '÷' ? userOperator = '/'
    :console.log('setOperator() error');
}

function parseInput(){
    let inputString = userInput.join('');
    console.log(inputString);
}

const inputKeys = document.querySelectorAll('.key');
inputKeys.forEach((key) => key.addEventListener('click', inputCall));