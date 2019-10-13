<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReturnReason extends Model
{
    public $timestamps = false;
    protected $fillable = ['name_en', 'name_ar'];
}
