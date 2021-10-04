<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('user_id');
            $table->string('title')->nullable();
            $table->text('content');
            $table->unsignedBigInteger('order_id')->nullable();// کاربر خریدار است یا نه. اگر است شماره سفارش چند است
            $table->integer('time');
            $table->integer('like')->default(0);
            $table->integer('dislike')->default(0);
            $table->text('advantage')->nullable(); //مزیت ها
            $table->text('disadvantage')->nullable(); //معایب
            $table->integer('status')->default(0); //وضعیت دیدگاه
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
        Schema::dropIfExists('comments');
    }
}
