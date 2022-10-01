<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../../templates/head.php'); ?>
        <link rel="stylesheet" href="/p2p/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <title>Settings | Vayamos P2P</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../../templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 container-rest p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 col-lg-8 ui-card ui-column">
            
            <div class="row pb-2">
                <h3>Create offer</h3>
            </div>
            
            <div class="row">
                <div class="col-6 col-lg-2 mt-auto pb-2 px-1">
                    <input type="radio" class="btn-check" name="side" id="side-buy" value="BUY" autocomplete="off" checked>
                    <label class="btn w-100 small btn-outline-green px-4" for="side-buy">Buy</label>
                </div>
                <div class="col-6 col-lg-2 mt-auto pb-2 px-1">
                    <input type="radio" class="btn-check" name="side" id="side-sell" value="SELL" autocomplete="off">
                    <label class="btn w-100 small btn-outline-red px-4" for="side-sell">Sell</label>
                </div>
                
                <div class="col-12 col-lg-4 my-auto pb-2 px-1">
                    <div class="row">
                        <div class="col-12 pb-1">
                            <h6 class="secondary">Coin:</h6>
                        </div>
                        <div class="col-12">
                            <?php include(__DIR__.'/../../templates/select_coin.php'); ?>
                        </div>
                    </div>
                </div>
                
                <div class="col-12 col-lg-4 my-auto pb-2 px-1">
                    <div class="row">
                        <div class="col-12 pb-1">
                            <h6 class="secondary">Fiat:</h6>
                        </div>
                        <div class="col-12">
                            <?php include(__DIR__.'/templates/select_fiat.php'); ?>
                        </div>
                    </div>
                </div>
                
                <div class="col-12 col-lg-6 my-auto pb-2 px-1">
                    <div class="row">
                        <div class="col-12 pb-1">
                            <h6 class="secondary">How much crypto?</h6>
                        </div>
                        <div class="col-12">
                            <div class="input-ps-group">
                                <input id="amount-crypto" type="text" class="form-control" data-tsval="" data-rval="">
                                <span class="suffix assetid"></span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-12 col-lg-6 my-auto pb-2 px-1">
                    <div class="row">
                        <div class="col-12 pb-1">
                            <h6 class="secondary">Single transaction limits:</h6>
                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-12 col-lg-5">
                                    <div class="input-ps-group">
                                        <input id="amount-fiat" type="text" class="form-control" data-tsval="" data-rval="">
                                        <span class="suffix fiatid"></span>
                                    </div>
                                </div>
                                <div class="col-1 my-auto text-center">
                                    <strong>-</strong>
                                </div>
                                <div class="col-12 col-lg-6">
                                    <div class="input-ps-group">
                                        <input id="amount-fiat" type="text" class="form-control" data-tsval="" data-rval="">
                                        <span class="suffix fiatid"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row pt-3">
                <h5 class="secondary">Payment methods:</h5>
            </div>
            
            <div class="row pt-1" id="payment-methods-data">
            </div>
            
            <div class="row pt-1">
                <div class="col-12 col-lg-auto">
                    <button type="button" class="btn btn-primary btn-sm">
                        <i class="fa-solid fa-plus"></i>
                        Add
                    </button>
                </div>
            </div>
        
        <!-- / Main column -->
        </div>
        
        <!-- Right column -->
        <div class="d-none d-lg-block col-4 ui-card ui-column">
            
            <div class="row">
                <h3>Info</h3>
            </div>
        
        <!-- / Right column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/p2p/js/create_offer.js?<?php echo filemtime(__DIR__.'/js/create_offer.js'); ?>"></script>
        
        <?php include('../../templates/modals.php'); ?>
        <?php include('templates/mobile_navbar.php'); ?>
    
    </body>
</html>
