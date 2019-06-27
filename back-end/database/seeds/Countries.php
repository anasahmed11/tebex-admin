<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class Countries extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   $now=Carbon::now();
        DB::table('countries')->insert([
            'iso_code' => 'EG',
            'country_name' => 'مصر',
            'country_name_en' => 'Egypt',
            'country_code' => '+20',
            'currency_code' => 'EGP',
            'created_at' => $now,
            'updated_at' => $now,
        ]);
    }
}
