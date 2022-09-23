<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../../templates/head.php'); ?>
        <?php include(__DIR__.'/../../imports/bignumber.html'); ?>
        <?php include(__DIR__.'/imports/rateit.html'); ?>
        <link rel="stylesheet" href="/p2p/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
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
                    <a class="nav-link" href="/p2p">
                        <i class="fa-solid fa-arrow-left"></i><br>
                        Back
                    </a>
                </li>
            </ul>
            <ul class="navbar-nav mx-auto text-center">
                <li class="nav-item">
                    <a class="nav-link active" href="#_" data-ui-card-target="transaction">
                        <i class="fa-solid fa-file-invoice-dollar"></i><br>
                        Transaction
                    </a>
                </li>
                <li class="nav-item"">
                    <a class="nav-link" href="#_" data-ui-card-target="chat">
                        <i class="fa-solid fa-comments"></i><br>
                        Chat
                    </a>
                </li>
            </ul>
        </nav>
        
        <!-- Root container -->
        <div id="root" class="user-only container-fluid container-1500 p-0">
        <div class="row m-0">
        
        <!-- Main column -->
        <div class="col-12 col-lg-8 p-0 ui-column">
        <div class="row m-0">
        <div class="col-12 ui-card ui-card-ver d-lg-block column-height sm-rest-of-height" data-ui-card="transaction">
            
        <div class="row p-2">
            <h3 class="transaction-header"></h3>
        </div>
        
        <div class="row p-2">
            <div class="col-6 col-lg-2">
                Fiat amount:
            </div>
            
            <div class="col-6 col-lg-2">
                <span class="amount-fiat"></span>
                <span class="fiatid"></span>
            </div>
            
            <div class="col-6 col-lg-2">
                Price:
            </div>
            
            <div class="col-6 col-lg-2">
                <span class="price"></span>
                <span class="fiatid"></span>
            </div>
            
            <div class="col-6 col-lg-2">
                Crypto amount:
            </div>
            
            <div class="col-6 col-lg-2">
                <span class="amount-crypto"></span>
                <span class="assetid"></span>
            </div>
        </div>  
        
        <!-- / Main column -->
        </div>
        </div>
        </div>
        
        <!-- Right column -->
        <div class="col-12 col-lg-4 p-0 ui-column">
        <div class="row m-0">
        <div id="chat" class="col-12 p-0 ui-card ui-card-ver d-lg-block column-height sm-rest-of-height" data-ui-card="chat">

        <div id="chat-header" class="row p-2">
            <h3>Chat</h3>
        </div>
        
        <!-- / Right column -->
        </div>
        </div>
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
    
        <script src="/p2p/js/js_sizing.js?<?php echo filemtime(__DIR__.'/js/js_sizing.js'); ?>"></script>
        <script src="/p2p/js/transaction.js?<?php echo filemtime(__DIR__.'/js/transaction.js'); ?>"></script>
        
        <?php include('../../templates/modals.php'); ?>
    
    </body>
</html>
