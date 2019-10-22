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
            $table->integer('plan_id')->unsigned();
            $table->double('active_balance')->default(0);
            $table->double('inactive_balance')->default(0);
            $table->double('suspended_balance')->default(0);
            $table->bigInteger('user_id')->unsigned();
            $table->enum('status',['approved','refused','pending'])->default('pending');

            $table->timestamps();
        });
        Schema::table('affiliates',function(Blueprint $table){
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('plan_id')->references('id')->on('plans');
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
