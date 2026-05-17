<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// ========== FIX ДЛЯ VERCEL ==========
// Перенаправляем bootstrap и storage в /tmp, где есть запись
$tmpPath = '/tmp';
$bootstrapPath = $tmpPath . '/bootstrap';
$cachePath = $bootstrapPath . '/cache';

if (!is_dir($cachePath)) {
    mkdir($cachePath, 0755, true);
}

// Копируем существующие кеш-файлы из оригинальной папки (если есть)
$originalCache = __DIR__ . '/../bootstrap/cache';
if (is_dir($originalCache)) {
    $files = scandir($originalCache);
    if ($files !== false) {
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..') {
                $src = $originalCache . '/' . $file;
                $dst = $cachePath . '/' . $file;
                if (!file_exists($dst) && is_file($src)) {
                    copy($src, $dst);
                }
            }
        }
    }
}

// Переопределяем пути для Laravel
$app = require_once __DIR__  . '/../bootstrap/app.php';
$app->useBootstrapPath($bootstrapPath);
$app->useStoragePath($tmpPath);
// ====================================

/*
|--------------------------------------------------------------------------
| Check If The Application Is Under Maintenance
|--------------------------------------------------------------------------
*/
if (file_exists($maintenance = __DIR__  . '/../storage/framework/maintenance.php')) {
    require $maintenance;
}

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
*/
require __DIR__  . '/../vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
*/
$kernel = $app->make(Kernel::class);

$response = $kernel->handle(
    $request = Request::capture()
)->send();

$kernel->terminate($request, $response);
