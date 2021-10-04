<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'mobile', 'password', 'active_code', 'account_status', 'role', 'role_id', 'username', 'name', 'forget_password_code'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    const USER_INACTIVE = 'InActive';
    const USER_ACTIVE = 'Active';
    const USER_STATUS = [User::USER_INACTIVE, User::USER_ACTIVE];

    const USER_ADMIN = 'admin';
    const USER_NORMAL = 'user';
    const USER_ROLES = [User::USER_ADMIN, User::USER_NORMAL];


    public function address()
    {
        return $this->hasMany(Address::class, 'user_id', 'id');
    }


    public static function getData($request)
    {
        $url = '?';
        $users = User::with('getUserRole')->orderBy('id', 'ASC');

        if (in_trashed($request)) {
            $users = self::onlyTrashed();
            $url = create_paginate_url($url, 'trashed=true');
        }

        if (isset($_GET['name']) && $_GET['name'] != '') {
            $users->withTrashed()->where('name', 'like', '%' . $_GET['name'] . '%');
        }

        if (isset($_GET['mobile']) && $_GET['mobile'] != '') {
            $users->withTrashed()->where('mobile', 'like', '%' . $_GET['mobile'] . '%');
        }

        if (isset($_GET['account_status']) && $_GET['account_status'] != '') {
            $users->withTrashed()->where('account_status', $_GET['account_status']);
        }

        if (isset($_GET['role']) && $_GET['role'] != '') {
            if ($_GET['role'] == 'admin') {
                $users->withTrashed()->where('role', 'like', '%' . $_GET['role'] . '%');
            } else if ($_GET['role'] == 'user') {
                $users->withTrashed()->where(['role' => 'user']);
            } else {
                $users->withTrashed()->where(['role' => 'user', 'role_id' => $_GET['role']]);
            }
        }

        $users = $users->paginate(10);
        $users = $users->withPath($url);
        return $users;
    }

    public function getUserRole()
    {
        return $this->hasOne(Role::class, 'id', 'role_id');
    }

    //این تابع را اضافه می کنیم تا از موبایل به جای ایمیل در جدول توکن های فراموشی رمز عبور استفاده کند
    public function getEmailForPasswordReset()
    {
        return $this->mobile;
    }



}
