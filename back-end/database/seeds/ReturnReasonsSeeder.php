<?php

use Illuminate\Database\Seeder;

class ReturnReasonsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('return_reasons')->insert([
            'name_ar' => 'السبب 1',
            'name_en' => 'reason 1',
        ]);
        DB::table('return_reasons')->insert([
            'name_ar' => 'السبب 2',
            'name_en' => 'reason 2',
        ]);
    }
}
