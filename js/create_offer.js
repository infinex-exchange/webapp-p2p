$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    $('#select-coin, #select-fiat').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
});

$(document).on('authChecked', function() {
    if(!window.loggedIn) return;
    
    initSelectCoin('/p2p/assets');
    initSelectFiat();
});