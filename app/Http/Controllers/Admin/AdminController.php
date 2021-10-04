<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jdf;
use App\Offers;
use App\Order;
use App\ProductWarranty;
use App\SaleStatistic;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $data = Order::orderChartData();
        $datesString = $data['datesString'];
        $countString = $data['countString'];
        $priceString = $data['priceString'];
        return view('admin.index', compact('datesString', 'countString', 'priceString'));
    }

    /**
     * مدیریت پیشنهادات شگفت انگیز
     */
    public function incredibleOffers()
    {
        return view('admin.incredible-offers');
    }

    /**
     * درخواست از طریق vue و دریافت تنوع قیمت ها
     * (whereHas)تنوع قیمت هایی که گارانتی و محصول دارند را می خواهیم
     */
    public function getProductWarranty(Request $request)
    {
        $searchValue = $request->search;
        $productWarranty = ProductWarranty::with(['getColor', 'getWarranty', 'getProduct'])
            ->orderBy('is_offer', 'DESC')
            ->whereHas('getWarranty');
        if ($request->has('search') && $searchValue != '') {
            $productWarranty = $productWarranty->whereHas('getProduct', function (Builder $query) use ($searchValue) {
                $query->where('title', 'like', '%' . $searchValue . '%');
            });
        } else {
            $productWarranty = $productWarranty->whereHas('getProduct');
        }
        $productWarranty = $productWarranty->paginate(10);
        return $productWarranty;
    }

    public function addOffer($id, Request $request)
    {
        $productWarranty = ProductWarranty::where('id', $id)->firstOrFail();
        $offers = new Offers();
        $result = $offers->addOffer($request, $productWarranty);
        return $result;
    }

    public function deleteOffer($id, Request $request)
    {
        $productWarranty = ProductWarranty::where('id', $id)->firstOrFail();
        $offers = new Offers();
        $result = $offers->deleteOffer($productWarranty);
        return $result;

    }

    public function overallSaleReport(Request $request)
    {
        return view('admin.sale-report');

    }

    public function getOverallSaleReport(Request $request)
    {
        $jdf = new Jdf();
        $now = $jdf->tr_num($jdf->jdate('Y'));
        $selectedYear = !empty($request->get('selected_year')) ? $request->get('selected_year') : $now;
        $whereClause = ['year' => $selectedYear];
        return get_sale_report('sale_statistics', $request, $selectedYear, $whereClause, $now);
    }


}
