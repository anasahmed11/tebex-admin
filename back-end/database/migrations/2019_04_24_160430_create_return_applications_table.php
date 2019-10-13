<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReturnApplicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('return_applications', function (Blueprint $table) {
            $table->increments('id');
            $table->string('reason');
            $table->string('note');
            $table->enum('status',['pending','active','shipped','returned','canceled'])->default('pending');
            $table->string('status_message')->default('Waiting for admin approval')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('return_applications');
    }
}
