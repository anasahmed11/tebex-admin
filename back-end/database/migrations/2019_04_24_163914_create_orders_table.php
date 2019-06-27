<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            //$table->uuid('order_id');
            $table->bigInteger('address_id')->unsigned();
            $table->integer('shipper_id')->unsigned();
            $table->string('_token',20);
            $table->enum('status',['Pending','Active','Shipped','Delivered','Canceled','Returned']);
            $table->double('shipping_fees');
            $table->timestamps();
        });
        Schema::table('orders',function (Blueprint $table){
            $table->foreign('address_id')->references('id')->on('addresses');
            $table->foreign('shipper_id')->references('id')->on('shippers');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
