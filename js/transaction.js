function switchFpmiTab(fpminstaid) {  
    $('.ver-tabs-item .nav-link').removeClass('active');
    $('.fpmi-item').addClass('d-none');
    
    $('.ver-tabs-item .nav-link[data-fpminstaid="' + fpminstaid + '"]').addClass('active');
    $('.fpmi-item[data-fpminstaid="' + fpminstaid + '"]').removeClass('d-none');
}

function renderFpmInstance(fpminstaid, fpminsta, fpms) {
    var len = $('.ver-tabs-item').length;
    
    $('#fpmi-tabs').append(`
        <li class="ver-tabs-item nav-item hoverable py-1">
            <a class="nav-link" href="#_" data-fpminstaid="${fpminstaid}" onClick="switchFpmiTab(${fpminstaid})">
                <img width="24px" height="24px" src="${fpms[fpminsta.fpmid].icon_url}">
                <span class="d-none d-lg-inline">${fpms[fpminsta.fpmid].name}</span>
            </a>
        </li>
    `);
    
    var fieldsInnerHtml = '';
	            
    $.each(fpminsta.fields, function(kk, vv) {
        fieldsInnerHtml += `
        
	        <div class="row">
                <div class="col-12">
                    <span class="secondary">
	                    ${fpms[fpminsta.fpmid].struct[kk]}:
                    </span>
                </div>
            </div>
            <div class="row flex-nowrap mb-2">
                <div class="col-10 col-lg-auto my-auto">
                    <h4 class="wrap" id="fieldval-${fpminstaid}-${kk}">${vv}</h4>
                </div>
                <div class="col-auto my-auto">
                    <a href="#_" class="secondary copy-button" data-copy="#fieldval-${fpminstaid}-${kk}" onClick="copyButton(this)">
                        <i class="fa-solid fa-copy fa-xl"></i>
                    </a>
                </div>
            </div>
        `;
    });
    
    $('#fpmi-data').append(`
        <div class="fpmi-item d-none" data-fpminstaid="${fpminstaid}">
            ${fieldsInnerHtml}
        </div>
    `);
    
    if(len == 0)
        switchFpmiTab(fpminstaid);
}

function refreshTransaction(first = false) {
    $.ajax({
        url: config.apiUrl + '/p2p/transaction',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            ptid: window.ptid
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            if(first) {
                $('.transaction-header').html(data.transaction.side + ' ' + data.transaction.assetid);
                $('.amount-fiat').html(data.transaction.amount_fiat);
                $('.assetid').html(data.transaction.assetid);
                $('.amount-crypto').html(data.transaction.amount_crypto);
                $('.fiatid').html(data.transaction.fiatid);
                $('.price').html(data.transaction.price);
                
                $.each(data.fpm_instances, function(k, v) {
                    renderFpmInstance(k, v, data.fpms);
                });
                
                document.title = data.transaction.side + ' ' + data.transaction.assetid + ' | Vayamos P2P';

                $(document).trigger('renderingStage');
            }
            
            $('.status').addClass('d-none');
            $('.status[data-status~="' + data.transaction.status + '"][data-side="' + data.transaction.side + '"]').removeClass('d-none');
            
            $('.feedback').addClass('d-none');
            if(data.transaction.status == 'COMPLETED' || data.transaction.status == 'CANCELED')
                $('.feedback[data-feedback~="' + data.transaction.recommends + '"]').removeClass('d-none');
            
            if(typeof(data.transaction.deadline) !== 'undefined')
                initCountdown(data.transaction.deadline - (data.transaction.time_window * 60), data.transaction.deadline);                                             
        }
        else {
            msgBoxRedirect(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true);
    });
}

function internalSetStatus(endpoint) {
    $.ajax({
        url: config.apiUrl + endpoint,
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            ptid: window.ptid
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            refreshTransaction();
        }
        else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });
}

function cancelTransaction() {
    internalSetStatus('/p2p/transaction/cancel');
}

function cancelTransactionPrompt() {
    $('#modal-confirm-cancel').modal('show');
}

function confirmPaid() {
    internalSetStatus('/p2p/transaction/confirm_paid');
}

function confirmReceived() {
    internalSetStatus('/p2p/transaction/confirm_received');
}

function confirmReceivedPrompt() {
    $('#modal-confirm-received').modal('show');
}

function postFeedback(feedback) {
    $.ajax({
        url: config.apiUrl + '/p2p/transaction/feedback',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            ptid: window.ptid,
            feedback: feedback
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            refreshTransaction();
        }
        else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });
}

$(document).ready(function() {
    window.renderingStagesTarget = 1;
});

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        var pathArray = window.location.pathname.split('/');
        window.ptid = parseInt(pathArray[pathArray.length - 1]);
        
        refreshTransaction(true);
        
        setInterval(function() {
            refreshTransaction(false);
        }, 5000);
    }
});