<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryPhoto extends Model
{
    protected $table = 'gallery_photos';
    protected $fillable = ['category_id', 'title', 'description', 'image_url'];
}
