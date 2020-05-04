@extends('layouts.admin_dash')
@section('content')
    <div class="row">
        <div class="col-md-2">
            <button type="button" class="order-appr btn btn-block btn-success" data-type="active" >Active</button><br>
        </div>
        <div class="col-md-2">
            <button type="button" class="order-appr btn btn-block btn-outline-primary" data-type="pending" >pending</button><br>
        </div>
        <div class="col-md-2">
            <button type="button" class="order-appr btn btn-block btn-warning" data-type="delivered" >delivered</button><br>
        </div>
        <div class="col-md-2">
            <button type="button" class="order-appr btn btn-block btn-outline-info" data-type="shipped" >shipped</button><br>
        </div>
        <div class="col-md-2">
            <button type="button" class="order-appr btn btn-block btn-danger" data-type="canceled" >canceled</button><br>
        </div>
        <div class="col-md-2">
            <button type="button" class="order-appr btn btn-block btn-outline-dark" data-type="returned" >returned</button><br>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 c_text login_page col-md-4 wow fadeInRight"data-wow-duration="2s" data-wow-offset="300">
            <table class="doc-table table table-responsive table-striped ">
                <thead>
                <tr>
                    <th>id</th>
                    <th>address_id</th>
                    <th>referral_id</th>
                    <th>details</th>
                    <th>total</th>
                    <th>status</th>
                </tr>
                </thead>
                <tbody class="order-status-table">
                @foreach($orders as $order)

                    <tr class="order-{{$order->id}}">
                        <td>{{ $order->id }} </td>
                        <td><button class="address-details btn btn-primary" data-toggle="modal" data-target="#address-details" data-id="{{ $order->address_id }}">{{ $order->address_id }}</button></td>
                        <td><button class="referral-details btn btn-secondary" data-toggle="modal" data-target="#referral-details" data-id="{{ $order->referral_id }}">{{ $order->referral_id }}</button> </td>
                        <td><button class="order-details btn btn-warning" data-toggle="modal" data-target="#details" data-id="{{ $order->id }}">details</button> </td>
                        <td><button class="total btn btn-success" data-toggle="modal" data-target="#total" data-id="{{ $order->id }}">total</button> </td>
                        <td>{{ $order->status}}</td>

                    </tr>

                @endforeach



                </tbody>
            </table>

        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="address-details" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">address details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="main-table" class="row">
                        <div class="table-responsive">
                            <table class="table color-table inverse-table">

                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>first_name</th>
                                    <th>last_name</th>
                                    <th>email</th>
                                    <th>phone</th>
                                    <th>address</th>
                                    <th>landmark</th>
                                </tr>

                                </thead>
                                <tbody class="address">

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="referral-details" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">referral details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="main-table" class="row">
                        <div class="table-responsive">
                            <table class="table color-table inverse-table">

                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>first_name</th>
                                    <th>last_name</th>
                                    <th>email</th>
                                    <th>phone</th>
                                    <th>clicks</th>
                                </tr>

                                </thead>
                                <tbody class="referral">

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="details" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">order details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="main-table" class="row">
                        <div class="table-responsive">
                            <table class="table color-table inverse-table">

                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>product_name</th>
                                    <th>price</th>
                                    <th>quantity</th>
                                    <th>commission</th>
                                    <th>status</th>
                                </tr>

                                </thead>
                                <tbody class="details">

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="total" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">total</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <div class="modal-body">
                    <button type="button" class="total-details btn btn-block btn-danger" >total</button>
                    <br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
@endsection

