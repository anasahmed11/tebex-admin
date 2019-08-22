<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->bigIncrements('id');
                $table->string('name');
                $table->string('name_en');
                $table->string('url')->nullable();
                $table->string('type');
                $table->string('image')->nullable();
                $table->string('address');
                $table->string('phone');
                $table->string('email')->nullable();
                $table->string('slug');
                $table->double('balance')->default(0);
                $table->enum('method',['cash','bank']);
                $table->json('account');
                $table->bigInteger('user_id')->unsigned();
                $table->enum('status',['approved','refused','pending'])->default('pending');
                $table->timestamps();
        });
        Schema::table('stores',function(Blueprint $table){
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
        Schema::dropIfExists('stores');
    }
}
