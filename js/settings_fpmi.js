$(document).ready(function() {
    window.renderingStagesTarget = 1;
});

$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
    
    window.fpmiAS = new AjaxScroll(
        $('#fpmi-data'),
        $('#fpmi-preloader'),
        {
            api_key: window.apiKey
        },
        function() {
            this.data.offset = this.offset;
            var thisAS = this;
            
        //---
    $.ajax({
        url: config.apiUrl + '/p2p/fpm_instances_ex',
        type: 'POST',
        data: JSON.stringify(thisAS.data),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            $.each(data.fpm_instances, function(k, v) {
                thisAS.append(`
                    ${v.name}
                `);
            });
            
            thisAS.done();
            
            if(thisAS.data.offset == 0)
                $(document).trigger('renderingStage');
            
            if(data.fpm_instances.length != 50)
                thisAS.noMoreData(); 
        }
        else {
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
        //---
        
        },
        true,
        true
    );
});