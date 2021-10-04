<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductWarrantiesTable extends Migration
{
    /**
     * جدول تنوع قیمت. هر محصول بر اساس رنگ، گارانتی، زمان تحویل، تخفیف و پارامتر های دیگر ممکن است قیمت های مختلفی داشته باشد
     * Run the migrations
     * @return void
     */
    public function up()
    {
        Schema::create('product_warranties', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('color_id')->default(0);//بدون رنگ
            $table->unsignedBigInteger('warranty_id');//گارانتی محصول
            $table->unsignedBigInteger('seller_id')->default(0);//فروشنده
            $table->integer('price1');
            $table->integer('price2');
            $table->integer('send_time');//زمانی که طول می کشد ارسال شود
            $table->integer('product_number')->nullable();//تعداد موجود محصول
            $table->integer('product_number_cart')->nullable();//تعداد مجاز برای خرید توسط یک مشتری
            /**
             * ستون های زیر مربوط به زمان تخفیف هستند
             */
            $table->integer('offers_start_time')->nullable(); //timestamp
            $table->integer('offers_end_time')->nullable();
            $table->string('offers_start_date')->nullable();//تاریخ فارسی
            $table->string('offers_end_date')->nullable();
            $table->tinyInteger('show_idex')->default(0);//در صفحه اصلی نمایش داده شود یا خیر
            $table->tinyInteger('is_offer')->default(0);//تخفیف خورده یا خیر
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
        Schema::dropIfExists('product_warranties');
    }
}
