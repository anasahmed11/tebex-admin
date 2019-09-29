<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class Governorates extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $governorates = json_decode(File::get(base_path("database/seeds/json/governorates.json")));
        $governorates = $governorates;
        foreach($governorates as $governorate){
            $now=Carbon::now();
            DB::table('governorates')->insert([
                'governorate_name' => ($governorate->name_ar),
                'governorate_name_en' => ($governorate->name_en),
                'iso_code' => ($governorate->iso_code),
                'country_id' => '1',
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }
}
