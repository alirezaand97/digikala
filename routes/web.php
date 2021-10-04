<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


//region site
Route::get('/', 'SiteController@index');
Route::get('/pages/{page}', 'SiteController@showPage');
Route::post('/product/like', 'SiteController@likeItem');
Route::post('/product/dislike', 'SiteController@dislikeItem');
Route::post('/product/favorite', 'SiteController@addFavoriteProduct')->middleware('auth');

Route::get('/product/comment/{product_id}', 'SiteController@commentForm')->middleware('auth');
Route::post('/product/comment/{product_id}', 'SiteController@addComment')->middleware('auth');
Route::post('/product/question/add', 'SiteController@addQuestion')->middleware('auth');
Route::get('/product/question/get/{product_id}', 'SiteController@getQuestions');
Route::get('/product/{product_id}/{product_url?}', 'SiteController@showProduct');
Route::post('ajax/change-product-color', 'SiteController@changeProductColor');
Route::get('/search/{cat_url}', 'SiteController@showCatProductsPage');
Route::get('/get-products/search/{cat_url}', 'SiteController@getCatProducts');
Route::get('/compare/{product_id1?}/{product_id2?}/{product_id3?}/{product_id4?}', 'SiteController@compareProducts');
Route::get('/brand/{brand}', 'SiteController@showBrandProductsPage');
Route::get('/get-products/brand/{brand}', 'SiteController@getBrandProducts');
Route::post('/get-compare-products', 'SiteController@getCompareProducts');
Route::post('/get-cat-brands', 'SiteController@getCatBrands');
Route::post('/share-product', 'SiteController@shareProductInEmail');


Route::get('/cart/get-data', 'SiteController@getCartData');

//endregion site

//region user auth
Route::get('/register-confirm', 'Auth\AuthController@registerConfirm')->middleware('guest');
Route::get('/change-mobile-confirm', 'Auth\AuthController@changeMobileConfirm')->middleware('auth');
Route::post('/verify-change-mobile', 'Auth\AuthController@verifyChangeMobile')->middleware('auth');
Route::post('/verify-user', 'Auth\AuthController@verifyUser')->middleware('guest')->name('verify-user');
Route::post('/ajax/resend-verify-code', 'Auth\AuthController@resendCode');
//endregion user auth

//region setting
Route::get('/admin/setting/send-time', 'Admin\SettingController@showSendTimeForm');
Route::post('/admin/setting/send-time', 'Admin\SettingController@changeSendTime');
Route::get('/admin/setting/shop', 'Admin\SettingController@showShopSetting');
Route::post('/admin/setting/shop', 'Admin\SettingController@saveShopSetting');
//endregion setting

//region cart and shopping
Route::post('/add-cart', 'CartController@addToCart')->name('add-cart');
Route::get('/show-cart', 'CartController@showCart');
Route::post('/site/cart/remove', 'CartController@removeCartItem');
Route::post('/site/cart/change-product-count', 'CartController@changeProductCount');

Route::get('/shipping', 'ShoppingController@showShipping');
Route::get('/shipping/get-send-data', 'ShoppingController@getSendData');
Route::post('/payment', 'ShoppingController@payment');
Route::get('/order/payment', 'ShoppingController@orderPayment');
Route::get('/order/verify', 'ShoppingController@orderVerify');
Route::post('/payment/set-gift', 'ShoppingController@setGift');
Route::post('/payment/set-discount', 'ShoppingController@setDiscount');

//endregion cart and shopping


Auth::routes();
Route::get(config('shop_setting.admin_login'), 'Auth\LoginController@showAdminLogin')->middleware('guest');


Route::get('/password/confirm', 'Auth\ForgotPasswordController@forgetPassword')->middleware('guest');
Route::post('/password/confirm', 'Auth\ForgotPasswordController@checkConfirmPassword')->middleware('guest');
Route::get('/home', 'HomeController@index')->name('home');


Route::prefix('admin')->middleware(['auth'])->group(function () {

    //region category
    Route::get('/', 'Admin\AdminController@index');
    Route::resource('category', 'Admin\CategoryController');
    Route::post('/category/remove_items', 'Admin\CategoryController@removeItems');
    Route::post('/category/restore_items', 'Admin\CategoryController@restoreItems');
    Route::post('/category/restore/{category}', 'Admin\CategoryController@restore');
    //endregion category

    //region brand
    Route::resource('brands', 'Admin\BrandController');
    Route::post('/brands/remove_items', 'Admin\BrandController@removeItems');
    Route::post('/brands/restore_items', 'Admin\BrandController@restoreItems');
    Route::post('/brands/restore/{category}', 'Admin\BrandController@restore');
    //endregion brand


    //region pages
    Route::resource('pages', 'Admin\PageController');
    Route::post('/pages/remove_items', 'Admin\PageController@removeItems');
    Route::post('/pages/restore_items', 'Admin\PageController@restoreItems');
    Route::post('/pages/restore/{category}', 'Admin\PageController@restore');

    //endregion pages

    //region color

    Route::resource('colors', 'Admin\ColorController');
    Route::post('/colors/remove_items', 'Admin\ColorController@removeItems');
    Route::post('/colors/restore_items', 'Admin\ColorController@restoreItems');
    Route::post('/colors/restore/{category}', 'Admin\ColorController@restore');
    //endregion color


    //region color

    Route::resource('roles', 'Admin\RoleController');
    Route::post('/roles/remove_items', 'Admin\RoleController@removeItems');
    Route::post('/roles/restore_items', 'Admin\RoleController@restoreItems');
    Route::post('/roles/restore/{category}', 'Admin\RoleController@restore');
    //endregion color
    //
    // //region color

    Route::resource('users', 'Admin\UserController');
    Route::post('/users/remove_items', 'Admin\UserController@removeItems');
    Route::post('/users/restore_items', 'Admin\UserController@restoreItems');
    Route::post('/users/restore/{category}', 'Admin\UserController@restore');
    //endregion color

    //region product

    Route::resource('products', 'Admin\ProductController');
    Route::post('/products/remove_items', 'Admin\ProductController@removeItems');
    Route::post('/products/restore_items', 'Admin\ProductController@restoreItems');
    Route::post('/products/restore/{category}', 'Admin\ProductController@restore');
    Route::get('/products/gallery/{id}', 'Admin\ProductController@gallery');
    Route::post('/products/gallery_upload/{id}', 'Admin\ProductController@uploadGallery');
    Route::delete('/products/gallery/{id}', 'Admin\ProductController@removeImage');
    Route::post('/products/change_image_position/{id}', 'Admin\ProductController@changeImagePosition');
    Route::get('/products/{id}/specification', 'Admin\ProductController@specificationValue');
    Route::post('/products/{id}/specification', 'Admin\ProductController@CreateProductSpecificationValue');
    Route::get('/products/{id}/filters', 'Admin\ProductController@productFilters');
    Route::post('/products/{id}/filters', 'Admin\ProductController@createProductFilters');
    //endregion product

    //region warranty

    Route::resource('warranties', 'Admin\WarrantyController');
    Route::post('/warranties/remove_items', 'Admin\WarrantyController@removeItems');
    Route::post('/warranties/restore_items', 'Admin\WarrantyController@restoreItems');
    Route::post('/warranties/restore/{category}', 'Admin\WarrantyController@restore');
    //endregion warranty

    //region product warranty

    Route::resource('product_warranties', 'Admin\ProductWarrantyController');
    Route::post('/product_warranties/remove_items', 'Admin\ProductWarrantyController@removeItems');
    Route::post('/product_warranties/restore_items', 'Admin\ProductWarrantyController@restoreItems');
    Route::post('/product_warranties/restore/{category}', 'Admin\ProductWarrantyController@restore');
    //endregion product warranty

    //region slider

    Route::resource('sliders', 'Admin\SliderController');
    Route::post('/sliders/remove_items', 'Admin\SliderController@removeItems');
    Route::post('/sliders/restore_items', 'Admin\SliderController@restoreItems');
    Route::post('/sliders/restore/{category}', 'Admin\SliderController@restore');
    //endregion slider

    //region filters

    Route::get('/category/{id}/filters', 'Admin\FilterController@index');
    Route::post('/category/{id}/filters/add', 'Admin\FilterController@addFilter');
    Route::delete('/category/filters/{id}', 'Admin\FilterController@deleteFilter');
    //endregion filters

    //region specification
    Route::get('/category/{id}/specifications', 'Admin\SpecificationController@index');
    Route::post('/category/{id}/specifications/add', 'Admin\SpecificationController@addSpecification');
    Route::delete('/category/specifications/{id}', 'Admin\SpecificationController@deleteSpecification');
    //endregion specification

    //region offers

    Route::get('incredible-offers', 'Admin\AdminController@incredibleOffers');
    Route::get('ajax/product-warranty', 'Admin\AdminController@getProductWarranty');
    Route::post('/incredible-offers/add/{id}', 'Admin\AdminController@addOffer');
    Route::post('/incredible-offers/delete/{id}', 'Admin\AdminController@deleteOffer');
    //endregion offers

    //region province

    Route::resource('provinces', 'Admin\ProvinceController');
    Route::post('/provinces/remove_items', 'Admin\ProvinceController@removeItems');
    Route::post('/provinces/restore_items', 'Admin\ProvinceController@restoreItems');
    Route::post('/provinces/restore/{category}', 'Admin\ProvinceController@restore');
    //endregion province

    //region city

    Route::resource('cities', 'Admin\CityController');
    Route::post('/cities/remove_items', 'Admin\CityController@removeItems');
    Route::post('/cities/restore_items', 'Admin\CityController@restoreItems');
    Route::post('/cities/restore/{category}', 'Admin\CityController@restore');
    //endregion city

    //region discount code

    Route::resource('discount-codes', 'Admin\DiscountCodeController');
    Route::post('/discount-codes/remove_items', 'Admin\DiscountCodeController@removeItems');
    Route::post('/discount-codes/restore_items', 'Admin\DiscountCodeController@restoreItems');
    Route::post('/discount-codes/restore/{category}', 'Admin\DiscountCodeController@restore');
    //endregion discount code


    //region discount code

    Route::resource('reviews', 'Admin\ReviewController');
    Route::post('/reviews/remove_items', 'Admin\ReviewController@removeItems');
    Route::post('/reviews/restore_items', 'Admin\ReviewController@restoreItems');
    Route::post('/reviews/restore/{category}', 'Admin\ReviewController@restore');
    //endregion discount code

    //region discount code

    Route::resource('commissions', 'Admin\CommissionController');
    Route::post('/commissions/remove_items', 'Admin\CommissionController@removeItems');
    Route::post('/commissions/restore_items', 'Admin\CommissionController@restoreItems');
    Route::post('/commissions/restore/{category}', 'Admin\CommissionController@restore');
    //endregion discount code

    //region comments
    Route::post('/product/comments/status/change', 'Admin\CommentController@changeStatus');
    Route::resource('comments', 'Admin\CommentController');
    Route::post('/comments/remove_items', 'Admin\CommentController@removeItems');
    Route::post('/comments/restore_items', 'Admin\CommentController@restoreItems');
    Route::post('/comments/restore/{category}', 'Admin\CommentController@restore');
    //endregion comments

    //region question
    Route::post('/product/question/status/change', 'Admin\QuestionController@changeStatus');
    Route::resource('questions', 'Admin\QuestionController');
    Route::post('/questions/remove_items', 'Admin\QuestionController@removeItems');
    Route::post('/questions/restore_items', 'Admin\QuestionController@restoreItems');
    Route::post('/questions/restore/{category}', 'Admin\QuestionController@restore');
    //endregion question

    //region stockroom
    Route::get('stockrooms/input/add', 'Admin\StockroomController@addInput');
    Route::get('stockrooms/input/get-products', 'Admin\StockroomController@getProductWarranty');
    Route::post('stockrooms/add-input', 'Admin\StockroomController@saveEvent');
    Route::get('stockrooms/input/events', 'Admin\StockroomController@getInputEvents');
    Route::get('stockrooms/input/events/{event_id}', 'Admin\StockroomController@showInputEventProducts');

    Route::get('stockrooms/output/exit', 'Admin\StockroomController@exitOutput');
    Route::get('stockrooms/output/get-products', 'Admin\StockroomController@getInventoryForOutput');
    Route::get('stockrooms/output/events', 'Admin\StockroomController@getOutputEvents');
    Route::get('stockrooms/output/events/{event_id}', 'Admin\StockroomController@showOutputEventProducts');

    Route::resource('stockrooms', 'Admin\StockroomController');
    Route::post('/stockrooms/remove_items', 'Admin\StockroomController@removeItems');
    Route::post('/stockrooms/restore_items', 'Admin\StockroomController@restoreItems');
    Route::post('/stockrooms/restore/{category}', 'Admin\StockroomController@restore');
    //endregion stockroom

    //region factor
    Route::get('stockrooms/input/events/{event_id}/factor', 'Admin\StockroomController@inputEventFactor');
    Route::get('stockrooms/output/events/{event_id}/factor', 'Admin\StockroomController@outputEventFactor');
    Route::get('/{id}/factor', 'Admin\OrderController@submissionFactor');

    //endregion factor

    //region order
    Route::get('/orders/return-product', 'Admin\OrderController@returnProductsList');
    Route::post('/orders/return-product/remove', 'Admin\OrderController@removeReturnProduct');
    Route::get('/orders/return-product/{id}', 'Admin\OrderController@showReturnProductDetail');
    Route::post('/orders/return-product/{id}', 'Admin\OrderController@setReturnProduct');


    Route::get('/orders', 'Admin\OrderController@index');
    Route::get('/orders/{order_id}/show', 'Admin\OrderController@showOrder');
    Route::post('/orders/restore_items', 'Admin\OrderController@restoreItems');
    Route::post('/orders/restore/{category}', 'Admin\OrderController@restore');
    Route::post('/orders/status/update', 'Admin\OrderController@updateStatus');
    Route::get('/orders/submissions/{id}/info', 'Admin\OrderController@submissionInfo');
    Route::get('/orders/submissions', 'Admin\OrderController@submission');
    Route::get('/orders/submissions/approved', 'Admin\OrderController@submissionApproved');
    Route::get('/orders/submissions/today', 'Admin\OrderController@submissionToday');
    Route::get('/orders/submissions/ready', 'Admin\OrderController@submissionReady');
    Route::get('/orders/submissions/posting/send', 'Admin\OrderController@submissionPostingSend');
    Route::get('/orders/submissions/posting/receive', 'Admin\OrderController@submissionPostingReceive');
    Route::get('/orders/submissions/delivered/customer', 'Admin\OrderController@submissionDelivered');
    //endregion order

    //region access
    Route::get('/access/role/{role_id}', 'Admin\UserAccessController@showRoleAccess');
    Route::post('/access/role/{role_id}', 'Admin\UserAccessController@addUserAccess');
    //endregion access

    //region report
    Route::get('/report/overall-sale', 'Admin\AdminController@overallSaleReport');
    Route::get('/report/overall-sale/get-data', 'Admin\AdminController@getOverallSaleReport');
    Route::get('/report/product-sale/get-data', 'Admin\ProductController@getProductSaleReport');
    Route::get('/report/product-sale/{product_id}', 'Admin\ProductController@productSaleReport');
    //endregion report


});

//region api
Route::get('/shop/products/comments', 'ApiController@getProductComment');

//endregion api

Route::prefix('user')->middleware('auth')->group(function () {
    Route::post('address/add', 'UserController@addAddress');
    Route::post('address/update', 'UserController@updateAddress');
    Route::delete('address/remove', 'UserController@removeAddress');
    Route::post('address/change-selected', 'UserController@changeSelectedAddress');
    Route::get('/profile', 'UserProfileController@profile');
    Route::get('profile/gift-cart', 'UserProfileController@giftCart');
    Route::get('profile/orders', 'UserProfileController@getUserOrders');
    Route::get('profile/orders/{order_id}', 'UserProfileController@getOrder');
    Route::get('profile/additional-info', 'UserProfileController@additionalInfo');
    Route::post('profile/additional-info', 'UserProfileController@saveAdditionalInfo');
    Route::post('profile/legal-info', 'UserProfileController@saveLegalInfo');
    Route::get('profile/address', 'UserProfileController@addresses');
    Route::get('profile/favorites', 'UserProfileController@showFavorites');
    Route::get('profile/favorites/get-list', 'UserProfileController@favorites');
    Route::post('profile/favorites/remove', 'UserProfileController@removeFavorite');
    Route::get('address-list', 'UserProfileController@getUserAddressList');

});

Route::get('test', function () {
    return get_timestamp_from_jalali('1399/9/13', true);
});
