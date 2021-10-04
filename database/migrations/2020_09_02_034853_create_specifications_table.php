<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSpecificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('specifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cat_id'); //محصولات هر دسته بندی دارای ویژگی های تقریبا مشترکی هستند
            $table->unsignedBigInteger('parent_id');//مثلا صفحه نمایش والد و تعداد رنگ، جنس، سایز فرزندان
            $table->string('title');
            $table->smallInteger('position'); //ترتیب قرار گیری
            $table->smallInteger('show_item')->nullable();
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
        Schema::dropIfExists('specifications');
    }
}
