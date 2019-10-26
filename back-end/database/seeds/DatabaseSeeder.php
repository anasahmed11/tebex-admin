<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            PlanSeeder::class,
            Countries::class,
            // Cities::class,
            // Areas::class,
            ReturnReasonsSeeder::class,
            Governorates::class,
            CategorySeeder::class,
            SpecsSeeder::class,
            CategorySpecsSeeder::class,

        ]);
    }
}
