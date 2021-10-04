<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Comment extends Model
{
    protected $table = 'comments';
    protected $fillable = ['product_id', 'user_id', 'title', 'content', 'order_id', 'time', 'like', 'dislike', 'advantage', 'disadvantage', 'status'];
    use SoftDeletes;
    public static function addComment($product, $request)
    {

        DB::beginTransaction();
        try {
            $advantage = comment_get_item($request->get('positive_points', array()));
            $disadvantage = comment_get_item($request->get('negative_points', array()));
            $orderId = get_comment_order_id($product, auth()->id());

            $comment = new Comment($request->all());
            $comment->user_id = auth()->id();
            $comment->order_id = $orderId;
            $comment->time = time();
            $comment->product_id = $product->id;
            $comment->advantage = $advantage;
            $comment->disadvantage = $disadvantage;
            $comment->save();
            $score = sum_score($product, $request->get('score_item', array()));
            $scoreCount = $product->score_count + 1;
            $product->score = $score;
            $product->score_count = $scoreCount;
            $product->save();

            $commentScore = new CommentScore();
            $commentScore->comment_id = $comment->id;
            $commentScore->product_id = $product->id;
            $commentScore->score1 = $request->score_item[0];
            $commentScore->score2 = $request->score_item[1];
            $commentScore->score3 = $request->score_item[2];
            $commentScore->score4 = $request->score_item[3];
            $commentScore->score5 = $request->score_item[4];
            $commentScore->score6 = $request->score_item[5];
            $commentScore->save();
            DB::commit();
            return 'success';
        } catch (\Exception $e) {
            DB::rollBack();
            return 'error';
        }

    }

    public function getUserInfo()
    {
        return $this->hasOne(AdditionalInfo::class, 'user_id', 'user_id')
            ->select(['id','user_id','first_name','last_name']);
    }

    public function getScore()
    {
        return $this->hasOne(CommentScore::class, 'comment_id', 'id');
    }

    public function getProduct()
    {
        return $this->hasOne(Product::class, 'id', 'product_id')
            ->select(['id','title'])->withDefault(['title'=>'محصول حذف شده است']);
    }



    public static function getData($request)
    {
        $url = '?';
        $comment = Comment::with(['getUserInfo','getScore','getProduct'])->orderBy('id', 'ASC');

        if (in_trashed($request)) {
            $comment = self::onlyTrashed();
            $url = create_paginate_url($url, 'trashed=true');
        }

        if (isset($_GET['search']) && $_GET['search']!='') {
            $searchVal=$_GET['search'];
            $comment->withTrashed()->where('id',$_GET['search']);
        }

        $comment = $comment->paginate(10);
        $comment = $comment->withPath($url);
        return $comment;
    }

    public function getAdvantageAttribute($value)
    {
       return explode('**',$value);
    }
    public function getDisadvantageAttribute($value)
    {
       return explode('**',$value);
    }

}
