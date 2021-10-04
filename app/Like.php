<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Like extends Model
{
    protected $table = 'likes';
    protected $fillable = ['row_id', 'table', 'user_id', 'type'];


    /**
     * متد مشترک برای لایک کامنت یا پرسش
     * type:افزودن لایک یا پس گرفتن لایک
     * $scoreType لایک یا دیس لایک
     */
    public static function likeItem($request, $scoreType)
    {
        $tableName = $request->get('table', '');
        $rowId = $request->get('row_id'); //آی دی آیتم لایک شده
        $user = Auth::user();
        if ($tableName == 'comments' || $tableName == 'questions') {
            $itemToLike = DB::table($tableName)->where('id', $rowId)->first();
            if ($itemToLike) {
                $likedOrDisliked = Like::where([
                    'row_id' => $rowId,
                    'user_id' => $user->id,
                    'table' => $tableName,
                    'type' => $scoreType
                ])->first();

                $item = DB::table($tableName)->where('id', $rowId);
                if ($likedOrDisliked) {
                    $likedOrDisliked->delete();
                    $item->decrement($scoreType, 1);
                    return 'decrement';
                } else {
                    $likedOrDisliked = Like::create([
                        'row_id' => $rowId,
                        'user_id' => $user->id,
                        'table' => $tableName,
                        'type' => $scoreType
                    ])->save();
                    $item->increment($scoreType, 1);
                    return 'increment';
                }
            } else {
                return 'error';
            }
        } else {
            return 'error';
        }
    }
}
