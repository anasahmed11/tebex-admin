<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name');
            $table->string('last_name');
            $table->unsignedInteger('governorate_id');
            $table->string('city');
            $table->string('address');
            $table->string('email');
            $table->string('phone',20);
            $table->string('landmark')->nullable();
            $table->text('notes')->nullable();
            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->string('_token',20);
            $table->timestamps();
            $table->softDeletes();

        });
        Schema::table('addresses', function (Blueprint $table) {
            $table->foreign('governorate_id')->references('id')->on('governorates');
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
        Schema::dropIfExists('addresses');
    }
}
