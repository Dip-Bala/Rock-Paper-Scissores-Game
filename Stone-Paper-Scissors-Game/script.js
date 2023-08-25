
let scores = JSON.parse(localStorage.getItem('scores')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

let isAutoPlaying = false;

let intervalId;
function autoPlay(){
    if(!isAutoPlaying){
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        } ,1000);
        isAutoPlaying = true;
        document.querySelector('.auto-play-button').innerHTML = 'Stop Auto Play';
    }else{
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.auto-play-button').innerHTML = 'Auto Play'
    }
}

document.querySelector('.js-rock-btn').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-btn').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-btn').addEventListener('click', () => {
    playGame('scissors');
});

document.body.addEventListener('keydown',(event) =>{
    if(event.key === 'r'){
        playGame('rock');
    }
    else if(event.key === 'p'){
        playGame('paper');
    }
    else if(event.key === 's'){
        playGame('scissors');
    }

});

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';
    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }

    }
    if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }

    }

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        }
        if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }
    }

    if (result === 'You win.') {
        scores.wins = scores.wins + 1;
    } else if (result === 'You lose.') {
        scores.losses = scores.losses + 1;
    } else if (result === 'Tie.') {
        scores.ties = scores.ties + 1;
    }
    // Storing items in localStorage 
    localStorage.setItem('scores', JSON.stringify(scores));

    updateScoreElement();
    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You 
        <img src="images/${playerMove}-emoji.png" alt="" class="move-icon">
        <img src="images/${computerMove}-emoji.png" alt="" class="move-icon">
        Computer`;

}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${scores.wins}, Losses: ${scores.losses}, Ties: ${scores.ties}`;
}
let computerMove = '';
function pickComputerMove() {
    const randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber === 0) {
        computerMove = 'rock';
    }
    else if (randomNumber === 1) {
        computerMove = 'paper';
    }
    else if (randomNumber === 2) {
        computerMove = 'scissors';
    }
    return computerMove;
}
