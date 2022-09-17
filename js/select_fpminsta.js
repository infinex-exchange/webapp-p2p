$(document).ready(function() {
    $('#select-fpm-insta').on('click', function(event) {
        $('.selector-dropdown').not('#select-fpm-insta-dropdown').hide();
        $('.selector-arrow').not('#select-fpm-insta-arrow').removeClass('flip');
        
        $('#select-fpm-insta-dropdown').toggle();
        $('#select-fpm-insta-arrow').toggleClass('flip');
        
        if($('#select-fpm-insta-arrow').hasClass('flip'))
            $('#select-fpm-insta-search').focus();
        
        event.stopPropagation();
    });
    
    $('html').on('click', function(e) {
        if($(e.target).is('#select-fpm-insta-search')) {
            e.preventDefault();
            return;
        }
        
        $('#select-fpm-insta-dropdown').hide();
        $('#select-fpm-insta-arrow').removeClass('flip');
    });
    
    $('#select-fpm-insta-search').on('input', function() {
        var query = $(this).val();
        if(query == '')
            delete window.selectFpmInstaAS.data.search;
        else
            window.selectFpmInstaAS.data.search = query;
        window.selectFpmInstaAS.reset();
    });
});

function initSelectFpmInsta//(fiat, endpoint = '/p2p/fpms') {
    $('#select-fpm').data('fpmid', '');
    $('#select-fpm').val('All payment methods');
    $('#select-fpm-data').empty();
    
    window.selectFpmAS = new AjaxScroll(
        $('#select-fpm-data'),
        $('#select-fpm-data-preloader'),
        {
            fiat: fiat
        },
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
                    $.each(data.fpms, function(k, v) {
                        thisAS.append(`
                            <div class="select-fpm-item row p-1 hoverable" data-fpmid="${k}" data-name="${v.name}">
                                <div class="col-auto my-auto text-center" style="width: 32px">
                                    <img width="24px" height="24px" src="${v.icon_url}">
                                </div>
                                <div class="col my-auto">
                                    <span class="secondary">${v.name}</span>
                                </div>
                            </div>
                        `);
                    });
                    
                    $('#select-fpm').trigger('dataLoaded');
                    
                    $('.select-fpm-item').on('click', function(event) {
                        $('#select-fpm').val($(this).attr('data-name'));
                        $('#select-fpm').data('fpmid', $(this).data('fpmid'));
                        $('#select-fpm').trigger('change');
                    });
                        
                    thisAS.done();
                            
                    if(data.fpms.length != 50)
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