<?php

namespace App\Support;

class MediaUrl
{
    public static function resolve(?string $url): ?string
    {
        if ($url === null || $url === '') {
            return null;
        }

        $url = trim($url);

        if (str_starts_with($url, '//')) {
            return 'https:'.$url;
        }

        if (preg_match('#^https?://(localhost|127\.0\.0\.1)(:\d+)?#i', $url)) {
            $path = parse_url($url, PHP_URL_PATH);
            $url = $path ?: $url;
        }

        if (preg_match('#^https?://#i', $url)) {
            return $url;
        }

        $path = ltrim($url, '/');

        // Paths from DB often omit the public/storage prefix.
        if (str_starts_with($path, 'storage/app/public/')) {
            $path = 'storage/'.substr($path, strlen('storage/app/public/'));
        } elseif (str_starts_with($path, 'app/public/')) {
            $path = 'storage/'.substr($path, strlen('app/public/'));
        } elseif (! str_starts_with($path, 'storage/')) {
            $path = 'storage/'.$path;
        }

        $base = rtrim((string) config('app.url'), '/');

        return $base.'/'.$path;
    }
}
