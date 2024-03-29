$(document).ready(function() {
    $('#select-fiat').on('click', function(event) {
        $('.selector-dropdown').not('#select-fiat-dropdown').hide();
        $('.selector-arrow').not('#select-fiat-arrow').removeClass('flip');
        
        $('#select-fiat-dropdown').toggle();
        $('#select-fiat-arrow').toggleClass('flip');
        
        if($('#select-fiat-arrow').hasClass('flip'))
            $('#select-fiat-search').focus();
        
        event.stopPropagation();
    });
    
    $('html').on('click', function(e) {
        if($(e.target).is('#select-fiat-search')) {
            e.preventDefault();
            return;
        }
        
        $('#select-fiat-dropdown').hide();
        $('#select-fiat-arrow').removeClass('flip');
    });
    
    $('#select-fiat-search').on('input', function() {
        var query = $(this).val();
        if(query == '')
            delete window.selectFiatAS.data.search;
        else
            window.selectFiatAS.data.search = query;
        window.selectFiatAS.reset();
    });
});

function initSelectFiat(endpoint = '/p2p/fiats') {
    window.selectFiatAS = new AjaxScroll(
        $('#select-fiat-data'),
        $('#select-fiat-data-preloader'),
        {},
        function() {
            this.data.offset = this.offset;
            var thisAS = this;
                
            $.ajax({
                url: config.apiUrl + endpoint,
                type: 'POST',
                data: JSON.stringify(thisAS.data),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(data.success) {
                    $.each(data.fiats, function(k, v) {
                        var prec = '';
                        if(typeof(v.prec) !== 'undefined') prec = v.prec;
                        
                        thisAS.append(`
                            <div class="select-fiat-item row p-1 hoverable" data-asset="${k}" data-prec="${prec}">
                                <div class="col-auto my-auto">
                                    <div class="bg-white d-flex align-items-center justify-content-center rounded-circle" style="width: 24px; height: 24px; color: black;">
                                        <strong>${v.symbol}</strong>
                                    </div>
                                </div>
                                <div class="col my-auto">
                                    <strong>${k}</strong>
                                    <span class="secondary">${v.name}</span>
                                </div>
                            </div>
                        `);
                    });
                    
                    $('#select-fiat').trigger('dataLoaded');
                    
                    $('.select-fiat-item').on('click', function(event) {
                        $('#select-fiat').val($(this).attr('data-asset'));
                        $('#select-fiat').data('prec', $(this).attr('data-prec'));
                        $('#select-fiat').trigger('change');
                    });
                        
                    thisAS.done();
                            
                    if(Object.keys(data.fiats).length != 50)
                        thisAS.noMoreData();
                } else {
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
        }
    );
}