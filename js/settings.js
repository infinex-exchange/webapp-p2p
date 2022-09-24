$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    $('#nickname').on('input', function() {
        if(validateP2PNickname($(this).val()))
            $('#help-nickname').hide();
        else
            $('#help-nickname').show();
    });
    
    $('#form-nickname').submit(function(event) {
        event.preventDefault();
        
        var nickname = $('#nickname').val();
        
        if(!validateP2PNickname(nickname)) {
            msgBox('Fill the form correctly');
            return;
        }
        
        $.ajax({
            url: config.apiUrl + '/p2p/account/change_nickname',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                nickname: nickname
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                msgBox('Your nickname was changed');
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    });
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
                $('#nickname').val(data.nickname).trigger('input');
                
                var ratingStars = Math.round(data.rating/10)/2; // num / 10 = num / 20 * 2        
                $('#rateit-wrapper').html(`
                    <div class="rateit" data-rateit-value="${ratingStars}" style="font-size: 48px"></div>
                `);
                $('.rateit').rateit({
                    readonly: true,
                    ispreset: true,
                    mode: 'font'
                });
                $('#rating-perc').html(data.rating);
                $('#rating-tcount').html(data.tcount);
                
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