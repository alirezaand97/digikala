<?php

use App\Order;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_products', function (Blueprint $table) {
            $table->id();
            //از ای دی تنوع قیمت استفاده نمی کنیم چون ممکنه ادیت بشه و رنگ و گارانتیش تغییر کنه
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('warranty_id');
            $table->unsignedBigInteger('color_id');
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('seller_id')->default(0);//می تواند فروشنده خود دیجی کالا باشد
            $table->unsignedBigInteger('stockroom_id')->default(0);//
            $table->bigInteger('product_price1');//قیمت واقعی
            $table->bigInteger('product_price2');//قیمت فروش
            $table->bigInteger('product_count');//تعداد محصول فروخته شده در سفارش
            $table->integer('preparation_time')->default(0);
            $table->integer('send_status')->default(0);
            $table->integer('time')->default(0);
            $table->string('seller_read')->default(Order::ORDER_READ_NO);
            $table->bigInteger('commission')->default(0); //درصدی که از فروشندگان دریافت می شود
            $table->text('description')->nullable();
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
        Schema::dropIfExists('order_products');
    }
}
