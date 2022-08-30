$(document).ready(function() {
    window.renderingStagesTarget = 1;
    initSelectCoin('/bridge/assets');
    $(document).trigger('renderingStage');
});