<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommentScore extends Model
{
    protected $table = 'comment_scores';
    protected $fillable = ['comment_id', 'product_id', 'score1', 'score2', 'score3', 'score4', 'score5', 'score6'];

    const SCORE_TYPES = [0 => 'خیلی بد', 1 => 'بد', 2 => 'معمولی', 3 => 'خوب', 4 => 'خیلی خوب'];
}
