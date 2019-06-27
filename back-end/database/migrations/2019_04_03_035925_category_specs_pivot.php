<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CategorySpecsPivot extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('category_specs', function (Blueprint $table) {
            $table->bigInteger('category_id')->unsigned();
            $table->bigInteger('spec_id')->unsigned();
        });
        Schema::table('category_specs', function (Blueprint $table) {

            $table->foreign('category_id')->references('id')->on('categories');
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
        Schema::dropIfExists('category_specs');
    }
}
