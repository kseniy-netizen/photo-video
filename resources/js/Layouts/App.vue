<script setup>
import Header from '../Pages/Header.vue';
import Footer from '../Pages/Footer.vue';
import SeoHead from '../Components/SeoHead.vue';

</script>
<template>
    <SeoHead/>
    <div id="app">
        <Header/>
        <main class="main-content">
            <slot/> <!-- сюда Inertia подставит содержимое страницы -->
        </main>
        <Footer/>
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body {
    width: 100%;
    min-height: 100vh;
    background: #0a0a0a;
}

#app {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #0a0a0a;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #ffffff;
}

.main-content {
    flex: 1;
    width: 100%;
    min-width: 0;
    padding-top: var(--header-height, 80px);
    background-color: #0a0a0a;
}

/* Убедимся, что router-view растягивается */
.main-content > * {
    width: 100%;
}

.page-enter-active,
.page-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.page-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.notifications {
    position: fixed;
    top: calc(var(--header-height, 80px) + 12px);
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: min(100vw - 24px, 360px);
}

@media (max-width: 768px) {
    .notifications {
        left: 12px;
        right: 12px;
        max-width: none;
    }

    .notification {
        padding: 14px 18px;
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .main-content {
        padding-top: 64px;
    }
}

.notification {
    padding: 16px 24px;
    border-radius: 12px;
    color: white;
    font-weight: 500;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
    animation: slideInRight 0.3s ease;
}

.notification.success {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.notification.error {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.notification.info {
    background: linear-gradient(135deg, #d4af37 0%, #b8960c 100%);
}

.notification-enter-active,
.notification-leave-active {
    transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100%);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

</style>
