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
        
        <!-- Left column -->
        <?php include(__DIR__.'/templates/sidebar_settings.php'); ?>
        
        <!-- Main column -->
        <div class="col-12 col-lg-8 p-0 ui-card ui-column">
            
            <div class="row p-2">
                <h3>P2P nickname</h3>
            </div>
            
            <div class="row">
                <div class="col-12 col-md-6">
                    <form id="nickname-form" class="d-grid gap-3">
                        <div>
                            <span class="secondary">Current nickname:</span>
                            <span class="float-end" id="nickname-old"></span>
                        </div>
                        <div class="form-group">
                            <label for="nickname-new">New nickname:</label>
                            <input type="text" class="form-control" id="nickname-new">
                            <small id="help-nickname-new" class="form-text" style="display: none">
                                One lowercase, uppercase letters and digits. Can't begin with "Client" and "VPay".
                            </small>
                        </div>
                        <button type="submit" class="btn btn-primary">Change</button>
                    </form>
                </div>
            </div>
            
            <div class="row p-2">
                <h3>Your feedback</h3>
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
