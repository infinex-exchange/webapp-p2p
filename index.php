<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../../templates/head.php'); ?>
        <?php include(__DIR__.'/../../imports/bignumber.html'); ?>
        <?php include(__DIR__.'/imports/rateit.html'); ?>
        <link rel="stylesheet" href="/p2p/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../js/ajax_scroll.js'); ?>"></script>
        <title>Vayamos P2P</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include(__DIR__.'/../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <div id="main-navbar">
            <?php include(__DIR__.'/../../templates/navbar.php'); ?>
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
                <li class="nav-item user-only">
                    <a class="nav-link" href="/p2p/settings">
                        <i class="fa-solid fa-gear"></i><br>
                        P2P settings
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
                    <label class="btn w-100 small btn-outline-green px-4" for="side-buy">Buy</label>
                </div>
                <div class="col-3 col-lg-1 mt-auto pb-2 px-1">
                    <input type="radio" class="btn-check" name="side" id="side-sell" value="SELL" autocomplete="off">
                    <label class="btn w-100 small btn-outline-red px-4" for="side-sell">Sell</label>
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
            
            <div class="row p-2 secondary d-none d-lg-flex scrollable">
                <div style="width: 20%">
                    <h5>User</h5>
                </div>
                <div class="text-end" style="width: 20%">
                    <h5>Price</h5>
                </div>
                <div class="text-end" style="width: 23%">
                    <h5>Available</h5>
                </div>
                <div style="width: 23%">
                    <h5>Payment methods</h5>
                </div>
                <div style="width: 14%">
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
            
                <div id="transactions-data" class="scrollable d-flex">
                    <div class="guest-only small m-auto">
                        <a class="link-ultra" href="#_" onClick="gotoLogin()">Log In</a> or <a class="link-ultra" href="/account/register">Register</a> to trade
                    </div>
                </div>
            </div>
            
            <div id="my-offers" class="col-12 ui-card ui-card-ver d-lg-block half-column-height sm-rest-of-height" data-ui-card="my-offers">
                <div id="my-offers-header" class="row p-2">
                    <h3>My offers</h3>
                </div>
            
                <div id="my-offers-data" class="scrollable d-flex">
                    <div class="guest-only small m-auto">
                        <a class="link-ultra" href="#_" onClick="gotoLogin()">Log In</a> or <a class="link-ultra" href="/account/register">Register</a> to trade
                    </div>   
                </div>
                
                <div id="my-offers-footer" class="row user-only">
                    <div class="col-12 col-lg-6">
                        <a href="/p2p/create_offer" class="btn btn-primary btn-sm w-100">
                            <i class="fa-solid fa-plus"></i>
                            Create offer
                        </a>
                    </div>
                    <div class="col-6 d-none d-lg-block">
                        <a href="/p2p/settings" class="btn btn-primary btn-sm w-100">
                            <i class="fa-solid fa-gear"></i>
                            P2P settings
                        </a>
                    </div>
                </div>
            </div>
        
        <!-- / Right column -->
        </div>
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-take">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="ps-1 modal-title mt-title"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div class="modal-body">
                    
                        <div class="row">
                            <div class="col-12">
                                <h5 data-side="BUY">I want to buy:</h5>
                                <h5 data-side="SELL">I want to sell:</h5>
                            </div>
                            <div class="col-12 pt-1">
                                <div class="input-ps-group">
                                    <input id="mt-amount-crypto" type="text" class="form-control" data-tsval="" data-rval="">
                                    <span class="suffix mt-assetid"></span>
                                </div>
                            </div>
                            <div class="col-12 pt-1">
                                <div data-side="SELL">
                                    <span class="secondary">Your balance:</span>
                                    <div class="d-inline float-end">
                                        <span id="mt-crypto-balance"></span>
                                        <span class="mt-assetid"></span>
                                    </div>
                                </div>
                                <span class="secondary">Available:</span>
                                <div class="d-inline float-end">
                                    <span id="mt-crypto-avbl"></span>
                                    <span class="mt-assetid"></span>
                                </div>
                            </div>

                            <div class="col-12 pt-3">
                                <h5 data-side="BUY">I will pay:</h5>
                                <h5 data-side="SELL">I will receive:</h5>
                            </div>
                            <div class="col-12 pt-1">
                                <div class="input-ps-group">
                                    <input id="mt-amount-fiat" type="text" class="form-control" data-tsval="" data-rval="">
                                    <span class="suffix mt-fiatid"></span>
                                </div>
                            </div>
                            <div class="col-12 pt-1">
                                <span class="secondary">Min:</span>
                                <div class="d-inline float-end">
                                    <span id="mt-fiat-min"></span>
                                    <span class="mt-fiatid"></span>
                                </div>
                                <br>
                                <span class="secondary">Max:</span>
                                <div class="d-inline float-end">
                                    <span id="mt-fiat-max"></span>
                                    <span class="mt-fiatid"></span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row" data-side="SELL">
                            <div class="col-12 pt-3">
                                <h5>Payment method:</h5>
                            </div>
                            <div class="col-12 pt-1">
                                <?php include(__DIR__.'/templates/select_fpminsta.php'); ?>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <a href="#" id="mt-submit" class="mt-title btn btn-primary"></a>
                    </div>
                </div>
            </div>
        </div>
        
        <script type="text/javascript" src="/p2p/js/js_sizing.js?<?php echo filemtime(__DIR__.'/js/js_sizing.js'); ?>"></script>
        <script src="/p2p/js/offers.js?<?php echo filemtime(__DIR__.'/js/offers.js'); ?>"></script>
        <script src="/p2p/js/transactions.js?<?php echo filemtime(__DIR__.'/js/transactions.js'); ?>"></script>
        <script src="/p2p/js/my_offers.js?<?php echo filemtime(__DIR__.'/js/my_offers.js'); ?>"></script>
        <script src="/p2p/js/modal_take.js?<?php echo filemtime(__DIR__.'/js/modal_take.js'); ?>"></script>
        
        <?php include('../../templates/modals.php'); ?>
    
    </body>
</html>
