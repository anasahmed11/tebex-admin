<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class SpecsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now=Carbon::now();
        DB::table('specs')->insert([
            'name' => 'المقاس',
            'name_en' => 'size ',
            'type' => 'multi',
            'values' => '{"ar": ["XS","S","L"],"en": ["XS","S","L"]}',
            'updated_at' => $now,
            'created_at' => $now,
        ]);
        DB::table('specs')->insert([
            'name' => 'رام',
            'name_en' => 'ram ',
            'type' => 'multi',
            'values' => '{"ar":["1GB","2GB"],"en":["1GB","2GB"]}',
            'updated_at' => $now,
            'created_at' => $now,
        ]);
    }
}
