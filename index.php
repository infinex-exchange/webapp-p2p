<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../templates/head.php'); ?>
        <link rel="stylesheet" href="/p2p/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../js/ajax_scroll.js'); ?>"></script>
        <title>Vayamos P2P</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <div id="main-navbar">
            <?php include('../../templates/navbar.php'); ?>
        </div>
        
        <!-- Mobile navbar -->
        <nav id="mobile-navbar" class="navbar fixed-bottom navbar-expand navbar-mobile d-flex d-lg-none py-0 small">
            <ul class="navbar-nav mx-auto text-center">
                <li class="nav-item">
                    <a class="nav-link" href="/">
                        <i class="fas fa-home"></i><br>
                        Home
                    </a>
                </li>
            </ul>
            <ul class="navbar-nav mx-auto text-center">
                <li class="nav-item">
                    <a class="nav-link active" href="#_" data-ui-card-target="trade">
                        <i class="fa-solid fa-right-left"></i></i><br>
                        Trade
                    </a>
                </li>
                <li class="nav-item"">
                    <a class="nav-link" href="#_" data-ui-card-target="recent-trades">
                        <i class="fa-solid fa-clock-rotate-left"></i><br>
                        History
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#_" data-ui-card-target="my-offers">
                        <i class="fa-solid fa-address-card"></i><br>
                        My offers
                    </a>
                </li>
            </ul>
        </nav>
        
        <!-- Root container -->
        <div class="container-fluid container-1500 p-0">
        <div class="row m-0">
        
        <!-- Main column -->
        <div class="col-12 col-lg-9 p-0 ui-column">
        <div class="row m-0">
        <div id="trade" class="col-12 ui-card ui-card-ver d-lg-block column-height sm-rest-of-height" data-ui-card="trade">
            
            <div id="trade-header">
            
            <div class="row pb-3 pe-2 pe-lg-0">
                <div class="col-3 col-lg-1 mt-auto pb-2 px-1">
                    <input type="radio" class="btn-check" name="side" id="side-buy" value="BUY" autocomplete="off" checked>
                    <label class="btn w-100 small btn-outline-success px-4" for="side-buy">Buy</label>
                </div>
                <div class="col-3 col-lg-1 mt-auto pb-2 px-1">
                    <input type="radio" class="btn-check" name="side" id="side-sell" value="SELL" autocomplete="off">
                    <label class="btn w-100 small btn-outline-danger px-4" for="side-sell">Sell</label>
                </div>
                
                <div class="col-6 col-lg-3 my-auto pb-2 px-1">
                    <div class="row">
                        <div class="col-12 pb-1">
                            <h6 class="secondary">Coin:</h6>
                        </div>
                        <div class="col-12">
                            <?php include(__DIR__.'/../../templates/select_coin.php'); ?>
                        </div>
                    </div>
                </div>
                
                <div class="col-6 col-lg-3 my-auto pb-2 px-1">
                    <div class="row">
                        <div class="col-12 pb-1">
                            <h6 class="secondary">Fiat:</h6>
                        </div>
                        <div class="col-12">
                            <?php include(__DIR__.'/templates/select_fiat.php'); ?>
                        </div>
                    </div>
                </div>
                
                <div class="col-6 col-lg-4 my-auto pb-2 px-1">
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
            
            </div>
            
            <div id="trade-data" class="scrollable">
            </div>
        
        <!-- / Main column -->
        </div>
        </div>
        </div>
        
        <!-- Right column -->
        <div class="col-12 col-lg-3 p-0 ui-column">
        <div class="row m-0">
            
            <div id="recent-trades" class="col-12 ui-card ui-card-ver d-lg-block half-column-height sm-rest-of-height" data-ui-card="recent-trades">
                <div id="recent-trades-header" class="row p-2">
                    <h3>Recent P2P trades</h3>
                </div>
            
                <div id="recent-trades-data" class="scrollable small d-flex">
                    <div class="guest-only m-auto">
                        <a class="link-ultra" href="#_" onClick="gotoLogin()">Log In</a> or <a class="link-ultra" href="/account/register">Register</a> to trade
                    </div>
                </div>
            </div>
            
            <div id="my-offers" class="col-12 ui-card ui-card-ver d-lg-block half-column-height sm-rest-of-height" data-ui-card="my-offers">
                <div id="my-offers-header" class="row p-2">
                    <h3>My offers</h3>
                </div>
            
                <div id="my-offers-data" class="scrollable small d-flex">
                    <div class="guest-only m-auto">
                        <a class="link-ultra" href="#_" onClick="gotoLogin()">Log In</a> or <a class="link-ultra" href="/account/register">Register</a> to trade
                    </div>   
                </div>
            </div>
        
        <!-- / Right column -->
        </div>
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script type="text/javascript" src="/p2p/js/js_sizing.js?<?php echo filemtime(__DIR__.'/js/js_sizing.js'); ?>"></script>
        <script src="/p2p/js/index.js?<?php echo filemtime(__DIR__.'/js/index.js'); ?>"></script>
        
        <?php include('../../templates/modals.php'); ?>
    
    </body>
</html>
