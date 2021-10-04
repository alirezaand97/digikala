<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Setting extends Model
{
    protected $table = 'settings';
    protected $fillable = ['option_name', 'option_value'];

    public function setData(array $all)
    {
        $fetchData = array();
        foreach ($all as $optionName => $optionValue) {
            if ($optionName != '_token') {
                if ($this->settingAlreadyExist($optionName)) {
                    Setting::where('option_name', $optionName)->update([
                        'option_value' => $optionValue
                    ]);
                    $fetchData[$optionName] = $optionValue;
                } else {
                    Setting::create([
                        'option_name' => $optionName,
                        'option_value' => $optionValue
                    ])->save();
                    $fetchData[$optionName] = $optionValue;
                }

            }
        }
        return $fetchData;
    }

    public function settingAlreadyExist($optionName)
    {
        $setting = Setting::where('option_name', $optionName)->first();
        if ($setting) {
            return true;
        } else {
            return false;
        }

    }

    public function getData($keysArray)
    {
        $fetchData = array();
        foreach ($keysArray as $optionName) {
            $row = Setting::where('option_name', $optionName)->first();
            if ($row) {
                $fetchData[$optionName] = $row->option_value;
            } else {
                $fetchData[$optionName] = '';
            }
        }
        return $fetchData;
    }

    public function saveShopSetting(Request $request)
    {
        $config = config('shop_setting');
        foreach ($request->all() as $key => $item) {
            if ($key !== '_token' && !empty($item)) {
                if ($request->hasFile($key)) {
                    $isImage = is_image_file($request, $key);
                    if ($isImage) {
                        $imageUrl = upload_file($request, $key, 'upload');
                        if ($imageUrl) {
                            $config[$key] = 'files/upload/' . $imageUrl;
                        }
                    }
                } elseif ($key === 'keywords') {
                    $item = convert_keywords($item);
                    $config[$key] = $item;
                } else {
                    $config[$key] = $item;
                }
            }
        }
        $configFileContent = '<?php
return ' . var_export($config, true) . ';';

        file_put_contents(config_path('shop_setting.php'), $configFileContent);
    }
}
