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
        window.p2pInitialCoin = this.value;
    });
    
    $('#select-fiat').on('change', function() {
        initSelectFpm(this.value);
        delete window.p2pOffersAS.data.fpm;
        window.p2pOffersAS.data.fiat = this.value;
        window.p2pOffersAS.reset();
        localStorage.setItem("p2pInitialFiat", this.value);
        window.p2pInitialFiat = this.value;
    });
    
    $('#select-fpm').on('change', function() {
        val = $(this).data('fpmid');
        if(val == '') delete window.p2pOffersAS.data.fpm;
        else window.p2pOffersAS.data.fpm = val;
        window.p2pOffersAS.reset();
    });
});

$(document).on('authChecked', function() {
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
    
    var data = {
        side: 'BUY',
        asset: window.p2pInitialCoin,
        fiat: window.p2pInitialFiat
    };
    
    if(window.loggedIn)
        data = Object.assign(data, {
            api_key: window.apiKey
        });
    
    window.p2pOffersAS = new AjaxScroll(
        $('#trade-data'),
        $('#trade-preloader'),
        data,
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
            window.p2pAssetPrec = data.asset_prec;
            window.p2pFiatPrec = data.fiat_prec;
            window.p2pPricePrec = data.price_prec;
            
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
                
                window.btnBg = '';
                window.btnText = '';
                
                if(thisAS.data.side == 'BUY') {
                    window.btnBg = 'bg-green';
                    window.btnText = 'Buy';
                }
                else {
                    window.btnBg = 'bg-red';
                    window.btnText = 'Sell';
                }
                
                var ratingStars = Math.round(v.user_rating/10)/2; // num / 10 = num / 20 * 2
                
                var button = '';
                var unavailable = '';

                if(typeof(v.can_take) != 'undefined' && !v.can_take) {
                    button = `
                        <div class="small border rounded p-1 text-center">
                            Unavailable
                        </div>
                    `;
                    unavailable = 'unavailable';
                }
                
                else if(window.loggedIn) {
                    button = `
                        <button type="button" class="btn ${window.btnBg} btn-sm w-100" onClick="takeOfferModal(${v.offerid})">
                           ${window.btnText}
                           <span class="d-none d-lg-inline">${window.p2pInitialCoin}</span>
                        </button>
                    `;
                }
                
                else {
                    button = `
                        <button type="button" class="btn ${window.btnBg} btn-sm w-100" onClick="gotoLogin()">
                           ${window.btnText}
                           <span class="d-none d-lg-inline">${window.p2pInitialCoin}</span>
                        </button>
                    `;
                }        
                
                thisAS.append(`
                    <div class="trade-item ${unavailable} separate row px-2 py-4 hoverable" data-offerid="${v.offerid}" data-total="${v.total}"
                     data-fiat-min="${v.fiat_min}" data-fiat-max="${v.fiat_max}" data-price="${v.price}">
                        <div class="my-auto sm-w-100 order-1" style="width: 20%">
                            <div class="row">
	                            <div class="col-3 col-lg-12">
		                            <i class="fa-solid fa-circle-user"></i>
                                    <strong>${v.nickname}</strong>
		                        </div>
                                <div class="col-4 col-lg-12">
		                            <div class="rateit" data-rateit-value="${ratingStars}" style="font-size: 20px"></div>
	                            </div>
	                            <div class="col-5 col-lg-12">
		                            <span class="small secondary">
		                                ${v.user_tcount} transactions | ${v.user_rating}%
		                            </span>
		                        </div>
		                    </div>
                        </div>
                        <div class="my-auto order-2 d-none d-lg-block text-end" style="width: 20%">
                            ${v.price} ${window.p2pInitialFiat}
                        </div>
                        <div class="my-auto sm-w-70 py-4 py-lg-0 order-3" style="width: 23%">
                            <div class="row">
                                <div class="col-12 d-lg-none pb-3">
                                    <h4>${v.price} ${window.p2pInitialFiat}</h4>
                                </div>
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
                            <div class="row">
                                <div class="col-12">
                                    ${button}
                                </div>
                                <div class="col-12 pt-1 small secondary text-center">
                                    <i class="fa-solid fa-hourglass-half"></i>
                                    ${v.time_window} minutes
                                </div>
                            </div>
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