<?php

namespace App\Http\Controllers\Admin;

use App\Question;
use Illuminate\Http\Request;

class QuestionController extends AdminBaseController
{
    protected $model = '\App\Question';
    protected $routeName = 'questions';
    protected $modelName = 'پرسش';


    public function index(Request $request)
    {
        $questions = Question::getData($request);
        $trashed_count = Question::onlyTrashed()->count();
        return view('question.index', compact('questions', 'trashed_count'));
    }

    public function changeStatus(Request $request)
    {
        if ($request->ajax()) {
            $question = Question::where('id', $request->question_id)->first();
            if ($question) {
                $question->status = $question->status == 1 ? 0 : 1;
                if ($question->update()) {
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
