$(document).ready(function() {
    window.renderingStagesTarget = 1;
    initSelectCoin('/p2p/assets');
    initSelectFiat();
    initSelectFpm();
    $(document).trigger('renderingStage');
    
    $('input[name="side"]').change(function() {
        window.p2pOffersAs.data.side = this.value;
        window.p2pOffersAs.reset();
    });
    
    $('#select-coin').on('change', function() {
        window.p2pOffersAs.data.asset = this.value;
        window.p2pOffersAs.reset();
    });
    
    $('#select-fiat').on('change', function() {
        window.p2pOffersAs.data.fiat = this.value;
        window.p2pOffersAs.reset();
    });
    
    $('#select-fpm').on('change', function() {
        window.p2pOffersAs.data.fpm = $(this).data('fpmid');
        window.p2pOffersAs.reset();
    });
    
    $.ajax({
        url: config.apiUrl + '/p2p/config',
        type: 'POST',
        data: JSON.stringify({
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            //
            $(document).trigger('haveConfig');
        }
        else {
            msgBoxRedirect(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true); 
    });
});