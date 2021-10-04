<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSaleStatisticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sale_statistics', function (Blueprint $table) {
            $table->id();
            $table->string('year');
            $table->string('month');
            $table->string('day');
            $table->integer('commission')->default(0); //میزان کمیسیون در هر روز
            $table->integer('price'); //میزان فروش در هر روز
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
        Schema::dropIfExists('sale_statistics');
    }
}
