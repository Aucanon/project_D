var container = document.querySelector('.container')
var text = document.querySelector('#text')
var totalTime = 7500
var breatheTime = (totalTime / 5) * 2
var holdTime = totalTime / 5


breath()

function breath() {
    text.innerText = 'In!'
    container.classList = 'container grow'
    setTimeout(() => {
        text.innerText = 'Hold'
        setTimeout(() => {
            text.innerText = 'Out!'
            container.classList = 'container shrink'
        }, holdTime)
    }, breatheTime)
}
setInterval(breath, totalTime)