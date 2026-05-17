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

    return value.startsWith('/') ? value : `/${value}`;
}
