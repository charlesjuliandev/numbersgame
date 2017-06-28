(function($){

	$(document).ready(function(){
		
		var randomNumber = Math.floor(Math.random() * 100) +1;
		// resuts DOM
		var guesses = document.querySelector('.guesses');
		var lastResult = document.querySelector('.lastResult');
		var lowOrHi = document.querySelector('.lowOrHi');
		var binary_search = $('<a/>');
		binary_search.text('Binary Search');
		var binary_search_url = 'https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search';
		binary_search.attr('target', "blank");
		binary_search.attr('href', binary_search_url);

		// guess DOM
		var guessSubmit = document.querySelector('.guessSubmit');
		var guessField = document.querySelector('.guessField');

		var guessCount = 1;
		var resetButton;
		guessField.focus();

		var startGame = function(){
			$('.start_button').off();
			$('.start_button').on('click', function(e){
				e.preventDefault();
				console.log("clicked");
				$('.game_overlay').addClass('displayNone');
				$('.game_container').removeClass('displayNone');
			});

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
		        lastResult.textContent += `\n Learn How to get the right answer by using a : ${randomNumber}`;
		        $('.binary_help').append(binary_search);
		        $('.binary_block').removeClass('displayNone')

		        setGameOver();
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
		    document.body.appendChild(resetButton);
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
	});




})(jQuery);




