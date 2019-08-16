<?php

namespace App;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Arr;
use Laravel\Scout\Searchable;

class Product extends Model
{
    use Searchable,Sluggable,softDeletes;
    public $searchable = ['name','name_en', 'slug', 'sku','description','description_en','price','sale_price',];
    public $asYouType = true;
    public function toSearchableArray()
    {
        $array = $this->toArray();

        // Customize array...
        return Arr::only($array, ['id','name','name_en', 'slug', 'sku','description','description_en','price','sale_price',
        ]);
        #return $array; //return array('name' => $array['name'], 'name_en' => $array['name_en']);
    }
    public function searchableAs()
    {
        return 'proudct_index';
    }

    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'name_en'
            ]
        ];
    }




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
        return $this->belongsToMany(Spec::class,'product_specs');
            #->join("specs","specs.id","=","product_specs.spec_id");
            #->select("id","name","name_en","value");
    }
    public function Store(){
        return $this->belongsTo(Store::class);
    }
    public function Category(){
        return $this->belongsTo(Category::class);
    }

}
