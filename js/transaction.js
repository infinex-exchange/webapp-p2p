function renderFpmInstance(fpminsta, fpms) {
    var len = $('#fpmi-tabs').length;
    
    var active = 'active';
    var show = 'show';
    var ariaSel = 'true';
    
    if(len) {
        active = '';
        show = '';
        ariaSel = 'false';
    }
    
    $('#fpmi-tabs').append(`
        <li class="nav-item">
            <a href="#_">
                <img width="24px" height="24px" src="${fpms[fpminsta.fpmid].icon_url}">
                <span class="d-none d-lg-inline">${fpms[fpminsta.fpmid].name}</span>
            </a>
        </li>
    `);
    
    $('#fpmi-data').append(`
        <div id="fpmi-${len}" class="tab-pane fade ${show} ${active} accordion-item" role="tabpanel">
            <div class="accordion-header" role="tab">
                <button class="accordion-button collapsed" type="button" role="button" data-bs-toggle="collapse"
                 data-bs-target="#fpmi-${len}-art" aria-expanded="${ariaSel}" aria-controls="fpmi-${len}-art">
                    ${fpms[fpminsta.fpmid].name}
                </button>
            </div>
            <div id="fpmi-${len}-art" class="accordion-body accordion-collapse collapse"
             data-bs-parent="#fpmi-data" aria-labelledby="fpmi-${len}-tab">
                Test ${fpminsta.fpmid}<br>
                Test ${fpminsta.fpmid}<br>
                Test ${fpminsta.fpmid}<br>
                Test ${fpminsta.fpmid}<br>
                Test ${fpminsta.fpmid}<br>                
            </div>
        </div>
    `);
}

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
                
                $.each(data.fpm_instances, function(k, v) {
                    renderFpmInstance(v, data.fpms);
                });

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