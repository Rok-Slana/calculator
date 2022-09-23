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

function operate(arg1,arg2){
    CPUoperator == '+' ? result = arg1 + arg2
    :CPUoperator == '-' ? result = arg1 - arg2
    :CPUoperator == '*' ? result = arg1 * arg2
    :CPUoperator == '/' ? result = arg1 / arg2
    :result = 'error';
    output.innerText = result;
}

function inputCall(){      
    let input = this.innerText;
    let currentValue = args[argsIndex];
    (/[0-9]/.test(input) &&  currentValue.number.length <=7) ? currentValue.number.push(input)
    : (input == '.' && !args[argsIndex].dotUsed) ? (args[argsIndex].number.push(input), args[argsIndex].dotUsed = true)
    : console.log('Something went wrong || Number too long');
    renderOutput();                                                                                                                                                         
}

function operationCall(){    
    let givenValue = this.innerText;
    (givenValue == 'Del') ? removeSingle()
    :givenValue =='Clear' ? removeAll()
    :(/x|÷|-|\+/.test(givenValue) && operator =='')     ? (setOperator(givenValue), argsIndex = 1)
    :(/x|÷|-|\+/.test(givenValue) && operator !='')     ? operate(parseFloat(argument1.number.join('')),parseFloat(argument2.number.join('')))//(setOperator(givenValue), argsIndex = 1)
    :givenValue == '='                                  ? operate(parseFloat(argument1.number.join('')),parseFloat(argument2.number.join('')))
    :console.log('operationCall not possible');
}

function removeAll(){
    argument1.number.length = 0;
    argument1.dotUsed = false;
    argument2.number.length = 0;
    argument2.dotUsed = false;
    operator = '';
    argsIndex = 0;
    renderOutput()
}

function removeSingle(){
    let lastOutputValue = output.innerText.slice(-1); //get the last char of a string

    (/[0-9]/.test(lastOutputValue)) ? args[argsIndex].number.pop()
    :(lastOutputValue == '.') ? (args[argsIndex].number.pop(), args[argsIndex].dotUsed = false)
    :(/x|÷|-|\+/.test(lastOutputValue)) ? (operator = '', argsIndex = 0)  
    :console.log(lastValueInArg);
    renderOutput();
}

function setOperator(arg){    
    (arg == '+' || arg == '-') ? CPUoperator = arg
    :arg == 'x' ? CPUoperator = '*'
    :arg == '÷' ? CPUoperator = '/' 
    :console.log('unable to set CPU operator')    
    operator = arg;
    renderOutput();
}

function renderOutput(){    
    output.innerText = args[0].number.join('') + operator + args[1].number.join('')
}


const inputKeys = document.querySelectorAll('.number');
inputKeys.forEach((key) => key.addEventListener('click', inputCall));

const operatingKeys = document.querySelectorAll('.operator');
operatingKeys.forEach((key) => key.addEventListener('click', operationCall));

renderOutput();