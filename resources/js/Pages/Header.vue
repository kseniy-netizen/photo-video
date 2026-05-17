<template>
    <header :class="['header', { 'header--scrolled': isScrolled }]">
        <div class="header__container">
            <Link href="/" class="header__logo">
                <img :src="getLogoUrl()" alt="Логотип">

            </Link>

            <nav class="header__nav header__nav--desktop">
                <Link href="/" class="nav__link">Главная</Link>
                <Link href="/photos" class="nav__link">Фотосъёмка</Link>
                <Link href="/video" class="nav__link">Видеосъёмка</Link>
                <Link href="/price" class="nav__link">Тарифы</Link>
                <Link href="/rent" class="nav__link">Аренда студии</Link>
            </nav>

            <button
                type="button"
                class="header__burger"
                :class="{ 'header__burger--open': showMobileNav }"
                aria-label="Меню"
                @click="toggleMobileNav"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div class="header__actions" ref="actionsRef">
                <Link href="/orders" class="action__btn action__btn--cart" title="Корзина" @click="handleCartLinkClick">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
                </Link>

                <button v-if="!user" type="button" class="btn btn--primary" @click="openLogin">
                    Войти
                </button>

                <div v-else class="user-menu">
                    <button type="button" class="user-menu__trigger" @click="showMenu = !showMenu">
                        Профиль
                        <svg class="user-menu__chevron" :class="{ 'user-menu__chevron--open': showMenu }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>
                    <div v-if="showMenu" class="user-menu__dropdown">
                        <Link href="/profile" class="dropdown__item" @click="showMenu = false">Настройки</Link>
                        <button type="button" class="dropdown__item dropdown__item--danger" @click="logout">Выйти</button>
                    </div>
                </div>
            </div>
        </div>

        <Transition name="mobile-nav">
            <div
                v-if="showMobileNav"
                class="header__mobile-backdrop"
                @click="closeMobileNav"
            />
        </Transition>
        <Transition name="mobile-nav">
            <nav v-if="showMobileNav" class="header__nav header__nav--mobile">
                <Link href="/" class="nav__link" @click="closeMobileNav">Главная</Link>
                <Link href="/photos" class="nav__link" @click="closeMobileNav">Фотосъёмка</Link>
                <Link href="/video" class="nav__link" @click="closeMobileNav">Видеосъёмка</Link>
                <Link href="/price" class="nav__link" @click="closeMobileNav">Тарифы</Link>
                <Link href="/rent" class="nav__link" @click="closeMobileNav">Аренда студии</Link>
                <Link href="/orders" class="nav__link nav__link--cart" @click="onMobileCartClick">
                    Корзина
                    <span v-if="cartCount > 0" class="cart-badge cart-badge--inline">{{ cartCount }}</span>
                </Link>
                <button
                    v-if="!user"
                    type="button"
                    class="nav__link nav__link--login"
                    @click="openLogin(); closeMobileNav()"
                >
                    Войти
                </button>
            </nav>
        </Transition>

        <AuthModal :show="showLoginModal" @close="closeLogin">
            <Enter @close="closeLogin" @open-register="openRegister" />
        </AuthModal>

        <AuthModal :show="showRegisterModal" @close="closeRegister">
            <Registration @close="closeRegister" @open-login="openLoginFromRegister" />
        </AuthModal>
    </header>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Link, router, usePage } from '@inertiajs/vue3'
import AuthModal from '../Components/AuthModal.vue'
import Enter from '../Components/Enter.vue'
import Registration from '../Components/Registration.vue'
import { useCart } from '../composables/useCart'
import { useAuthModal } from '../composables/useAuthModal'
import { useRequireAuth } from '../composables/useRequireAuth'

const page = usePage()
const { count: cartCount } = useCart()
const { handleCartLinkClick } = useRequireAuth()
const {
    showLoginModal,
    showRegisterModal,
    openLogin,
    closeLogin,
    openRegister,
    closeRegister,
    openLoginFromRegister,
} = useAuthModal()
const user = computed(() => page.props.auth?.user ?? null)
const isScrolled = ref(false)
const showMenu = ref(false)
const showMobileNav = ref(false)
const actionsRef = ref(null)

const toggleMobileNav = () => {
    showMobileNav.value = !showMobileNav.value
    document.body.style.overflow = showMobileNav.value ? 'hidden' : ''
}

const closeMobileNav = () => {
    showMobileNav.value = false
    document.body.style.overflow = ''
}

const onMobileCartClick = (event) => {
    handleCartLinkClick(event)
    closeMobileNav()
}

const consumeAuthQuery = () => {
    const url = page.url
    if (typeof url !== 'string' || !url.includes('?')) {
        return
    }

    if (url.includes('register=1')) {
        openRegister()
    } else if (url.includes('login=1')) {
        openLogin()
    } else {
        return
    }

    const [path] = url.split('?')
    router.get(path || '/', {}, { replace: true, preserveState: true })
}

watch(() => page.url, consumeAuthQuery, { immediate: true })

const logout = () => {
    showMenu.value = false
    router.post('/logout')
}

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
}

const handleClickOutside = (event) => {
    if (actionsRef.value && !actionsRef.value.contains(event.target)) {
        showMenu.value = false
    }
}
function getLogoUrl() {
    return '/logo.ico';
}
onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    document.removeEventListener('click', handleClickOutside)
    document.body.style.overflow = ''
})
</script>

<style scoped>

@font-face {
    font-family: 'allodswest';
    src: url(/fonts/allodswest.ttf);
}

button, a{
    font-family: 'allodswest' !important;
}
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 200;
    padding: 1rem 0;
    transition: all 0.3s ease;
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(10px);
}

.header--scrolled {
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(20px);
    padding: 0.75rem 0;
}

.header__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header__logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: #ffffff;
}

img {
    width: 45px;
}

.header__nav {
    display: flex;
    gap: 2rem;
}

.nav__link {
    color: #a0a0a0;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: color 0.3s ease;
    position: relative;
}

.nav__link:hover,
.nav__link[aria-current="page"],
.nav__link.router-link-active {
    color: #d4af37;
}

.header__actions {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.action__btn {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffc400;
    background: transparent;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
}

.action__btn:hover {
    color: #d4af37;
    background: rgba(255, 255, 255, 0.1);
}

.action__btn svg {
    width: 22px;
    height: 22px;
}

.action__btn--cart {
    position: relative;
    text-decoration: none;
}

.cart-badge {
    position: absolute;
    top: 2px;
    right: 2px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: 9999px;
    background: #d4af37;
    color: #0a0a0a;
    font-size: 0.65rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 0.875rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn--primary {
    background: linear-gradient(135deg, #d4af37 0%, #f4e5c2 50%, #d4af37 100%);
    color: #0a0a0a;
}

.btn--primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
}

.user-menu {
    position: relative;
}

.user-menu__trigger {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.65rem 1.1rem;
    border-radius: 9999px;
    border: 1px solid rgba(212, 175, 55, 0.35);
    background: rgba(212, 175, 55, 0.08);
    color: #f4e5c2;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.user-menu__trigger:hover {
    background: rgba(212, 175, 55, 0.18);
    border-color: #d4af37;
}

.user-menu__chevron {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
}

.user-menu__chevron--open {
    transform: rotate(180deg);
}

.user-menu__dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    background: #1f1f1f;
    border: 1px solid #2a2a2a;
    border-radius: 0.75rem;
    padding: 0.5rem;
    min-width: 160px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
    z-index: 210;
}

.dropdown__item {
    display: block;
    padding: 0.75rem 1rem;
    color: #a0a0a0;
    text-decoration: none;
    font-size: 0.875rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    background: transparent;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
}

.dropdown__item:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
}

.dropdown__item--danger {
    color: #ef4444;
}

.dropdown__item--danger:hover {
    background: rgba(239, 68, 68, 0.1);
}

.header__burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 44px;
    height: 44px;
    padding: 10px;
    border: 1px solid rgba(212, 175, 55, 0.25);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.04);
    cursor: pointer;
    flex-shrink: 0;
}

.header__burger span {
    display: block;
    height: 2px;
    width: 100%;
    background: #d4af37;
    border-radius: 2px;
    transition: transform 0.25s ease, opacity 0.25s ease;
}

.header__burger--open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
}

.header__burger--open span:nth-child(2) {
    opacity: 0;
}

.header__burger--open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
}

.header__mobile-backdrop {
    position: fixed;
    inset: 0;
    top: var(--header-height, 68px);
    z-index: 199;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
}

.header__nav--mobile {
    position: fixed;
    top: var(--header-height, 68px);
    left: 0;
    right: 0;
    z-index: 205;
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 1rem var(--site-gutter, 1rem) 1.5rem;
    background: rgba(14, 14, 14, 0.98);
    border-bottom: 1px solid #2a2a2a;
    max-height: calc(100vh - var(--header-height, 68px));
    overflow-y: auto;
}

.header__nav--mobile .nav__link {
    padding: 1rem 0;
    font-size: 0.95rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.header__nav--mobile .nav__link--cart {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #d4af37;
}

.header__nav--mobile .nav__link--login {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    border-bottom: none;
    cursor: pointer;
    color: #d4af37;
    margin-top: 0.5rem;
}

.cart-badge--inline {
    position: static;
    min-width: 22px;
    height: 22px;
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
    opacity: 0;
}

.mobile-nav-enter-from.header__nav--mobile,
.mobile-nav-leave-to.header__nav--mobile {
    transform: translateY(-8px);
}

@media (max-width: 1280px) {
    .header__nav--desktop {
        gap: 1.25rem;
    }

    .nav__link {
        font-size: 0.8rem;
    }
}

@media (max-width: 1024px) {
    .header__nav--desktop {
        display: none;
    }

    .header__burger {
        display: flex;
    }

    .header__container {
        gap: 0.5rem;
    }

    .btn--primary {
        padding: 0.6rem 1rem;
        font-size: 0.8rem;
    }

    .user-menu__trigger {
        padding: 0.55rem 0.85rem;
        font-size: 0.8rem;
    }
}

@media (max-width: 480px) {
    .header {
        padding: 0.65rem 0;
    }

    .header__container {
        padding: 0 1rem;
    }

    .header__logo img,
    img {
        width: 38px;
    }

    .action__btn {
        width: 40px;
        height: 40px;
    }

    .btn--primary {
        display: none;
    }
}
</style>
