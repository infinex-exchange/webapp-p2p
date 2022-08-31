$(document).ready(function() {
    window.renderingStagesTarget = 1;
    initSelectCoin('/bridge/assets');
    initSelectFiat('/wallet/assets');
    initSelectFpm('/wallet/assets');
    $(document).trigger('renderingStage');
});