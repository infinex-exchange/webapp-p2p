<div class="selector-wrapper">
    <form>
        <div class="selector-inner">
            <input readonly id="select-fiat" type="text" placeholder="Select fiat" class="form-control selector-input">
            <i id="select-fiat-arrow" class="fa-solid fa-angle-down flippable selector-arrow"></i>
        </div>
    </form>
    <div id="select-fiat-dropdown" class="selector-dropdown">
        <input id="select-fiat-search" type="text" placeholder="Search..." class="input-search form-control selector-search" data-prec="">
        <div id="select-fiat-data" class="scrollable selector-data"></div>
        <div id="select-fiat-data-preloader">
            Loading...
        </div>
    </div>
</div>
<script src="/p2p/js/select_fiat.js?<?php echo filemtime(__DIR__.'/../js/select_fiat.js'); ?>"></script>