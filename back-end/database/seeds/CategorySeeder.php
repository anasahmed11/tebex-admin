<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $now=Carbon::now();
        DB::table('categories')->insert([
            'name' => 'root',
            'name_en' => 'root',
            'slug' => 'root-slug',
            'created_at' => $now,
            'updated_at' => $now,
        ]);
        DB::table('categories')->insert([
            'name' => 'رجالي',
            'name_en' => 'men',
            'slug' => 'men-slug',
            'created_at' => $now,
            'updated_at' => $now,
            'parent_id' => 1,
        ]);
        DB::table('categories')->insert([
            'name' => 'جينز',
            'name_en' => 'jeanse',
            'slug' => 'jeanse-slug',
            'created_at' => $now,
            'updated_at' => $now,
            'parent_id' => 2,
        ]);
        DB::table('categories')->insert([
            'name' => 'موبايلات',
            'name_en' => 'mobiles',
            'slug' => 'mobiles-slug',
            'created_at' => $now,
            'updated_at' => $now,
            'parent_id' => 1,
        ]);

    }
}
