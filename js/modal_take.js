$(document).ready(function() {
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