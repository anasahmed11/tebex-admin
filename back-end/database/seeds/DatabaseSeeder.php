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
        $this->call(Countries::class);
        $this->call(Cities::class);
        $this->call(Areas::class);
    }
}
