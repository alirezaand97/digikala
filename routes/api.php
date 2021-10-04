<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::group(['namespace' => '\Laravel\Passport\Http\Controllers','middleware'=>'cors'], function ($router) {
//    $router->post('login', [
//        'as' => 'auth.login',
//        'uses' => 'AccessTokenController@issueToken',
//        'middleware' => ['throttle']
//    ]);
//});


Route::group(['middleware'=>'cors'],function ($router){
    Route::post('/seller-register/first-step', 'SellerController@registerFirstStep');
    Route::post('/seller-register/second-step', 'SellerController@registerSecondStep');
    Route::post('/seller-register/third-step', 'SellerController@registerThirdStep');
    Route::post('/seller-register/resend-code', 'SellerController@resendActiveCode');
    Route::post('/seller-register/documents', 'SellerController@saveSellerDocuments');
    Route::get('seller/get-provinces', 'ShoppingController@getProvinces');

    Route::get('get-provinces', 'ShoppingController@getProvinces');
    Route::get('get-cities', 'ShoppingController@getCities');
    Route::get('/chart/get-data/{product_id}', 'ApiController@getChartData');
    Route::post('/get-prices/{product_id}/{color_id}', 'ApiController@getMoreProductPrice');
});




