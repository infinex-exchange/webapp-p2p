<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../inc/head.php'); ?>
        <?php include(__DIR__.'/imports/rateit.html'); ?>
        <link rel="stylesheet" href="/p2p/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../js/ajax_scroll.js'); ?>"></script>
        <title>Create offer | Infinex P2P</title>
    </head>
    <body>
    
        <?php include('../../inc/body.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 container-rest p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 ui-card ui-column">
        <div class="row">
        <div class="col-12 col-lg-8">
            
            <div class="row">
                <h3>Create offer</h3>
            </div>
            
            <div class="row mb-0 mb-lg-5">
                <div class="col-6 col-lg-2 mt-4 mt-lg-auto pe-1">
                    <input type="radio" class="btn-check" name="side" id="side-buy" value="BUY" autocomplete="off" checked>
                    <label class="btn w-100 small btn-outline-green px-4" for="side-buy">Buy</label>
                </div>
                <div class="col-6 col-lg-2 mt-4 mt-lg-auto ps-1">
                    <input type="radio" class="btn-check" name="side" id="side-sell" value="SELL" autocomplete="off">
                    <label class="btn w-100 small btn-outline-red px-4" for="side-sell">Sell</label>
                </div>
                
                <div class="col-12 col-lg-4 mt-4 mt-lg-0 px-lg-1">
                    <div class="row">
                        <div class="col-12 pb-1">
                            <h5 class="secondary">Coin:</h5>
                        </div>
                        <div class="col-12">
                            <?php include(__DIR__.'/../../templates/select_coin.php'); ?>
                        </div>
                    </div>
                </div>
                
                <div class="col-12 col-lg-4 mt-4 mt-lg-0 px-lg-1">
                    <div class="row">
                        <div class="col-12 pb-1">
                            <h5 class="secondary">Fiat:</h5>
                        </div>
                        <div class="col-12">
                            <?php include(__DIR__.'/templates/select_fiat.php'); ?>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row mt-4 mt-lg-5">
                <div class="col-12 pb-1">
                    <h5 class="secondary">Price:</h6>
                </div>
                <div class="col-12 col-lg-6">
                    <div class="input-ps-group">
                        <input id="price" type="text" class="form-control step2-ro" data-tsval="" data-rval="" readonly>
                        <span class="suffix fiatid"></span>
                    </div>
                </div>
            </div>
            
            <div class="row mt-4 mt-lg-5">
                <div class="col-12 pb-1">
                    <h5 class="secondary">Crypto amount:</h6>
                </div>
                <div class="col-12 col-lg-6">
                    <div class="input-ps-group">
                        <input id="amount-crypto" type="text" class="form-control step2-ro" data-tsval="" data-rval="" readonly>
                        <span class="suffix assetid"></span>
                    </div>
                </div>
                <div id="sell-balance-wrapper" class="col-12 col-lg-6 d-none my-auto small secondary">
                    Available:
                    <span id="sell-balance"></span>
                    <span class="assetid"></span>
                </div>
            </div>
            
            <div class="row mt-4 mt-lg-5">
                <div class="col-12 pb-1">
                    <h5 class="secondary">Single transaction limits:</h6>
                </div>
                <div class="col-12 col-lg-6">
                    <div class="row">
                        <div class="col-5 pe-0">
                            <div class="input-ps-group">
                                <input id="fiat-min" type="text" class="form-control step2-ro" data-tsval="" data-rval="" readonly>
                                <span class="suffix fiatid"></span>
                            </div>
                        </div>
                        <div class="col-1 my-auto text-center p-0">
                            <strong>-</strong>
                        </div>
                        <div class="col-6 ps-0">
                            <div class="input-ps-group">
                                <input id="fiat-max" type="text" class="form-control step2-ro" data-tsval="" data-rval="" readonly>
                                <span class="suffix fiatid"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row mt-4 mt-lg-5">
                <div class="col-12 pb-1">
                    <h5 class="secondary">Payment methods:</h5>
                </div>
                
                <div class="col-12 ui-card-light mx-2 p-2">
                    <div class="row" id="payment-methods-empty">
                        <div class="col-12 text-center">
                            <strong class="secondary">No payment methods</strong>
                        </div>
                    </div>
                    <div class="row px-2" id="payment-methods-data">
                    </div>
                </div>
                
                <div class="col-2 col-lg-1 pt-1 my-auto">
                    <h6 class="secondary">Add:</h6>
                </div>
                
                <div id="select-fpm-wrapper" class="col-10 col-lg-5 pt-1">
                    <?php include(__DIR__.'/templates/select_fpm.php'); ?>
                </div>
                
                <div id="select-fpminsta-wrapper" class="col-10 col-lg-5 pt-1 d-none">
                    <?php include(__DIR__.'/templates/select_fpminsta.php'); ?>
                </div>
            </div>
            
            <div class="row mt-4 mt-lg-5">
                <div class="col-12 pb-1">
                    <h5 class="secondary">Payment time window:</h5>
                </div>
                
                <div class="col-12 col-lg-6">
                    <input id="time-window-raw" type="range" class="form-range" min="0" max="11" step="1" value="5">
                </div>
                
                <div class="col-6 d-none d-lg-block"></div>
                
                <div class="col-12 col-lg-6 text-center">
                    <span class="small secondary" id="time-window-desc"></span>
                </div>
            </div>
            
            <div class="row mt-4 mt-lg-5">
                <div class="col-12 pb-1">
                    <h5 class="secondary">Additional safety options:</h5>
                </div>
            </div>
            
            <div class="row mt-2">            
                <div class="col-12 col-lg-auto my-auto">
                    <div class="pretty p-switch">
                        <input type="checkbox" id="sec-min-rating-cbx">
                        <div class="state p-primary">
                            <label for="withdraw-save">Minimal user rating</label>
                        </div>
                    </div>
                </div>
                
                <div class="d-none col-12 col-lg-auto my-auto" id="sec-min-rating-expand">
                    <div class="rateit_" data-rateit-resetable="false" style="font-size: 40px"></div>
                </div>
            </div>
            
            <div class="row mt-4 mt-lg-5">
                <div class="col-12 col-lg-6">
                    <button id="submit" type="submit" class="btn btn-primary w-100">Create offer</button>
                </div>
            </div>
        
        <!-- / Main column -->
        </div>
        </div>
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/p2p/js/create_offer.js?<?php echo filemtime(__DIR__.'/js/create_offer.js'); ?>"></script>
        
        <?php include('templates/mobile_navbar.php'); ?>
    
    </body>
</html>
