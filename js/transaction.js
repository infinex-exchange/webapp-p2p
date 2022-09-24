function switchFpmiTab(id) {
    var navLinks = $('.ver-tabs-item.nav-link');
    var items = $('.fpmi-item') 
    
    navLinks.removeClass('active');
    items.addClass('d-none');
    
    navLinks.find('[data-id="' + id + '"]').addClass('active');
    items.find('[data-id="' + id + '"]').removeClass('d-none');
}

function renderFpmInstance(fpminsta, fpms) {
    var id = $('#fpmi-tabs').length;
    
    $('#fpmi-tabs').append(`
        <li class="ver-tabs-item nav-item hoverable py-1">
            <a class="nav-link" href="#_" data-id="${id}" onClick="switchFpmiTab(${id})">
                <img width="24px" height="24px" src="${fpms[fpminsta.fpmid].icon_url}">
                <span class="d-none d-lg-inline">${fpms[fpminsta.fpmid].name}</span>
            </a>
        </li>
    `);
    
    $('#fpmi-data').append(`
        <div class="fpmi-item" data-id="${id}">
            Test ${fpminsta.fpmid}<br>
            Test ${fpminsta.fpmid}<br>
            Test ${fpminsta.fpmid}<br>
            Test ${fpminsta.fpmid}<br>
            Test ${fpminsta.fpmid}<br>                
        </div>
    `);
    
    if(id == 0)
        switchFpmiTab(0);
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