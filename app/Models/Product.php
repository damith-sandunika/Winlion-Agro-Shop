<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'images' => 'array',
        'status' => 'boolean',
        'stock_availability' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
