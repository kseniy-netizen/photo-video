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

        $base = rtrim((string) config('app.url'), '/');

        return $base.'/'.ltrim($url, '/');
    }
}
