<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAffiliatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('affiliates', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('level');
            $table->enum('method',['cash','bank']);
            $table->json('account');
            $table->bigInteger('user_id')->unsigned();
            $table->enum('status',['approved','refused','pending'])->default('pending');

            $table->timestamps();
        });
        Schema::table('affiliates',function(Blueprint $table){
           $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('affiliates');
    }
}
