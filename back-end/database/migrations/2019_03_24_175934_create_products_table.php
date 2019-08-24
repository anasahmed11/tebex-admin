<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string("name");
            $table->string("name_en");
            $table->string("slug")->unique();
            $table->string("sku");
            $table->json("images");
            $table->json("description");
            $table->json("description_en");
            $table->double("price");
            $table->double("sale_price")->nullable();
            $table->integer("quantity");
            $table->float("commission")->default('20');
            $table->enum('status',['pending','confirmed','refused'])->default('pending');
            $table->bigInteger("store_id")->unsigned();
            $table->bigInteger("category_id")->unsigned();
            $table->softDeletes();
            $table->timestamps();
        });
        Schema::table('products',function(Blueprint $table){
            $table->foreign('store_id')->references('id')->on('stores');
            $table->foreign('category_id')->references('id')->on('categories');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
