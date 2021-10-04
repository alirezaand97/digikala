<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFiltersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('filter', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->unsignedBigInteger('cat_id');//برای هر دسته بندی کی فیلتر ایجاد می کنیم
            $table->unsignedBigInteger('specification_id')->nullable();//بین اشتراکات مخصات و فیلتر ارتباط برقرار کنیم
            $table->unsignedBigInteger('parent_id');
            $table->integer('position');
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
        Schema::dropIfExists('filter');
    }
}
