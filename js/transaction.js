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
                /*$.each(data.transactions, function(k, v) {
                    thisAS.append(renderTransaction(v));
                });*/
                
                console.log(data);
                
                window.frames['chat-iframe'].contentWindow.postMessage({
                    jid: data.transaction.jid,
                    password: window.apiKey,
                    opposite_jid: data.transaction.opposite_jid
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