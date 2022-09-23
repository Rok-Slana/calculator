const output = document.querySelector('.output');
const userInput = [];

let argsIndex = 0;
let operator = '';
let nextOperator = '';
let CPUoperator = '';
let argument1 = {
    number : [],
    dotUsed : false,
};
let argument2 = {
    number : [],
    dotUsed : false,
};
let result = 0.0;
let args = [ argument1, argument2];

//Calculator
function operate(arg1,arg2){                        //recieve two values

    CPUoperator == '+' ? result = arg1 + arg2       // determine operator, make calculation
    :CPUoperator == '-' ? result = arg1 - arg2
    :CPUoperator == '*' ? result = arg1 * arg2
    :CPUoperator == '/' ? result = arg1 / arg2
    :result = 'error';

    removeAll();                                    //crear args array

    //if(nextOperator != ''){                       //if user input an operator instead of equals
        let nextArgument = result;                  
        args[0].number.push(nextArgument);          //store result as firts argument in args array
        args[argsIndex].dotUsed = true;               
        if(nextOperator != ''){  
            setOperator(nextOperator);              //set operator anew
            nextOperator = '';                      //reset nextOperator placeholder for a new iteration        
            argsIndex = 1;                          //set appropriate index for following input
            renderOutput();
        }
        else{ 
            output.innerText = result;              //else just show the result
        }    
}

//Only for numbers and dot
function inputCall(){      
    let input = this.innerText;                     //store input
    let currentValue = args[argsIndex];             //copy array object at given slot
    (/[0-9]/.test(input) &&  currentValue.number.length <=7) ? currentValue.number.push(input)                          //push if it is a number not longer than 7 digits
    : (input == '.' && !args[argsIndex].dotUsed) ? (args[argsIndex].number.push(input), args[argsIndex].dotUsed = true) //check if a dot has already been used for current number, if so - add it
    : console.log('error : inputCall');
    renderOutput();                                                                                                                                                         
}

//For operations only ( + ; - ; * ; / ; = ; Del ; Clear)
function operationCall(){    
    let givenValue = this.innerText;                //Store given value
    (givenValue == 'Del') ? removeSingle()          // if value == Del remove last value from output
    :givenValue =='Clear' ? removeAll()             // if value == Clear remove everything and set anew
    :(/x|÷|-|\+/.test(givenValue) && operator =='')     ? (setOperator(givenValue), argsIndex = 1)                                                                          //if an operator is given, set it and raise the argsIndex
    :(/x|÷|-|\+/.test(givenValue) && operator !='')     ? operate(parseFloat(argument1.number.join('')),parseFloat(argument2.number.join('')), nextOperator = givenValue)   //if an operator is given instead of =, do same as above but also set this second oprrator as nextOperator
    :givenValue == '='                                  ? operate(parseFloat(argument1.number.join('')),parseFloat(argument2.number.join('')))                              //if value == '=' parse numbers and send them forward
    :console.log('error : operationCall');
}

//Clear all values in Array
function removeAll(){
    argument1.number.length = 0;
    argument1.dotUsed = false;
    argument2.number.length = 0;
    argument2.dotUsed = false;
    operator = '';
    argsIndex = 0;
    renderOutput()
}

//Clear only the last value in output
function removeSingle(){
    let lastOutputValue = output.innerText.slice(-1);                                           //get the last char of the output string

    (/[0-9]/.test(lastOutputValue)) ? args[argsIndex].number.pop()                              //if digit, remove it
    :(lastOutputValue == '.') ? (args[argsIndex].number.pop(), args[argsIndex].dotUsed = false) //if dot, remove it and reset object dotUsed value
    :(/x|÷|-|\+/.test(lastOutputValue)) ? (operator = '', argsIndex = 0)                        //if operator, remove it, reset operator, change argsIndex  
    :console.log('error : removeSingle');
    renderOutput();
}

//Set the operator, one for output and one for the compuer to use as sybols used are different
function setOperator(arg){    
    (arg == '+' || arg == '-') ? CPUoperator = arg      
    :arg == 'x' ? CPUoperator = '*'
    :arg == '÷' ? CPUoperator = '/' 
    :console.log('error :  setOperator')    
    operator = arg;
    renderOutput();
}

//Take all stored input and render it
function renderOutput(){ 
    output.innerText = args[0].number.join('') + operator + args[1].number.join('')
}

const inputKeys = document.querySelectorAll('.number');
inputKeys.forEach((key) => key.addEventListener('click', inputCall));

const operatingKeys = document.querySelectorAll('.operator');
operatingKeys.forEach((key) => key.addEventListener('click', operationCall));

renderOutput();