$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    initSelectCoin('/p2p/assets');
    initSelectFiat();
    
    $('input[name="side"]').change(function() {
        window.p2pOffersAS.data.side = this.value;
        window.p2pOffersAS.reset();
    });
    
    $('#select-coin').on('change', function() {
        window.p2pOffersAS.data.asset = this.value;
        window.p2pOffersAS.reset();
    });
    
    $('#select-fiat').on('change', function() {
        initSelectFpm(this.value);
        delete window.p2pOffersAS.data.fpm;
        window.p2pOffersAS.data.fiat = this.value;
        window.p2pOffersAS.reset();
    });
    
    $('#select-fpm').on('change', function() {
        val = $(this).data('fpmid');
        if(val == '') delete window.p2pOffersAS.data.fpm;
        else window.p2pOffersAS.data.fpm = val;
        window.p2pOffersAS.reset();
    });
    
    window.p2pInitialCoin = localStorage.getItem("p2pInitialCoin");
    window.p2pInitialFiat = localStorage.getItem("p2pInitialFiat");
    if(window.p2pInitialCoin === null || window.p2pInitialFiat === null) {
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
                window.p2pInitialCoin = data.default_coin;
                localStorage.setItem("p2pInitialCoin", data.default_coin);
                
                window.p2pInitialFiat = data.default_fiat;
                localStorage.setItem("p2pInitialFiat", data.default_fiat);
                
                $(document).trigger('haveConfig');
            }
            else {
                msgBoxRedirect(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(true); 
        });
    }
    else
        $(document).trigger('haveConfig');
});

$(document).on('haveConfig', function() {
    $('#select-coin').val(window.p2pInitialCoin);
    $('#select-fiat').val(window.p2pInitialFiat);
    initSelectFpm(window.p2pInitialFiat);
    
    window.p2pOffersAS = new AjaxScroll(
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
            $.each(data.offers, function(k, v) {
                console.log(v);
            });
            
            thisAS.done();
            
            if(thisAS.data.offset == 0)
                $(document).trigger('renderingStage');
            
            if(data.offers.length != 50)
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