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
        if(typeof(window.selectFpmAS.data.fiat) == 'undefined' || window.selectFpmAS.data.fiat != window.fiatid) {
            window.selectFpmInstaAS.data.fiat = window.fiatid;
            window.selectFpmInstaAS.reset();
        }
        
        $('#select-fpm-wrapper').addClass('d-none');
        $('#select-fpminsta-wrapper').removeClass('d-none');
    }
}

$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    $('#select-fpm, #select-fpm-insta').prop('disabled', true);
    
    $('#select-coin, #select-fiat').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
    
    $('#select-coin, #select-fiat').on('change', function() {
        window.assetid = $('#select-coin').val();
        window.fiatid = $('#select-fiat').val();
        
        if(window.assetid == '' || window.fiatid == '') return;
        
        refreshPmSelectors();
        
        $('.assetid').html(window.assetid);
        $('.fiatid').html(window.fiatid);
        $('.step2-ro').prop('readonly', false);
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
            $('#payment-methods-data').append(fpmid);
            $('#payment-methods-empty').addClass('d-none');
        }
        
        $('#select-fpm').val('').data('fpmid', '');
    });
    
    $('#select-fpm-insta').on('change', function() {
        var fpminstaid = $(this).data('fpminstaid');
        
        if(!window.fpm_instances.includes(fpminstaid)) {
            window.fpm_instances.push(fpminstaid);
            $('#payment-methods-data').append(fpminstaid);
            $('#payment-methods-empty').addClass('d-none');
        }
        
        $('#select-fpm-insta').val('').data('fpminstaid', '');
    });
});

$(document).on('authChecked', function() {
    if(!window.loggedIn) return;
    
    initSelectCoin('/p2p/assets');
    initSelectFiat();
    initSelectFpmInsta();
    
    $('#side-buy').trigger('change');
});