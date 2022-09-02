function doJsSizing() {
    document.body.style.setProperty('--emulated-100vh', window.innerHeight + 'px');
    document.body.style.setProperty('--height-mobile-nav', $('#mobile-navbar').outerHeight() + 'px');
	document.body.style.setProperty('--height-main-nav', $('#main-navbar').outerHeight() + 'px');
    
    ['trade', 'recent-trades', 'my-offers'].forEach(function(i) {
        var remainH = $('#' + i).height() - $('#' + i + '-header').outerHeight();
        document.body.style.setProperty('--target-height-' + i + '-data', remainH + 'px');
    });
}

$(document).on('renderingComplete', function() {
    doJsSizing();
});

$(window).resize(function() {
	doJsSizing();
});

$('.nav-link[data-ui-card-target]').on('click', function() {
    doJsSizing();
});