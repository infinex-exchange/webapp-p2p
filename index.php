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
            
            <form>
            <div class="row p-2 flex-nowrap">
                <div class="col-auto my-auto px-1">
                    <a href="/wallet/deposit" class="btn btn-primary btn-sm">Deposit</a>
                    <a href="/wallet/withdraw" class="btn btn-primary btn-sm">Withdraw</a>
                    <a href="/wallet/transfer" class="btn btn-primary btn-sm">Transfer</a>
                </div>
                
                <div class="col-auto my-auto px-1">
                    <input id="asset-search" type="text" size="7" placeholder="Search" class="form-control input-search">
                </div>
                
                <div class="col-auto my-auto px-1">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="asset-hide-zero">
                        <label class="form-check-label" for="asset-hide-zero">
                            Hide zero
                        </label>
                    </div>
                </div>
            </div>
            </form>
            
            <div class="row p-2 secondary d-none d-lg-flex">
                <div style="width: 60px">
                </div>
                <div style="width: calc(20% - 60px)">
                <h5>Token</h5>
                </div>
                <div class="text-end" style="width: 19%">
                <h5>Total</h5>
                </div>
                <div class="text-end" style="width: 19%">
                <h5>Available</h5>
                </div>
                <div class="text-end" style="width: 18%">
                <h5>Locked</h5>
                </div>
                <div style="width: 24%">
                <h5>Action</h5>
                </div>
            </div>
            
            <div id="asset-data">
            </div>
        
        <!-- / Main column -->
        </div>
        
        <!-- Right column -->
        <div class="col-12 col-lg-3 p-0 ui-card ui-column d-none d-lg-block">
        
            <div class="row p-2">
                <h3>Recent P2P trades</h3>
            </div>
            
            <div id="recent-tx-data">
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
