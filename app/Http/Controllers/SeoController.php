<?php

namespace App\Http\Controllers;

use App\Support\Seo;
use Illuminate\Http\Response;

class SeoController extends Controller
{
    public function robots(): Response
    {
        $host = Seo::host();
        $sitemap = Seo::siteUrl().'/sitemap.xml';

        $disallow = [
            '/orders',
            '/login',
            '/register',
            '/forgot-password',
            '/reset-password',
            '/profile',
            '/verify-email',
            '/confirm-password',
            '/email',
            '/password',
            '/logout',
            '/data/',
            '/storage/',
            '/sanctum/',
        ];

        $lines = [
            'User-agent: *',
            'Allow: /',
        ];

        foreach ($disallow as $path) {
            $lines[] = 'Disallow: '.$path;
        }

        $lines[] = '';
        $lines[] = 'Host: '.$host;
        $lines[] = 'Sitemap: '.$sitemap;

        return response(implode("\n", $lines)."\n", 200, [
            'Content-Type' => 'text/plain; charset=UTF-8',
        ]);
    }

    public function sitemap(): Response
    {
        $base = Seo::siteUrl();
        $urls = config('seo.sitemap_urls', []);

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";

        foreach ($urls as $entry) {
            $loc = $base.rtrim($entry['loc'], '/');
            if ($entry['loc'] === '/') {
                $loc = $base.'/';
            }

            $xml .= "  <url>\n";
            $xml .= '    <loc>'.htmlspecialchars($loc, ENT_XML1)."</loc>\n";
            $xml .= '    <changefreq>'.($entry['changefreq'] ?? 'monthly')."</changefreq>\n";
            $xml .= '    <priority>'.($entry['priority'] ?? '0.5')."</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= "</urlset>\n";

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
        ]);
    }
}
