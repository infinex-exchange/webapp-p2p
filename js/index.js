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
        localStorage.setItem("p2pInitialCoin", this.value);
    });
    
    $('#select-fiat').on('change', function() {
        initSelectFpm(this.value);
        delete window.p2pOffersAS.data.fpm;
        window.p2pOffersAS.data.fiat = this.value;
        window.p2pOffersAS.reset();
        localStorage.setItem("p2pInitialFiat", this.value);
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
        $('#trade-data'),
        $('#trade-preloader'),
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
                innerPayments = '';
                
                $.each(v.fpms, function(x, fpmid) {
                    innerPayments += `
                        <div class="col-auto my-auto text-center" style="width: 32px">
                            <img width="24px" height="24px" src="${data.fpms[fpmid].icon_url}">
                        </div>
                        <div class="col-auto my-auto">
                            <span class="secondary">${data.fpms[fpmid].name}</span>
                        </div>
                        <div class="col-12 d-none d-lg-block"></div>
                    `;
                });
                
                btnBg = '';
                btnText = window.p2pInitialCoin;
                
                if(thisAS.data.side == 'BUY') {
                    btnBg = 'bg-green';
                    btnText = 'Buy ' + btnText;
                }
                else {
                    btnBg = 'bg-red';
                    btnText = 'Sell ' + btnText;
                }          
                
                thisAS.append(`
                    <div class="trade-item row px-2 py-4 hoverable" data-offerid="${v.offerid}">
                        <div class="my-auto sm-w-100 order-1" style="width: 20%">
                            <div class="row">
	                            <div class="col-3 col-lg-12">
		                            <strong>${v.nickname}</strong>
		                        </div>
                                <div class="col-4 col-lg-12">
		                            <div class="rateit" data-rateit-value="4.5" style="font-size: 20px"></div>
	                            </div>
	                            <div class="col-5 col-lg-12">
		                            <span class="small secondary">
		                                3 transactions | 96%
		                            </span>
		                        </div>
		                    </div>
                        </div>
                        <div class="my-auto order-2 d-none d-lg-block text-end" style="width: 20%">
                            ${v.price} ${window.p2pInitialFiat}
                        </div>
                        <div class="my-auto sm-w-70 py-4 py-lg-0 order-3" style="width: 23%">
                            <div class="row">
                                <div class="col-4 d-lg-none secondary">
                                    Available:
                                </div>
                                <div class="col-8 col-lg-12 text-end">
		                            ${v.total} ${window.p2pInitialCoin}
	                            </div>
	                            <div class="col-4 d-lg-none secondary">
	                                Limit:
	                            </div>
	                            <div class="col-8 col-lg-12 text-end">
		                            ${v.fiat_min} ${window.p2pInitialFiat} - ${v.fiat_max} ${window.p2pInitialFiat}
		                        </div>
		                    </div>
                        </div>
                        <div class="my-auto sm-w-100 order-5 order-lg-4" style="width: 23%">
                            <div class="row">
	                            ${innerPayments}
	                        </div>
                        </div>
                        <div class="my-auto sm-w-30 py-4 py-lg-0 order-4 order-lg-5" style="width: 14%">
                            <button type="button" class="btn ${btnBg} w-100 user-only">${btnText}</button>
                        </div>
                    </div>
                `);
            });
            
            $('.rateit').rateit({
                readonly: true,
                ispreset: true,
                mode: 'font'
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