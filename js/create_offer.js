$(document).ready(function() {
    window.renderingStagesTarget = 1;
    $(document).trigger('renderingStage');
});

$(document).on('authChecked', function() {
    if(!window.loggedIn) return;
    
    initCoinSelect('/p2p/assets');
    initSelectFiat();
});