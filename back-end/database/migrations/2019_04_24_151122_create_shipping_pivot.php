<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShippingPivot extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipping', function (Blueprint $table) {
            $table->integer('shipper_id')->unsigned();
            $table->integer('city_id')->unsigned();
            $table->integer('min_days');
            $table->integer('max_days')->nullable();
            $table->double('fees');
        });
        Schema::table('shipping', function (Blueprint $table) {
            $table->foreign('shipper_id')->references('id')->on('shippers');
            $table->foreign('city_id')->references('id')->on('cities');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
