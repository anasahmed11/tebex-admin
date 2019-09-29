<?php

use Illuminate\Database\Seeder;

class CategorySpecsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('category_specs')->insert([
            'category_id' => 3,
            'spec_id' => 1
        ]);
        DB::table('category_specs')->insert([
            'category_id' => 4,
            'spec_id' => 2
        ]);
    }
}
