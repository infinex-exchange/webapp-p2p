<nav id="mobile-navbar" class="navbar fixed-bottom navbar-expand navbar-mobile d-flex d-lg-none py-0 small">
    <ul class="navbar-nav mx-auto text-center">
        <li class="nav-item">
            <a class="nav-link" href="/">
                <i class="fas fa-home"></i><br>
                Home
            </a>
        </li>
    </ul>
    <ul class="navbar-nav mx-auto text-center">
        <li class="nav-item">
            <a class="nav-link active" href="#_" data-ui-card-target="trade">
                <i class="fa-solid fa-right-left"></i><br>
                Trade
            </a>
        </li>
        <li class="nav-item"">
            <a class="nav-link" href="#_" data-ui-card-target="recent-trades">
                <i class="fa-solid fa-clock-rotate-left"></i><br>
                History
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#_" data-ui-card-target="my-offers">
                <i class="fa-solid fa-address-card"></i><br>
                My offers
            </a>
        </li>
        <li class="nav-item user-only dropup">
            <a href="#_" class="nav-link dropdown-toggle auto-active-group" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-gear"></i><br>
                Settings
            </a>
            <div class="dropdown-menu">
                <ul class="nav flex-column">
                    <?php include('menu_settings.html'); ?>
                </ul>
            </div>
        </li> 
    </ul>
</nav>

<div style="height: 53px; margin-bottom: min(10px, env(safe-area-inset-bottom, 0));" class="d-block d-lg-none"></div>