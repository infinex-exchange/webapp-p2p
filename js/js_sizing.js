function doJsSizing() {
    document.body.style.setProperty('--emulated-100vh', window.innerHeight + 'px');
    document.body.style.setProperty('--height-mobile-nav', $('#mobile-navbar').outerHeight() + 'px');
	document.body.style.setProperty('--height-main-nav', $('#main-navbar').outerHeight() + 'px');
    
    ['trade', 'recent-trades', 'my-offers'].forEach(function(i) {
        var footerH = 0;
        if($('#' + i + '-footer').length) footerH = $('#' + i + '-footer').outerHeight();
        var remainH = $('#' + i).height() - $('#' + i + '-header').outerHeight() - footerH;
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