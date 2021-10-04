<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminBaseController extends Controller
{
    /**
     * اعمال حذف و بازگردانی دسته جمعی برای چندین مدل استفاده می شود. به صورت اشتراکی از این کنترلر ارث خواهند برد
     */

    public function destroy($id)
    {
        $query_string = property_exists($this, 'query_string') ? '?' . $this->query_string : '';
        $cat = $this->model::withTrashed()->findOrFail($id);
        if ($cat->trashed()) {
            $cat->forceDelete();
            return redirect("admin/$this->routeName" . $query_string)->with('message', "$this->modelName مورد نظر با موفقیت حذف شد");
        } else {
            $cat->delete();
            return redirect("admin/$this->routeName" . $query_string)->with('message', "$this->modelName  مورد نظر با موفقیت به سطل زباله انتقال یافت");
        }
    }

    public function removeItems(Request $request)
    {
        $query_string = property_exists($this, 'query_string') ? '?' . $this->query_string : '';

        $ids = $request->get('data_checkboxes', array());
        foreach ($ids as $id) {
            $row = $this->model::withTrashed()->findOrFail($id);
            if ($row->trashed()) {
                $row->forceDelete();
            } else {
                $row->delete();
            }
        }
        return redirect("admin/$this->routeName".$query_string)->with('message', "$this->modelName های مورد نظر با موفقیت حذف شدند");

    }

    public function restoreItems(Request $request)
    {
        $query_string = property_exists($this, 'query_string') ? '?' . $this->query_string : '';
        $ids = $request->get('data_checkboxes', array());
        foreach ($ids as $id) {
            $row = $this->model::withTrashed()->findOrFail($id);
            $row->restore();
        }
        return redirect("admin/$this->routeName".$query_string)->with('message', "$this->modelName های مورد نظر با موفقیت بازگردانی شدند");

    }

    public function restore($id)
    {
        $query_string = property_exists($this, 'query_string') ? '?' . $this->query_string : '';
        $row = $this->model::withTrashed()->findOrFail($id);
        if ($row->trashed()) {
            $row->restore();
            return redirect("admin/$this->routeName".$query_string)->with('message', "$this->modelName مورد نظر با موفقیت بازگردانی شدند");
        }
    }

}
