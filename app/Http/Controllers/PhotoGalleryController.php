<?php

namespace App\Http\Controllers;

use App\Models\PhotoCategory;
use App\Models\GalleryPhoto;

class PhotoGalleryController extends Controller
{
    public function categories() {
        return response()->json(PhotoCategory::orderBy('id')->get());
    }

    public function galleryPhotos($categoryId) {
        $photos = GalleryPhoto::where('category_id', $categoryId)
            ->where('is_featured', false)   // исключаем featured-фото
            ->orderBy('sort_order')
            ->get();
        return response()->json($photos);
    }

}
