<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

$isVercel = (bool) getenv('VERCEL');

if ($isVercel) {
    // Prevent Laravel from treating /api as the app base path (breaks Vite + /api routes).
    $_SERVER['SCRIPT_NAME'] = '/index.php';
    $_SERVER['PHP_SELF'] = '/index.php';
}

// Vercel: writable bootstrap cache and storage in /tmp
$tmpPath = '/tmp';
$bootstrapPath = $tmpPath . '/bootstrap';
$cachePath = $bootstrapPath . '/cache';

if ($isVercel) {
    foreach ([
        $cachePath,
        $tmpPath . '/framework/views',
        $tmpPath . '/framework/sessions',
        $tmpPath . '/framework/cache',
        $tmpPath . '/logs',
        $tmpPath . '/app',
    ] as $path) {
        if (! is_dir($path)) {
            mkdir($path, 0755, true);
        }
    }

    if (! getenv('VIEW_COMPILED_PATH')) {
        putenv('VIEW_COMPILED_PATH=' . $tmpPath . '/framework/views');
        $_ENV['VIEW_COMPILED_PATH'] = $tmpPath . '/framework/views';
    }
} elseif (! is_dir($cachePath)) {
    mkdir($cachePath, 0755, true);
}

$originalCache = __DIR__ . '/../bootstrap/cache';
if (is_dir($originalCache)) {
    foreach (scandir($originalCache) ?: [] as $file) {
        if ($file === '.' || $file === '..') {
            continue;
        }
        $src = $originalCache . '/' . $file;
        $dst = $cachePath . '/' . $file;
        if (! file_exists($dst) && is_file($src)) {
            copy($src, $dst);
        }
    }
}

if ($isVercel && ! getenv('APP_KEY')) {
    http_response_code(500);
    header('Content-Type: text/plain; charset=utf-8');
    exit(
        "Missing APP_KEY on Vercel.\n\n"
        . "1. Run locally: php artisan key:generate --show\n"
        . "2. Vercel → Project → Settings → Environment Variables → add APP_KEY\n"
        . "3. Redeploy the project\n"
    );
}

/*
|--------------------------------------------------------------------------
| Check If The Application Is Under Maintenance
|--------------------------------------------------------------------------
*/
if (file_exists($maintenance = __DIR__ . '/../storage/framework/maintenance.php')) {
    require $maintenance;
}

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
*/
require __DIR__ . '/../vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
*/
$app = require_once __DIR__ . '/../bootstrap/app.php';

if ($isVercel) {
    $app->useBootstrapPath($bootstrapPath);
    $app->useStoragePath($tmpPath);
}

$kernel = $app->make(Kernel::class);

$response = $kernel->handle(
    $request = Request::capture()
)->send();

$kernel->terminate($request, $response);
