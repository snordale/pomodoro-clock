let addIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
<path id="ic_add_24px" d="M23,15.286H15.286V23H12.714V15.286H5V12.714h7.714V5h2.571v7.714H23Z" transform="translate(-5 -5)"/>
</svg>`

let subIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="4" viewBox="0 0 20 4">
<path id="ic_remove_24px" d="M23,13H5V11H23Z" transform="translate(-5 -11)"/>
</svg>`

function changeTitle() {
    let title = document.querySelector('title');
    title.textContent = document.querySelectorAll('.timer')[0].textContent;
}

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
    let seconds = 60;
    --minutes;
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
    let seconds = 0;
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

let intervalID;

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
    intervalID = window.setInterval(function() {
        --totalSeconds;
        if (totalSeconds === 0) {
            stopTimer(element, timer, intervalID);
        }
        hours = Math.floor(totalSeconds / 3600);
        let remainder = totalSeconds % 3600;
        minutes = Math.floor(remainder / 60);
        seconds = remainder % 60;
        timer = padNum(hours) + ':' + padNum(minutes) + ':' + padNum(seconds);
        element.textContent = timer;
        changeTitle();
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
    let iconArray = Array.from(subIcons);
    let idx = iconArray.indexOf(icon);
    decrementTimer(timers[idx], timers[idx].textContent);
}))

addIcons.forEach(icon => icon.addEventListener('mousedown', function() {
    let iconArray = Array.from(addIcons);
    let idx = iconArray.indexOf(icon);
    incrementTimer(timers[idx], timers[idx].textContent);
}))

let playBtn = document.querySelector('#play');
let inks = document.querySelector('.inks');
let inksHeight = inks.offsetHeight;
inks.style.setProperty('height', inksHeight);
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