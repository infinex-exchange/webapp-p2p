var PREDEF_TIME_WINDOW = [
    { //0
        val: 5,
        desc: '5 minutes'
    },
    { //1
        val: 10,
        desc: '10 minutes'
    },
    { //2
        val: 15,
        desc: '15 minutes'
    },
    { //3
        val: 30,
        desc: '30 minutes'
    },
    { //4
        val: 45,
        desc: '45 minutes'
    },
    { //5
        val: 60,
        desc: '1 hour'
    },
    { //6
        val: 90,
        desc: '1.5 hours'
    },
    { //7
        val: 120,
        desc: '2 hours'
    },
    { //8
        val: 180,
        desc: '3 hours'
    },
    { //9
        val: 360,
        desc: '6 hours'
    },
    { //10
        val: 720,
        desc: '12 hours'
    },
    { //11
        val: 1440,
        desc: '24 hours'
    }
];

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

function removeFpmInsta(item, fpminstaid) {
    $(item).remove();
    window.fpm_instances.splice(window.fpm_instances.indexOf(fpminstaid), 1);
    if(window.fpm_instances.length == 0)
        $('#payment-methods-empty').removeClass('d-none');
}

function removeFpm(item, fpmid) {
    $(item).remove();
    window.fpms.splice(window.fpms.indexOf(fpmid), 1);
    if(window.fpms.length == 0)
        $('#payment-methods-empty').removeClass('d-none');
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
                <div class="payment-methods-item col-12 col-md-3 col-lg-3 p-2 hoverable" onClick="removeFpm(this, '${fpmid}')">
                    <div class="row">
                        ${innerHtml}
                        <div class="col-auto ms-auto">
                            <i class="fa-solid fa-xmark remove-pm"></i>
                        </div>
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
                <div class="payment-methods-item col-12 col-md-3 col-lg-3 p-2 hoverable" onClick="removeFpmInsta(this, ${fpminstaid})">
                    <div class="row">
                        ${innerHtml}
                        <div class="col-auto ms-auto">
                            <i class="fa-solid fa-xmark remove-pm"></i>
                        </div>
                    </div>
                </div>
            `);
            
            $('#payment-methods-empty').addClass('d-none');
        }
        
        $('#select-fpm-insta').val('').data('fpminstaid', '');
    });
    
    // Toggle rateit on checkbox click
    
    $('#sec-min-rating-cbx').on('change', function() {
        if(this.checked) {
            $('#sec-min-rating-expand').removeClass('d-none');
        
            $('.rateit_').rateit({
                mode: 'font'
            });
        }
        
        else
            $('#sec-min-rating-expand').addClass('d-none');
    });
    
    // Time window
    
    $('#time-window-raw').on('input', function() {
        var raw = $(this).val();
        window.timeWindow = PREDEF_TIME_WINDOW[raw].val;
        $('#time-window-desc').html(PREDEF_TIME_WINDOW[raw].desc);
    }).trigger('input');
    
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