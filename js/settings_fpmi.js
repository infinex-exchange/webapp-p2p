function showAddFpmiPrompt() {
    $('#ma-name').val('');
    $('#ma-help-name').hide();
    
    $('#modal-add').modal('show');
}

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
	            var fieldsInnerHtml = '';
	            
	            $.each(v.fields, function(kk, vv) {
	                fieldsInnerHtml += `
	                    <h5 class="secondary">
	                        ${data.fpms[v.fpmid].struct[kk]}:
	                    </h5>
	                    ${vv}
	                    <br>
	                `;
	            });
            
                thisAS.append(`
                    <div class="row p-2 fpmi-item hoverable separate">
		                <div class="col-12 col-lg-3">
			                ${v.name}
		                </div>
		                <div class="col-12 col-lg-3">
		                    <img width="24px" height="24px" src="${data.fpms[v.fpmid].icon_url}">
			                ${data.fpms[v.fpmid].name}
		                </div>
		                <div class="col-12 col-lg-6">
			                ${fieldsInnerHtml}
		                </div>
		            </div>
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
    
    initSelectFpm(null);
});