#!/bin/sh
set -e

cd /var/www

wait_for_database() {
    host="${DB_HOST:-}"
    port="${DB_PORT:-5432}"
    database="${DB_DATABASE:-}"
    username="${DB_USERNAME:-}"
    password="${DB_PASSWORD:-}"

    if [ -z "$host" ] || [ "$host" = "127.0.0.1" ] || [ "$host" = "localhost" ]; then
        return 0
    fi

    echo "Waiting for database at ${host}:${port}..."
    until DB_HOST="$host" DB_PORT="$port" DB_DATABASE="$database" DB_USERNAME="$username" DB_PASSWORD="$password" php -r '
        try {
            new PDO(
                sprintf(
                    "pgsql:host=%s;port=%s;dbname=%s",
                    getenv("DB_HOST"),
                    getenv("DB_PORT") ?: "5432",
                    getenv("DB_DATABASE")
                ),
                getenv("DB_USERNAME"),
                getenv("DB_PASSWORD")
            );
            exit(0);
        } catch (Throwable $e) {
            exit(1);
        }
    ' >/dev/null 2>&1; do
        sleep 2
    done
    echo "Database is ready."
}

wait_for_database

if [ ! -d vendor ] && [ -f composer.json ]; then
    echo "Installing Composer dependencies..."
    composer install --no-interaction --prefer-dist
fi

if [ -f artisan ]; then
    php artisan storage:link --force >/dev/null 2>&1 || true

    if [ "${RUN_MIGRATIONS}" = "true" ]; then
        php artisan migrate --force --no-interaction
    fi
fi

chown -R www-data:www-data storage bootstrap/cache 2>/dev/null || true
chmod -R 775 storage bootstrap/cache 2>/dev/null || true

exec docker-php-entrypoint "$@"
