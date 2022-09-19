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

function initSelectFpmInsta(endpoint = '/p2p/fpm_instances') {
    $('#select-fpm-insta').data('fpminstaid', '');
    $('#select-fpm-insta').val('');
    $('#select-fpm-insta-data').empty();
    
    window.selectFpmInstaAS = new AjaxScroll(
        $('#select-fpm-insta-data'),
        $('#select-fpm-insta-data-preloader'),
        {
            api_key: window.apiKey
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
                    $.each(data.fpm_instances, function(k, v) {
                        var fpm = data.fpms[v.fpmid];
                        
                        thisAS.append(`
                            <div class="select-fpm-insta-item row p-1 hoverable" data-fpminstaid="${k}" data-name="${v.name}">
                                <div class="col-auto my-auto text-center" style="width: 32px">
                                    <img width="24px" height="24px" src="${fpm.icon_url}">
                                </div>
                                <div class="col my-auto">
                                    <h5 class="secondary">${v.name}</h5>
                                    <br>
                                    <i>${fpm.name}</i>
                                </div>
                            </div>
                        `);
                    });
                    
                    $('#select-fpm-insta').trigger('dataLoaded');
                    
                    $('.select-fpm-insta-item').on('click', function(event) {
                        $('#select-fpm-insta').val($(this).attr('data-name'));
                        $('#select-fpm-insta').data('fpminstaid', $(this).data('fpminstaid'));
                        $('#select-fpm-insta').trigger('change');
                    });
                        
                    thisAS.done();
                            
                    if(data.fpm_instances.length != 50)
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
        },
        false
    );
}