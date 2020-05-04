@extends('layouts.admin_dash')
@section('content')
    <div class="row">
        <div class="col-md-6">
            <button type="button" class="wit-appr btn btn-block btn-success" data-type="completed" >completed</button><br>
        </div>
        <div class="col-md-6">
            <button type="button" class="wit-appr btn btn-block btn-warning" data-type="pending"  >pending</button><br>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 c_text login_page col-md-4 wow fadeInRight"data-wow-duration="2s" data-wow-offset="300">
            <table class="doc-table table table-responsive table-striped ">
                <thead>
                <tr>
                    <th>id</th>
                    <th>payment_account_id</th>
                    <th>cash</th>
                    <th>status</th>
                    <th>update</th>
                </tr>
                </thead>
                <tbody class="withdraws-status-table">
                @foreach($orders as $order)

                    <tr class="order-{{$order->id}}">
                        <td>{{ $order->id }} </td>
                        <td><button class="payment-details btn btn-primary" data-toggle="modal" data-target="#payment-details" data-id="{{ $order->payment_account_id }}">{{ $order->payment_account_id  }}</button></td>
                        <td>{{ $order->cash}}</td>
                        <td>{{ $order->status}}</td>
                        <td><button class="edit-wit-status btn btn-success"  data-toggle="modal" data-target="#edit-modal-method" data-id="{{ $order->id }}" data-status="{{ $order->status }}" >update</button></td>

                    </tr>

                @endforeach



                </tbody>
            </table>

        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="payment-details" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                    <th>method</th>
                                    <th>user_id</th>
                                    <th>first_name</th>
                                    <th>last_name</th>
                                    <th>email</th>
                                    <th>phone</th>
                                    <th>honored</th>
                                    <th>clicks</th>
                                    <th>parent_id</th>
                                </tr>

                                </thead>
                                <tbody class="payment">

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
                    {{Form::open(array('id'=>'edit-wit-status-form'))}}
                    {{method_field('PUT')}}
                    {{Form::select('status', array('completed' => 'completed', 'pending' => 'pending'),null, array('class' => 'form-control','id'=>'status-wit-id'))}}<br>
                    {{Form::submit('save changes',['class' => 'btn btn-primary btn-lg btn-block','id'=>'edit-wit-status'])}}
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



