<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSellersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sellers', function (Blueprint $table) {
            $table->id();
            $table->string('fname')->nullable();
            $table->string('lname')->nullable();
            $table->string('email')->unique();
            $table->string('mobile')->unique();
            $table->string('password');
            $table->smallInteger('step');//مراحل ثبت نام فروشنده
            $table->string('brand_name')->nullable();//نام فروشگاه
            $table->string('account_status')->default('awaiting_approval');
            $table->string('active_code')->nullable();
            $table->integer('province_id')->default(0);
            $table->integer('city_id')->default(0);
            $table->smallInteger('account_type')->nullable();
            $table->integer('total_commission')->default(0);//میزان کمیسیون دریافت شده از فروشنده
            $table->integer('paid_commission')->default(0);//میزان پرداخت شده
            $table->integer('total_price')->default(0);//میزان فروش فروشنده
            $table->integer('new_order_count')->default(0);// تعداد سفارش های جدید فروشنده-سفارش های برررسی نشده
            $table->softDeletes();
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
        Schema::dropIfExists('sellers');
    }
}
