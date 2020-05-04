@extends('layouts.admin_dash')
@section('content')
    <div class="row">
        <div class="col-md-4">
            <button type="button" class="sel-appr btn btn-block btn-success" data-type="approved" >Approved</button><br>
        </div>
        <div class="col-md-4">
            <button type="button" class="sel-appr btn btn-block btn-warning" data-type="pending"  >pending</button><br>
        </div>
        <div class="col-md-4">
            <button type="button" class="sel-appr btn btn-block btn-danger" data-type="refused"  >refused</button><br>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 c_text login_page col-md-4 wow fadeInRight"data-wow-duration="2s" data-wow-offset="300">
            <table class="doc-table table table-responsive table-striped ">
                <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>name_en</th>
                    <th>url</th>
                    <th>type</th>
                    <th>email</th>
                    <th>address</th>
                    <th>phone</th>
                    <th>balance</th>
                    <th>user_id</th>
                    <th>products</th>
                    <th>orders</th>
                    <th>status</th>
                    <th>update</th>
                </tr>
                </thead>
                <tbody class="seller-status-table">
                @foreach($orders as $order)

                    <tr class="order-{{$order->id}}">
                        <td>{{ $order->id }} </td>
                        <td>{{ $order->name }} </td>
                        <td>{{ $order->name_en }} </td>
                        <td>{{ $order->url }} </td>
                        <td>{{ $order->type }} </td>
                        <td>{{ $order->email }} </td>
                        <td>{{ $order->address }} </td>
                        <td>{{ $order->phone }} </td>
                        <td>{{ $order->balance }} </td>
                        <td><button class="user-details btn btn-secondary" data-toggle="modal" data-target="#user-details" data-id="{{ $order->user_id }}">{{ $order->user_id }}</button> </td>
                        <td><button class="product-details btn btn-danger" data-toggle="modal" data-target="#product-details" data-id="{{ $order->id }}">products</button> </td>
                        <td><button class="total-sel-details btn btn-warning" data-toggle="modal" data-target="#total-details" data-id="{{ $order->user_id }}">total</button> </td>
                        <td>{{ $order->status}}</td>
                        <td><button class="edit-sel-status btn btn-success"  data-toggle="modal" data-target="#edit-modal-method" data-id="{{ $order->id }}" data-status="{{ $order->status }}" >update</button></td>

                    </tr>

                @endforeach
                </tbody>
            </table>

        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="user-details" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">user details</h5>
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
                                    <th>honored</th>
                                    <th>clicks</th>
                                    <th>parent_id</th>
                                </tr>

                                </thead>
                                <tbody class="user">

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
    <div class="modal fade" id="product-details" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">product details</h5>
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
                                    <th>name</th>
                                    <th>name_en</th>
                                    <th>category</th>
                                    <th>price</th>
                                    <th>sale_price</th>
                                    <th>quantity</th>
                                    <th>commisssion</th>
                                    <th>status</th>
                                </tr>

                                </thead>
                                <tbody class="product">

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
    <div class="modal fade" id="total-details" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">total</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <div class="modal-body">
                    <button type="button" class="sel-total-details btn btn-block btn-warning" >total</button>
                    <br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="edit-modal-method" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">update status</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <div class="modal-body">
                    {{Form::open(array('id'=>'edit-sel-status-form'))}}
                    {{method_field('PUT')}}
                    {{Form::select('status', array('approved' => 'approved', 'pending' => 'pending', 'refused' => 'refused'),null, array('class' => 'form-control','id'=>'status-sel-id'))}}<br>
                    {{Form::submit('save changes',['class' => 'btn btn-primary btn-lg btn-block','id'=>'edit-sel-status'])}}
                    {{ Form::close() }}
                    <br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
@endsection



