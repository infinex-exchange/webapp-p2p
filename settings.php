<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../../templates/head.php'); ?>
        <?php include(__DIR__.'/imports/rateit.html'); ?>
        <link rel="stylesheet" href="/p2p/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <script src="/p2p/js/validate.js?<?php echo filemtime(__DIR__.'/js/validate.js'); ?>"></script>
        <title>Settings | Infinex P2P</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../../templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 container-rest p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Left column -->
        <?php include(__DIR__.'/templates/sidebar_settings.php'); ?>
        
        <!-- Main column -->
        <div class="col-12 col-lg-8 p-0 ui-card ui-column">
            
            <div class="row">
                <h3>Your feedback</h3>
            </div>
            
            <div class="row">
                <div class="col-auto mx-auto py-1" id="rateit-wrapper">
                </div>
                <div class="col-12 mx-auto text-center big secondary">
                    <strong><span id="rating-perc"></span>%</strong> of users recommend trading with you
                    <br>
                    (<strong id="rating-tcount"></strong> transactions in total) 
                </div>
            </div>
            
            <div class="row pt-4 pb-2">
                <h3>P2P nickname</h3>
            </div>
            
            <div class="row">
                <div class="col-12 col-md-6">
                    <form id="form-nickname" class="d-grid gap-3">
                        <div class="form-group">
                            <label for="nickname">Set your nickname:</label>
                            <input type="text" class="form-control" id="nickname">
                            <small id="help-nickname" class="form-text" style="display: none">
                                Only letters and digits. Can't start with "Client" and "VPay".
                            </small>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/p2p/js/settings.js?<?php echo filemtime(__DIR__.'/js/settings.js'); ?>"></script>
        
        <?php include('../../templates/modals.php'); ?>
        <?php include('templates/mobile_navbar.php'); ?>
    
    </body>
</html>
