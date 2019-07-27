<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('phone')->unique();
            $table->enum('gender', ['M', 'F']);
            $table->string('image', 255);
            $table->date('birth_date');
            $table->tinyInteger('level');
            $table->bigInteger('store_id')->unsigned()->default(0);
            $table->double('active_points')->default(0);
            $table->double('inactive_points')->default(0);
            $table->double('suspended_points')->default(0);
            $table->boolean('honored')->default(false);
            $table->nestedSet();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('store_id')->references('id')->on('store');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
