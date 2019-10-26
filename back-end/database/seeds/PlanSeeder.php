<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('plans')->insert([
            'name' => 'خطه 1',
            'name_en' => 'Plan 1',
            'description' => '',
            'description_en' => '',
            'commission' => 10,
            'price' => 0,
            'rules' => json_encode(['sales'=>2000,'level'=>-1,'count'=>-1]),
            'created_at' => Carbon::now(),
        ]);
        DB::table('plans')->insert([
            'name' => 'خطه 2',
            'name_en' => 'Plan 2',
            'description' => '',
            'description_en' => '',
            'commission' => 15,
            'price' => -1,
            'rules' => json_encode(['sales'=>2000,'level'=>-1,'count'=>-1]),
            'created_at' => Carbon::now(),
        ]);
        DB::table('plans')->insert([
            'name' => 'خطه 3',
            'name_en' => 'Plan 3',
            'description' => '',
            'description_en' => '',
            'commission' => 20,
            'price' => 1500,
            'rules' => json_encode(['sales'=>9000,'level'=>3,'count'=>6]),
            'created_at' => Carbon::now(),
        ]);
        DB::table('plans')->insert([
            'name' => 'خطه 4',
            'name_en' => 'Plan 4',
            'description' => '',
            'description_en' => '',
            'commission' => 25,
            'price' => -1,
            'rules' => json_encode(['sales'=>0,'level'=>4,'count'=>6]),
            'created_at' => Carbon::now(),
        ]);
        DB::table('plans')->insert([
            'name' => 'خطه 5',
            'name_en' => 'Plan 5',
            'description' => '',
            'description_en' => '',
            'commission' => 30,
            'price' => 3000,
            'rules' => json_encode(['sales'=>0,'level'=>5,'count'=>6]),
            'created_at' => Carbon::now(),
        ]);
        DB::table('plans')->insert([
            'name' => 'خطه 6',
            'name_en' => 'Plan 6',
            'description' => '',
            'description_en' => '',
            'commission' => 35,
            'price' => -1,
            'rules' => json_encode(['sales'=>0,'level'=>5,'count'=>6]),
            'created_at' => Carbon::now(),
        ]);
        DB::table('plans')->insert([
            'name' => 'خطه 7',
            'name_en' => 'Plan 7',
            'description' => '',
            'description_en' => '',
            'commission' => 40,
            'price' => -1,
            'rules' => json_encode(['sales'=>-1,'level'=>-1,'count'=>-1]),
            'created_at' => Carbon::now(),
        ]);
    }
}
