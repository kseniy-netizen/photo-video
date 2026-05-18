<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhotoCategory extends Model
{
    protected $table = 'photos';

    protected $fillable = ['name', 'description', 'base_price', 'duration_hours', 'photo_count'];
}
