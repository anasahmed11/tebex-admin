<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Admin</title>
    <!-- Bootstrap core CSS -->
    <link href="{{ url('/vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <script src="{{ asset('js/app.js') }}" defer></script>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link rel="stylesheet" href="{{ url('/css/animate.css') }}">
    <link rel="stylesheet" href="{{ url('/sweetalert2/dist/sweetalert2.min.css') }}">
    <link href="{{ url('/css/simple-sidebar.css') }}" rel="stylesheet">
    <link href="{{ url('css/dashstyle.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

</head>
<body>

<div class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="overlay"></div>
        <div class="sidebar-heading">TEBX-ADMIN </div>
        <div class="list-group list-group-flush">
            <a href="{{url('/orders-admin')}}" class="list-group-item list-group-item-action bg-light"><i class="fas fa-cart-plus"></i>Orders</a>
            <a href="{{url('/products-admin')}}" class="list-group-item list-group-item-action bg-light"><i class="fab fa-product-hunt"></i> Products</a>
            <a href="{{url('/affiliates-admin')}}" class="list-group-item list-group-item-action bg-light"><i class="fab fa-affiliatetheme"></i> Affiliate</a>
            <a href="{{url('/sellers-admin')}}" class="list-group-item list-group-item-action bg-light"><i class="fas fa-truck"></i>Sellers</a>
            <a href="{{url('/withdraws-admin')}}" class="list-group-item list-group-item-action bg-light"><i class="fas fa-user"></i> Withdraws</a>
        </div>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div id="page-content-wrapper">

        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <button class="btn btn-primary green" id="menu-toggle">Toggle Menu</button>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="container-fluid">
            @yield('content')
        </div>
    </div>
    <!-- /#page-content-wrapper -->

</div>
<!-- /#wrapper -->

<!-- Bootstrap core JavaScript -->
<script src="{{ url('/sweetalert2/dist/sweetalert2.all.min.js') }}"></script>
<script src="{{ url('/js/jquery/jquery-3.3.1.js') }}"></script>
<!--    wow.js file-->
<script src="{{ url('/js/wow.min.js') }}"></script>
<script>
    new WOW().init();

</script>
<!-- Menu Toggle Script -->
<script>
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
</script>
<script src="{{ url('/js/main.js') }}"></script>

</body>
</html>


