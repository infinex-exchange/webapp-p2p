<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../../templates/head.php'); ?>
        <?php include(__DIR__.'/../../imports/bignumber.html'); ?>
        <?php include(__DIR__.'/imports/rateit.html'); ?>
        <link rel="stylesheet" href="/p2p/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <title>Vayamos P2P</title>
        <script src="/p2p/config.js?<?php echo filemtime(__DIR__.'/config.js'); ?>"></script>
        <script src="/p2p/js/chat_client.js?<?php echo filemtime(__DIR__.'/js/chat_client.js'); ?>"></script>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include(__DIR__.'/../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <div id="main-navbar">
            <?php include(__DIR__.'/../../templates/navbar.php'); ?>
        </div>
        
        <!-- Root container -->
        <div id="root" class="user-only container-fluid container-1500 p-0">
        <div class="row m-0">
        
        <!-- Main column -->
        <div class="col-12 col-lg-8 p-0 ui-column">
        <div class="row m-0">
        <div class="col-12 ui-card ui-card-ver d-lg-block sm-rest-of-height" data-ui-card="transaction">
            
        <div class="row">
            <h3 class="transaction-header"></h3>
        </div>
        
        <div class="row py-4">
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
        
        <div class="row pb-4">
            <div class="col-12">
                <div class="status ui-card-light border d-flex align-items-center m-0" data-status="PENDING" data-side="BUY">
                    <div class="p-2">
                        <?php include(__DIR__.'/templates/countdown.html'); ?>
                    </div>
                    <div class="p-2">
                        <strong>Please make a payment</strong>
                        <br>
                        <span class="secondary">
	                        Transfer money to seller using any of the offered payment methods.
	                        <br>
	                        Then confirm that the payment has been made using the button below.
	                    </span>
                    </div>
                </div>
                <div class="status ui-card-light border d-flex align-items-center m-0" role="alert" data-status="PENDING" data-side="SELL">
                    <div class="p-2">
                        <?php include(__DIR__.'/templates/countdown.html'); ?>
                    </div>
                    <div class="p-2">
                        <strong>Waiting for the payment</strong>
                        <br>
                        <span class="secondary">
	                        We will inform you when the buyer marks the payment as complete.
	                    </span>
                    </div>
                </div>
                
                <div class="status ui-card-light border d-flex align-items-center m-0" data-status="PAID" data-side="BUY">
                    <div class="p-2">
                        <?php include(__DIR__.'/templates/countdown.html'); ?>
                    </div>
                    <div class="p-2">
                        <strong>Waiting for confirmation</strong>
                        <br>
                        <span class="secondary">
	                        You have marked the payment as complete.
	                        <br>
	                        Now the seller has to confirm receipt of the transfer.
	                    </span>
                    </div>
                </div>
                <div class="status ui-card-light border d-flex align-items-center m-0" data-status="PAID" data-side="SELL">
                    <div class="p-2">
                        <?php include(__DIR__.'/templates/countdown.html'); ?>
                    </div>
                    <div class="p-2">
                        <strong>The buyer paid you</strong>
                        <br>
                        <span class="secondary">
	                        Please check your bank account if you received the correct amount.
                            <br>
                            If you have no complaints, confirm payment receipt using the button below.
	                    </span>
                    </div>
                </div>
                
                <div class="status ui-card-light border border-success d-flex align-items-center m-0" data-status="COMPLETED" data-side="BUY">
                    <div class="p-2">
                        <i class="fa-solid fa-circle-check fa-2x text-green"></i>
                    </div>
                    <div class="p-2">
                        <strong class="text-green">Completed</strong>
                        <br>
                        <span class="secondary">
	                        The seller confirmed receipt of the payment.
	                        <br>
	                        Cryptocurrency has been released to your account.
	                    </span>
                    </div>
                </div>
                <div class="status ui-card-light border border-success d-flex align-items-center m-0" data-status="COMPLETED" data-side="SELL">
                    <div class="p-2">
                        <i class="fa-solid fa-circle-check fa-2x text-green"></i>
                    </div>
                    <div class="p-2">
                        <strong class="text-green">Completed</strong>
                        <br>
                        <span class="secondary">
	                        You confirmed receipt of the payment.
	                        <br>
	                        Cryptocurrency has been released to the buyers account.
	                    </span>
                    </div>
                </div>
                
                <div class="status ui-card-light border border-danger d-flex align-items-center m-0" data-status="CANCELED" data-side="BUY">
                    <div class="p-2">
                        <i class="fa-solid fa-circle-xmark fa-2x text-red"></i>
                    </div>
                    <div class="p-2">
                        <strong class="text-red">Canceled</strong>
                        <br>
                        <span class="secondary">
	                        You didn't make the payment on time.
	                        <br>
	                        Cryptocurrency has been returned to the seller.
	                    </span>
                    </div>
                </div>
                <div class="status ui-card-light border border-danger d-flex align-items-center m-0" data-status="CANCELED" data-side="SELL">
                    <div class="p-2">
                        <i class="fa-solid fa-circle-xmark fa-2x text-red"></i>
                    </div>
                    <div class="p-2">
                        <strong class="text-red">Canceled</strong>
                        <br>
                        <span class="secondary">
	                        The buyer didn't pay you on time.
	                        <br>
	                        Cryptocurrency has been returned to your account.
	                    </span>
                    </div>
                </div>
                
                <div class="status ui-card-light border border-warning d-flex align-items-center m-0" data-status="DISPUTE" data-side="BUY">
                    <div class="p-2">
                        <i class="fa-solid fa-bolt fa-2x text-warning"></i>
                    </div>
                    <div class="p-2">
                        <strong class="text-warning">Transaction dispute</strong>
                        <br>
                        <span class="secondary">
                            You have marked the payment as completed, but the seller didn't confirm it.
                            <br>
                            Please use the chat to come to an agreement.
                            <br>
                            If you don't cancel the transaction and the seller doesn't confirm receipt of payment within 24 hours,
                            Vayamos staff will help to solve the dispute.
                        </span>
                    </div>
                </div>
                <div class="status ui-card-light border border-warning d-flex align-items-center m-0" data-status="DISPUTE" data-side="SELL">
                    <div class="p-2">
                        <i class="fa-solid fa-bolt fa-2x text-warning"></i>
                    </div>
                    <div class="p-2">
                        <strong class="text-warning">Transaction dispute</strong>
                        <br>
                        <span class="secondary">
                            The buyer have marked payment as completed, but you didn't confirm it.
                            <br>
                            Please use the chat to come to an agreement.
                            <br>
                            If you don't confirm receipt of payment and the buyer doesn't cancel the transaction within 24 hours,
                            Vayamos staff will help to solve the dispute.
                        </span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row pt-2 pb-2">
            <h4>Payment methods:</h4>
        </div>
        
        <div class="row pb-4">
            <div class="col-2 col-lg-3 p-0 text-center text-lg-start ver-tabs">
                <ul id="fpmi-tabs" class="nav flex-column">
                </ul>
            </div>
            <div id="fpmi-data" class="col-10 col-md-9">
            </div>
        </div>
        
        <div class="row">
            <div class="status py-4 col-6 col-lg-auto" data-status="PENDING" data-side="BUY">
                <button type="button" class="btn btn-primary w-100" onClick="confirmPaid()">
                    <i class="fa-solid fa-check"></i>
                    Confirm payment made
                </button>
            </div>
            <div class="status py-4 col-6 col-lg-auto" data-status="PAID DISPUTE" data-side="SELL">
                <button type="button" class="btn btn-primary w-100" onClick="confirmReceivedPrompt()">
                    <i class="fa-solid fa-check"></i>
                    Confirm receipt of payment
                </button>
            </div>
            <div class="status py-4 col-6 col-lg-auto" data-status="PENDING PAID DISPUTE" data-side="BUY">
                <button type="button" class="btn btn-danger w-100" onClick="cancelTransactionPrompt()">
                    <i class="fa-solid fa-xmark"></i>
                    Cancel transaction
                </button>
            </div>
        </div>
        
        <div class="feedback row py-2" data-feedback="null true false">
            <h4>Feedback:</h4>
        </div>
        
        <div class="feedback row" data-feedback="null">
            <div class="col-12 pb-1">
                Do you recommend trading with this user?
            </div>
            <div class="col-6 col-lg-auto">
                <button type="button" class="btn btn-outline-green w-100" onClick="postFeedback(true)">
                    <i class="fa-solid fa-thumbs-up"></i>
                    Recommend
                </button>
            </div>
            <div class="col-6 col-lg-auto">
                <button type="button" class="btn btn-outline-red w-100" onClick="postFeedback(false)">
                    <i class="fa-solid fa-thumbs-down"></i>
                    Not recommend
                </button>
            </div>
        </div>
        
        <div class="feedback row text-green" data-feedback="true">
            <div class="col-12">
                <i class="fa-solid fa-thumbs-up"></i>
                I recommend trading with this user
            </div>
        </div>
        
         <div class="feedback row text-red" data-feedback="false">
            <div class="col-12">
                <i class="fa-solid fa-thumbs-down"></i>
                I do not recommend trading with this user
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

        <div id="chat-header" class="row mb-2">
            <div class="col-auto my-auto">
                <i id="chat-online-icon" class="fa-solid fa-circle fa-lg"></i>
            </div>
            <div class="col-auto my-auto">
                <h3 class="nickname mb-1"></h3>
                <span class="secondary" id="chat-last-seen"></span>
            </div>
        </div>
        
        <div id="chat-data" class="scrollable">
        </div>
        
        <div id="chat-footer" class="row mt-2">
            <div class="col-10">
                <textarea id="chat-input"></textarea>
            </div>
            <div class="col-2">
                s
            </div>
        </div>
        
        <!-- / Right column -->
        </div>
        </div>
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
    
        <script src="/p2p/js/js_sizing.js?<?php echo filemtime(__DIR__.'/js/js_sizing.js'); ?>"></script>
        <script src="/p2p/js/countdown.js?<?php echo filemtime(__DIR__.'/js/countdown.js'); ?>"></script>
        <script src="/p2p/js/transaction.js?<?php echo filemtime(__DIR__.'/js/transaction.js'); ?>"></script>
        <script src="/p2p/js/chat.js?<?php echo filemtime(__DIR__.'/js/chat.js'); ?>"></script>
        
        <?php include('../../templates/modals.php'); ?>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-confirm-received">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirm receipt of payment</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Please confirm only if you received the correct amount from the buyer.</p>
                        <p>Cryptocurrency will be released to the buyer and you won't be able to make a complaint.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="modal-close btn btn-primary" data-bs-dismiss="modal" onClick="confirmReceived()">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-confirm-cancel">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Cancel transaction</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>You can cancel transaction only if you have serious reasons to do it.
                        The counterparty user may give you negative feedback.</p>
                        <p>After canceling the transaction, the seller will receive their cryptocurrencies back.</p>
                        <p><strong>Please absolutely do not cancel the transaction if you have already made a transfer to the seller.</strong></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="modal-close btn btn-primary" data-bs-dismiss="modal" onClick="cancelTransaction()">
                            Cancel transaction
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Mobile navbar -->
        <nav id="mobile-navbar" class="navbar fixed-bottom navbar-expand navbar-mobile d-flex d-lg-none py-0 small">
            <ul class="navbar-nav mx-auto text-center">
                <li class="nav-item">
                    <a class="nav-link" href="/p2p#recent-trades">
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
        <div style="height: 53px; margin-bottom: min(10px, env(safe-area-inset-bottom, 0));" class="d-block d-lg-none"></div>
    
    </body>
</html>
