<?php

namespace App\Http\Controllers\Admin;

use App\Comment;
use Illuminate\Http\Request;

class CommentController extends AdminBaseController
{
    protected $model = '\App\Comment';
    protected $routeName = 'comments';
    protected $modelName = 'دیدگاه';


    public function index(Request $request)
    {
        $comments = Comment::getData($request);
        $trashed_count = Comment::onlyTrashed()->count();
        return view('comment.index', compact('comments', 'trashed_count'));
    }

    public function changeStatus(Request $request)
    {
        if ($request->ajax()) {
            $comment = Comment::where('id', $request->comment_id)->first();
            if ($comment) {
                $comment->status = $comment->status == 1 ? 0 : 1;
                if ($comment->update()) {
                    return 'success';
                } else {
                    return 'error';
                }
            } else {
                return 'error';
            }
        }
    }

}
