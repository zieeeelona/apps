var timer = document.getElementById("timer");
var button = document.getElementById("button");
var reset = document.getElementById("reset");

var time = 0;
var on = false;

button.addEventListener("click", controlTimer);
reset.addEventListener("click", resetTimer);


function controlTimer() {
    if (on) {
        stopTimer();
        button.innerText = "START";
        button.style.background = "#8DD602";
    } else {
        startTimer();
        button.innerText = "STOP";
        button.style.background = "#E3393A";
    }
}

function startTimer() {
    on = true;
    stoper = setInterval(addTime, 10);
    update();
}

function stopTimer() {
    on = false;
    clearInterval(stoper);
    update();
}

function resetTimer() {
    clearInterval(stoper);
    if (on) {
        startTimer();
    }
    time = 0;
    update();
}

function addTime() {
    time += 10;
    update();
}

function convertTime() {
    var days = Math.floor(time / 86400000);
    var hours = Math.floor((time - days * 86400000) / 3600000);
    var minutes = Math.floor((time - days * 86400000 - hours * 3600000) / 60000);
    var seconds = Math.floor((time - days * 86400000 - hours * 3600000 - minutes * 60000) / 1000);
    var miliseconds = Math.floor((time - days * 86400000 - hours * 3600000 - minutes * 60000 - seconds * 1000) / 10);

    if (days == 0) {
        days = "";
    } else if (days < 10) {
        days = "0" + days + ":";
    } else {
        days += ":";
    }

    if (hours == 0) {
        if (days == 0) {
            hours = "";
        } else {
            hours = "00:"
        }
    } else if (hours < 10) {
        hours = "0" + hours + ":";
    } else {
        hours += ":";
    }

    minutes < 10 ? minutes = "0" + minutes : false;
    seconds < 10 ? seconds = "0" + seconds : false;
    miliseconds < 10 ? miliseconds = "0" + miliseconds : false;

    var convertedTime = days + hours + minutes + ":" + seconds + ":" + miliseconds;

    return convertedTime;
}

function update() {
    var convertedTime = convertTime();
    timer.innerText = convertedTime;
}