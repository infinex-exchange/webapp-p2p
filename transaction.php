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
            
        <div class="row">
            <h3 class="transaction-header"></h3>
        </div>
        
        <div class="row py-2">
            <div class="col-6 col-lg-2 order-1 order-lg-1 secondary my-auto">
                Fiat amount:
            </div>
            
            <div class="col-6 col-lg-2 order-3 order-lg-2 secondary my-auto">
                Price:
            </div>
            
            <div class="col-6 col-lg-2 order-5 order-lg-3 secondary my-auto">
                Crypto amount:
            </div>
            
            <div class="col-6 d-none d-lg-block order-lg-4"></div>
            
            <div class="col-6 col-lg-2 text-end text-lg-start order-2 order-lg-5 my-auto">
                <strong class="big amount-fiat"></strong>
                <strong class="big fiatid"></strong>
            </div>
            
            <div class="col-6 col-lg-2 text-end text-lg-start order-4 order-lg-6 my-auto">
                <span class="price"></span>
                <span class="fiatid"></span>
            </div>
            
            <div class="col-6 col-lg-2 text-end text-lg-start order-6 order-lg-7 my-auto">
                <span class="amount-crypto"></span>
                <span class="assetid"></span>
            </div>
        </div>
        
        <div class="row py-2">
            <div class="col-12">
                <div class="status alert alert-primary d-flex align-items-center m-0 py-2" role="alert" data-status="PENDING" data-side="BUY">
                    <div class="px-2">
                        <i class="fa-solid fa-money-bill-transfer fa-2x"></i>
                    </div>
                    <div class="px-2">
                        <strong>Please make a payment</strong>
                        <br>
                        Make a transfer using one of the payment methods offered by the seller.
                        <br>
                        Then confirm that the payment has been made using the button below.
                    </div>
                </div>
                <div class="status alert alert-secondary d-flex align-items-center m-0 py-2" role="alert" data-status="PENDING" data-side="SELL">
                    <div class="px-2">
                        <i class="fa-solid fa-clock fa-2x"></i>
                    </div>
                    <div class="px-2">
                        <strong>Waiting for the payment</strong>
                        <br>
                        We will inform you when the buyer completes the transfer and marks the payment as complete.
                    </div>
                </div>
                
                <div class="status alert alert-secondary d-flex align-items-center m-0 py-2" role="alert" data-status="PAID" data-side="BUY">
                    <div class="px-2">
                        <i class="fa-solid fa-clock fa-2x"></i>
                    </div>
                    <div class="px-2">
                        <strong>Waiting for confirmation</strong>
                        <br>
                        You marked the payment as complete.
                        <br>
                        Now the seller has to confirm that they have received your transfer.
                    </div>
                </div>
                <div class="status alert alert-primary d-flex align-items-center m-0 py-2" role="alert" data-status="PAID" data-side="SELL">
                    <div class="px-2">
                        <i class="fa-solid fa-money-bill-transfer fa-2x"></i>
                    </div>
                    <div class="px-2">
                        <strong>The buyer paid you</strong>
                        <br>
                        Please check that you have received the full transfer amount and confirm that you have received it.
                    </div>
                </div>
                
                <div class="status alert alert-success d-flex align-items-center m-0 py-2" role="alert" data-status="COMPLETED" data-side="BUY">
                    <div class="px-2">
                        <i class="fa-solid fa-circle-check fa-2x"></i>
                    </div>
                    <div class="px-2">
                        <strong>Completed</strong>
                        <br>
                        The seller confirmed receipt of the transfer.
                        <br>
                        Cryptocurrency has been released to your account.
                    </div>
                </div>
                <div class="status alert alert-success d-flex align-items-center m-0 py-2" role="alert" data-status="COMPLETED" data-side="SELL">
                    <div class="px-2">
                        <i class="fa-solid fa-circle-check fa-2x"></i>
                    </div>
                    <div class="px-2">
                        <strong>Completed</strong>
                        <br>
                        You confirmed receipt of payment from the buyer.
                        <br>
                        Cryptocurrency has been released to buyers account.
                    </div>
                </div>
                
                <div class="status alert alert-danger d-flex align-items-center m-0 py-2" role="alert" data-status="CANCELED" data-side="BUY">
                    <div class="px-2">
                        <i class="fa-solid fa-circle-xmark fa-2x"></i>
                    </div>
                    <div class="px-2">
                        <strong>Canceled</strong>
                        <br>
                        You did not make the transfer on time.
                        <br>
                        Cryptocurrency has been returned to the seller.
                    </div>
                </div>
                <div class="status alert alert-danger d-flex align-items-center m-0 py-2" role="alert" data-status="CANCELED" data-side="SELL">
                    <div class="px-2">
                        <i class="fa-solid fa-circle-xmark fa-2x"></i>
                    </div>
                    <div class="px-2">
                        <strong>Canceled</strong>
                        <br>
                        The buyer did not pay you on time.
                        <br>
                        Cryptocurrency has been returned to your account.
                    </div>
                </div>
                
                <div class="status alert alert-warning d-flex align-items-center m-0 py-2" role="alert" data-status="DISPUTE" data-side="BUY">
                    <div class="px-2">
                        <i class="fa-solid fa-bolt fa-2x"></i>
                    </div>
                    <div class="px-2">
                        <strong>Transaction dispute</strong>
                        <br>
                        You marked the payment as complete, but the seller did not receive it.
                        <br>
                        Use chat to come to an agreement with the seller.
                        <br>
                        If you do not cancel the transaction within 24 hours and the seller does not confirm receipt of payment, this transaction will be investigated by the Vayamos administrators.
                    </div>
                </div>
                <div class="status alert alert-warning d-flex align-items-center m-0 py-2" role="alert" data-status="DISPUTE" data-side="SELL">
                    <div class="px-2">
                        <i class="fa-solid fa-bolt fa-2x"></i>
                    </div>
                    <div class="px-2">
                        <strong>Transaction dispute</strong>
                        <br>
                        The buyer marked the transaction as paid, but you didn't confirm it.
                        <br>
                        Use chat to come to an agreement with the buyer.
                        <br>
                        If you do not confirm receipt of payment within 24 hours and the buyer does not cancel the transaction, this transaction will be investigated by the Vayamos administrators.
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row py-2">
            <h4>Payment methods:</h4>
        </div>
        
        <div class="row vtabs">
            <div class="col-md-3">
                <ul id="fpmi-tabs" class="nav nav-tabs left-tabs" role="tablist">
                </ul>
            </div>
            <div class="col-md-9">
                <div id="fpmi-data" class="tab-content accordion">
                </div>
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
