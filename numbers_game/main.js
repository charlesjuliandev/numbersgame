(function(){

	function ready(fn) {
	  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
	    fn();
	  } else {
	    document.addEventListener('DOMContentLoaded', fn);
	  }
	}
	ready(function(){

		// make random number
		var randomNumber = Math.floor(Math.random() * 100) +1;
		// resuts DOM
		var guesses = document.querySelector('.guesses');
		var lastResult = document.querySelector('.lastResult');
		var lowOrHi = document.querySelector('.lowOrHi');
		var lowGuess = document.querySelector('.lowGuess');
		var binary_search = $('<a/>');
		binary_search.text('Binary Search');
		var binary_search_url = 'https://www.wikiwand.com/en/Binary_search_algorithm#/History';
		binary_search.attr('target', "blank");
		binary_search.attr('href', binary_search_url);

		// guess DOM
		var guessSubmit = document.querySelector('.guessSubmit');
		var guessField = document.querySelector('.guessField');

		var guessCount = 1;
		var resetButton;
		guessField.focus();

		var startGame = function(){
			var start_button = document.querySelector('.start_button');
			
			start_button.removeEventListener('click', function(){});
			start_button.addEventListener('click', function(e){
				e.preventDefault();
				document.querySelector('.game_overlay').classList.add('slide_up');
				document.querySelector('.game_container').classList.remove('displayNone');
			})

		}

		function checkGuess() {
		    var userGuess = Number(guessField.value);
		    if (guessCount === 1) {
		        guesses.textContent = 'Previous guesses: ';
		    }
		    guesses.textContent += userGuess + ' ';

		    if (userGuess === randomNumber) {
		        lastResult.textContent = `Congratulations! You got it right in ${guessCount} tries! The Number is ${randomNumber}`;
		        lastResult.style.backgroundColor = 'green';
		        lowOrHi.textContent = '';
		        setGameOver();
		    } else if (guessCount === 10) {
		        lastResult.textContent = '!!!GAME OVER!!!';
		        lastResult.textContent += `\n You Didn't Guess The Correct Number: ${randomNumber}`;
		        document.querySelector('.lowGuess').classList.add('displayNone');
		        $('.binary_help').append(binary_search);
		        $('.binary_block').removeClass('displayNone')

		        setGameOver();
		    } else if(guessCount >=7 && guessCount > 0){
		    	console.log(guessCount);
		    	var guessesLeft = 10 - guessCount
		    	lowGuess.textContent = `You have ${guessesLeft} guesses left`;
		    	document.querySelector('.lowGuess').classList.remove('displayNone');
		    } else {
		        lastResult.textContent = 'Wrong!';
		        lastResult.style.backgroundColor = 'red';
		        if(userGuess < randomNumber) {
		            lowOrHi.textContent = 'Last guess was too low!';
		        } else if(userGuess > randomNumber) {
		            lowOrHi.textContent = 'Last guess was too high!';
		        }
		    }

		    guessCount++;
		    guessField.value = '';
		    guessField.focus();
		}
		guessSubmit.addEventListener('click', checkGuess);

		function setGameOver() {
		    guessField.disabled = true;
		    guessSubmit.disabled = true;
		    resetButton = document.createElement('button');
		    resetButton.textContent = 'Start new game';
		    document.querySelector('.container').appendChild(resetButton);
		    resetButton.addEventListener('click', resetGame);
		}

		function resetGame() {
		    guessCount = 1;

		    var resetParams = document.querySelectorAll('.resultParams p');
		    for (var i = 0 ; i < resetParams.length ; i++) {
		        resetParams[i].textContent = '';
		    }

		    resetButton.parentNode.removeChild(resetButton);

		    guessField.disabled = false;
		    guessSubmit.disabled = false;
		    guessField.value = '';
		    guessField.focus();

		    lastResult.style.backgroundColor = 'white';

		    randomNumber = Math.floor(Math.random() * 100) + 1;
		}

		var init = function(){
			startGame();
		}
		init();	
	})
})();




