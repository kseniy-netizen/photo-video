<script setup>
import { Head, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();

const seo = computed(() => page.props.seo ?? { title: '', description: '' });

const privatePrefixes = [
    '/orders',
    '/profile',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/confirm-password',
];

const allowIndex = computed(() => {
    const path = page.url?.split('?')[0] ?? '/';
    return !privatePrefixes.some((prefix) => path === prefix || path.startsWith(prefix + '/'));
});
</script>

<template>
    <Head :title="seo.title">
        <meta head-key="description" name="description" :content="seo.description" />
        <meta
            v-if="!allowIndex"
            head-key="robots"
            name="robots"
            content="noindex, nofollow"
        />
    </Head>
</template>
