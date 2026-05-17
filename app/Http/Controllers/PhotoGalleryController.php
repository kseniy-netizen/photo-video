<?php

namespace App\Http\Controllers;

use App\Models\GalleryPhoto;
use App\Models\PhotoCategory;
use App\Support\MediaUrl;

class PhotoGalleryController extends Controller
{
    public function categories()
    {
        $items = PhotoCategory::orderBy('id')->get()->map(function ($cat) {
            $data = $cat->toArray();
            if (isset($data['image_url'])) {
                $data['image_url'] = MediaUrl::resolve($data['image_url']);
            }

            return $data;
        });

        return response()->json($items);
    }

    public function galleryPhotos($categoryId)
    {
        $photos = GalleryPhoto::where('category_id', $categoryId)
            ->where('is_featured', false)
            ->orderBy('sort_order')
            ->get()
            ->map(function ($photo) {
                $data = $photo->toArray();
                $data['image_url'] = MediaUrl::resolve($data['image_url'] ?? null);

                return $data;
            });

        return response()->json($photos);
    }
}
