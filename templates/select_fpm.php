<div class="selector-wrapper">
    <form>
        <div class="selector-inner">
            <input readonly id="select-fpm" type="text" class="form-control selector-input">
            <i id="select-fpm-arrow" class="fa-solid fa-angle-down flippable selector-arrow"></i>
        </div>
    </form>
    <div id="select-fpm-dropdown" class="selector-dropdown">
        <input id="select-fpm-search" type="text" placeholder="Search..." class="input-search form-control selector-search">
        <div class="select-fpm-item row p-1 hoverable" data-fpmid="">
            <div class="col-auto my-auto text-center" style="width: 32px">
                <img width="24px" height="24px" src="/p2p/img/fpm_all.svg">
            </div>
            <div class="col my-auto">
                <span class="secondary">All payment methods</span>
            </div>
        </div>
        <div id="select-fpm-data" class="scrollable selector-data"></div>
        <div id="select-fpm-data-preloader">
            Loading...
        </div>
    </div>
</div>
<script src="/p2p/js/select_fpm.js?<?php echo filemtime(__DIR__.'/../js/select_fpm.js'); ?>"></script>