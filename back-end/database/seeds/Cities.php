<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Cities extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $cities =(array)json_decode('{ "ALY": "الإسكندرية", "AST": "أسيوط", "ASW": "أسوان", "BAS": "بني سويف", "BNH": "بنها", "CAI": "القاهرة", "DAM": "دمياط", "DMN": "دمنهور", "EAH": "العريش", "EMY": "المنيا", "FYM": "الفيوم", "GIZ": "الجيزة", "HLW": "حلوان", "HRG": "الغردقة", "ISM": "الإسماعيلية", "KSH": "كفر الشيخ", "LXR": "الأقصر", "MAN": "المنصورة", "MEK": "المحلة الكبرى", "MUH": "مرسى مطروح", "NVX": "الوادي الجديد", "OCT": "ستة اكتوبر", "PSD": "بور سعيد", "QEN": "قنا", "RAM": "العاشر من رمضان", "SDT": "مدينة السادات", "SHB": "شبين الكوم", "SHG": "سوهاج", "SLH": "الصالحية الجديدة", "SSH": "شرم الشيخ", "SUZ": "السويس", "TNT": "طنطا", "ZAK": "الزقازيق" }');

        $cities_en=json_decode('{ "CAI":"Cairo", "GIZ":"Giza", "HLW":"Helwan", "OCT":"6 Of October", "RAM":"10th Of Ramdan City", "SDT":"Sadat City", "EAH":"Al Arish", "MEK":"Al Mahala", "MAN":"Al Mansourah", "ALY":"Alexandria City", "AST":"Assuit", "ASW":"Aswan", "BAS":"Bani Swif", "BNH":"Benha", "DMN":"Damanhour", "DAM":"Dumiat", "NVX":"El Wadi El Gadid", "FYM":"Fayoum", "HRG":"Hurghada", "ISM":"Ismailia", "SLH":"New Salhia", "KSH":"Kafr Al Sheikh", "LXR":"Luxor", "MUH":"Marsa Matrouh", "EMY":"Minia", "PSD":"Port Said", "QEN":"Qena", "SHB":"Shebin El Koum", "SHG":"Sohag City", "SUZ":"Suez", "TNT":"Tanta", "ZAK":"Zakazik", "SSH":"Sharm Sheikh" }');
        foreach($cities_en as $key=>$value) {
            $now=Carbon::now();
            DB::table('cities')->insert([
                'iso_code' => $key,
                'city_name' => $cities[$key],
                'city_name_en' => $value,
                'country_id' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }
}
