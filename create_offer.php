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
        <div class="col-12 col-lg-8 p-0 ui-card ui-column">
            
            <div class="row">
                <h3>Create offer</h3>
            </div>
            
            <div class="row pt-3">
                <h5 class="secondary">Side:</h5>
            </div>
            
            <div class="row pt-1">
                <div class="col-6 col-lg-2 pe-1">
                    <input type="radio" class="btn-check" name="side" id="side-buy" value="BUY" autocomplete="off" checked>
                    <label class="btn w-100 small btn-outline-green px-4" for="side-buy">Buy</label>
                </div>
                <div class="col-6 col-lg-2 ps-1">
                    <input type="radio" class="btn-check" name="side" id="side-sell" value="SELL" autocomplete="off">
                    <label class="btn w-100 small btn-outline-red px-4" for="side-sell">Sell</label>
                </div>
            </div>
            
            <div class="pt-3">
                <h5 class="secondary">Select coin:</h5>
            </div>
            
            <div class="row pt-1">
                <div class="col-12 col-lg-6">
                    <?php include(__DIR__.'/../../templates/select_coin.php'); ?>
                </div>
            </div>
            
            <div class="pt-3">
                <h5 class="secondary">Select fiat:</h5>
            </div>
            
            <div class="row pt-1">
                <div class="col-12 col-lg-6">
                    <?php include(__DIR__.'/templates/select_fiat.php'); ?>
                </div>
            </div>
            
            <div class="row pt-3">
                <h5 class="secondary">Crypto amount:</h5>
            </div>
            
            <div class="row pt-1">
                <div class="col-12 col-lg-6">
                    <div class="input-ps-group">
                        <input id="amount-crypto" type="text" class="form-control" data-tsval="" data-rval="">
                        <span class="suffix assetid"></span>
                    </div>
                </div>
            </div>
            
            <div class="row pt-3">
                <h5 class="secondary">Fiat transaction limits:</h5>
            </div>
            
            <div class="row pt-1">
                <div class="col-12 col-lg-3">
                    <div class="input-ps-group">
                        <span class="prefix d-lg-none">&gt;</span>
                        <input id="amount-fiat" type="text" class="form-control" data-tsval="" data-rval="">
                        <span class="suffix fiatid"></span>
                    </div>
                </div>
                <div class="d-none d-lg-block col-auto">
                    <strong>-</strong>
                </div>
                <div class="col-12 col-lg-3">
                    <div class="input-ps-group">
                        <span class="prefix d-lg-none">&lt;</span>
                        <input id="amount-fiat" type="text" class="form-control" data-tsval="" data-rval="">
                        <span class="suffix fiatid"></span>
                    </div>
                </div>
            </div>
        
        <!-- / Main column -->
        </div>
        
        <!-- Right column -->
        <div class="d-none d-lg-block col-4 p-0 ui-card ui-column">
            
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
