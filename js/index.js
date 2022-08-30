$(document).ready(function() {
    window.renderingStagesTarget = 1;
    initSelectCoin('/bridge/assets');
    initSelectFiat();
    $(document).trigger('renderingStage');
});