    <?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Color extends Model
{
    use SoftDeletes;
    protected $table = 'colors';
    protected $fillable = ['name', 'code'];

    public static function getData($request)
    {
        $url = '?';
        $color = Color::orderBy('id', 'ASC');

        if (in_trashed($request)) {
            $color = self::onlyTrashed();
            $url = create_paginate_url($url, 'trashed=true');
        }

        if (isset($_GET['search']) && $_GET['search']!='') {
            $searchVal=$_GET['search'];
            $color->withTrashed()->where('name','like','%'.$searchVal.'%');
        }

        $color = $color->paginate(10);
        $color = $color->withPath($url);
        return $color;
    }

}
