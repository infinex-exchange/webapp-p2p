$(document).ready(function() {
    $('#select-fpm').on('click', function(event) {
        $('.selector-dropdown').not('#select-fpm-dropdown').hide();
        $('.selector-arrow').not('#select-fpm-arrow').removeClass('flip');
        
        $('#select-fpm-dropdown').toggle();
        $('#select-fpm-arrow').toggleClass('flip');
        
        event.stopPropagation();
    });
    
    $('html').on('click', function(e) {
        if($(e.target).is('#select-fpm-search')) {
            e.preventDefault();
            return;
        }
        
        $('#select-fpm-dropdown').hide();
        $('#select-fpm-arrow').removeClass('flip');
    });
    
    $('#select-fpm-search').on('input', function() {
        var query = $(this).val();
        if(query == '')
            delete window.selectFpmAS.data.search;
        else
            window.selectFpmAS.data.search = query;
        window.selectFpmAS.reset();
    });
});

function initSelectFpm(endpoint = '/p2p/fpms') {
    window.selectFpmAS = new AjaxScroll(
        $('#select-fpm-data'),
        $('#select-fpm-data-preloader'),
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
                    $.each(data.fpms, function(k, v) {
                        thisAS.append(`
                            <div class="select-fpm-item row p-1 hoverable" data-asset="${k}">
                                <div class="col-auto my-auto text-center" style="width: 32px">
                                    <img width="24px" height="24px" src="${v.icon_url}">
                                </div>
                                <div class="col my-auto">
                                    <strong>${k}</strong>
                                    <span class="secondary">${v.name}</span>
                                </div>
                            </div>
                        `);
                    });
                    
                    $('#select-fpm').trigger('dataLoaded');
                    
                    $('.select-fpm-item').on('click', function(event) {
                        $('#select-fpm').val($(this).attr('data-asset'));
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