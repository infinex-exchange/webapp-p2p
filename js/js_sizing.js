function doJsSizing() {
    document.body.style.setProperty('--emulated-100vh', window.innerHeight + 'px');
    document.body.style.setProperty('--height-mobile-nav', $('#mobile-navbar').outerHeight() + 'px');
	document.body.style.setProperty('--height-main-nav', $('#main-navbar').outerHeight() + 'px');
    
    ['trade', 'recent-trades', 'my-offers', 'chat'].forEach(function(i) {
        if($('#' + i).length == 0) return;
        
        var footerH = 0;
        if($('#' + i + '-footer').length) footerH = $('#' + i + '-footer').outerHeight();
        var remainH = $('#' + i).height() - $('#' + i + '-header').outerHeight() - footerH;
        document.body.style.setProperty('--target-height-' + i + '-data', remainH + 'px');
    });
    
    $(document).trigger('afterJsSizing');
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