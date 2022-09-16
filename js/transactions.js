function renderTransaction(t) {
    var cTime = new Date(t.create_time * 1000).toLocaleString();

	var color = 'text-green';
    if(t.side == 'SELL') color = 'text-red';

    return `
        <div class="transaction-item row px-1 py-2 hoverable">
            <div class="col-6 small">
                <span class="${color}">${t.side}</span>
                ${t.amount_crypto} ${t.assetid}
            </div>
            <div class="col-6 text-end small secondary">
                ${cTime}
            </div>
            <div class="col-6 text-end small">
	            <span class="status">${t.status}</span>
	        </div>
        </div>
    `;
}

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        window.p2pTraAS = new AjaxScroll(
            $('#transactions-data'),
            $('#transactions-data-preloader'),
            {
                api_key: window.apiKey
            },
            function() {
                this.data.offset = this.offset;
                var thisAS = this;
                
            //---
        $.ajax({
            url: config.apiUrl + '/p2p/transactions',
            type: 'POST',
            data: JSON.stringify(thisAS.data),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                $.each(data.transactions, function(k, v) {
                    thisAS.append(renderTransaction(v));
                });
                
                thisAS.done();
                
                if(thisAS.data.offset == 0)
                    $(document).trigger('renderingStage');
                
                if(data.transactions.length != 50)
                    thisAS.noMoreData(); 
            }
            else {
                msgBoxRedirect(data.error);
                thisAS.done();
                thisAS.noMoreData();
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(true);
            thisAS.done();
            thisAS.noMoreData();  
        });
            //---
            
            },
            true
        );   
    }
});