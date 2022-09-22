
const output = document.querySelector('.output');
const userInput = [];

let dotBool = false;
let operatorBool = false;
let argument1 = '';
let userOperator = '';
let argument2 = '';

function operate(arg1,arg2,operator){
    console.log(arg1 + ' ' + operator + ' ' + arg2)
    let currentOperator = operator;
    let result = 0;    

    if(currentOperator){
        if(currentOperator == '+'){result = arg1+arg2};
        if(currentOperator == '-'){result = arg1-arg2};
        if(currentOperator == 'x'){result = arg1*arg2};
        if(currentOperator == '/'){result = arg1/arg2};
    }else{
        result = 'error'
    }
    return result;
    
}

function inputCall(){
    
    let currentInput = this.innerText;                                                                                                                                                                   //store current input

    (/\d/.test(currentInput) && output.innerHTML.length <=14) ? userInput.push(currentInput)                                                                                                             //Check if input is a digit using RegEx and check max digit length, store it
   :(currentInput == '.' && dotBool == false)       ? (dotBool = true, userInput.push(currentInput))                                                                                                     //Check if input is a dot, prevent more than one dot per argument, store it
   :(/x÷-|\+/.test(currentInput) && !operatorBool)    ? setOperator(currentInput)      //( argument1 = userInput.join(''), userInput.push(' ' + currentInput + ' '), userOperator = currentInput)      //Check for operators - & +
   //:(currentInput=='x' && !operatorBool)            ?       //( argument1 = userInput.join(''), userInput.push(' ' + currentInput + ' '), userOperator = '*')               //Check separately for x operator and transfer it as *
   //:(currentInput=='÷' && !operatorBool)            ?       //( argument1 = userInput.join(''), userInput.push(' ' + currentInput + ' '), userOperator = '/')               //Check separately for ÷ operator and transfer it as /
   :(/Del|Clear|=/.test(currentInput))              ?  correction(currentInput)                                                                                                                          //Check for clearing /deleting operations --> Call function with
   :console.log('Go NaN yourfelf');                                                                                                                                                                      //else

    output.innerText = userInput.join('');                                                                                                                                                               //display full input so far
}

function correction(corrType){
    corrType == 'Del' ? (userInput.pop(), output.innerText = userInput.join(''))
   :corrType == 'Clear' ? (userInput.length = 0, dotBool = false, operatorBool = false)//userInput.forEach(element) {userInput.remove(element)};
   :(console.log('error'));
}

function setOperator(arg){
    dotBool = false;
    operatorBool = true;
    argument1 = userInput.join(''), userInput.push(' ' + arg + ' ');
    (arg == '+' || qrg == '-') ? userOperator = arg
    :arg == 'x' ? userOperator = '*'
    :arg == '÷' ? userOperator = '/'
    :console.log('setOperator error');

}

const inputKeys = document.querySelectorAll('.key');
inputKeys.forEach((key) => key.addEventListener('click', inputCall));

// console.log('= ' + operate(5,2,'+'));
// console.log('= ' + operate(5,2,'-'));
// console.log('= ' + operate(5,3,'x'));
// console.log('= ' + operate(10,5,'/'));