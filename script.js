let addIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
<path id="ic_add_24px" d="M23,15.286H15.286V23H12.714V15.286H5V12.714h7.714V5h2.571v7.714H23Z" transform="translate(-5 -5)"/>
</svg>`

let subIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="4" viewBox="0 0 20 4">
<path id="ic_remove_24px" d="M23,13H5V11H23Z" transform="translate(-5 -11)"/>
</svg>`

let addIcons = document.querySelectorAll('.add-icon');
addIcons.forEach(function (icon){
    icon.innerHTML = addIcon
    if (Array.from(icon.classList).indexOf('small-icon') !== -1) {
        smallIcon = addIcon.replace('width="20"', 'width="14"')
        icon.innerHTML = smallIcon;
    }
});

let subIcons = document.querySelectorAll('.sub-icon');
subIcons.forEach(function (icon){
    icon.innerHTML = subIcon
    if (Array.from(icon.classList).indexOf('small-icon') !== -1) {
        smallIcon = subIcon.replace('width="20"', 'width="14"')
        icon.innerHTML = smallIcon;
    }
});

let windowWidth = window.innerWidth;

let inks = document.querySelector('.inks');
let inksHeight = inks.offsetHeight;
let clockHeight = document.querySelector('.clock').offsetHeight;
let marginHeight = parseFloat(window.getComputedStyle(inks).marginTop);
let totalHeight = inksHeight + clockHeight + marginHeight;
let inksRatio = inksHeight / totalHeight;
inks.style.setProperty('height', inksHeight);

function resizeInks() {
    let inksHeight = inks.offsetHeight;
    let clockHeight = document.querySelector('.clock').offsetHeight;
    let marginHeight = parseFloat(window.getComputedStyle(inks).marginTop);
    let totalHeight = inksHeight + clockHeight + marginHeight;
    inksHeight = inksRatio * totalHeight;
    console.log(inksHeight)
    inks.style.setProperty('height', inksHeight);
}

let subInks = document.querySelectorAll('.sub-inks');
let subInksWidth = subInks[0].offsetWidth;
let subInksRatio = subInksWidth / windowWidth;
subInks.forEach(subInk => subInk.style.setProperty('width', subInksWidth));

function resizeSubInks() {
    let windowWidth = window.innerWidth;
    subInksWidth = (subInksRatio) * windowWidth;
    subInks.forEach(subInk => subInk.style.setProperty('width', subInksWidth));
}

let container = document.querySelector('.container');
let containerWidth = container.offsetWidth;
let containerRatio = containerWidth / windowWidth;
container.style.setProperty('width', containerWidth);

function resizeContainer() {
    let windowWidth = window.innerWidth;
    containerWidth = (containerRatio) * windowWidth;
    container.style.setProperty('width', containerWidth);
}

window.addEventListener('resize', function() {
    resizeInks();
    resizeSubInks();
    resizeContainer();
});

function changeTitle() {
    let title = document.querySelector('title');
    title.textContent = document.querySelectorAll('.timer')[0].textContent;
}

function padNum(num) {
    let string = '';
    if (num.toString().length < 2) {
        string = `0${num.toString()}` 
    } else {
        string = num.toString();
    }
    return string;
}

function decrementTimer(element, timer) {
    let hours = Number(timer.slice(0, 2));
    let minutes = Number(timer.slice(3, 5));
    let seconds = Number(timer.slice(6, 8));
    console.log(seconds)
    if (seconds === 0) {
        seconds = 60;
        --minutes;
    }
    setInterval(function () {
        if (seconds > 0) { 
            --seconds;
            let string = padNum(seconds);
            timer = padNum(hours) + ':' + padNum(minutes) + ':' + string;
            element.textContent = timer;
        }
        changeTitle();
    }, 10);
}

function incrementTimer(element, timer) {
    let hours = Number(timer.slice(0, 2));
    let minutes = Number(timer.slice(3, 5));
    let seconds = Number(timer.slice(6, 8));
    setInterval(function () {
        if (seconds < 59) { 
            ++seconds;
            let string = padNum(seconds);
            timer = padNum(hours) + ':' + padNum(minutes) + ':' + string;
            if (seconds === 59) {
                timer = padNum(hours) + ':' + padNum(++minutes) + ':' + '00';
            }
            element.textContent = timer;
        }
        changeTitle();
    }, 10);
}

function stopTimer(element, timer, intervalID) {
    window.clearInterval(intervalID)
    let hours = Number(timer.slice(0, 2));
    let minutes = Number(timer.slice(3, 5));
    let seconds = Number(timer.slice(6, 8));
    timer = padNum(hours) + ':' + padNum(minutes) + ':' + padNum(seconds);
    element.textContent = timer;
}

function startTimer(element, timer) {
    let hours = Number(timer.slice(0, 2));
    let minutes = Number(timer.slice(3, 5));
    let seconds = Number(timer.slice(6, 8));
    let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    let intervalID = window.setInterval(function() {
        if (totalSeconds === 0) {
            stopTimer(element, timer, intervalID);
        } else {
            --totalSeconds;
            hours = Math.floor(totalSeconds / 3600);
            let remainder = totalSeconds % 3600;
            minutes = Math.floor(remainder / 60);
            seconds = remainder % 60;
            timer = padNum(hours) + ':' + padNum(minutes) + ':' + padNum(seconds);
            element.textContent = timer;
            changeTitle();
        }
    }, 1000);
    return intervalID;
}

function resetTimer(element, timer) {
    let workTimer = document.querySelector('.inks-time').childNodes[1].textContent;
    let hours = Number(workTimer.slice(0, 2));
    let minutes = Number(workTimer.slice(3, 5));
    let seconds = Number(workTimer.slice(6, 8));
    timer = padNum(hours) + ':' + padNum(minutes) + ':' + padNum(seconds);
    element.textContent = timer;
    changeTitle();
}

let timers = document.querySelectorAll('.timer');

subIcons.forEach(icon => icon.addEventListener('mousedown', function() {
    stopTimer(timers[0], timers[0].textContent, intervalID)
    let iconArray = Array.from(subIcons);
    let idx = iconArray.indexOf(icon);
    decrementTimer(timers[idx], timers[idx].textContent);
    playBtn.textContent = 'play';
}))

addIcons.forEach(icon => icon.addEventListener('mousedown', function() {
    stopTimer(timers[0], timers[0].textContent, intervalID)
    let iconArray = Array.from(addIcons);
    let idx = iconArray.indexOf(icon);
    incrementTimer(timers[idx], timers[idx].textContent);
    playBtn.textContent = 'play';
}))

let playBtn = document.querySelector('#play');
let intervalID;
playBtn.addEventListener('mousedown', function() {
    if (playBtn.textContent === 'play') {
        intervalID = startTimer(timers[0], timers[0].textContent)
        inks.style.height = '0';
        playBtn.textContent = 'pause';

    } else if (playBtn.textContent === 'pause') {
        stopTimer(timers[0], timers[0].textContent, intervalID)
        inks.style.height = inksHeight;
        playBtn.textContent = 'play';
    }
});

let restartBtn = document.querySelector('#reset');
restartBtn.addEventListener('mousedown', function() {
    stopTimer(timers[0], timers[0].textContent, intervalID)
    inks.style.height = inksHeight;
    playBtn.textContent = 'play';
    resetTimer(timers[0], timers[0].textContent)
})