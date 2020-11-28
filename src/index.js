import initGame from './initGame.js';
import CheckInput from './checkInput.js';

export default function BaseballGame() {
	this.play = function (computerInputNumbers, userInputNumbers) {
    let [ball, strike] = CountBallStrike(computerInputNumbers, userInputNumbers);
    let resultMessage = '';
  
	  if (ball !== 0)
		  resultMessage += `${ball}볼`;
  
    if (strike !== 0 && ball !== 0)
      resultMessage += ' ';

    if (strike !== 0)
      resultMessage += `${strike}스트라이크`;
  
	  if (ball === 0 && strike === 0)
		  resultMessage = '낫싱';
  
	  if (strike === 3)
		  resultMessage = 'success';
  
	  return resultMessage;
  }

  document.body.style.fontFamily = 'Arial';
  let _resultArea = document.querySelector('#result');
  let _button = document.querySelector("#submit");
  let _input = document.querySelector("#user-input");
  let _privateInitUtils = new initGame();
  let _answer = _privateInitUtils.StartGame(_input);

  _button.addEventListener('click', (e) => {
    e.preventDefault();
    let InputUtils = new CheckInput();
    let userValue = InputUtils.GetInput(_input);

    if (userValue !== 0) {
      let resultMessage = this.play(_answer, userValue);
      DisplayResult(resultMessage);
    }
  })

	const CountBallStrike = (answer, userValue) => {
	  let ball = 0;
	  let strike = 0;

	  for (let i = 0; i <= 2; i++) {
		  if (answer[i] === parseInt(userValue[i]))
		    strike++;
		  else if (userValue.indexOf(answer[i]) !== -1)
		    ball++;
    }

	  return [ball, strike];
	}

	const DisplayResult = (resultMessage) => {
	  if (resultMessage == 'success') {
      let restartMessage = document.createElement('span');
      let restartButton = document.createElement('button');

      restartMessage.textContent = '게임을 새로 시작하시겠습니까? ';
      restartButton.textContent = '게임 재시작';
      _resultArea.innerHTML = `<h4>🎉<strong> 정답을 맞추셨습니다! </strong>🎉</h4>`;
      _resultArea.appendChild(restartMessage);
      _resultArea.appendChild(restartButton);

      restartButton.addEventListener('click', (e) => {
        e.preventDefault();
        _answer = _privateInitUtils.RestartGame(_resultArea, _answer, _input);
		  })
    } 
    else
		  _resultArea.textContent = resultMessage;
  }
}

new BaseballGame();