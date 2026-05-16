<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SeoController;
use App\Support\Seo;

Route::get('/robots.txt', [SeoController::class, 'robots']);
Route::get('/sitemap.xml', [SeoController::class, 'sitemap']);

// Публичные маршруты
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/photos', function () {
    return Inertia::render('Photos');
})->name('photos');

Route::get('/video', function () {
    return Inertia::render('Video');
})->name('video');

Route::get('/price', function () {
    return Inertia::render('Price');
})->name('price');

Route::get('/rent', function () {
    return Inertia::render('Rent');
})->name('rent');

Route::get('/agreements', function () {
    return Inertia::render('Agreements');
})->name('agreements');

Route::get('/processing', function () {
    return Inertia::render('Processing');
})->name('processing');

require __DIR__.'/auth.php';

Route::middleware('auth')->group(function () {
    Route::get('/orders', function () {
        return Inertia::render('Order_Check');
    })->name('orders');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::fallback(function (\Illuminate\Http\Request $request) {
    return Inertia::render('NotFound', [
        'seo' => Seo::forRoute('notfound'),
    ])->toResponse($request)->setStatusCode(404);
});
