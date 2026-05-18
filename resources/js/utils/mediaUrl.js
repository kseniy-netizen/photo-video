/**
 * Normalize image URLs from API (relative, /storage, localhost).
 */
export function resolveMediaUrl(url) {
    if (!url) {
        return '';
    }

    const value = String(url).trim();

    if (/^https?:\/\//i.test(value)) {
        if (/^https?:\/\/(localhost|127\.0\.0\.1)/i.test(value)) {
            try {
                return new URL(value).pathname;
            } catch {
                return value;
            }
        }

        return value;
    }

    if (value.startsWith('//')) {
        return `https:${value}`;
    }

    let path = value.startsWith('/') ? value.slice(1) : value;

    if (path.startsWith('storage/app/public/')) {
        path = `storage/${path.slice('storage/app/public/'.length)}`;
    } else if (path.startsWith('app/public/')) {
        path = `storage/${path.slice('app/public/'.length)}`;
    } else if (!path.startsWith('storage/')) {
        path = `storage/${path}`;
    }

    return `/${path}`;
}
