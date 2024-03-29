function showAddFpmiPrompt() {
    $('#ma-name').val('');
    $('#ma-help-name').hide();
    
    if($('#select-fpm').data('fpmid') != '')
        $('#select-fpm').trigger('change');
    
    $('#modal-add').modal('show');
}

function validateField(field) {
    var key = $(field).data('key');
    var val = $(field).val();
    var re = new RegExp(window.currentStruct[key].regexp);
    
    if((val == '' && !window.currentStruct[key].required) || val.match(re)) {
        $('.ma-field-help[data-key="' + key + '"]').hide();
        return true;
    }
    
    $('.ma-field-help[data-key="' + key + '"]').show();
    return false;
}

$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    $('#select-fpm').on('change', function() {
        $('#ma-fields').html('');
        
        fpmid = $(this).data('fpmid');
        if(fpmid != '') {
            $.ajax({
                url: config.apiUrl + '/p2p/fpms_ex',
                type: 'POST',
                data: JSON.stringify({
                    fpmid: fpmid
                }),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(data.success) {
                    window.currentStruct = data.fpms[fpmid].struct;
                    
                    $.each(window.currentStruct, function(k, v) {
                        var optional = '';
                        if(!v.required) optional = '<i class="secondary">(optional)</i>';
                        
                        var inputHtml = null;
                        if(v.regexp.includes('\\n')) {
                            inputHtml = `
                                <textarea class="ma-field w-100" rows="2" data-key="${k}" onInput="validateField(this)"></textarea>
                            `;
                        }
                        else {
                            inputHtml = `
                                <input type="text" class="ma-field form-control" data-key="${k}" onInput="validateField(this)">
                            `;
                        }
                        
                        $('#ma-fields').append(`
                            <div class="col-12 pt-3">
                                <h5 class="d-inline">${v.name}:</h5>
                                ${optional}
                            </div>
                            <div class="col-12 pt-1">
                                ${inputHtml}
                            </div>
                            <div class="col-12 pt-1">
                                <small class="ma-field-help form-text" data-key="${k}" style="display: none">
                                    Invalid ${v.name}.
                                </small>
                            </div>
                        `);
                    });
                } else {
                    msgBox(data.error);
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                msgBoxNoConn(false);
            });
        }
    });
    
    $('#ma-name').on('input', function() {
        var name = $(this).val();
        
        if(validateFpmInstaName(name))
            $('#ma-help-name').hide();
        else
            $('#ma-help-name').show();
    });
    
    $('#ma-submit').click(function() {
        var fpmid = $('#select-fpm').data('fpmid');
        if(fpmid == '') return;
        
        var name = $('#ma-name').val();
        if(!validateFpmInstaName(name)) {
            $('#ma-help-name').show();
            return;
        }
        
        var fields = new Object();
        
        for(key in window.currentStruct) {
            var field = '.ma-field[data-key="' + key + '"]';
            var val = $(field).val();
            
            if(!validateField(field))
                return;
                
            if(val != '')
		        fields[key] = val;
        }
        
        $.ajax({
            url: config.apiUrl + '/p2p/fpm_instances/add',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                fpmid: fpmid,
                name: name,
                fields: fields
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                window.fpmiAS.reset();
                $('#modal-add').modal('hide');
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    });
});

function removeFpmInsta(fpminstaid) {
    $.ajax({
        url: config.apiUrl + '/p2p/fpm_instances/remove',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            fpminstaid: fpminstaid
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            window.fpmiAS.reset();
        } else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });
}

function removeFpmInstaPrompt(fpminstaid) {
    $('#mcr-submit').unbind('click').click(function() {
        removeFpmInsta(fpminstaid);
    });
    
    $('#modal-confirm-remove').modal('show');
}

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
                    vv = nl2br(vv);
                    
	                fieldsInnerHtml += `
	                    <div class="col-12 pb-2">
		                    <h5 class="secondary">
		                        ${data.fpms[v.fpmid].struct[kk]}:
		                    </h5>
		                    ${vv}
		                </div>
	                `;
	            });
            
                thisAS.append(`
                    <div class="row p-2 fpmi-item hoverable separate">
                        <div class="col-10 col-lg-11">
                            <div class="row">
				                <div class="col-auto col-lg-3 my-auto my-lg-0">
					                <h4>${v.name}</h4>
				                </div>
				                <div class="col-auto col-lg-3 my-auto my-lg-0">
				                    <img width="24px" height="24px" src="${data.fpms[v.fpmid].icon_url}">
					                ${data.fpms[v.fpmid].name}
				                </div>
				                <div class="col-12 col-lg-6 pt-2 pt-lg-0">
					                <div class="row">
						                ${fieldsInnerHtml}
					                </div>
				                </div>
				            </div>
				        </div>
				        <div class="col-2 col-lg-1 my-auto text-center">
				            <a class="nav-link" href="#_" onClick="removeFpmInstaPrompt(${k})">
			                    <i class="fa-solid fa-trash-can fa-lg"></i>
			                </a>
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
    
    initSelectFpm(null, false);
});