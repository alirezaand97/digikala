<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('question_id')->default(0);//برای سوال 0 و برای جواب ای دی سوالی که پاسخ داده می شود
            $table->text('content');
            $table->integer('like')->default(0);
            $table->integer('dislike')->default(0);
            $table->smallInteger('status')->default(0);//تایید نشده
            $table->smallInteger('answer_count')->default(0);//تعداد پاسخ ها. برای مرتب سازی بر اساس پاسخ
            $table->string('send_email')->default('no');//در صورت دریافت پاسخ برای سوال به سوال کننده خبر داده شود
            $table->integer('time');//استفاده از تایم استمپ در جاوااسکریپت
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
