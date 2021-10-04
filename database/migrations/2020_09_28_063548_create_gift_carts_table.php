<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGiftCartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gift_carts', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->unsignedBigInteger('user_id'); //کارت هدیه متعلق به کیست
            $table->unsignedBigInteger('order_id'); //ایدی سفارش
            $table->bigInteger('cart_credit'); //مبلغ کارت هدیه
            $table->bigInteger('credit_used');//مبلغ مصرف شده از کارت هدیه
            $table->integer('validate_days')->nullable(); //تا چه زمان معتبر است
            $table->unsignedBigInteger('product_id'); //برای دریافت اطلاعات کارت هدیه
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
        Schema::dropIfExists('gift_carts');
    }
}
