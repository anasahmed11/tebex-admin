<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAreasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::create('areas', function (Blueprint $table) {
        //     $table->increments('id');
        //     $table->string('area_name');
        //     $table->string('area_name_en');
        //     $table->integer('city_id')->unsigned();
        //     $table->timestamps();
        // });
        // Schema::table('areas', function (Blueprint $table) {

        //     $table->foreign('city_id')->references('id')->on('cities');
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Schema::dropIfExists('areas');
    }
}
