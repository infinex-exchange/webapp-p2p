<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../../templates/head.php'); ?>
        <link rel="stylesheet" href="/p2p/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../js/ajax_scroll.js'); ?>"></script>
        <script src="/p2p/js/validate.js?<?php echo filemtime(__DIR__.'/js/validate.js'); ?>"></script>
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
                <h3>Manage payment methods</h3>
            </div>
            
            <div class="row p-2">
                <div class="col-auto my-auto">
                    <button type="button" class="btn btn-primary btn-sm" onClick="showAddFpmiPrompt()">Add payment method</a>
                </div>
            </div>
            
            <div class="row p-2 d-none d-lg-flex secondary">
                <div class="col-11">
                    <div class="row">
		                <div class="col-3">
			                <h5>Description</h5>
		                </div>
		                <div class="col-3">
			                <h5>Payment method</h5>
		                </div>
		                <div class="col-6">
			                <h5>Transfer details</h5>
		                </div>
		            </div>
		        </div>
		    </div>
            
            <div id="fpmi-data">
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-add">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="ps-1 modal-title">
                            Add payment method
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div class="modal-body">
                    
                        <div class="row separate">
                            <div class="col-12">
                                <h5>Payment method:</h5>
                            </div>
                            <div class="col-12 pt-1">
                                <?php include(__DIR__.'/templates/select_fpm.php'); ?>
                            </div>

                            <div class="col-12 pt-3">
                                <h5>Description:</h5>
                            </div>
                            <div class="col-12 pt-1">
                                <input id="ma-name" type="text" class="form-control">
                            </div>
                            <div class="col-12 pt-1 pb-3">
                                <small id="ma-help-name" class="form-text" style="display: none">
                                    Invalid description.
                                </small>
                            </div>
                        </div>
                        
                        <div class="row separate" id="ma-fields">
                        </div>
                        
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <a href="#_" id="ma-submit" class="btn btn-primary">Submit</a>
                    </div>
                </div>
            </div>
        </div>
        
        <script src="/p2p/js/settings_fpmi.js?<?php echo filemtime(__DIR__.'/js/settings_fpmi.js'); ?>"></script>
        
        <?php include('../../templates/modals.php'); ?>
        <?php include('templates/mobile_navbar.php'); ?>
    
    </body>
</html>
