<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

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
            $table->id();
            $table->string('title');
            $table->unsignedBigInteger('cat_id');
            $table->unsignedBigInteger('brand_id');
            $table->string('ename')->nullable();
            $table->string('product_url')->nullable();
            $table->integer('price')->nullable();
            $table->integer('discount_price')->nullable();
            $table->smallInteger('show')->nullable();
            $table->integer('view')->default(0);
            $table->text('keywords');
            $table->text('description');
            $table->smallInteger('special')->default(0);
            $table->string('image_url');
            $table->text('full_description')->nullable();
            $table->integer('order_number')->default(0);
            $table->integer('status')->default(-3);
            $table->integer('score')->default(0); //امتیاز کل
            $table->integer('score_count')->default(0); //تعداد دفعات امتباز دادن
            $table->integer('ready_to_shipment')->default(0);
            $table->string('is_gift_cart')->default(\App\GiftCart::IS_NOT_GIFT_CART);
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
        Schema::dropIfExists('products');
    }
}
