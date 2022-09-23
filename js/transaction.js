$(document).ready(function() {
    window.renderingStagesTarget = 1;
});

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        var pathArray = window.location.pathname.split('/');
        var ptid = parseInt(pathArray[pathArray.length - 1]);
        
        $.ajax({
            url: config.apiUrl + '/p2p/transaction',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                ptid: ptid
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                $('.transaction-header').html(data.transaction.side + ' ' + data.transaction.assetid);
                $('.amount-fiat').html(data.transaction.amount_fiat);
                $('.assetid').html(data.transaction.assetid);
                $('.amount-crypto').html(data.transaction.amount_crypto);
                $('.fiatid').html(data.transaction.fiatid);
                $('.price').html(data.transaction.price);
                
                $('.status').addClass('d-none');
                $('.status[data-status="' + data.transaction.status + '"][data-side="' + data.transaction.side + '"]').removeClass('d-none');

                $(document).trigger('renderingStage');
            }
            else {
                msgBoxRedirect(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(true);
        });
    }
});