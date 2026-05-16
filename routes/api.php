<?php

use App\Http\Controllers\Api\SiteContentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PhotoGalleryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/specialists', [SiteContentController::class, 'specialists']);
Route::get('/portfolio', [SiteContentController::class, 'portfolio']);
Route::get('/icons', [SiteContentController::class, 'icons']);
Route::get('/studios', [SiteContentController::class, 'studios']);
Route::get('/home-asset', [SiteContentController::class, 'homeAsset']);
Route::get('/photo-categories', [SiteContentController::class, 'photoCategories']);
Route::get('/gallery-photos/{categoryId}', [SiteContentController::class, 'galleryPhotos']);

Route::get('/photo-categories', [PhotoGalleryController::class, 'categories']);
Route::get('/gallery-photos/{categoryId}', [PhotoGalleryController::class, 'galleryPhotos']);
