
let timer = false
let pageNumber = 0

window.addEventListener('DOMContentLoaded', () => {
    changeScreen('mainMenu')
})

function changeScreen(screenId) {
    let screens = document.querySelectorAll('.screen')
    screens.forEach(screen => {
        screen.style.display = 'none'
    });

    let screen = document.getElementById(screenId)
    if (screen) {
        screen.style.display = 'flex'
    } else {
        changeScreen('mainMenu')
    }
}

let menuButtonClick = document.querySelectorAll('.button')
menuButtonClick.forEach(button => {
    button.addEventListener("click", function() {
        if (this.id === 'start') {
            changeScreen('garden')
        }    
        else if (this.id === 'settings') {
            changeScreen('settings')
        }
        else if (this.id === 'help') {
            changeScreen('help')
        }
        // navigation buttons in the navbar
        else if (this.id === 'shop') {
            changeScreen('shopScreen')
        }    
        else if (this.id === 'plantersGuide') {
            populateGuidebook();
            changeScreen('plantersGuideScreen')
        }
        else if (this.id === 'sell') {
            changeScreen('sellScreen')
        }
    })
});

// navigation buttons in the navbar
// let navbarButtonClick = document.querySelectorAll('.navbarButtons');
// navbarButtonClick.forEach(button => {
//     button.addEventListener("click", function() {
//         if (this.id === 'shop') {
//             changeScreen('shopScreen');
//         }    
//         else if (this.id === 'plantersGuide') {
//             changeScreen('plantersGuideScreen');
//         }
//         else if (this.id === 'sell') {
//             changeScreen('sellScreen');
//         }
//     })
// })

// show/hide stopwatch
let stopwatch = document.getElementById('stopwatch');
let time = document.getElementById('time')
stopwatch.addEventListener('click', function() {
    if (timer) {
        clearInterval(timer)
        timer = false
        stopwatch.classList.remove('stopwatchStop')
        stopwatch.textContent = 'Start'
        time.style.display = 'none'
        time.textContent = '00:00:00' // reset time display
    } else {
        let startTime = Date.now()
        timer = setInterval(() => {
            let elapsedTime = Date.now() - startTime
            let seconds = Math.floor((elapsedTime / 1000) % 60)
            let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60)
            let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24)
            time.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        }, 1000);
        stopwatch.classList.add('stopwatchStop')
        stopwatch.textContent = 'Stop'
        time.style.display = 'block'
    }
});

// show/hide navbar
let navbarButton = document.getElementById('navbarButton')
navbarButton.addEventListener('click', function() {
    let navbar = document.getElementById('navbar')
    if (navbar.style.display === 'none') {
        navbar.style.display = 'flex'
    } else {
        navbar.style.display = 'none'
    }
});

// populate Planter's Guidebook with plants
function populateGuidebook() {
    let fullPage = document.getElementById('fullPage');
    for (let eachPage = 0; eachPage < Plants.length; eachPage++) {
        let page = document.createElement('div');
        page.id = `page${eachPage}`
        page.className = 'page'
        
        for (let set = 0; set < Plants[eachPage].length; set++) {
            let plant = Plants[eachPage][set]

            let picture = plant.image
            let title = plant.name
            let description = plant.description

            let parentDiv = document.createElement('div')
            parentDiv.id = `guideContents${eachPage}${set}`
            parentDiv.className = 'guidePlants'

            let id = ['plantImage', 'plantName', 'plantDescription']
            let contents = [picture, title, description]
            for (let details = 0; details < id.length; details++) {
                let div = document.createElement('div');
                div.id = `${id[details]}`
                div.className = 'plantDetails'
                if (details == 0) {
                    div.style.backgroundImage = `url(${contents[details]})`
                }
                else {
                    div.textContent = contents[details]
                }
                parentDiv.appendChild(div)
            }
            page.appendChild(parentDiv)
        }
        fullPage.appendChild(page)
        // imageDiv = document.createElement('div');
        // imageDiv.id = 'plantImage';
        // imageDiv.className = 'plantDetails';
        // imageDiv.style.backgroundImage = `url(${picture})`;
        // titleDiv = document.createElement('div');
        // titleDiv.id = 'plantName';
        // titleDiv.className = 'plantDetails';
        // titleDiv.textContent = title;
        // desDiv = document.createElement('div');
        // desDiv.id = 'plantDescription';
        // desDiv.className = 'plantDetails';
        // desDiv.textContent = description;

        // parentDiv.appendChild(imageDiv);
        // parentDiv.appendChild(titleDiv);
        // parentDiv.appendChild(desDiv);
    }
    let firstPage = document.querySelector(`.page`)
    firstPage.style.display = 'flex'
}

// guide contents page change
let right = document.getElementById('turnPageRight');
let left = document.getElementById('turnPageLeft');
left.addEventListener('click', function() {
    if (pageNumber == 0) 
        return
    playPageTurnAudio()
    turnPage('left')
    right.disabled = false
});
right.addEventListener('click', function() {
    if (pageNumber == Plants.length - 1) {
        return
    }
    playPageTurnAudio()
    turnPage('right')
    left.disabled = false
});

function turnPage(direction) {
    let previousPage = document.getElementById(`page${pageNumber}`)
    previousPage.style.display = 'none'
    if (direction == 'right') {
        pageNumber++;
        if (pageNumber == Plants.length - 1) {
            right.disabled = true
        }
    }
    else if (direction == 'left') {
        pageNumber--;
        if (pageNumber == 0) {
            left.disabled = true
        }
    }
    let page = document.getElementById(`page${pageNumber}`)
    page.style.display = 'flex'
}

function playPageTurnAudio() {
    let audio = new Audio('pageFlip.mp3')
    audio.volume = 0.2
    audio.play()
}
