<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustHosts as Middleware;

class TrustHosts extends Middleware
{
    public function hosts(): array
    {
        $hosts = [
            $this->allSubdomainsOfApplicationUrl(),
        ];

        if (getenv('VERCEL')) {
            $hosts[] = '^(.+\.)?vercel\.app$';
        }

        return $hosts;
    }
}
