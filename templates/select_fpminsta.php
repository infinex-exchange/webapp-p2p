<div class="selector-wrapper">
    <form>
        <div class="selector-inner">
            <input readonly id="select-fpm-insta" type="text" class="form-control selector-input" placeholder="Select...">
            <i id="select-fpm-insta-arrow" class="fa-solid fa-angle-down flippable selector-arrow"></i>
        </div>
    </form>
    <div id="select-fpm-insta-dropdown" class="selector-dropdown">
        <input id="select-fpm-insta-search" type="text" placeholder="Search..." class="input-search form-control selector-search">
        <div id="select-fpm-insta-data" class="scrollable selector-data"></div>
        <div id="select-fpm-insta-data-preloader">
            Loading...
        </div>
        <div id="select-fpm-manage row p-1 hoverable">
            <div class="col-auto m-auto">
                <strong class="secondary">Manage payment methods</strong>
            </div>
        </div>
    </div>
</div>
<script src="/p2p/js/select_fpminsta.js?<?php echo filemtime(__DIR__.'/../js/select_fpminsta.js'); ?>"></script>