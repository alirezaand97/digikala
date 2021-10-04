<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderDiscountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_discounts', function (Blueprint $table) {
            //برای هر سفارش چه تخفیف هایی اعمال شده است
            $table->id();
            $table->integer('cat_id'); //دسته ای که شامل تخفیف شده است
            $table->integer('order_id'); //سفارشی ای که شامل تخفیف شده است
            $table->integer('min_order_price'); //حداقل هزینه ی سفارش تا دریافت تخیف
            $table->integer('total_price');//هزینه ی دسته
            $table->integer('discount_value')->nullable();//مقدار تخفیف دریافتی
            $table->integer('discount_percent')->nullable();//مقدار تخفیف دریافتی
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
        Schema::dropIfExists('order_discounts');
    }
}
