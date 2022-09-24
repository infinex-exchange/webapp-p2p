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
                <h3>API keys</h3>
            </div>
            
            <div class="row p-2">
                <div class="col-auto my-auto">
                    <button type="button" class="btn btn-primary btn-sm" onClick="showAddAKPrompt()">New API key</a>
                </div>
            </div>
            
            <div class="row p-2 d-none d-lg-flex secondary">
                <div class="col-4">
                <h5>Name</h5>
                </div>
                <div class="col-5">
                <h5>API key</h5>
                </div>
                <div class="col-3">
                <h5>Options</h5>
                </div>
            </div>
            
            <div id="api-keys-data">
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/js/settings.js?<?php echo filemtime(__DIR__.'/js/settings.js'); ?>"></script>
        
        <?php include('../../templates/modals.php'); ?>
        <?php include('templates/mobile_nav.php'); ?>
    
    </body>
</html>
