<?php

namespace App\Http\Controllers\Admin;

use App\InventoryList;
use App\ProductWarranty;
use App\Seller;
use App\Stockroom;
use App\StockroomEvent;
use Illuminate\Database\Eloquent\Builder as BuilderAlias;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use function GuzzleHttp\Promise\all;

class StockroomController extends AdminBaseController
{
    protected $model = '\App\Stockroom';
    protected $routeName = 'stockrooms';
    protected $modelName = ' انبار';

    public function index(Request $request)
    {
        $stockrooms = Stockroom::getData($request);
        $trashed_count = Stockroom::onlyTrashed()->count();
        return view('stockroom.index', ['stockrooms' => $stockrooms, 'trashed_count' => $trashed_count, 'search' => $request->get('search')]);
    }


    public function create()
    {
        return view('stockroom.create');
    }


    public function store(Request $request)
    {
        $this->validate($request, ['name' => 'nullable|unique:stockrooms', 'description' => 'nullable'], [], ['name' => 'نام انبار', 'description' => 'توضیحات']);
        $stockroom = new Stockroom();
        $stockroom->name = $request->name;
        $stockroom->description = $request->description;
        $stockroom->save();
        return redirect('admin/stockrooms')->with('message', 'انبار جدید با موفقیت ایجاد شد');
    }


    public function edit($id)
    {
        $stockroom = Stockroom::findOrFail($id);
        return view('stockroom.edit', compact('stockroom'));
    }


    public function update(Request $request, $id)
    {
        $this->validate($request, ['name' => 'nullable|unique:stockrooms,name,' . $id . '', 'description' => 'nullable'], [], ['name' => 'نام انبار', 'description' => 'توضیحات']);
        $stockroom = Stockroom::findOrFail($id);
        $stockroom->update($request->all());
        return redirect('admin/stockrooms')->with('message', 'انبار با موفقیت به روز رسانی شد');
    }

    public function addInput(Request $request)
    {
        $stockrooms = Stockroom::get();
        return view('stockroom.input', compact('stockrooms'));
    }

    public function exitOutput(Request $request)
    {
        $stockrooms = Stockroom::get();
        return view('stockroom.output', compact('stockrooms'));
    }

    public function getProductWarranty(Request $request)
    {
        $search = $request->get('search', '');
        $productWarranty = ProductWarranty::with(['getColor', 'getWarranty', 'getProduct', 'getSeller']);
        define('search', $search);
        if (!empty($search)) {
            $productWarranty = $productWarranty->whereHas('getProduct', function (BuilderAlias $query) {
                $query->where('title', 'like', '%' . search . '%');
            });
        } else {
            $productWarranty = $productWarranty->whereHas('getProduct');
        }

        $productWarranty = $productWarranty->paginate(10);
        return $productWarranty;
    }

    public function getInventoryForOutput(Request $request)
    {
        $stockroomId = $request->get('stockroom_id', 0);
        $search = $request->get('search', '');
        define('search', $search);
        $inventoryList = InventoryList::where('stockroom_id', $stockroomId)
            ->where('product_count', '>', 0)
            ->with(['getProductWarranty' => function ($query) {
                $query->with(['getSeller', 'getColor', 'getWarranty', 'getProduct']);
            }])->whereHas('getProductWarranty', function (BuilderAlias $query) {
                $query->whereHas('getProduct', function (BuilderAlias $query2) {
                    $query2->where('title', 'like', '%' . search . '%');
                });
            })
            ->orderBy('id', 'DESC')
            ->paginate(10);

        return $inventoryList;
    }

    public function saveEvent(Request $request)
    {
        return Stockroom::saveProducts($request);
    }

    public function getInputEvents(Request $request)
    {
        $stockrooms = ['' => 'انتخاب انبار'] + Stockroom::pluck('name', 'id')->toArray();
        $events = Stockroom::getEvents($request, 'input');
        return view('stockroom.input-events', compact('stockrooms', 'events', 'request'));
    }

    public function getOutputEvents(Request $request)
    {
        $stockrooms = ['' => 'انتخاب انبار'] + Stockroom::pluck('name', 'id')->toArray();
        $events = Stockroom::getEvents($request, 'output');
        return view('stockroom.output-events', compact('stockrooms', 'events', 'request'));
    }

    public function showInputEventProducts(Request $request, $event_id)
    {
        $data = Stockroom::getEventProducts($request, 'input', $event_id);
        $stockroomEvent = $data['stockroomEvent'];
        $eventProducts = $data['eventProducts'];
        $search = $request->get('search', '');
        return view('stockroom.event-products', compact('stockroomEvent', 'eventProducts', 'search'));
    }

    public function showOutputEventProducts(Request $request, $event_id)
    {
        $data = Stockroom::getEventProducts($request, 'output', $event_id);
        $stockroomEvent = $data['stockroomEvent'];
        $eventProducts = $data['eventProducts'];
        $search = $request->get('search', '');

        return view('stockroom.output-event-products', compact('stockroomEvent', 'eventProducts', 'search'));
    }


    public function show($id, Request $request)
    {
        $stockroom = Stockroom::findOrFail($id);
        $sellers = ['' => 'انتخاب فروشنده', 0 => 'دیجی کالا'] + Seller::pluck('brand_name', 'id')->toArray();
        $inventoryLists = InventoryList::getStockroomInventory($id, $request);
        return view('stockroom.inventory-products', compact('inventoryLists', 'stockroom', 'request', 'sellers'));

    }

    public function inputEventFactor(Request $request, $event_id)
    {
        $data = Stockroom::getEventProducts($request, 'input', $event_id);
        $stockroomEvent = $data['stockroomEvent'];
        $eventProducts = $data['eventProducts'];
        return view('factor.stockroom-event-factor', compact('stockroomEvent', 'eventProducts'));
    }

    public function outputEventFactor(Request $request, $event_id)
    {

        $data = Stockroom::getEventProducts($request, 'output', $event_id);
        $stockroomEvent = $data['stockroomEvent'];
        $eventProducts = $data['eventProducts'];
        return view('factor.stockroom-event-factor', compact('stockroomEvent', 'eventProducts'));
    }
}
