$(document).ready(function() {
    window.renderingStagesTarget = 1;
    initSelectCoin('/p2p/assets');
    initSelectFiat();
    initSelectFpm();
    $(document).trigger('renderingStage');
});