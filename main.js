
const output = document.querySelector('.output');
// const regex = / x /;

let dotBool = false;
let operatorBool = false;
const userInput = [];
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

    //Check if input is a digit using RegEx and check max digit length
    if(/\d/.test(this.innerText) && output.innerHTML.length <=14){        
        userInput.push(this.innerText);
    }

    //Only one dot can be used
    else if (this.innerText == '.' && dotBool == false){
        dotBool = true;
        userInput.push(this.innerText);
    }

    //Check for x ÷ - and + operators
    else if(/x|÷|-|\+/.test(this.innerText) && !operatorBool){

        operatorBool = true;

        if(this.innerText == 'x'){
            userOperator = '*';
        }else if(this.innerText == '÷'){
            userOperator = '/';
        }
        else{
            userOperator = this.innerText;            
        } 

        dotBool = false;
        argument1 = userInput.join('');
        userInput.push(this.innerText);     
    }

    //Check for Del, Clear and =
    else if(/Del|Clear|=/.test(this.innerText)){
        console.log(this.innerText);
    }
    
    
    
    else{
        console.log('Go NaN yourfelf'); 
    }

    output.innerText = userInput.join(''); 
}

function operationCall(){
}

const inputKeys = document.querySelectorAll('.key');
inputKeys.forEach((key) => key.addEventListener('click', inputCall));

// console.log('= ' + operate(5,2,'+'));
// console.log('= ' + operate(5,2,'-'));
// console.log('= ' + operate(5,3,'x'));
// console.log('= ' + operate(10,5,'/'));