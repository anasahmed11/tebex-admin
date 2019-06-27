<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Areas extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areas= (array)json_decode('{ "CAI":{ "89":{ "region_name":"أبو رواش" }, "90":{ "region_name":"الأزهر" }, "91":{ "region_name":"التجمع الخامس" }, "92":{ "region_name":"التحرير" }, "93":{ "region_name":"الرحاب" }, "94":{ "region_name":"الزيتون" }, "95":{ "region_name":"السيدة زينب" }, "96":{ "region_name":"السيدة نفيسة" }, "98":{ "region_name":"القصر العينى" }, "99":{ "region_name":"القلعة" }, "100":{ "region_name":"المعادى" }, "101":{ "region_name":"المعادى الجديدة" }, "102":{ "region_name":"المقطم" }, "103":{ "region_name":"النزهة الجديدة" }, "104":{ "region_name":"أميرية" }, "105":{ "region_name":"بساتيين" }, "106":{ "region_name":"بولاق ابو العلا" }, "107":{ "region_name":"بولاق الدكرور" }, "108":{ "region_name":"جردن سيتى" }, "109":{ "region_name":"حدائق القبة" }, "110":{ "region_name":"حلمية" }, "112":{ "region_name":"رمسيس" }, "113":{ "region_name":"زمالك" }, "114":{ "region_name":"شبرا" }, "115":{ "region_name":"شبرا الخيمة" }, "116":{ "region_name":"شرابية" }, "117":{ "region_name":"ضاهير" }, "118":{ "region_name":"عباسية" }, "119":{ "region_name":"عين شمس" }, "120":{ "region_name":"غمرة" }, "121":{ "region_name":"قطامية" }, "122":{ "region_name":"مدينة 15 مايو" }, "124":{ "region_name":"مدينة العبور" }, "125":{ "region_name":"مدينة نصر" }, "126":{ "region_name":"مساكن شيراتون" }, "127":{ "region_name":"مصر القديمة" }, "128":{ "region_name":"مطرية" }, "129":{ "region_name":"منيل" }, "130":{ "region_name":"هيليوبوليس" }, "131":{ "region_name":"وسط البلد" }, "132":{ "region_name":"أخرى" } }, "GIZ":{ "134":{ "region_name":"الهرم" }, "135":{ "region_name":"إمبابة" }, "136":{ "region_name":"حرانية" }, "137":{ "region_name":"دقى" }, "138":{ "region_name":"صفت اللبن" }, "139":{ "region_name":"عجوزة" }, "140":{ "region_name":"فيصل" }, "141":{ "region_name":"كيتكات" }, "142":{ "region_name":"منصورية" }, "143":{ "region_name":"مهندسيين" } }, "ALY":{ "60":{ "region_name":"ابراهيمية" }, "61":{ "region_name":"أبو قير" }, "62":{ "region_name":"الأزاريتة" }, "63":{ "region_name":"العجمى" }, "64":{ "region_name":"العصافرة" }, "65":{ "region_name":"المعمورة" }, "66":{ "region_name":"المنتزة" }, "67":{ "region_name":"المندرة" }, "68":{ "region_name":"بحرى" }, "69":{ "region_name":"برج العرب" }, "70":{ "region_name":"بولكلى" }, "71":{ "region_name":"جليم" }, "72":{ "region_name":"رشدى" }, "73":{ "region_name":"زيزينيا" }, "74":{ "region_name":"سان ستيفانو" }, "75":{ "region_name":"سبورتينج" }, "76":{ "region_name":"سموحة" }, "77":{ "region_name":"سيدى بشر" }, "78":{ "region_name":"سيدى جابر" }, "79":{ "region_name":"شطبى" }, "80":{ "region_name":"فليمينج" }, "81":{ "region_name":"فيكتوريا" }, "82":{ "region_name":"كليوباترا" }, "83":{ "region_name":"لوران" }, "84":{ "region_name":"محرم بيك" }, "85":{ "region_name":"محطة الرمل" }, "86":{ "region_name":"مصطفى" }, "87":{ "region_name":"منشية" }, "88":{ "region_name":"ميامى" } } }');
        $areas_en = json_decode('{ "CAI":{ "89":{ "region_name":"Abou Rawash" }, "90":{ "region_name":"Azhar" }, "91":{ "region_name":"Tagomaa Khames" }, "92":{ "region_name":"El Tahrir" }, "93":{ "region_name":"El Rehab" }, "94":{ "region_name":"Zaytoon" }, "95":{ "region_name":"Sayeda Zeinab" }, "96":{ "region_name":"Sayeda Naffisa" }, "98":{ "region_name":"Kasr El Eini" }, "99":{ "region_name":"Citadel (El-Kal3a)" }, "100":{ "region_name":"Maadi" }, "101":{ "region_name":"New Maadi" }, "102":{ "region_name":"Mokattam" }, "103":{ "region_name":"New Nozha" }, "104":{ "region_name":"Amiria" }, "105":{ "region_name":"Basateen" }, "106":{ "region_name":"Boulak Abo el Eila" }, "107":{ "region_name":"Boulak El Dakroor" }, "108":{ "region_name":"Garden City" }, "109":{ "region_name":"Hadaiq Al-Qubba" }, "110":{ "region_name":"Helmeya" }, "112":{ "region_name":"Ramsis" }, "113":{ "region_name":"Zamalek" }, "114":{ "region_name":"Shoubra" }, "115":{ "region_name":"Shoubra El Khema" }, "116":{ "region_name":"Sharabeya" }, "117":{ "region_name":"Daher" }, "118":{ "region_name":"Abbasiyya" }, "119":{ "region_name":"Ain Shams" }, "120":{ "region_name":"Ghamra" }, "121":{ "region_name":"Kattamia" }, "122":{ "region_name":"15th of May City" }, "124":{ "region_name":"Obour City" }, "125":{ "region_name":"Nasr City" }, "126":{ "region_name":"Masaken Sheraton" }, "127":{ "region_name":"Misr El-Kadima" }, "128":{ "region_name":"Matareya" }, "129":{ "region_name":"Manyal" }, "130":{ "region_name":"Heliopolis" }, "131":{ "region_name":"Down Town" }, "132":{ "region_name":"Others" } }, "GIZ":{ "134":{ "region_name":"Giza And Pyramids" }, "135":{ "region_name":"Imbaba" }, "136":{ "region_name":"Harania" }, "137":{ "region_name":"Dokki" }, "138":{ "region_name":"Saft El Laban" }, "139":{ "region_name":"Agouza" }, "140":{ "region_name":"Faissal" }, "141":{ "region_name":"Kitkat" }, "142":{ "region_name":"Mansoureya" }, "143":{ "region_name":"Mohandessin" } }, "ALY":{ "60":{ "region_name":"Ibrahimya" }, "61":{ "region_name":"Abou Kir" }, "62":{ "region_name":"Azarita" }, "63":{ "region_name":"Agami" }, "64":{ "region_name":"Asafra" }, "65":{ "region_name":"Maamoura" }, "66":{ "region_name":"El Montaza" }, "67":{ "region_name":"Mandara" }, "68":{ "region_name":"Bahary" }, "69":{ "region_name":"Borg El Arab" }, "70":{ "region_name":"Bolkly" }, "71":{ "region_name":"Gleem" }, "72":{ "region_name":"Roushdy" }, "73":{ "region_name":"Zezenia" }, "74":{ "region_name":"San Estefano" }, "75":{ "region_name":"Sporting" }, "76":{ "region_name":"Smouha" }, "77":{ "region_name":"Sidi Bishr" }, "78":{ "region_name":"Sidi Gaber" }, "79":{ "region_name":"Shatby" }, "80":{ "region_name":"Fleming" }, "81":{ "region_name":"Victoria" }, "82":{ "region_name":"Cleopatra" }, "83":{ "region_name":"Lauran" }, "84":{ "region_name":"Moharam Bek" }, "85":{ "region_name":"Raml Station" }, "86":{ "region_name":"Moustafa Kamel" }, "87":{ "region_name":"Manshia" }, "88":{ "region_name":"Miami" } } }');
        foreach ($areas_en as $key => $values) {
            $id = (DB::table("cities")->select("id")->where("iso_code",$key)->get("id")->first());
            $now=Carbon::now();
            foreach ($values as $keys=> $value) {
                DB::table('areas')->insert([
                    'area_name' => ($areas[$key]->$keys->region_name),
                    'area_name_en' => ($value->region_name),
                    'city_id' => $id->id,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }

        }

    }
}
