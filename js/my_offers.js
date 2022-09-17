function renderMyOffer(offer) {
	var color = 'text-green';
    if(offer.side == 'SELL') color = 'text-red';

    return `
        <div class="my-order-item separate row flex-nowrap px-1 py-2 hoverable">
            <div class="col-2 pe-0 my-auto text-center">
               
                <div class="pretty p-switch p-bigger">
                    <input type="checkbox" class="active-checkbox" id="active-checkbox-${offer.offerid}">
                    <div class="state p-primary">
                        <label for="active-checkbox-${offer.offerid}">
                        </label>
                    </div>
                </div>
               
            </div>
            <div class="col-8 pe-0">
                <div class="row">
                    <div class="col-12 small">
                        <span class="${color}">${offer.side}</span>
                        ${offer.assetid}
                    </div>
                    
                    <div class="col-12 pt-2 small">
                        <div class="progress" style="height: 3px;">
                            <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25"
                                 aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-12 small text-center pt-1">
                        10
                        <span class="secondary">/</span>
                        20
                    </div>
                    
                </div>
            </div>
                            
			<div class="col-2 ps-0 my-auto text-center secondary">
			    <i class="fa-solid fa-sliders fa-lg"></i>
			</div>
        </div>
    `;
}

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        window.p2pMyOffersAS = new AjaxScroll(
            $('#my-offers-data'),
            $('#my-offers-data-preloader'),
            {
                api_key: window.apiKey
            },
            function() {
                this.data.offset = this.offset;
                var thisAS = this;
                
            //---
        $.ajax({
            url: config.apiUrl + '/p2p/my_offers',
            type: 'POST',
            data: JSON.stringify(thisAS.data),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                $.each(data.offers, function(k, v) {
                    thisAS.append(renderMyOffer(v));
                });
                
                thisAS.done();
                
                if(thisAS.data.offset == 0)
                    $(document).trigger('renderingStage');
                
                if(data.offers.length != 50)
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
            true
        );   
    }
});