<?php

namespace Server\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends ApiModel
{

    protected $fillable = [
        'title',
        'slug',
        'price',
        'min_order',
        'max_order',
        'stock',
        'description',
        'image_one',
        'image_two',
        'image_three'
    ];

    // public function getDescriptionAttribute($col)
    // {
    //     return nl2br($col);
    // }

    public function getPriceStringAttribute()
    {
        return number_format($this->price, 2);
    }

    public function getQuantityAttribute()
    {
        return $this->min_order;
    }

    // public function categories()
    // {
    //     return $this->belongsToMany(new Category);
    // }
}