<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhotoCategory extends Model
{
    protected $table = 'photo_categories';
    protected $fillable = ['name', 'cover_image', 'photo_count'];
}
