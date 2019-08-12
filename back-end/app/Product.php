<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;

class Product extends Model
{
    use Searchable;

    public $asYouType = true;
    public function toSearchableArray()
    {
        $array = $this->toArray();

        // Customize array...

        return $array; //return array('name' => $array['name'], 'name_en' => $array['name_en']);
    }
    public function searchableAs()
    {
        return 'proudct_index';
    }


    use softDeletes;




    protected $with=['Store','Specs:product_id,spec_id,id,value,name,name_en'];
    protected $fillable = [
        'name','name_en', 'slug', 'sku','images','description','description_en','price','sale_price','quantity'
    ];
    protected $hidden = [
        'updated_at'
    ];
    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
        'images'=>'json'
    ];




    public function Specs(){
        return $this->hasMany(ProductSpec::class)
            ->join("specs","specs.id","=","product_specs.spec_id");
            #->select("id","name","name_en","value");
    }
    public function Store(){
        return $this->belongsTo(Store::class);
    }
    public function Category(){
        return $this->belongsTo(Category::class);
    }

}
