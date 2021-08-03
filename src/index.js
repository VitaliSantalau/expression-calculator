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
    const outArr = [];
    const stack = [];
    const priority = {
      '/': 1,
      '*': 1,
      '+': 2,
      '-': 2,
    }

    for(let i = 0; i < arr.length; i++) {
      const isNumber = !Object.is(NaN, Number(arr[i]));
      if(isNumber) outArr.push(arr[i]);

      if(arr[i] in priority) {
        if(stack.length === 0) {
          stack.push(arr[i]);
        } else { 
          while(priority[stack[stack.length-1]] <= priority[arr[i]]) {
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
        // stack[stack.length-1] === '('
        stack.pop();
        delete arr[i];
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
        if(Object.is(Infinity, currentCalculate)) {
          throw new Error('TypeError: Division by zero.')
        }
        stack.push(currentCalculate);
      }
    }
    return stack.pop();
  }
  
  const arr = exprToArr(expr);
  const arrReversePolishNotation = getReversePolishNotation(arr);
  return result = toCalculate(arrReversePolishNotation);
}

module.exports = {
    expressionCalculator
}