<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../templates/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../js/ajax_scroll.js'); ?>"></script>
        <title>Vayamos P2P</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../../templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 col-lg-9 p-0 ui-card ui-column">
            
            <div class="row pb-4 pe-2 pe-lg-0">
                <div class="col-6 col-lg-auto mt-auto pb-2 pb-lg-0 px-1">
                    <div class="row">
                        <div class="col-6 p-0">
                            <input type="radio" class="btn-check" name="side" id="side-buy" autocomplete="off" checked>
                            <label class="btn w-100 small btn-outline-success px-4" for="side-buy">Buy</label>
                        </div>
                        <div class="col-6 p-0">
                            <input type="radio" class="btn-check" name="side" id="side-sell" autocomplete="off">
                            <label class="btn w-100 small btn-outline-danger px-4" for="side-sell">Sell</label>
                        </div>
                    </div>
                </div>
                
                <div class="col-6 col-lg-auto my-auto pb-2 pb-lg-0 px-1">
                    <div class="row">
                        <div class="col-12 pb-1">
                            <h6 class="secondary">Coin:</h6>
                        </div>
                        <div class="col-12">
                            <?php include(__DIR__.'/../../templates/select_coin.php'); ?>
                        </div>
                    </div>
                </div>
                
                <div class="col-6 col-lg-auto my-auto px-1">
                    <div class="row">
                        <div class="col-12 pb-1">
                            <h6 class="secondary">Fiat:</h6>
                        </div>
                        <div class="col-12">
                            <?php include(__DIR__.'/templates/select_fiat.php'); ?>
                        </div>
                    </div>
                </div>
                
                <div class="col-6 col-lg-auto my-auto px-1">
                    <div class="row">
                        <div class="col-12 pb-1">
                            <h6 class="secondary">Payment method:</h6>
                        </div>
                        <div class="col-12">
                            <?php include(__DIR__.'/templates/select_fpm.php'); ?>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row p-2 secondary d-none d-lg-flex">
                <div style="width: 20%">
                    <h5>User</h5>
                </div>
                <div class="text-end" style="width: 20%">
                    <h5>Price</h5>
                </div>
                <div class="text-end" style="width: 20%">
                    <h5>Available</h5>
                </div>
                <div class="text-end" style="width: 20%">
                    <h5>Payment methods</h5>
                </div>
                <div style="width: 20%">
                    <h5>Trade</h5>
                </div>
            </div>
            
            <div id="offers-data">
            </div>
        
        <!-- / Main column -->
        </div>
        
        <!-- Right column -->
        <div class="col-12 col-lg-3 p-0 ui-card ui-column d-none d-lg-block">
        
            <div class="row p-2">
                <h3>Recent P2P trades</h3>
            </div>
            
            <div id="recent-trades-data">
            </div>
        
        <!-- / Right column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/p2p/js/index.js?<?php echo filemtime(__DIR__.'/js/index.js'); ?>"></script>
        
        <?php include('../../templates/modals.php'); ?>
        <?php include('../../templates/vanilla_mobile_nav.php'); ?>
    
    </body>
</html>
