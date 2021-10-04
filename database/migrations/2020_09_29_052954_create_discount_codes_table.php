<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiscountCodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('discount_codes', function (Blueprint $table) {
            $table->id();
            $table->string('code'); //کد تخفیف
            $table->integer('category_id')->default(0); //دسته بندی مجاز استفاده از کد. به صورت پیش فرض در همه دسته بندی ها قابل استفاده هستند
            $table->integer('min_order_price');//حداقل مبلغ سفارش تا استفاده از کد مجاز باشد
            $table->string('discount_value')->nullable(); //مبلغ تخفیف
            $table->string('discount_percent')->nullable(); //درصد تخفیف- یکی از موارد درصد یا مبلغ تخفیف فقط باید پر شود
            $table->integer('number_usable')->default(1); //در چند سفارش می توان استفاده کرد. پیش فرض یکبار مصرف
            $table->integer('expire_time'); //تاریخ اعتبار تخفیف
            $table->tinyInteger('incredible_offers_allowable')->default(0); //ایا درمورد پیشنهادهای شگفت انگیز قابل استفاده است یا خیر. پیش فرض خیر
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
        Schema::dropIfExists('discount_codes');
    }
}
