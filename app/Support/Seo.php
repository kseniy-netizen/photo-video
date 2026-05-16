<?php

namespace App\Support;

use Illuminate\Support\Str;

class Seo
{
    public static function forRoute(?string $routeName): array
    {
        $pages = config('seo.pages', []);
        $meta = ($routeName && isset($pages[$routeName]))
            ? $pages[$routeName]
            : config('seo.default', []);

        return [
            'title' => self::limitTitle($meta['title'] ?? config('seo.default.title')),
            'description' => self::limitDescription($meta['description'] ?? config('seo.default.description')),
        ];
    }

    public static function limitTitle(?string $title): string
    {
        return Str::limit(trim((string) $title), 60, '');
    }

    public static function limitDescription(?string $description): string
    {
        return Str::limit(trim((string) $description), 160, '');
    }

    public static function siteUrl(): string
    {
        return rtrim(config('app.url', 'http://localhost'), '/');
    }

    public static function host(): string
    {
        return parse_url(self::siteUrl(), PHP_URL_HOST) ?: 'localhost';
    }
}
