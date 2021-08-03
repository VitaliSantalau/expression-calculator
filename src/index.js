function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  
  function exprToArr(expr) {
    return expr
    .replace(/\+/g, ' + ')
    .replace(/\-/g, ' - ')
    .replace(/\*/g, ' * ')
    .replace(/\//g, ' / ')
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .split(' ')
    .filter(elem => elem !== '');
  }

  function getReversePolishNotation(arr) {
    let outArr = [];
    const stack = [];
    const prioritet = {
      '/': 2,
      '*': 2,
      '+': 3,
      '-': 3,
    }
    for(let i = 0; i < arr.length; i++) {
      const isNumber = !Object.is(NaN, Number(arr[i]));
      if(isNumber) outArr.push(arr[i]);

      if(arr[i] === '+' || arr[i] === '-' || arr[i] === '*' || arr[i] === '/') {
        if(stack.length === 0) {
          stack.push(arr[i]);
        } else { 
          if(prioritet[stack[stack.length-1]] <= prioritet[arr[i]]) {
            outArr.push(stack.pop());
          } 
          stack.push(arr[i]);
        } 
      }    
      
      if(arr[i] === '(') stack.push(arr[i]);
           
      if(arr[i] === ')') {
        while(stack[stack.length-1] !== '(') {
          if(stack.length === 0) {
            throw new Error("ExpressionError: Brackets must be paired");
          }; 
          outArr.push(stack.pop());
        }
        if(stack[stack.length-1] === '(') {
          stack.pop();
          delete arr[i];
        } 
      }    
    }

    while(stack.length) {
      if(stack[stack.length-1] === '(') {
        throw new Error("ExpressionError: Brackets must be paired");
      }
      outArr.push(stack.pop());
    }
    return outArr;
  }

  function toCalculate(arr) {
    const operation = {
      '+': (x, y) => x + y,
      '-': (x, y) => y - x,
      '*': (x, y) => x * y,
      '/': (x, y) => y / x,
    }

    const stack = [];

    for(let i = 0; i < arr.length; i++) {
      const isNumber = !Object.is(NaN, Number(arr[i]));
      if(isNumber) stack.push(arr[i]);
      if(!isNumber) {
        const currentCalculate = operation[arr[i]](Number(stack.pop()), Number(stack.pop()));
        stack.push(currentCalculate);
      }
    }

    return Number(stack[0]).toFixed(4);
  }
  const arr = exprToArr(expr);
  const arrReversePolishNotation = getReversePolishNotation(arr);
  return result = toCalculate(arrReversePolishNotation);
}

console.log(expressionCalculator(" 20 - 57 * 12 - (  58 + 84 * 32 / 27  )"))

// module.exports = {
//     expressionCalculator
// }