<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Support\MediaUrl;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SiteContentController extends Controller
{
    private function jsonRows(callable $query): JsonResponse
    {
        try {
            return response()->json($query());
        } catch (\Throwable) {
            return response()->json([]);
        }
    }

    private function withResolvedImages(iterable $rows, array $keys = ['image_url']): array
    {
        return collect($rows)->map(function ($row) use ($keys) {
            $item = (array) $row;
            foreach ($keys as $key) {
                if (array_key_exists($key, $item)) {
                    $item[$key] = MediaUrl::resolve($item[$key]) ?? $item[$key];
                }
            }

            return $item;
        })->values()->all();
    }

    public function specialists(): JsonResponse
    {
        return $this->jsonRows(fn () => $this->withResolvedImages(
            DB::table('specialists')->orderBy('id')->get()
        ));
    }

    public function portfolio(): JsonResponse
    {
        return $this->jsonRows(fn () => $this->withResolvedImages(
            DB::table('portfolio')->orderBy('id')->limit(3)->get()
        ));
    }

    public function icons(): JsonResponse
    {
        return $this->jsonRows(fn () => $this->withResolvedImages(
            DB::table('icons')->orderBy('order_index')->orderBy('id')->get()
        ));
    }

    public function studios(): JsonResponse
    {
        return $this->jsonRows(fn () => $this->withResolvedImages(
            DB::table('studio')->orderBy('id')->get()
        ));
    }

    public function homeAsset(Request $request): JsonResponse
    {
        if (! Schema::hasTable('home')) {
            return response()->json(['image_url' => null], 404);
        }

        $name = $request->query('name', 'camera');
        $row = DB::table('home')->where('name', $name)->first();

        if (! $row) {
            return response()->json(['image_url' => null], 404);
        }

        return response()->json([
            'image_url' => MediaUrl::resolve($row->image_url),
        ]);
    }

    public function photoCategories(): JsonResponse
    {
        return $this->jsonRows(function () {
            if (! Schema::hasTable('photos')) {
                return [];
            }

            $categories = DB::table('photos')->orderBy('id')->limit(6)->get();

            return $categories->map(function ($cat) {
                $cover = DB::table('gallery_photos')
                    ->where('category_id', $cat->id)
                    ->where('is_featured', true)
                    ->orderBy('sort_order')
                    ->value('image_url');

                return [
                    'id' => $cat->id,
                    'name' => $cat->name,
                    'photo_count' => (int) ($cat->photo_count ?? 0),
                    'cover_image' => MediaUrl::resolve($cover) ?? '',
                ];
            })->values()->all();
        });
    }

    public function galleryPhotos(int $categoryId): JsonResponse
    {
        return $this->jsonRows(fn () => $this->withResolvedImages(
            DB::table('gallery_photos')
                ->select('id', 'title', 'description', 'image_url')
                ->where('category_id', $categoryId)
                ->where('is_featured', false)
                ->orderBy('sort_order')
                ->limit(6)
                ->get()
        ));
    }
}
