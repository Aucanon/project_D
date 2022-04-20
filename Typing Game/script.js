var settingbtn = document.querySelector('.setting-btn');
var setting = document.querySelector('.setting');
var word = document.querySelector('.word');
var score = document.querySelector('.score');
var time = document.querySelector('.time');
var endgame = document.querySelector('.end-container');
var text = document.querySelector('.text');
var difficultySelect = document.querySelector('.difficulty');

var score_now = 0;
var words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];
var randomWord;

var time_now = 10;

var timer = setInterval(changeTime, 1000);

var difficulty = difficultySelect.value;
difficultySelect.addEventListener('change', function() {
    difficulty = difficultySelect.value;
})

function addWord() {
    randomWord = words[Math.floor(Math.random() * words.length)];
    word.innerHTML = randomWord;
}


function changeScore() {
    score_now++;
    score.innerHTML = score_now;
}

function changeTime() {
    time_now--;
    time.innerHTML = time_now + 's';
    if (time_now === 0) {
        clearInterval(timer);
        gameOver();
    }
}
addWord();

function gameOver() {
    endgame.innerHTML = `
      <h1>Time ran out</h1>
      <p>Your final score is ${score_now}</p>
      <button onclick="location.reload()">Reload</button>
    `;
    endgame.style.display = 'flex';
}
settingbtn.addEventListener('click', () => setting.classList.toggle('hide'));

text.addEventListener('input', function() {
    var insertText = text.value;
    if (insertText === randomWord) {
        addWord();
        changeScore();
        if (difficulty === 'easy') {
            time_now += 5;
        } else if (difficulty === 'medium') {
            time_now += 3;
        } else if (difficulty === 'hard') {
            time_now += 2;
        }
        text.value = '';
        changeTime();
    }
})