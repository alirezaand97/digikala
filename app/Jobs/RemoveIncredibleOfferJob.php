<?php

namespace App\Jobs;

use App\Offers;
use App\ProductWarranty;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class RemoveIncredibleOfferJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public $productWarrantyId;

    public function __construct($productWarrantyId)
    {
        $this->productWarrantyId = $productWarrantyId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $productWarranty = ProductWarranty::where('id', $this->productWarrantyId)->firstOrFail();

        //با آپدیت یک پیشنهاد ممکن است چند جاب برای یک پیشنهاد ایجاد شود. شرط زیر برای عدم اجرای جاب های دیگر است
        //زمان جاب را بررسی می کنیم تا جاب درست اجرا شود
        if ($productWarranty && $productWarranty->is_offer == 1 && $productWarranty->offers_end_time <= time()) {
            $offer = new Offers();
            $offer->deleteOffer($productWarranty);
        }
    }
}
