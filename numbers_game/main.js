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
		var guessNumber = document.querySelector('.guessNumber')
		var resultParams = document.querySelector('.resultParams');
		var lastResultContainer = document.querySelector('.lastResultContainer');
		var lastResult = document.querySelector('.lastResult');
		var incorrect = document.querySelector('.incorrect');
		var lowOrHi = document.querySelector('.lowOrHi');
		var lowOrHiContainer = document.querySelector('.lowOrHiContainer');
		var lowGuessP = document.querySelector('.lowGuessP');
		var lowGuess = document.querySelector('.lowGuess');
		var binary_search = $('<a/>');
		binary_search.text('Binary Search');
		var binary_search_url = 'https://www.wikiwand.com/en/Binary_search_algorithm#/History';
		binary_search.attr('target', "blank");
		binary_search.attr('href', binary_search_url);
		var new_game_button = document.querySelector('.newGame');

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
		    guessNumber.textContent += userGuess + ' ';

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
		        $('.lastResultContainer').removeClass('fadeOut');

		        setGameOver();
		    
		    } else {
		        resultParams.classList.remove('displayNone');
		        lastResult.textContent = 'Wrong!';
		        if(userGuess < randomNumber) {
		        	lastResultContainer.classList.remove('fadeOut');
		        	incorrect.classList.remove('fadeOut');
		        	lowOrHiContainer.classList.remove('lowAnswer');
		        	lowOrHiContainer.classList.remove('highAnswer');
		        	lowOrHiContainer.classList.add('lowAnswer');
		            lowOrHi.textContent = 'Last guess was too low!';

		            setTimeout(function(){ 
		            	$('.lastResultContainer').toggleClass('fadeOut');
		            	$('.incorrect').toggleClass('fadeOut');
		            	console.log(guessCount)

		            }, 1000);
		            
		        } else if(userGuess > randomNumber) {
		        	console.log(lastResultContainer)
		        	console.log("lastResultContainer")
		        	lastResultContainer.classList.remove('fadeOut');
		        	incorrect.classList.remove('fadeOut');
		            lowOrHiContainer.classList.remove('lowAnswer');
		        	lowOrHiContainer.classList.remove('highAnswer');
		            lowOrHiContainer.classList.add('highAnswer');
		            lowOrHi.textContent = 'Last guess was too high!';
		            setTimeout(function(){ 
		            	$('.lastResultContainer').toggleClass('fadeOut');
		            	$('.incorrect').toggleClass('fadeOut');


		            }, 1000);
		            
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
		    // resetButton = document.createElement('button');
		    // resetButton.textContent = 'Start new game';
		    // document.querySelector('.container').appendChild(resetButton);
		    // resetButton.addEventListener('click', resetGame);
		    console.log(new_game_button)
		    new_game_button.classList.remove('displayNone');
		    new_game_button.addEventListener('click', resetGame);
		}

		function resetGame() {
		    guessCount = 1;

		    var resetParams = document.querySelectorAll('.resultParams p');
		    for (var i = 0 ; i < resetParams.length ; i++) {
		        resetParams[i].textContent = '';
		    }

		    guessField.disabled = false;
		    guessSubmit.disabled = false;
		    guessField.value = '';
		    guessField.focus();

		    randomNumber = Math.floor(Math.random() * 100) + 1;

		    document.querySelector('.resultParams').classList.add('displayNone')
		    document.querySelector('.binary_block').classList.add('displayNone')
		    document.querySelector('.guessNumber').textContent = "";
		    
		    new_game_button.classList.add('displayNone');
		}

		var init = function(){
			startGame();
		}
		init();	
	})
})();




