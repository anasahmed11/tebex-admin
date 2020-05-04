@extends('layouts.admin_dash')
@section('content')
    <div class="row">
        <div class="col-md-4">
            <button type="button" class="appr btn btn-block btn-success" data-type="approved" >Approved</button><br>
        </div>
        <div class="col-md-4">
            <button type="button" class="appr btn btn-block btn-warning" data-type="pending"  >pending</button><br>
        </div>
        <div class="col-md-4">
            <button type="button" class="appr btn btn-block btn-danger" data-type="refused"  >refused</button><br>
        </div>

    </div>
    <div class="row">
        <div class="col-md-12 c_text login_page col-md-4 wow fadeInRight"data-wow-duration="2s" data-wow-offset="300">
            <table class="doc-table table table-responsive table-striped ">
                <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>name(en)</th>
                    <th>price</th>
                    <th>sale_price</th>
                    <th>quantity</th>
                    <th>commission</th>
                    <th>store_name</th>
                    <th>category</th>
                    <th>status</th>
                    <th>update</th>
                </tr>
                </thead>
                <tbody class="status-table">
                @foreach($products as $product)

                    <tr class="product-{{$product->id}}">
                        <td>{{ $product->id }} </td>
                        <td>{{ $product->name }}</td>
                        <td>{{ $product->name_en }} </td>
                        <td>{{ $product->price }} </td>
                        <td>{{ $product->sale_price }}</td>
                        <td>{{ $product->quantity }} </td>
                        <td>{{ $product->commission}}</td>
                        <td>{{ $product->store->name}} </td>
                        <td>{{ $product->category->name }}</td>
                        <td>{{ $product->status}}</td>
                        <td><button class="edit-status btn btn-success"  data-toggle="modal" data-target="#edit-modal-method" data-id="{{ $product->id }}" data-status="{{ $product->status }}" >update</button></td>

                    </tr>

                @endforeach



                </tbody>
            </table>
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
                    {{Form::open(array('id'=>'edit-status-form'))}}
                    {{method_field('PUT')}}
                    {{Form::select('status', array('approved' => 'approved', 'pending' => 'pending', 'refused' => 'refused'),null, array('class' => 'form-control','id'=>'status-id'))}}<br>
                    {{Form::submit('save changes',['class' => 'btn btn-primary btn-lg btn-block','id'=>'edit-status'])}}
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
