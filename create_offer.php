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
