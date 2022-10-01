$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    $('#select-coin, #select-fiat').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
    
    $('#select-coin, #select-fiat').on('change', function() {
        var assetid = $('#select-coin').val();
        var fiatid = $('#select-fiat').val();
        
        if(assetid == '' || fiatid == '') return;
        
        $('.assetid').html(assetid);
        $('.fiatid').html(fiatid);
        $('.step2-ro').prop('readonly', false);
        $('.step2-dis').prop('disabled', false);
    });
});

$(document).on('authChecked', function() {
    if(!window.loggedIn) return;
    
    initSelectCoin('/p2p/assets');
    initSelectFiat();
});