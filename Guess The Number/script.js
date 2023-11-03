'use strict';

let secretNumber = getRandomNumber();
let score = 3;
let highScore = 0;

function updateMessage(message) {
	document.querySelector('.message').textContent = message;
}

function updateScore(newScore) {
	score = newScore;
	document.querySelector('.score').textContent = score;
}

function getRandomNumber() {
	return Math.trunc(Math.random() * 3) + 1;
}

function updateStylesForCorrectGuess() {
	document.querySelector('body').style.backgroundColor = '#60b347';
	document.querySelector('.number').style.width = '30rem';
}

function resetStyles() {
	document.querySelector('body').style.backgroundColor = '#222';
	document.querySelector('.number').style.width = '15rem';
}

function displaySecretNumber() {
	document.querySelector('.number').textContent = secretNumber;
}

function updateHighScore() {
	if (score > highScore) {
		highScore = score;
		document.querySelector('.highscore').textContent = highScore;
	}
}

function incorrectGuess() {
	document.querySelector('body').style.backgroundColor = '#ff0000';
	document.querySelector('.number').style.width = '30rem';
	document.querySelector('.number').textContent = `X`;
}

const clickCheck = function () {
	const guess = Number(document.querySelector('.guess').value);

	if (!guess) {
		updateMessage('No number!');
	} else if (guess === secretNumber) {
		updateMessage('You guessed correctly!');
		displaySecretNumber();
		updateStylesForCorrectGuess();
		updateHighScore();
	} else {
		updateMessage(
			`Too ${guess < secretNumber ? 'low' : 'high'}, guess ${
				guess < secretNumber ? 'higher' : 'lower'
			}`
		);
		if (score > 1) {
			updateScore(score - 1);
		} else {
			updateMessage('YOU LOSE');
			updateScore(0);
			incorrectGuess();
		}
	}
};

const clickAgain = function () {
	secretNumber = getRandomNumber();
	updateScore(3);
	updateMessage('Start guessing...');
	resetStyles();
	document.querySelector('.number').textContent = '?';
	document.querySelector('.guess').value = '';
};

// Event listeners
document.querySelector('.check').addEventListener('click', clickCheck);
document.querySelector('.again').addEventListener('click', clickAgain);
