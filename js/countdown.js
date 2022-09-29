function initCountdown(begin, end) {
    if(typeof(window.cdInterval) !== 'undefined' && window.cdInterval)
        clearInterval(window.cdInterval);
    
    window.cdBegin = begin;
    window.cdEnd = end;
    
    window.cdInterval = setInterval(function() {
        var timeLeft = window.cdEnd - Math.floor(Date.now()/1000);
        
        $('.countdown-label').html(formatTime(timeLeft));
        setCircleDasharray();
        setRemainingPathColor(timeLeft);
    
        if(timeLeft === 0) {
            clearInterval(window.cdInterval);
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
    return (Math.floor(Date.now()/1000) - window.cdBegin) / (window.cdEnd - window.cdBegin);
}

function setCircleDasharray() {
    var circleDasharray = (calculateTimeFraction() * 283).toFixed(0) + ' 283';
    $('.countdown-path-remaining').attr('stroke-dasharray', circleDasharray);
}