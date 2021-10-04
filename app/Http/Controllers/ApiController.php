<?php

namespace App\Http\Controllers;

use App\Cart;
use App\Comment;
use App\CommentScore;
use App\Like;
use App\ProductPrice;
use App\ProductWarranty;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function getProductComment(Request $request)
    {
        $productId = $request->product_id;
        $orderBy = $request->order_by;
        $count = CommentScore::where(['product_id' => $productId, 'status' => 1])->count();
        $score1 = CommentScore::where(['product_id' => $productId, 'status' => 1])->sum('score1');
        $score2 = CommentScore::where(['product_id' => $productId, 'status' => 1])->sum('score2');
        $score3 = CommentScore::where(['product_id' => $productId, 'status' => 1])->sum('score3');
        $score4 = CommentScore::where(['product_id' => $productId, 'status' => 1])->sum('score4');
        $score5 = CommentScore::where(['product_id' => $productId, 'status' => 1])->sum('score5');
        $score6 = CommentScore::where(['product_id' => $productId, 'status' => 1])->sum('score6');

        if ($count > 0) {
            $score1 = $score1 / $count;
            $score2 = $score2 / $count;
            $score3 = $score3 / $count;
            $score4 = $score4 / $count;
            $score5 = $score5 / $count;
            $score6 = $score6 / $count;
        }

        $comments = Comment::with(['getUserInfo', 'getScore', 'getProduct'])
            ->whereHas('getScore')
            ->where(['product_id' => $productId, 'status' => 1]);
        if ($orderBy == 1) {
            $comments = $comments->orderBy('order_id', 'DESC');
        } else if ($orderBy == 2) {
            $comments = $comments->orderBy('like', 'DESC');

        } else if ($orderBy == 3) {
            $comments = $comments->orderBy('id', 'DESC');

        }
        $comments = $comments->paginate(4);
        $avg = round(($score1 + $score2 + $score3 + $score4 + $score5 + $score6) / 6);
        $response = [
            'comments' => $comments,
            'scores' => [$score1, $score2, $score3, $score4, $score5, $score6],
            'count' => $count,
            'avg' => $avg
        ];
        return $response;
    }

    public function getChartData($product_id)
    {
        return ProductPrice::getChartData($product_id);
    }

    public function getMoreProductPrice($product_id, $color_id)
    {
        return ProductWarranty::where(['product_id' => $product_id, 'color_id' => $color_id])
            ->with('getSeller:brand_name,id')
            ->with('getWarranty')
            ->orderBy('price2', 'ASC')
            ->get();
    }


}
