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
            $table->bigIncrements('id');
            $table->bigInteger('shipper_id')->unsigned();
            $table->unsignedInteger('governorate_id');
            $table->integer('min_days');
            $table->integer('max_days')->nullable();
            $table->double('fees');
        });
        Schema::table('shipping', function (Blueprint $table) {
            $table->foreign('shipper_id')->references('id')->on('shippers');
            $table->foreign('governorate_id')->references('id')->on('governorates');

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
