function updateOfferActive(offerid) {
    var checkbox = $('.my-offer-item[data-offerid="' + offerid + '"] .active-checkbox');
    
    $.ajax({
        url: config.apiUrl + '/p2p/my_offers/update',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            offer: offerid,
            active: checkbox.prop('checked')
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(!data.success) {
            msgBox(data.error);
        }
        window.p2pMyOffersAS.reset();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
        window.p2pMyOffersAS.reset(); 
    });
}

function renderMyOffer(offer, fpms) {
	var color = 'text-green';
    if(offer.side == 'SELL') color = 'text-red';
    
    var fpmsHtml = '';
                
    $.each(offer.fpms, function(x, fpmid) {
        fpmsHtml += `
            <img width="16px" height="16px" src="${fpms[fpmid].icon_url}">
        `;
    });
    
    var filledPerc = Math.round(offer.crypto_filled / offer.crypto_total * 100);

    return `
        <div class="my-offer-item separate row flex-nowrap px-1 py-3 hoverable" data-offerid="${offer.offerid}">
            <div class="col-2 pe-0 my-auto text-center">
               
                <div class="pretty p-switch p-bigger">
                    <input type="checkbox" checked="${offer.active}" class="active-checkbox" id="active-checkbox-${offer.offerid}"
                     onChange="updateOfferActive(${offer.offerid})">
                    <div class="state p-primary">
                        <label for="active-checkbox-${offer.offerid}">
                        </label>
                    </div>
                </div>
               
            </div>
            <div class="col-8 pe-0">
                <div class="row">
                    <div class="col-auto small">
                        <span class="${color}">${offer.side}</span>
                        ${offer.assetid}
                    </div>
                    
                    <div class="col-auto ms-auto">
                        ${fpmsHtml}
                    </div>
                    
                    <div class="col-12 small">
                        <span class="secondary">Price:</span>
                        ${offer.price} ${offer.fiatid}
                    </div>
                    
                    <div class="col-12 pt-3 small">
                        <div class="progress" style="height: 3px;">
                            <div class="progress-bar" role="progressbar" style="width: ${filledPerc}%">
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-12 small text-center pt-1">
                        <span class="secondary">Filled:</span>
                        ${offer.crypto_filled}
                        <span class="secondary">/</span>
                        ${offer.crypto_total}
                        <span class="secondary">${offer.assetid}</span>
                    </div>
                    
                </div>
            </div>
                            
			<div class="col-2 ps-0 my-auto text-center secondary">
			    <a class="nav-link" href="/p2p/update_offer/${offer.offerid}">
                    <i class="fa-solid fa-sliders fa-lg"></i>
                </a>
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
                    thisAS.append(renderMyOffer(v, data.fpms));
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