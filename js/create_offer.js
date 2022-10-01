$(document).ready(function() {
    window.renderingStagesTarget = 2;
    window.side = 'BUY';
    window.fpms = [];
    window.fpm_instances = [];
    
    $('#select-coin, #select-fiat').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
    
    $('#select-coin, #select-fiat').on('change', function() {
        window.assetid = $('#select-coin').val();
        window.fiatid = $('#select-fiat').val();
        
        if(window.assetid == '' || window.fiatid == '') return;
        
        $('.assetid').html(window.assetid);
        $('.fiatid').html(window.fiatid);
        $('.step2-ro').prop('readonly', false);
        $('.step2-dis').prop('disabled', false);
    });
    
    $('input[name="side"]').change(function() {
        $('#payment-methods-data').empty();
        $('#payment-methods-empty').removeClass('d-none');
        window.side = this.value;
        window.fpms = [];
        window.fpm_instances = [];
    });
    
    $('#payment-methods-add').click(function() {
        if(window.side == 'BUY') {
            // FPM
            if(typeof(window.selectFpmAS) == 'undefined')
                initSelectFpm(window.fiatid);
            else if(window.selectFpmAS.data.fiat != window.fiatid)
                window.selectFpmAS.reset();
            
            $('#modal-add-fpm').modal('show');
        }
        else {
            // FPMI
            if(typeof(window.selectFpmAS.data.fiat) == 'undefined' || window.selectFpmAS.data.fiat != window.fiatid) {
                window.selectFpmInstaAS.data.fiat = window.fiatid;
                window.selectFpmInstaAS.reset();
            }
            
            $('#modal-add-fpm-insta').modal('show');
        }
    });
    
    $('select-fpm').on('change', function() {
        var fpmid = $(this).data('fpmid');
        
        $('#modal-add-fpm').modal('hide');
        
        if(!window.fpms.includes(fpmid)) {
            window.fpms.push(fpmid);
            $('#payment-methods-data').append(fpmid);
        }
        
        $('#select-fpm').val('').data('fpmid', '');
    });
    
    $('#select-fpm-insta').on('change', function() {
        var fpminstaid = $(this).data('fpminstaid');
        
        $('#modal-add-fpm-insta').modal('hide');
        
        if(!window.fpm_instances.includes(fpminstaid)) {
            window.fpm_instances.push(fpminstaid);
            $('#payment-methods-data').append(fpmid);
        }
        
        $('#select-fpm-insta').val('').data('fpminstaid', '');
    });
});

$(document).on('authChecked', function() {
    if(!window.loggedIn) return;
    
    initSelectCoin('/p2p/assets');
    initSelectFiat();
    initSelectFpmInsta();
});