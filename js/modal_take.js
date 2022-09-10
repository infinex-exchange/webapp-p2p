$(document).ready(function() {
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
        
        // Revert bad format (visible value to typing safe value)
        if (!regex.test(newVal)) {
            $(this).val( $(this).data('tsval') );
        }
        
        else {
            // Check is real value change by calculations pending
            var haveRVal = $(this).data('rval') != $(this).data('tsval');
            
            // Drop . on last position (typing safe value only)
            if(newVal.slice(-1) == '.') {
                $(this).data('tsval', newVal.substring(0, newVal.length - 1));
            }
        
            // Change . to 0. on first position (typing safe value only)
            else if(newVal.startsWith('.')) {
                $(this).data('tsval', '0' + newVal);
            }
        
            // Save typing safe value as is when everythink ok
            else {
                $(this).data('tsval', newVal);
            }
            
            // If there is no pending change by calculations set rval also
            $(this).data('rval', newVal);
        }
        
        // Do calculations
        $(this).trigger('updateCalc');
    });
    
    // Move data-val to real visible value
    $('#mt-amount-crypto, #mt-amount-fiat').onFirst('focusout setVal', function() {
        if($(this).is(':focus')) return;
        
        $(this).data('tsval', $(this).data('rval') )
               .val( $(this).data('rval') );
    });
    
    // Drop amount to available balance
    $('#mt-amount-crypto').on('focusOut setVal', function() {
        amount = new BigNumber($(this).data('rval'));
        var finalMaxCrypto = null;      
        
        if(window.p2pOffersAS.data.side == 'SELL' && amount.gt(window.p2pSellBalance)) {
            $('#mt-amount-crypto, #mt-crypto-balance').addClass('text-red');
            finalMaxCrypto = window.p2pSellBalance;
        }
        
        if(amount.gt(window.p2pCryptoTotal)) {
            $('#mt-amount-crypto, #mt-crypto-avbl').addClass('text-red');
            if(finalMaxCrypto === null || window.p2pCryptoTotal.lt(finalMaxCrypto))
                finalMaxCrypto = window.p2pCryptoTotal;
        }
        
        $('#mt-amount-fiat').trigger('setVal');
        
        if($(this).is(':focus') || $('#mt-amount-fiat').is(':focus') || finalMaxCrypto === null) return;
        
        if(window.p2pOffersAS.data.side == 'SELL' && amount.gt(window.p2pSellBalance)) {
            $('#mt-amount-crypto, #mt-crypto-balance').removeClass('text-red').addClass('blink-red');
        }
        
        if(amount.gt(window.p2pCryptoTotal)) {
            $('#mt-amount-crypto, #mt-crypto-avbl').removeClass('text-red').addClass('blink-red');
        }
        
        setTimeout(function() {
            $('#mt-amount-crypto, #mt-crypto-balance, #mt-crypto-avbl').removeClass('blink-red');
        
            $('#mt-amount-crypto').data('rval', finalMaxCrypto.toFixed(window.p2pAssetPrec, BigNumber.ROUND_DOWN))
                                  .trigger('setVal')
                                  .trigger('updateCalc');
        }, 1000);
    });
    
    $('#mt-amount-fiat').on('focusout setVal', function() {
        amount = new BigNumber($(this).data('rval'));
        var finalFiat = null;   
        
        if(amount.gt(window.p2pFiatMax)) {
            $('#mt-amount-fiat, #mt-fiat-max').addClass('text-red');
            finalFiat = window.p2pFiatMax;
        }
        
        else if(amount.lt(window.p2pFiatMin)) {
            $('#mt-amount-fiat, #mt-fiat-min').addClass('text-red');
            finalFiat = window.p2pFiatMin;
        }
        
        $('#mt-amount-crypto').trigger('setVal');
        
        if($(this).is(':focus') || $('#mt-amount-crypto').is(':focus') || finalFiat === null) return;
        
        if(amount.gt(window.p2pFiatMax)) {
            $('#mt-amount-fiat, #mt-fiat-max').removeClassClass('text-red').addClass('blink-red');
        }
        
        else if(amount.lt(window.p2pFiatMin)) {
            $('#mt-amount-fiat, #mt-fiat-min').removeClass('text-red').addClass('blink-red');
        }
            
        setTimeout(function() {
            $('#mt-amount-fiat, #mt-fiat-min').removeClass('blink-red');
        
            $('#mt-amount-fiat').data('rval', finalFiat.toFixed(window.p2pFiatPrec, BigNumber.ROUND_DOWN))
                                .trigger('setVal')
                                .trigger('updateCalc');
        }, 1000);
    });
    
    // Change fiat when crypto changed
    $('#mt-amount-crypto').on('updateCalc', function() {
        var amount = new BigNumber($(this).data('rval'));
        
        var totalStr = '';
        
        if(!amount.isZero() && !amount.isNaN()) {
            var total = amount.multipliedBy(window.p2pPrice);
            totalStr = total.toFixed(window.p2pFiatPrec);
        }
        
        $('#mt-amount-fiat').data('rval', totalStr)
                            .trigger('setVal');
    });
    
    // Change crypto when fiat changed
    $('#mt-amount-fiat').on('updateCalc', function() {
        var total = new BigNumber($(this).data('rval'));
        
        var amountStr = '';
        
        if(!total.isZero() && !total.isNaN()) {        
            var amount = total.dividedBy(window.p2pPrice);
            if(window.p2pOffersAS.data.side == 'SELL')
                amountStr = amount.toFixed(window.p2pAssetPrec, BigNumber.ROUND_DOWN);
            else
                amountStr = amount.toFixed(window.p2pAssetPrec, BigNumber.ROUND_UP);
        }
        
        $('#mt-amount-crypto').data('rval', amountStr)
                              .trigger('setVal');
    });
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
    window.p2pFiatMin = new BigNumber(dataSource.data('fiat-min'));
    window.p2pFiatMax = new BigNumber(dataSource.data('fiat-max'));
    window.p2pPrice = new BigNumber(dataSource.data('price'));
    
    $('#mt-crypto-avbl').html(dataSource.data('total'));
    $('#mt-fiat-min').html(dataSource.data('fiat-min'));
    $('#mt-fiat-max').html(dataSource.data('fiat-max'));
    
    modal.modal('show');
}