<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserAccess extends Model
{
    protected $table = 'user_accesses';
    protected $fillable = ['role_id', 'access'];

    const ACCESS_LIST = [
        'products' => [
            'label' => 'محصولات',
            'access' => [
                'add_edit_product' => ['label' => 'افزودن و ویرایش محصولات', 'routes' => [
                    'products.index', 'products.create', 'products.store', 'products.edit', 'products.update']
                ],
                'remove_product' => ['label' => 'حذف محصولات', 'routes' => [
                    'products.index', 'products.destroy']
                ],
                'restore_product' => ['label' => 'بازنشانی محصولات', 'routes' => [
                    'products.index', 'products.restore']
                ],
            ]
        ],
        'sliders' => [
            'label' => 'اسلایدر ها',
            'access' => [
                'add_edit_slider' => ['label' => 'افزودن و ویرایش اسلایدر ها', 'routes' => [
                    'sliders.index', 'sliders.create', 'sliders.store', 'sliders.edit', 'sliders.update']
                ],
                'remove_slider' => ['label' => 'حذف اسلایدر ها', 'routes' => [
                    'sliders.index', 'sliders.destroy']
                ],
                'restore_slider' => ['label' => 'بازنشانی اسلایدر ها', 'routes' => [
                    'sliders.index', 'sliders.restore']
                ],
            ]
        ],
        'brands' => [
            'label' => 'برند ها',
            'access' => [
                'add_edit_brand' => ['label' => 'افزودن و ویرایش برند ها', 'routes' => [
                    'brands.index', 'brands.create', 'brands.store', 'brands.edit', 'brands.update']
                ],
                'remove_brand' => ['label' => 'حذف برند ها', 'routes' => [
                    'brands.index', 'brands.destroy']
                ],
                'restore_brand' => ['label' => 'بازنشانی برند ها', 'routes' => [
                    'brands.index', 'brands.restore']
                ],
            ]
        ],
        'category' => [
            'label' => 'دسته بندی ها',
            'access' => [
                'add_edit_category' => ['label' => 'افزودن و ویرایش دسته بندی ها', 'routes' => [
                    'category.index', 'category.create', 'category.store', 'category.edit', 'category.update']
                ],
                'remove_category' => ['label' => 'حذف دسته بندی ها', 'routes' => [
                    'category.index', 'category.destroy']
                ],
                'restore_category' => ['label' => 'بازنشانی دسته بندی ها', 'routes' => [
                    'category.index', 'category.restore']
                ],
            ]
        ],
        'pages' => [
            'label' => 'صفحه ها',
            'access' => [
                'add_edit_page' => ['label' => 'افزودن و ویرایش صفحه ها', 'routes' => [
                    'pages.index', 'pages.create', 'pages.store', 'pages.edit', 'pages.update']
                ],
                'remove_page' => ['label' => 'حذف صفحه ها', 'routes' => [
                    'pages.index', 'pages.destroy']
                ],
                'restore_page' => ['label' => 'بازنشانی صفحه ها', 'routes' => [
                    'pages.index', 'pages.restore']
                ],
            ]
        ],
        'colors' => [
            'label' => 'رنگ ها',
            'access' => [
                'add_edit_color' => ['label' => 'افزودن و ویرایش رنگ ها', 'routes' => [
                    'colors.index', 'colors.create', 'colors.store', 'colors.edit', 'colors.update']
                ],
                'remove_color' => ['label' => 'حذف رنگ ها', 'routes' => [
                    'colors.index', 'colors.destroy']
                ],
                'restore_color' => ['label' => 'بازنشانی رنگ ها', 'routes' => [
                    'colors.index', 'colors.restore']
                ],
            ]
        ],
        'roles' => [
            'label' => 'نقش ها',
            'access' => [
                'add_edit_role' => ['label' => 'افزودن و ویرایش نقش ها', 'routes' => [
                    'roles.index', 'roles.create', 'roles.store', 'roles.edit', 'roles.update']
                ],
                'remove_role' => ['label' => 'حذف نقش ها', 'routes' => [
                    'roles.index', 'roles.destroy']
                ],
                'restore_role' => ['label' => 'بازنشانی نقش ها', 'routes' => [
                    'roles.index', 'roles.restore']
                ],
            ]
        ],
        'users' => [
            'label' => 'کاربر ها',
            'access' => [
                'add_edit_user' => ['label' => 'افزودن و ویرایش کاربر ها', 'routes' => [
                    'users.index', 'users.create', 'users.store', 'users.edit', 'users.update']
                ],
                'remove_user' => ['label' => 'حذف کاربر ها', 'routes' => [
                    'users.index', 'users.destroy']
                ],
                'restore_user' => ['label' => 'بازنشانی کاربر ها', 'routes' => [
                    'users.index', 'users.restore']
                ],
            ]
        ]
    ];
}
