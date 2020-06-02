$(function() {
    $(document).on('click',".edit-status",function(e){
        $("#status-id").val($(this).data('status'));
        statusid=$(this).data('id');
        e.preventDefault();
    });
    $(document).on('click',"#edit-status",function(e){
        var estatusform=$('#edit-status-form').serialize();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: 'PUT',
            url: 'products-admin/'+statusid,
            data: estatusform,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا حاول مره اخرى',
                        text: 'حدث خطا ! يجب ان تختار نوع ',
                    })
                }else{
                    Swal.fire(
                        'تمت العمليه بنجاح',
                        '',
                        'success'
                    );
                }
                $('#edit-status-form').trigger("reset");
            }

        });
        e.preventDefault();


    });
    /* ------------- status-filter --------------*/
    $(document).on('click',".appr",function(e){
        var status_type=$(this).data('type');
        $.ajax({
            type: 'GET',
            url: 'products-admin/'+status_type,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا',
                        text: 'حدثت مشكله ! ',
                    })
                }else{
                    $(".status-table").html(
                        "<tr></tr>"
                    );
                    Swal.fire(
                        'سيتم عرض التفاصيل الان',
                        '',
                        'success'
                    );
                    $.each(data, function(i, item) {
                        $(".status-table").append(
                            "<tr>"+
                            "<td>"+item.id +"</td>"+
                            "<td>"+item.name +"</td>"+
                            "<td>"+item.name_en +"</td>"+
                            "<td>"+item.price +"</td>"+
                            "<td>"+item.sale_price +"</td>"+
                            "<td>"+item.quantity +"</td>"+
                            "<td>"+item.commission+"</td>"+
                            "<td>"+item.store.name+"</td>"+
                            "<td>"+item.category.name +"</td>"+
                            "<td>"+item.status+"</td>"+
                            "<td><button class='edit-status btn btn-success' data-toggle='modal' data-target='#edit-modal-method' data-id='" + item.id +  "' data-status='" + item.status +  "' >update</button></td>"+
                            "</tr>"
                        )
                    });

                }

            }

        });
        e.preventDefault();


    });
    /* ------------- status-filter --------------*/
    $(document).on('keyup','#product-search',function(e){
        var query=$(this).val();
        $.ajax({
            type: 'GET',
            url: 'products-search/'+query,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا',
                        text: 'حدثت مشكله ! ',
                    })
                }else{
                    $(".status-table").html(
                        "<tr></tr>"
                    );
                    $.each(data, function(i, item) {
                        $(".status-table").append(
                            "<tr>"+
                            "<td>"+item.id +"</td>"+
                            "<td>"+item.name +"</td>"+
                            "<td>"+item.name_en +"</td>"+
                            "<td>"+item.price +"</td>"+
                            "<td>"+item.sale_price +"</td>"+
                            "<td>"+item.quantity +"</td>"+
                            "<td>"+item.commission+"</td>"+
                            "<td>"+item.store.name+"</td>"+
                            "<td>"+item.category.name +"</td>"+
                            "<td>"+item.status+"</td>"+
                            "<td><button class='edit-status btn btn-success' data-toggle='modal' data-target='#edit-modal-method' data-id='" + item.id +  "' data-status='" + item.status +  "' >update</button></td>"+
                            "</tr>"
                        )
                    });

                }

            }

        });
        e.preventDefault();


    });
    /* ------------- order-status-filter --------------*/
    $(document).on('click',".order-appr",function(e){
        var status_type=$(this).data('type');
        $.ajax({
            type: 'GET',
            url: 'orders-admin/'+status_type,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا',
                        text: 'حدثت مشكله ! ',
                    })
                }else{
                    $(".order-status-table").html(
                        "<tr></tr>"
                    );
                    Swal.fire(
                        'سيتم عرض التفاصيل الان',
                        '',
                        'success'
                    );
                    $.each(data, function(i, item) {
                        $(".order-status-table").append(
                            "<tr>"+
                            "<td>"+item.id +"</td>"+
                            "<td><button class='address-details btn btn-primary' data-toggle='modal' data-target='#address-details' data-id='" + item.address_id +  "'  >"+item.address_id+"</button></td>"+
                            "<td><button class='referral-details btn btn-secondary' data-toggle='modal' data-target='#referral-details' data-id='" + item.referral_id +  "'  >"+item.referral_id+"</button></td>"+
                            "<td><button class='order-details btn btn-warning' data-toggle='modal' data-target='#details' data-id='" + item.id +  "'  >details</button></td>"+
                            "<td><button class='total btn btn-success' data-toggle='modal' data-target='#total' data-id='" + item.id +  "'  >total</button></td>"+
                            "<td>"+item.status +"</td>"+
                            "</tr>"
                        )
                    });

                }

            }

        });
        e.preventDefault();


    });
    /* ------------- address-details --------------*/
    $(document).on('click',".address-details",function(e){
        var id=$(this).data('id');
        $.ajax({
            type: 'GET',
            url: 'address-details/'+id,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا',
                        text: 'حدثت مشكله ! ',
                    })
                }else{
                    $(".address").html(
                        "<tr></tr>"
                    );
                    Swal.fire(
                        'سيتم عرض التفاصيل الان',
                        '',
                        'success'
                    )
                    $.each(data, function(i, item) {
                        $(".address").append(
                            "<tr>"+
                            "<td>"+item.id+"</td>"+
                            "<td>"+item.first_name +"</td>"+
                            "<td>"+item.last_name+"</td>"+
                            "<td>"+item.email+"</td>"+
                            "<td>"+item.phone+"</td>"+
                            "<td>"+item.address  +"</td>"+
                            "<td>"+item.landmark  +"</td>"+
                            "</tr>"
                        )


                    });
                }

            }

        });
        e.preventDefault();


    });
    /* ------------- referral-details --------------*/
    $(document).on('click',".referral-details",function(e){
        var id=$(this).data('id');
        $.ajax({
            type: 'GET',
            url: 'referral-details/'+id,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا',
                        text: 'حدثت مشكله ! ',
                    })
                }else{
                    $(".referral").html(
                        "<tr></tr>"
                    );
                    Swal.fire(
                        'سيتم عرض التفاصيل الان',
                        '',
                        'success'
                    )
                    $.each(data, function(i, item) {
                        $(".referral").append(
                            "<tr>"+
                            "<td>"+item.id+"</td>"+
                            "<td>"+item.first_name +"</td>"+
                            "<td>"+item.last_name+"</td>"+
                            "<td>"+item.email+"</td>"+
                            "<td>"+item.phone+"</td>"+
                            "<td>"+item.clicks  +"</td>"+
                            "</tr>"
                        )


                    });
                }

            }

        });
        e.preventDefault();


    });
    /* ------------- total-details --------------*/
    $(document).on('click',".total",function(e){
        var id=$(this).data('id');
        $.ajax({
            type: 'GET',
            url: 'order-total/'+id,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا',
                        text: 'حدثت مشكله ! ',
                    })
                }else{
                    $(".total-details").html(
                        "<tr></tr>"
                    );
                    Swal.fire(
                        'سيتم عرض التفاصيل الان',
                        '',
                        'success'
                    )
                    $.each(data, function(i, item) {
                        $(".total-details").html(
                            item.total
                        )


                    });

                }

            }

        });
        e.preventDefault();


    });
    /* ------------- referral-details --------------*/
    $(document).on('click',".order-details",function(e){
        var id=$(this).data('id');
        $.ajax({
            type: 'GET',
            url: 'order-details/'+id,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا',
                        text: 'حدثت مشكله ! ',
                    })
                }else{
                    $(".details").html(
                        "<tr></tr>"
                    );
                    Swal.fire(
                        'سيتم عرض التفاصيل الان',
                        '',
                        'success'
                    )
                    $.each(data, function(i, item) {
                        $(".details").append(
                            "<tr>"+
                            "<td>"+item.id+"</td>"+
                            "<td>"+item.product.name +"</td>"+
                            "<td>"+item.price+"</td>"+
                            "<td>"+item.quantity+"</td>"+
                            "<td>"+item.commission+"</td>"+
                            "<td>"+item.status  +"</td>"+
                            "</tr>"
                        )


                    });
                }

            }

        });
        e.preventDefault();


    });
    /* ------------- update-aff-status --------------*/
    $(document).on('click',".edit-aff-status",function(e){
        $("#status-aff-id").val($(this).data('status'));
        affstatusid=$(this).data('id');
        e.preventDefault();
    });
    $(document).on('click',"#edit-aff-status",function(e){
        var eaffstatusform=$('#edit-aff-status-form').serialize();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: 'PUT',
            url: 'affiliates-admin/'+affstatusid,
            data: eaffstatusform,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا حاول مره اخرى',
                        text: 'حدث خطا ! يجب ان تختار نوع ',
                    })
                }else{
                    Swal.fire(
                        'تمت العمليه بنجاح',
                        '',
                        'success'
                    );
                }
                $('#edit-aff-status-form').trigger("reset");
            }

        });
        e.preventDefault();


    });
    /* ------------- update-aff-plan --------------*/
    $(document).on('click',".edit-aff-plan",function(e){
        $("#plan-aff-id").val($(this).data('plan'));
        affplanid=$(this).data('id');
        e.preventDefault();
    });
    $(document).on('click',"#edit-aff-plan",function(e){
        var eaffplanform=$('#edit-aff-plan-form').serialize();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: 'PUT',
            url: 'affiliates-plan-admin/'+affplanid,
            data: eaffplanform,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا حاول مره اخرى',
                        text: 'حدث خطا ! يجب ان تختار نوع ',
                    })
                }else{
                    Swal.fire(
                        'تمت العمليه بنجاح',
                        '',
                        'success'
                    );
                }
                $('#edit-aff-plan-form').trigger("reset");
            }

        });
        e.preventDefault();


    });
    /* ------------- user-details --------------*/
    $(document).on('click',".user-details",function(e){
        var id=$(this).data('id');
        $.ajax({
            type: 'GET',
            url: 'referral-details/'+id,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا',
                        text: 'حدثت مشكله ! ',
                    })
                }else{
                    $(".user").html(
                        "<tr></tr>"
                    );
                    Swal.fire(
                        'سيتم عرض التفاصيل الان',
                        '',
                        'success'
                    )
                    $.each(data, function(i, item) {
                        $(".user").append(
                            "<tr>"+
                            "<td>"+item.id+"</td>"+
                            "<td>"+item.first_name +"</td>"+
                            "<td>"+item.last_name+"</td>"+
                            "<td>"+item.email+"</td>"+
                            "<td>"+item.phone+"</td>"+
                            "<td>"+item.honored+"</td>"+
                            "<td>"+item.clicks  +"</td>"+
                            "<td>"+item.parent_id+"</td>"+
                            "</tr>"
                        )


                    });
                }

            }

        });
        e.preventDefault();


    });
    /* ------------- team-details --------------*/
    $(document).on('click',".team-details",function(e){
        var id=$(this).data('id');
        $.ajax({
            type: 'GET',
            url: 'team/'+id,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا',
                        text: 'حدثت مشكله ! ',
                    })
                }else{
                    $(".team").html(
                        "<tr></tr>"
                    );
                    Swal.fire(
                        'سيتم عرض التفاصيل الان',
                        '',
                        'success'
                    )
                    $.each(data, function(i, item) {
                        $(".team").append(
                            "<tr>"+
                            "<td>"+item.id+"</td>"+
                            "<td>"+item.first_name +"</td>"+
                            "<td>"+item.last_name+"</td>"+
                            "<td>"+item.parent_id+"</td>"+
                            "</tr>"
                        )


                    });
                }

            }

        });
        e.preventDefault();


    });
    /* ------------- plan-details --------------*/
    $(document).on('click',".plan-details",function(e){
        var id=$(this).data('id');
        $.ajax({
            type: 'GET',
            url: 'plan-details/'+id,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا',
                        text: 'حدثت مشكله ! ',
                    })
                }else{
                    $(".plan").html(
                        "<tr></tr>"
                    );
                    Swal.fire(
                        'سيتم عرض التفاصيل الان',
                        '',
                        'success'
                    )
                    $.each(data, function(i, item) {
                        $(".plan").append(
                            "<tr>"+
                            "<td>"+item.id+"</td>"+
                            "<td>"+item.name +"</td>"+
                            "<td>"+item.name_en+"</td>"+
                            "<td>"+item.description+"</td>"+
                            "<td>"+item.description_en+"</td>"+
                            "<td>"+item.commission+"</td>"+
                            "<td>"+item.price+"</td>"+
                            "</tr>"
                        )


                    });
                }

            }

        });
        e.preventDefault();


    });
    /* ------------- aff-status-filter --------------*/
    $(document).on('click',".aff-appr",function(e){
        var status_type=$(this).data('type');
        $.ajax({
            type: 'GET',
            url: 'affiliates-admin/'+status_type,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا',
                        text: 'حدثت مشكله ! ',
                    })
                }else{
                    $(".affiliate-status-table").html(
                        "<tr></tr>"
                    );
                    Swal.fire(
                        'سيتم عرض التفاصيل الان',
                        '',
                        'success'
                    );
                    $.each(data, function(i, item) {
                        $(".affiliate-status-table").append(
                            "<tr>"+
                            "<td>"+item.id +"</td>"+
                            "<td><button class='plan-details btn btn-primary' data-toggle='modal' data-target='#plan-details' data-id='" + item.plan_id +  "'  >"+item.plan_id+"</button></td>"+
                            "<td>"+item.active_balance +"</td>"+
                            "<td>"+item.inactive_balance +"</td>"+
                            "<td>"+item.suspended_balance +"</td>"+
                            "<td><button class='user-details btn btn-secondary' data-toggle='modal' data-target='#user-details' data-id='" + item.user_id +  "'  >"+item.user_id+"</button></td>"+
                            "<td><button class='team-details btn btn-danger' data-toggle='modal' data-target='#team-details' data-id='" + item.user_id +  "'  >team</button></td>"+
                            "<td>"+item.status +"</td>"+
                            "<td><button class='edit-aff-plan btn btn-primary' data-toggle='modal' data-target='#edit-plan-method' data-id='" + item.id +  "' data-plan='" + item.plan_id +  "' >update plan</button></td>"+
                            "<td><button class='edit-aff-status btn btn-success' data-toggle='modal' data-target='#edit-modal-method' data-id='" + item.id +  "' data-status='" + item.status +  "' >update status</button></td>"+

                            "</tr>"
                        )
                    });

                }

            }

        });
        e.preventDefault();


    });
    /* ------------- update-wit-status --------------*/
    $(document).on('click',".edit-wit-status",function(e){
        $("#status-wit-id").val($(this).data('status'));
        witstatusid=$(this).data('id');
        e.preventDefault();
    });
    $(document).on('click',"#edit-wit-status",function(e){
        var ewitstatusform=$('#edit-wit-status-form').serialize();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: 'PUT',
            url: 'withdraws-admin/'+witstatusid,
            data: ewitstatusform,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا حاول مره اخرى',
                        text: 'حدث خطا ! يجب ان تختار نوع ',
                    })
                }else{
                    Swal.fire(
                        'تمت العمليه بنجاح',
                        '',
                        'success'
                    );
                }
                $('#edit-wit-status-form').trigger("reset");
            }

        });
        e.preventDefault();


    });
    /* ------------- wit-status-filter --------------*/
    $(document).on('click',".wit-appr",function(e){
        var status_type=$(this).data('type');
        $.ajax({
            type: 'GET',
            url: 'withdraws-admin/'+status_type,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا',
                        text: 'حدثت مشكله ! ',
                    })
                }else{
                    $(".withdraws-status-table").html(
                        "<tr></tr>"
                    );
                    Swal.fire(
                        'سيتم عرض التفاصيل الان',
                        '',
                        'success'
                    );
                    $.each(data, function(i, item) {
                        $(".withdraws-status-table").append(
                            "<tr>"+
                            "<td>"+item.id +"</td>"+
                            "<td><button class='payment-details btn btn-primary' data-toggle='modal' data-target='#payment-details' data-id='" + item.payment_id +  "'  >"+item.payment_id+"</button></td>"+
                            "<td>"+item.cash +"</td>"+
                            "<td>"+item.status +"</td>"+
                            "<td><button class='edit-wit-status btn btn-success' data-toggle='modal' data-target='#edit-modal-method' data-id='" + item.id +  "' data-status='" + item.status +  "' >update</button></td>"+

                            "</tr>"
                        )
                    });

                }

            }

        });
        e.preventDefault();


    });
    /* ------------- payment-details --------------*/
    $(document).on('click',".payment-details",function(e){
        var id=$(this).data('id');
        $.ajax({
            type: 'GET',
            url: 'payment-details/'+id,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا',
                        text: 'حدثت مشكله ! ',
                    })
                }else{
                    $(".payment").html(
                        "<tr></tr>"
                    );
                    Swal.fire(
                        'سيتم عرض التفاصيل الان',
                        '',
                        'success'
                    )
                    $.each(data, function(i, item) {
                        $(".payment").append(
                            "<tr>"+
                            "<td>"+item.id+"</td>"+
                            "<td>"+item.method+"</td>"+
                            "<td>"+item.user.first_name +"</td>"+
                            "<td>"+item.user.last_name+"</td>"+
                            "<td>"+item.email+"</td>"+
                            "<td>"+item.phone+"</td>"+
                            "<td>"+item.honored+"</td>"+
                            "<td>"+item.clicks  +"</td>"+
                            "<td>"+item.parent_id+"</td>"+
                            "</tr>"
                        )


                    });
                }

            }

        });
        e.preventDefault();


    });
    /* ------------- update-sel-status --------------*/
    $(document).on('click',".edit-sel-status",function(e){
        $("#status-sel-id").val($(this).data('status'));
        selstatusid=$(this).data('id');
        e.preventDefault();
    });
    $(document).on('click',"#edit-sel-status",function(e){
        var eselstatusform=$('#edit-sel-status-form').serialize();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: 'PUT',
            url: 'sellers-admin/'+selstatusid,
            data: eselstatusform,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا حاول مره اخرى',
                        text: 'حدث خطا ! يجب ان تختار نوع ',
                    })
                }else{
                    Swal.fire(
                        'تمت العمليه بنجاح',
                        '',
                        'success'
                    );
                }
                $('#edit-sel-status-form').trigger("reset");
            }

        });
        e.preventDefault();


    });
    /* ------------- sel-status-filter --------------*/
    $(document).on('click',".sel-appr",function(e){
        var status_type=$(this).data('type');
        $.ajax({
            type: 'GET',
            url: 'sellers-admin/'+status_type,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا',
                        text: 'حدثت مشكله ! ',
                    })
                }else{
                    $(".seller-status-table").html(
                        "<tr></tr>"
                    );
                    Swal.fire(
                        'سيتم عرض التفاصيل الان',
                        '',
                        'success'
                    );
                    $.each(data, function(i, item) {
                        $(".seller-status-table").append(
                            "<tr>"+
                            "<td>"+item.id +"</td>"+
                            "<td>"+item.name +"</td>"+
                            "<td>"+item.name_en +"</td>"+
                            "<td>"+item.url +"</td>"+
                            "<td>"+item.type +"</td>"+
                            "<td>"+item.email +"</td>"+
                            "<td>"+item.address +"</td>"+
                            "<td>"+item.phone+"</td>"+
                            "<td>"+item.balance +"</td>"+
                            "<td><button class='user-details btn btn-secondary' data-toggle='modal' data-target='#user-details' data-id='" + item.user_id +  "'  >"+item.user_id+"</button></td>"+
                            "<td><button class='product-details btn btn-danger' data-toggle='modal' data-target='#product-details' data-id='" + item.id +  "'  >products</button></td>"+
                            "<td><button class='total-sel-details btn btn-warning' data-toggle='modal' data-target='#total-details' data-id='" + item.user_id +  "'  >total</button></td>"+
                            "<td>"+item.status +"</td>"+
                            "<td><button class='edit-sel-status btn btn-success' data-toggle='modal' data-target='#edit-modal-method' data-id='" + item.id +  "' data-status='" + item.status +  "' >update</button></td>"+

                            "</tr>"
                        )
                    });

                }

            }

        });
        e.preventDefault();


    });
    /* ------------- sel-products --------------*/
    $(document).on('click',".product-details",function(e){
        var seller_id=$(this).data('id');
        $.ajax({
            type: 'GET',
            url: 'products-details/'+seller_id,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا',
                        text: 'حدثت مشكله ! ',
                    })
                }else{
                    $(".product").html(
                        "<tr></tr>"
                    );
                    Swal.fire(
                        'سيتم عرض التفاصيل الان',
                        '',
                        'success'
                    );
                    $.each(data, function(i, item) {
                        $(".product").append(
                            "<tr>"+
                            "<td>"+item.id +"</td>"+
                            "<td>"+item.name +"</td>"+
                            "<td>"+item.name_en +"</td>"+
                            "<td>"+item.category.name +"</td>"+
                            "<td>"+item.price +"</td>"+
                            "<td>"+item.sale_price +"</td>"+
                            "<td>"+item.quantity +"</td>"+
                            "<td>"+item.commission+"</td>"+
                            "<td>"+item.status+"</td>"+
                            "</tr>"
                        )
                    });

                }

            }

        });
        e.preventDefault();


    });
    /* ------------- total-sel-details --------------*/
    $(document).on('click',".total-sel-details",function(e){
        var id=$(this).data('id');
        $.ajax({
            type: 'GET',
            url: 'total_sel_orders/'+id,
            processData: false,
            success: function (data) {
                if((data.errors)){
                    Swal.fire({
                        type: 'error',
                        title: 'عفوا',
                        text: 'حدثت مشكله ! ',
                    })
                }else{
                    $(".sel-total-details").html(
                        "<tr></tr>"
                    );
                    Swal.fire(
                        'سيتم عرض التفاصيل الان',
                        '',
                        'success'
                    )
                    $.each(data, function(i, item) {
                        $(".sel-total-details").html(
                            item.total
                        )


                    });

                }

            }

        });
        e.preventDefault();


    });
})
