$(document).ready(function() {
    window.renderingStagesTarget = 1;
});

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        $.ajax({
            url: config.apiUrl + '/p2p/account',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                $('#nickname').val(data.nickname);
                
                var ratingStars = Math.round(data.rating/10)/2; // num / 10 = num / 20 * 2        
                $('#rateit-wrapper').html(`
                    <div class="rateit" data-rateit-value="${ratingStars}" style="font-size: 20px"></div>
                `);
                $('.rateit').rateit({
                    readonly: true,
                    ispreset: true,
                    mode: 'font'
                });
                
                $(document).trigger('renderingStage');
            } else {
                msgBoxRedirect(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(true);
        });
    }
});