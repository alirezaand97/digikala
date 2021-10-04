<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdditionalInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('additional_infos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('national_identity_number');
            $table->string('mobile_phone');
            $table->string('email')->nullable();
            $table->string('company_name')->nullable();//برخی اطلاعات مربوط به کاربران حقوقی
            $table->string('company_economic_number')->nullable();
            $table->string('company_registration_number')->nullable();
            $table->string('company_national_identity_number')->nullable();
            $table->string('company_phone')->nullable();
            $table->integer('province_id')->nullable();
            $table->integer('city_id')->nullable();
            $table->string('bank_card_number')->nullable();
            $table->string('newsletter')->nullable();//خبر نامه
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
        Schema::dropIfExists('additional_infos');
    }
}
