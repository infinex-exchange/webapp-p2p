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
    
    // Check balance when coin selected
    window.p2pSellBalance = new BigNumber(0);
    
    $('#select-coin, input[name="side"]').on('change', function() {
        side = $('input[name="side"]:checked').val();
        
        if(side == 'SELL' && window.loggedIn) {
            asset = $('#select-coin').val();
            
             $.ajax({
                url: config.apiUrl + '/wallet/balances',
                type: 'POST',
                data: JSON.stringify({
                    api_key: window.apiKey,
                    symbols: [ asset ]
                }),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(data.success) {
                    window.p2pSellBalance = new BigNumber(data.balances[asset].avbl);
                } else {
                    msgBox(data.error);
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                msgBoxNoConn(false);
            });
        }
    });
    
    // Lock format and precision of amount input
    $('#mt-amount-crypto, #mt-amount-fiat').on('input', function () {
        prec = window.p2pAssetPrec;
        if($(this).is('#mt-amount-fiat')) prec = window.p2pFiatPrec; 
        
        var regex = new RegExp("^[0-9]*(\\.[0-9]{0," + prec + "})?$");
        var newVal = $(this).val();
        
        // Revert bad format (real visible value)
        if (!regex.test(newVal)) {
            $(this).val( $(this).data('val') );
        }
        
        // Drop . on last position (data-val only)
        else if(newVal.slice(-1) == '.') {
            $(this).data('val', newVal.substring(0, newVal.length - 1));
        }
        
        // Change . to 0. on first position (data-val only)
        else if(newVal.startsWith('.')) {
            $(this).data('val', '0' + newVal);
        }
        
        // Save data-val when everythink ok
        else $(this).data('val', newVal);
    
        $(this).trigger('prevalidated');
    });
    
    // Move data-val to real visible value
    $('#mt-amount-crypto, #mt-amount-fiat').on('focusout', function() {
        $(this).val( $(this).data('val') );
    });
    
    // Drop amount to available balance
    /*$('#mt-amount-crypto').on('prevalidated', function() {
        var amount = new BigNumber($(this).data('val'));
        if(amount.gt(window.p2pSellMax)) {
            $('#withdraw-amount, #withdraw-amount-max').addClass('blink-red');
            setTimeout(function() {
                $('#withdraw-amount, #withdraw-amount-max').removeClass('blink-red');
                
                var max = window.wdAmountMax.toString();
                $('#withdraw-amount').data('val', max)
                                    .val(max)
                                    .trigger('prevalidated');
            }, 1000);
        }
    });*/
    
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
                
                thisAS.append(`
                    <div class="trade-item row px-2 py-4 hoverable" data-offerid="${v.offerid}" data-total="${v.total}"
                     data-fiat-min="${v.fiat_min}" data-fiat-max="${v.fiat_max}">
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
                            <button type="button" class="btn ${window.btnBg} w-100 user-only" onClick="takeOfferModal(${v.offerid})">
	                            ${window.btnText}
	                            <span class="d-none d-lg-inline">${window.p2pInitialCoin}</span>
	                        </button>
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

function takeOfferModal(offerid) {
    var modal = $('#modal-take');
    var side = window.p2pOffersAS.data.side;
    var dataSource = $('.trade-item[data-offerid="' + offerid + '"]');
    
    $('.mt-title').html(window.btnText + ' ' + window.p2pInitialCoin);
    $('#mt-submit').removeClass('bg-green bg-red').addClass(window.btnBg);
    
    $('.mt-fiatid').html(window.p2pInitialFiat);
    $('.mt-assetid').html(window.p2pInitialCoin);
    
    modal.find('[data-side]').hide();
    modal.find('[data-side="' + side + '"]').show();
    
    $('#mt-amount-crypto, #mt-amount-fiat').val('').data('val', '');
    
    $('#mt-crypto-balance').html(window.p2pSellBalance.toFixed(window.p2pAssetPrec, BigNumber.ROUND_DOWN));
    
    window.p2pCryptoTotal = new BigNumber(dataSource.data('total'));
    window.p2pTotalMin = new BigNumber(dataSource.data('fiat-min'));
    window.p2pTotalMax = new BigNumber(dataSource.data('fiat-max'));
    
    $('#mt-crypto-avbl').html(dataSource.data('total'));
    $('#mt-fiat-min').html(dataSource.data('fiat-min'));
    $('#mt-fiat-max').html(dataSource.data('fiat-max'));
    
    modal.modal('show');
}