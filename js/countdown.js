function refreshCountdown() {
    alert(window.cdEnd);
    alert(Math.floor(Date.now()/1000));
    var timeLeft = window.cdEnd - Math.floor(Date.now()/1000);
    if(timeLeft < 0) {
        clearInterval(window.cdInterval);
        timeLeft = 0;
    }
    
    $('.countdown-label').html(formatTime(timeLeft));
    setCircleDasharray();
    setRemainingPathColor(timeLeft);
}

function initCountdown(begin, end) {
    if(typeof(window.cdInterval) !== 'undefined' && window.cdInterval)
        clearInterval(window.cdInterval);
    
    window.cdBegin = begin;
    window.cdEnd = end;
    
    window.cdInterval = setInterval(refreshCountdown, 1000);
    refreshCountdown();
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
    var fraction = (Math.floor(Date.now()/1000) - window.cdBegin) / (window.cdEnd - window.cdBegin);
    if(fraction < 0) return 0;
    return fraction;
}

function setCircleDasharray() {
    var circleDasharray = (calculateTimeFraction() * 283).toFixed(0) + ' 283';
    $('.countdown-path-remaining').attr('stroke-dasharray', circleDasharray);
}