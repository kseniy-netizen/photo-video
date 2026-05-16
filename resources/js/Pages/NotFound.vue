<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="not-found">
        <div class="not-found__inner">
            <p class="not-found__code" aria-hidden="true">404</p>
            <h1 class="not-found__title">Страница не найдена</h1>
            <p class="not-found__text">
                Такой страницы нет или она была перемещена. Проверьте адрес или вернитесь на главную.
            </p>
            <Link href="/" class="not-found__btn">На главную</Link>
        </div>
    </div>
</template>

<style scoped>
.not-found {
    min-height: calc(100vh - var(--header-height, 80px) - 120px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 20px 80px;
}

.not-found__inner {
    max-width: 560px;
    width: 100%;
    text-align: center;
    padding: 48px 32px;
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 16px;
    background: linear-gradient(145deg, rgba(20, 20, 20, 0.95), rgba(10, 10, 10, 0.98));
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.45);
}

.not-found__code {
    font-size: clamp(4rem, 12vw, 6.5rem);
    font-weight: 700;
    line-height: 1;
    margin: 0 0 16px;
    background: linear-gradient(135deg, #d4af37 0%, #f5e6a8 50%, #b8960c 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: 0.06em;
}
p{
    font-family: 'allodswest';

}
.not-found__title {
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: 600;
    margin: 0 0 16px;
    color: #fff;
}

.not-found__text {
    margin: 0 0 32px;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.6;
    font-size: 1rem;
}

.not-found__btn {
    font-family: 'allodswest';
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 32px;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    color: #0a0a0a;
    background: linear-gradient(135deg, #d4af37 0%, #f5e6a8 50%, #b8960c 100%);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.not-found__btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(212, 175, 55, 0.35);
}
</style>
