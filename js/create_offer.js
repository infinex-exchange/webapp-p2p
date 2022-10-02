function refreshPmSelectors() {
    $('#payment-methods-data').empty();
    $('#payment-methods-empty').removeClass('d-none');
    window.fpms = [];
    window.fpm_instances = [];
    
    window.assetid = $('#select-coin').val();
    window.fiatid = $('#select-fiat').val();
    
    if(window.assetid == '' || window.fiatid == '') return;
    
    if(window.side == 'BUY') {
        // FPM
        if(typeof(window.selectFpmAS) == 'undefined')
            initSelectFpm(window.fiatid, false);
        else if(window.selectFpmAS.data.fiat != window.fiatid) {
            window.selectFpmAS.data.fiat = window.fiatid;
            window.selectFpmAS.reset();
        }
        
        $('#select-fpm-wrapper').removeClass('d-none');
        $('#select-fpminsta-wrapper').addClass('d-none');
    }
    else {
        // FPMI
        if(typeof(window.selectFpmInstaAS.data.fiat) == 'undefined' || window.selectFpmInstaAS.data.fiat != window.fiatid) {
            window.selectFpmInstaAS.data.fiat = window.fiatid;
            window.selectFpmInstaAS.reset();
        }
        
        $('#select-fpm-wrapper').addClass('d-none');
        $('#select-fpminsta-wrapper').removeClass('d-none');
    }
}

$(document).ready(function() {
    // Initial
    
    window.renderingStagesTarget = 2;
    $('#select-fpm, #select-fpm-insta').prop('disabled', true);
    
    // Remove preloader
    
    $('#select-coin, #select-fiat').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
    
    // On change selectors
    
    $('#select-coin, #select-fiat').on('change', function() {
        window.assetid = $('#select-coin').val();
        window.fiatid = $('#select-fiat').val();
        
        if(window.assetid == '' || window.fiatid == '') return;
        
        refreshPmSelectors();
        
        $('.assetid').html(window.assetid);
        $('.fiatid').html(window.fiatid);
        $('.step2-ro').prop('readonly', false).data('rval', '').data('tsval', '').val('');
        $('#select-fpm, #select-fpm-insta').prop('disabled', false);
    });
    
    $('input[name="side"]').change(function() {
        window.side = this.value;
        refreshPmSelectors();
    });
    
    $('#select-fpm').on('change', function() {
        var fpmid = $(this).data('fpmid');
        
        if(!window.fpms.includes(fpmid)) {
            window.fpms.push(fpmid);
            
            var innerHtml = $('.select-fpm-item[data-fpmid="' + fpmid + '"]').html();
            $('#payment-methods-data').append(`
                <div class="col-12 col-md-3 col-lg-3 p-2 hoverable">
                    <div class="row">
                        ${innerHtml}
                    </div>
                </div>
            `);
            
            $('#payment-methods-empty').addClass('d-none');
        }
        
        $('#select-fpm').val('').data('fpmid', '');
    });
    
    $('#select-fpm-insta').on('change', function() {
        var fpminstaid = $(this).data('fpminstaid');
        
        if(!window.fpm_instances.includes(fpminstaid)) {
            window.fpm_instances.push(fpminstaid);
            
            var innerHtml = $('.select-fpm-insta-item[data-fpminstaid="' + fpminstaid + '"]').html();
            $('#payment-methods-data').append(`
                <div class="col-12 col-md-3 col-lg-3 p-2 hoverable">
                    <div class="row">
                        ${innerHtml}
                    </div>
                </div>
            `);
            
            $('#payment-methods-empty').addClass('d-none');
        }
        
        $('#select-fpm-insta').val('').data('fpminstaid', '');
    });
    
    // Lock format and precision of inputs
    
    $('#price, #amount-crypto, #fiat-min, #fiat-max').on('input', function () {
        prec = $('#select-fiat').data('prec');
        if($(this).is('#amount-crypto')) prec = $('#select-coin').data('prec'); 
        
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
});

$(document).on('authChecked', function() {
    if(!window.loggedIn) return;
    
    initSelectCoin('/p2p/assets');
    initSelectFiat();
    initSelectFpmInsta();
    
    $('#side-buy').trigger('change');
});