var toggleBtn = document.querySelector('#toggle')
var textbox = document.querySelector('.text-box')
var closeBtn = document.querySelector('#close')
var main = document.querySelector('main')
var readBtn = document.querySelector('#read')
var textarea = document.querySelector('#text')
var voicesSelect = document.querySelector('#voices')


toggleBtn.addEventListener('click', () =>
    textbox.classList.toggle('show'))

closeBtn.addEventListener('click', () => {
    textbox.classList.toggle('show')
    textarea.value = ''
})

var data = [{
        image: './img/drink.jpg',
        text: "多喝热水"
    },
    {
        image: './img/food.jpg',
        text: "不要减肥"
    },
    {
        image: './img/tired.jpg',
        text: "多睡觉"
    },
    {
        image: './img/hurt.jpg',
        text: "啊哦"
    },
    {
        image: './img/happy.jpg',
        text: "病毒快死！"
    },
    {
        image: './img/angry.jpg',
        text: "疫情快滚！"
    },
    {
        image: './img/sad.jpg',
        text: "烦死人啦！"
    },
    {
        image: './img/scared.jpg',
        text: "好想出去玩"
    },
    {
        image: './img/outside.jpg',
        text: '世界多好'
    },
    {
        image: './img/home.jpg',
        text: '快出去！'
    },
    {
        image: './img/school.jpg',
        text: '想回学校！'
    },
    {
        image: './img/grandma.jpg',
        text: '呜呜呜'
    }
];
data.forEach(createBox)

function createBox(item) {
    var box = document.createElement('div')
    box.classList.add('box')
    var { image, text } = item
    box.innerHTML = `<img src="${image}" alt="text"/><p class="info">${text}</p>`
    box.addEventListener('click', () => {
        setTextMessage(text)
        speakText()
        box.classList.add('active')
        setTimeout(() => {
            box.classList.remove('active')
        }, 800);
    })
    main.appendChild(box);
}

var message = new SpeechSynthesisUtterance()

var voices = []

function setTextMessage(text) {
    message.text = text
}

function speakText() {
    speechSynthesis.speak(message)
}

speechSynthesis.addEventListener('voiceschanged', getVoices)

readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value)
    speakText()
})

function getVoices() {
    voices = speechSynthesis.getVoices()
    voices.forEach(voice => {
        var options = document.createElement('option')
        options.value = voice.name
        options.innerHTML = `${voice.name}${voice.lang}`
        voicesSelect.appendChild(options)
    })
}

voicesSelect.addEventListener('change', function(e) {
        message.voice = voices.find(voices => voices.name === e.target.value)
    })
    // getVoices()