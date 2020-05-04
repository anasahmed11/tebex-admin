@extends('layouts.admin_dash')
@section('content')
    <div class="row">
        <div class="col-md-4">
            <button type="button" class="aff-appr btn btn-block btn-success" data-type="approved" >Approved</button><br>
        </div>
        <div class="col-md-4">
            <button type="button" class="aff-appr btn btn-block btn-warning" data-type="pending"  >pending</button><br>
        </div>
        <div class="col-md-4">
            <button type="button" class="aff-appr btn btn-block btn-danger" data-type="refused"  >refused</button><br>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 c_text login_page col-md-4 wow fadeInRight"data-wow-duration="2s" data-wow-offset="300">
            <table class="doc-table table table-responsive table-striped ">
                <thead>
                <tr>
                    <th>id</th>
                    <th>plan_id</th>
                    <th>active_balance</th>
                    <th>inactive_balance</th>
                    <th>suspended_balance</th>
                    <th>user_id</th>
                    <th>team</th>
                    <th>status</th>
                    <th>update plan</th>
                    <th>update status</th>
                </tr>
                </thead>
                <tbody class="affiliate-status-table">
                @foreach($orders as $order)

                    <tr class="order-{{$order->id}}">
                        <td>{{ $order->id }} </td>
                        <td><button class="plan-details btn btn-primary" data-toggle="modal" data-target="#plan-details" data-id="{{ $order->plan_id }}">{{ $order->plan_id }}</button></td>
                        <td>{{ $order->active_balance}}</td>
                        <td>{{ $order->inactive_balance}}</td>
                        <td>{{ $order->suspended_balance}}</td>
                        <td><button class="user-details btn btn-secondary" data-toggle="modal" data-target="#user-details" data-id="{{ $order->user_id }}">{{ $order->user_id }}</button> </td>
                        <td><button class="team-details btn btn-danger" data-toggle="modal" data-target="#team-details" data-id="{{ $order->user_id }}">team</button> </td>
                        <td>{{ $order->status}}</td>
                        <td><button class="edit-aff-plan btn btn-primary"  data-toggle="modal" data-target="#edit-plan-method" data-id="{{ $order->id }}" data-plan="{{ $order->plan_id }}" >update plan</button></td>
                        <td><button class="edit-aff-status btn btn-success"  data-toggle="modal" data-target="#edit-modal-method" data-id="{{ $order->id }}" data-status="{{ $order->status }}" >update status</button></td>
                    </tr>

                @endforeach



                </tbody>
            </table>

        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="plan-details" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">plan details</h5>
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
                                    <th>description</th>
                                    <th>description_en</th>
                                    <th>commission</th>
                                    <th>price</th>
                                </tr>

                                </thead>
                                <tbody class="plan">

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
    <div class="modal fade" id="team-details" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Team details</h5>
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
                                    <th>parent_id</th>
                                </tr>

                                </thead>
                                <tbody class="team">

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
                    {{Form::open(array('id'=>'edit-aff-status-form'))}}
                    {{method_field('PUT')}}
                    {{Form::select('status', array('approved' => 'approved', 'pending' => 'pending', 'refused' => 'refused'),null, array('class' => 'form-control','id'=>'status-aff-id'))}}<br>
                    {{Form::submit('save changes',['class' => 'btn btn-primary btn-lg btn-block','id'=>'edit-aff-status'])}}
                    {{ Form::close() }}
                    <br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="edit-plan-method" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">update plan</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <div class="modal-body">
                    {{Form::open(array('id'=>'edit-aff-plan-form'))}}
                    {{method_field('PUT')}}
                    {{Form::select('plan_id', $plans,null, array('class' => 'form-control','id'=>'plan-aff-id'))}}<br>
                    {{Form::submit('save changes',['class' => 'btn btn-primary btn-lg btn-block','id'=>'edit-aff-plan'])}}
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


