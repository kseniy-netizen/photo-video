<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set(
            'Permissions-Policy',
            'camera=(), microphone=(), geolocation=(), payment=()'
        );

        if (! app()->environment('local')) {
            $response->headers->set(
                'Content-Security-Policy',
                "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; "
                ."img-src 'self' data: blob: https:; "
                ."font-src 'self' data: https://fonts.bunny.net https://fonts.gstatic.com; "
                ."style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://fonts.googleapis.com; "
                ."style-src-elem 'self' 'unsafe-inline' https://fonts.bunny.net https://fonts.googleapis.com; "
                ."script-src 'self' 'unsafe-inline'; script-src-elem 'self' 'unsafe-inline'; "
                ."connect-src 'self' https://fonts.bunny.net https://fonts.googleapis.com; "
                ."object-src 'none'"
            );

            if ($request->isSecure()) {
                $response->headers->set(
                    'Strict-Transport-Security',
                    'max-age=31536000; includeSubDomains'
                );
            }
        }

        return $response;
    }
}
