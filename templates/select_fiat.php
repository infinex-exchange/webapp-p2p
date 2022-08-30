<div id="select-fiat-wrapper">
    <form>
        <div class="select-arrow">
            <input readonly id="select-fiat" type="text" placeholder="Select fiat" class="form-control">
            <i id="select-fiat-arrow" class="fa-solid fa-angle-down flippable"></i>
        </div>
    </form>
    <div id="select-fiat-dropdown">
        <input id="select-fiat-search" type="text" placeholder="Search..." class="input-search form-control">
        <div id="select-fiat-data" class="scrollable"></div>
        <div id="select-fiat-data-preloader">
            Loading...
        </div>
    </div>
</div>
<script src="/p2p/js/select_fiat.js?<?php echo filemtime(__DIR__.'/../js/select_fiat.js'); ?>"></script>