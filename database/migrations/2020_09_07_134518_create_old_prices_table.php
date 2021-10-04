<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOldPricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('old_prices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_warranty_id');
            $table->integer('price1');
            $table->integer('price2');
            $table->integer('product_number');
            $table->integer('product_number_cart');
            $table->integer('product_number_sales');//تعدادی که تخفیف خورده
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
        Schema::dropIfExists('old_prices');
    }
}
