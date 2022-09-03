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
    $('#mt-amount-crypto').on('prevalidated', function() {
        amount = new BigNumber($(this).data('val'));
        final_max = null;      
        
        if(window.p2pOffersAS.data.side == 'SELL' && amount.gt(window.p2pSellBalance)) {
            $('#mt-amount-crypto, #mt-crypto-balance').addClass('blink-red');
            final_max = window.p2pSellBalance;
        }
        
        if(amount.gt(window.p2pCryptoTotal)) {
            $('#mt-amount-crypto, #mt-crypto-avbl').addClass('blink-red');
            if(window.p2pCryptoTotal.lt(final_max))
                final_max = window.p2pCryptoTotal;
        }
        
        if(final_max !== null)
            setTimeout(function() {
                $('#mt-amount-crypto, #mt-crypto-balance, #mt-crypto-avbl').removeClass('blink-red');
            
                $('#mt-amount-crypto').data('val', final_max.toFixed(window.p2pAssetPrec, BigNumber.ROUND_DOWN))
                                      .val(final_max.toFixed(window.p2pAssetPrec, BigNumber.ROUND_DOWN))
                                      .trigger('prevalidated');
            }, 1000);
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
    window.p2pFiatlMax = new BigNumber(dataSource.data('fiat-max'));
    
    $('#mt-crypto-avbl').html(dataSource.data('total'));
    $('#mt-fiat-min').html(dataSource.data('fiat-min'));
    $('#mt-fiat-max').html(dataSource.data('fiat-max'));
    
    modal.modal('show');
}