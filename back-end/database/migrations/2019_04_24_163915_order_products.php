<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class OrderProducts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('order_id')->unsigned();
            $table->bigInteger('product_id')->unsigned();
            $table->double('price');
            $table->integer('quantity');

            $table->double('commission');
            $table->double('commission_percent');

            $table->unsignedInteger('return_id')->nullable();
            $table->boolean('returnable')->default(true);

            $table->enum('status',['pending','confirmed','refused'])->default('pending');
        });
        Schema::table('order_products', function (Blueprint $table) {

            $table->foreign('order_id')->references('id')->on('orders');
            $table->foreign('product_id')->references('id')->on('products');
            $table->foreign('return_id')->references('id')->on('return_applications');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_products');

    }
}
