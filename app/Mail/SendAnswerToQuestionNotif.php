<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendAnswerToQuestionNotif extends Mailable
{
    use Queueable, SerializesModels;
    public $answer;
    public $question;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($question, $answer)
    {
        $this->question = $question;
        $this->answer = $answer;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.answer-notif')->subject('دریافت پاسخ- دیجی کالا');
    }
}
