$(document).ready(function() {
    window.renderingStagesTarget = 1;
    initSelectCoin('/bridge/assets');
    initSelectFiat('/bridge/assets');
    initSelectFpm('/bridge/assets');
    $(document).trigger('renderingStage');
});