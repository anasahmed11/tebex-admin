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
            $table->bigInteger('referral_id')->unsigned()->nullable();
            $table->integer('shipper_id')->unsigned();
            $table->string('_token',20);
            $table->enum('status',['pending','active','shipped','delivered','canceled','returned'])->default('pending');
            $table->string('status_message',150)->nullable();
            $table->double('shipping_fees');
            $table->double('commission')->default(0);
            $table->boolean('returnable')->default(true);
            $table->timestamps();
        });
        Schema::table('orders',function (Blueprint $table){
            $table->foreign('address_id')->references('id')->on('addresses');
            $table->foreign('referral_id')->references('id')->on('users');
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
