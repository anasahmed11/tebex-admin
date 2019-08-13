<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProductSpecsPivot extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_specs', function (Blueprint $table) {
            $table->bigInteger('product_id')->unsigned();
            $table->bigInteger('spec_id')->unsigned();
            $table->json("value");
        });
        Schema::table('product_specs', function (Blueprint $table) {

            $table->foreign('product_id')->references('id')->on('products');
            $table->foreign('spec_id')->references('id')->on('specs');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_specs');
    }
}
