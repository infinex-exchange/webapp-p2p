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

$(document).on('haveConfig', function() {
    $('#select-coin').val(window.p2pInitialCoin);
    $('#select-fiat').val(window.p2pInitialFiat);
    
    window.openOrdersAS = new AjaxScroll(
        $('#offers-data'),
        $('#offers-preloader'),
        {
            side: 'BUY',
            asset: window.p2pInitialCoin,
            fiat: window.p2pInitialFiat
        },
        function() {
            this.data.offset = this.offset;
            var thisAS = this;
            
        //---
    $.ajax({
        url: config.apiUrl + '/p2p/offers',
        type: 'POST',
        data: JSON.stringify(thisAS.data),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            $.each(data.orders, function(k, v) {
                thisAS.append(renderOpenOrder(v));
            });
            
            thisAS.done();
            
            if(data.orders.length != 50)
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
});