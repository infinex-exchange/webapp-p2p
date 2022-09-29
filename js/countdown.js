function initCountdown(timestamp) {
    window.cdTimestamp = timestamp;
    
    window.countdownInterval = setInterval(function() {
        var timeLeft = window.cdTimestamp() - Math.floor(Date.now()/1000);
        
        $('.countdown-label').html(formatTime(timeLeft));
        setCircleDasharray();
        setRemainingPathColor(timeLeft);
    
        if(timeLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function formatTime(time) {
    var hours = Math.floor(time / 3600);
    if(hours > 0)
        return hours + 'h';
    
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    if(timeLeft <= 60) {
        $('countdown-path-remaining').removeClass('orange').addClass('red');
    }
    
    else if(timeLeft <= 300) {
        $('countdown-path-remaining').removeClass('green').addClass('orange');
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    var circleDasharray = (calculateTimeFraction() * 283).toFixed(0) + ' 283';
    $('.countdown-path-remaining').attr('stroke-dasharray', circleDasharray);
}