<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('date');//تاریخ سفارش
            $table->unsignedBigInteger('user_id');//سفارش دهنده
            $table->unsignedBigInteger('address_id');//آدرس گیرنده
            $table->string('pay_status');
            $table->bigInteger('total_price');//هزینه کل
            $table->bigInteger('price');//هزینه پرداختی
            $table->string('order_code');//کد سفارش
            $table->string('pay_code1')->nullable(); //کد هایی که درگاه پرداخت می دهد
            $table->string('pay_code2')->nullable();
            $table->string('order_read');//وضعیت مشاهده سفارش توسط فروشنده
            $table->string('send_type');//نوع ارسال
            $table->string('discount_code')->nullable();//کد تخفیف
            $table->string('discount_value')->nullable();//مقدار تخفیف
            $table->string('gift_value')->nullable();//مقدار هدیه
            $table->unsignedBigInteger('gift_id')->nullable();
            $table->integer('created_at');
            $table->integer('updated_at')->nullable();
            $table->integer('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
