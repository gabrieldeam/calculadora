let currentInput = document.querySelector('.currentInput');
let answerScreen = document.querySelector('.answerScreen');
let buttons = document.querySelectorAll('button');
let erasebtn = document.querySelector('#erase');
let clearbtn = document.querySelector('#clear');
let evaluate = document.querySelector('#evaluate');
let realTimeScreanValue = []

clearbtn.addEventListener("click", () => {
    realTimeScreanValue = [''];
    answerScreen.innerHTML = 0;
    currentInput.className = 'currentInput';
    answerScreen.className = 'answerScreen';
    answerScreen.style.color = "rgba(150, 150, 150, 0.87)";
})

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        
        
        if (!btn.id.match('erase')) {
            realTimeScreanValue.push(btn.value)
            console.log(realTimeScreanValue)
            currentInput.innerHTML = realTimeScreanValue.join('');

            if (btn.classList.contains('num_btn')) {
                if ((eval(realTimeScreanValue.join(''))).toString().length > 8) {
                    answerScreen.innerHTML = (eval(realTimeScreanValue.join(''))).toFixed(5);
                }

                else {
                    console.log((eval(realTimeScreanValue.join(''))).toString().length)
                    answerScreen.innerHTML = eval(realTimeScreanValue.join(''));
                }
            }
        }
        
        if (btn.id.match('erase')) {
            realTimeScreanValue.pop();
            currentInput.innerHTML = realTimeScreanValue.join('');
            answerScreen.innerHTML = eval(realTimeScreanValue.join(''));
        }

        if (btn.id.match('evaluate')) {
            currentInput.className = 'answerScreen';
            answerScreen.className = 'currentInput';
            answerScreen.computedStyleMap.color = "white";
        }

        if (btn.value === "%") {
            if (realTimeScreanValue.length > 0) {
              // Encontrar o índice do operador mais recente (+, -, *, /)
              let operatorIndex = -1;
              for (let i = realTimeScreanValue.length - 1; i >= 0; i--) {
                if (['+', '-', '*', '/'].includes(realTimeScreanValue[i])) {
                  operatorIndex = i;
                  break;
                }
              }
      
              // Se um operador foi encontrado, calcular a porcentagem
              if (operatorIndex !== -1) {
                const numAntesDoOperador = parseFloat(realTimeScreanValue.slice(operatorIndex + 1).join(''));
                const porcentagem = numAntesDoOperador * 0.01;
                realTimeScreanValue.push(porcentagem.toString());
                currentInput.innerHTML = realTimeScreanValue.join('');
              }
            }
        }
        
        if (btn.value === "%") {
            if (realTimeScreanValue.length > 0) {
              let operatorIndex = realTimeScreanValue.findIndex((value) => ['+', '-', '*', '/'].includes(value));
      
              if (operatorIndex !== -1) {
                const numAntesDoOperador = parseFloat(realTimeScreanValue.slice(0, operatorIndex).join(''));
                const porcentagem = parseFloat(realTimeScreanValue.slice(operatorIndex + 1).join(''));
                const operador = realTimeScreanValue[operatorIndex];
      
                // Calcular o resultado da regra de três percentual
                const resultadoRegraTres = (numAntesDoOperador * porcentagem) / 100;
      
                // Substituir a sequência em currentInput pelo resultado da regra de três percentual com o operador e A
                realTimeScreanValue = [ numAntesDoOperador.toString(), operador, resultadoRegraTres.toString()];
                currentInput.innerHTML = realTimeScreanValue.join('');
              }
            }
          }
      
          // ... (outro código)
      
          // Atualizar o resultado em answerScreen com base em currentInput
          let expression = currentInput.innerHTML;
          let resultadoFinal = eval(expression);
          answerScreen.innerHTML = resultadoFinal;


        if (typeof eval(realTimeScreanValue.join('')) == 'undefined') {
            answerScreen.innerHTML = 0
        }

    })
})