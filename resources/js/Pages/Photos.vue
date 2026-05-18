<template>
    <div class="photos-page">
        <!-- Контейнер частиц вынесен в корень компонента -->
        <div class="floating-particles">
            <span v-for="(p, i) in particles" :key="i" :style="{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration
            }"></span>
        </div>

        <section class="photos-hero">
            <div class="hero-content">
                <span class="section-badge">— НАШИ РАБОТЫ —</span>
                <h1 class="hero-title">Фото<span class="accent">съёмка</span></h1>
                <div class="hero-line"></div>
                <p class="hero-subtitle">Профессиональная фотосъёмка для любых событий</p>
            </div>
        </section>

        <section class="categories-section" v-if="!selectedCategory">
            <div class="section-header centered-header">
                <h2 class="section-title">Выберите категорию</h2>
                <p class="section-desc">Каждый момент заслуживает профессионального подхода</p>
            </div>
            <div v-if="loading" class="loading-grid">
                <div v-for="n in 6" :key="n" class="skeleton-card">
                    <div class="skeleton-image"></div>
                    <div class="skeleton-text"></div>
                </div>
            </div>
            <div v-else class="categories-grid">
                <div v-for="category in categories" :key="category.id" class="category-card"
                     @click="selectCategory(category)">
                    <div class="card-image-wrapper">
                        <div class="card-bg-image" :style="{
                            backgroundImage: `url(${category.cover_image})`,
                            backgroundSize: category.fit
                        }"></div>
                        <button
                            type="button"
                            class="favorite-btn"
                            :class="{ 'favorite-btn--in-cart': isInCart(cartKeyForCategory(category)) }"
                            :title="isInCart(cartKeyForCategory(category)) ? 'Убрать из корзины' : 'Добавить в корзину'"
                            @click.stop="toggleCategoryCart(category)"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 stroke-width="2">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                        </button>
                        <div class="card-overlay">
                            <span class="view-text">Смотреть работы</span>
                        </div>
                    </div>
                    <div class="card-info">
                        <h3 class="card-title">{{ category.name }}</h3>
                        <span class="card-tag">{{ getCategoryTag(category.name) }}</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="gallery-section" v-else>
            <div class="gallery-header gallery-header-with-fit-toggle centered-header">
                <div class="gallery-header-main-content">
                    <button class="back-btn" @click="selectedCategory = null">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Назад
                    </button>
                    <h2 class="gallery-title">{{ selectedCategory.name }}</h2>
                </div>
            </div>

            <div class="gallery-grid three-columns">
                <div v-for="(photo, index) in galleryPhotos" :key="photo.id" class="gallery-item"
                     @click="openLightbox(photo, index)">
                    <div class="gallery-image-wrapper">
                        <img :src="photo.image_url" :alt="photo.title" :style="{ objectFit: galleryObjectFit }"
                             loading="lazy" />
                        <div class="gallery-overlay">
                            <div class="gallery-overlay-content">
                                <h4>{{ photo.title }}</h4>
                                <p v-if="photo.description">{{ photo.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <!-- CTA -->
        <div class="vp-cta">
            <span class="vp-cta__line"></span>
            <div class="vp-cta__content">
                <h2 class="vp-cta__title">Готовы к съёмке?</h2>

                <div class="cta-footer-note">
                    <div class="cta-divider"></div>
                    <p>Не нашли нужную категорию? Выберите наиболее близкую.</p>
                    <p class="gold-note">Все детали мы обсудим лично при подтверждении заказа</p>
                </div>
                <Link v-if="count === 0" href="/price" class="vp-cta__btn">
                    Выбрать тариф
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
                <Link v-else href="/orders" class="vp-cta__btn" @click="handleCartLinkClick">
                    Перейти в корзину ({{ count }})
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                </Link>
            </div>
            <span class="vp-cta__line"></span>
        </div>


        <Transition name="fade">
            <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox">
                <button class="lightbox-close" @click="closeLightbox">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                </button>
                <button class="lightbox-nav prev" @click="prevPhoto" v-if="currentPhotoIndex > 0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <div class="lightbox-content">
                    <img :src="currentPhoto?.image_url" :alt="currentPhoto?.title" />
                    <div class="lightbox-info">
                        <h3>{{ currentPhoto?.title }}</h3>
                        <p v-if="currentPhoto?.description">{{ currentPhoto?.description }}</p>
                    </div>
                </div>
                <button class="lightbox-nav next" @click="nextPhoto"
                        v-if="currentPhotoIndex < galleryPhotos.length - 1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { Link } from '@inertiajs/vue3'
import { useCart } from '../composables/useCart'
import { useRequireAuth } from '../composables/useRequireAuth'

const { toggleItem, isInCart, count } = useCart()
const { handleCartLinkClick } = useRequireAuth()

const categories = ref([])
const galleryPhotos = ref([])
const selectedCategory = ref(null)
const loading = ref(true)
const lightboxOpen = ref(false)
const currentPhotoIndex = ref(0)
const galleryObjectFit = ref('cover')
const currentPhoto = computed(() => galleryPhotos.value[currentPhotoIndex.value])

const particles = ref(
    Array.from({ length: 40 }, (_, i) => {
        // Равномерное распределение по горизонтали (с небольшим рандомом)
        const spacing = 100 / 40
        const left = (i * spacing) + (Math.random() * spacing * 0.8)

        // Случайная позиция по вертикали
        const top = Math.random() * 100

        // Отрицательная задержка — частицы уже в движении!
        const delay = -(Math.random() * 25)

        // Разная скорость
        const duration = 20 + Math.random() * 20

        return {
            left: `${left}%`,
            top: `${top}%`,
            delay: `${delay}s`,
            duration: `${duration}s`
        }
    })
)

const toggleFit = () => {
    galleryObjectFit.value = galleryObjectFit.value === 'cover' ? 'contain' : 'cover'
}

const cartKeyForCategory = (category) => `photo-${category.id}`

const toggleCategoryCart = (category) => {
    toggleItem({
        cartKey: cartKeyForCategory(category),
        name: category.name,
        type: 'Фотосъёмка',
        duration: 'По договорённости',
        price: 'По запросу',
        priceAmount: 0,
        image: category.cover_image,
        source: 'photo',
    })
}

const getCategoryTag = (name) => {
    const tags = {
        'СЕМЕЙНАЯ': 'СЕМЬЯ',
        'ИНДИВИДУАЛЬНЫЕ': 'ПОРТРЕТ',
        'ВЫПУСКНОЙ': 'ВЫПУСК',
        'СВАДЕБНАЯ': 'СВАДЬБА',
        'РЕКЛАМНАЯ': 'РЕКЛАМА',
        'НЕДВИЖИМОСТЬ': 'ИНТЕРЬЕР',
    }
    return tags[name] || 'ПРОДАЖА'
}

const fetchCategories = async () => {
    loading.value = true
    try {
        const { data } = await axios.get('/data/photo-categories')
        const fits = {
            'ИНДИВИДУАЛЬНЫЕ': 'contain',
            'СЕМЕЙНАЯ': 'cover',
            'ВЫПУСКНОЙ': 'cover',
            'СВАДЕБНАЯ': 'cover',
            'РЕКЛАМНАЯ': 'cover',
            'НЕДВИЖИМОСТЬ': 'cover'
        }
        categories.value = (data || []).map((cat) => ({
            id: cat.id,
            name: cat.name,
            cover_image: cat.cover_image || '',
            photo_count: cat.photo_count || 0,
            fit: fits[cat.name] || 'cover'
        }))
    } catch (catError) {
        console.error('Ошибка загрузки категорий:', catError)
        categories.value = []
    } finally {
        loading.value = false
    }
}

const selectCategory = async (category) => {
    selectedCategory.value = category
    try {
        const { data } = await axios.get(`/data/gallery-photos/${category.id}`)
        galleryPhotos.value = data || []
    } catch (error) {
        console.error('Ошибка загрузки галереи:', error)
        galleryPhotos.value = []
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
const openLightbox = (photo, index) => {
    currentPhotoIndex.value = index
    lightboxOpen.value = true
    document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
    lightboxOpen.value = false
    document.body.style.overflow = ''
}

const prevPhoto = () => {
    if (currentPhotoIndex.value > 0) currentPhotoIndex.value--
}

const nextPhoto = () => {
    if (currentPhotoIndex.value < galleryPhotos.value.length - 1) currentPhotoIndex.value++
}

const handleKeydown = (e) => {
    if (!lightboxOpen.value) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') prevPhoto()
    if (e.key === 'ArrowRight') nextPhoto()
}

const handleGalleryGlow = (e) => {
    const cards = document.querySelectorAll('.gallery-item')
    cards.forEach(card => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        card.style.setProperty('--mouse-x', `${x}px`)
        card.style.setProperty('--mouse-y', `${y}px`)
    })
}

const initTiltCards = () => {
    const cards = document.querySelectorAll('.gallery-item')
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const rotateY = (x / rect.width - 0.5) * 8
            const rotateX = (0.5 - y / rect.height) * 8
            card.style.transform =
                `perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)`
        })
        card.addEventListener('mouseleave', () => {
            card.style.transform =
                'perspective(1200px) rotateX(0deg) rotateY(0deg)'
        })
    })
}

onMounted(() => {
    window.addEventListener('mousemove', handleGalleryGlow)
    setTimeout(() => {
        initTiltCards()
    }, 500)
    fetchCategories()
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('mousemove', handleGalleryGlow)
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>


h4{
    font-family: 'allodswest';
    padding-bottom: 5px;
}

p{
    font-family: 'allodswest';
}

.photos-page {
    width: 100%;
    min-height: 100vh;
    background: #0a0a0a;
    color: #fff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    /* Важно для ограничения частиц только этим компонентом */
    position: relative;
    /* overflow: hidden; */
}

/* ── Плавающие частицы (обновлено) ── */
.floating-particles {
    position: absolute;
    /* Привязка к .photos-page */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    /* Ниже контента */
    overflow: hidden;
}

.floating-particles span {
    position: absolute;
    bottom: -20px;
    width: 5px;
    height: 5px;
    background: #d4af37;
    border-radius: 50%;
    /* Яркое свечение */
    box-shadow: 0 0 15px #d4af37, 0 0 30px rgba(212, 175, 55, 0.6);
    opacity: 0;
    animation: floatParticle linear infinite;
}

@keyframes floatParticle {
    0% {
        transform: translateY(0) scale(0.5);
        opacity: 0;
    }

    10% {
        opacity: 1;
    }

    90% {
        opacity: 0.9;
    }

    100% {
        transform: translateY(-220vh) scale(1.3);

        opacity: 0;
    }
}

/* Контент поверх частиц */
.photos-hero,
.categories-section,
.gallery-section,
.cta-section {
    position: relative;
    z-index: 2;
}

/* ── Hero ── */
.photos-hero {
    padding: 6rem 6% 5rem;
    border-bottom: 1px solid #1a1a1a;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.photos-hero::before {
    content: 'PHOTO';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18vw;
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.02);
    pointer-events: none;
    white-space: nowrap;
    letter-spacing: 0.1em;
}

.section-badge {
    display: block;
    font-size: 0.72rem;
    color: #d4af37;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    margin-bottom: 1.5rem;
    font-weight: 600;
}

.hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 5vw, 7rem);
    font-weight: 700;
    line-height: 1.0;
    color: #ffffff;
    margin: 0 0 1.5rem;
}

.hero-title .accent {
    font-style: italic;
    background: linear-gradient(135deg, #d4af37 0%, #f4e5c2 50%, #d4af37 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-line {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #d4af37, transparent);
    margin: 0 auto 1.5rem;
}

.hero-subtitle {
    color: #666;
    font-size: 0.98rem;
    font-style: italic;
    margin: 0;
}

/* ── Categories Section ── */
.categories-section {
    padding: 5rem 5%;
    background: #0a0a0a;
}

.centered-header {
    text-align: center;
    margin-bottom: 3.5rem;
}

.section-title {
    font-family: 'olympiadeco' !important;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    margin-bottom: 0.6rem;
    color: #ffffff;
}

.section-desc {
    color: rgba(255, 255, 255, 0.4);
    font-style: italic;
    margin: 0;
}

/* ── Скелетон ── */
.loading-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    max-width: 1400px;
    margin: 0 auto;
}

.skeleton-card {
    background: #1a1a1a;
    border-radius: 1.25rem;
    overflow: hidden;
}

.skeleton-image {
    aspect-ratio: 3/4;
    background: linear-gradient(90deg, #1a1a1a 25%, #252525 50%, #1a1a1a 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.skeleton-text {
    height: 50px;
    margin: 1rem;
    background: linear-gradient(90deg, #1a1a1a 25%, #252525 50%, #1a1a1a 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 0.5rem;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

/* ── Categories Grid ── */
.categories-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    max-width: 1300px;
    margin: 0 auto;
}

/* ── Category Card ── */
.category-card {
    background: #111;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.35s ease;
    border: 1px solid rgba(212, 175, 55, 0.15);
    width: calc(25% - 1.2rem);
    min-width: 220px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}

.category-card:hover {
    border-color: rgba(212, 175, 55, 0.5);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
    transform: translateY(-8px);
}

.favorite-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
    color: #fff;
}

.favorite-btn svg {
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 1));
    transition: all 0.3s ease;
}

.favorite-btn:hover {
    transform: scale(1.15);
}

.favorite-btn:hover svg {
    color: #d4af37;
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 1)) drop-shadow(0 0 8px rgba(212, 175, 55, 0.9)) drop-shadow(0 0 15px rgba(212, 175, 55, 0.4));
}

.favorite-btn:active {
    transform: scale(0.9);
}

.card-image-wrapper {
    position: relative;
    aspect-ratio: 3/4;
    overflow: hidden;
    background: #0a0a0a;
    border-bottom: 1px solid rgba(212, 175, 55, 0.08);
}

/* Затемнение — низкий слой */
.card-image-wrapper::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.35) 45%, transparent 100%);
    z-index: 1;           /* ← был 1 */
}

/* Рамка */
.card-image-wrapper::before {
    content: "";
    position: absolute;
    inset: 12px;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,.08);
    z-index: 3;
    pointer-events: none;
}

/* Кнопка "избранное" */
.favorite-btn {
    z-index: 5;   /* уже должно быть выше */
}

/* Текст "Смотреть работы" — самый верхний слой */
.card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 1.5rem;
    z-index: 4;
    font-family: 'allodswest';
}

/* фото */
.card-bg-image {
    position: absolute;
    inset: 0;
    background-position: center;
    background-repeat: no-repeat;
    transition: transform .6s ease, filter .4s ease;
}

.category-card:hover .card-bg-image {
    transform: scale(1.05);
    filter: brightness(1.08);
}


/* корзина сверху */
.favorite-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 5;
    width: 42px;
    height: 42px;
    border-radius: 14px;
    border: 1px solid rgba(212,175,55,.15);
    background: rgba(0,0,0,.45);
    color: #fff;
    transition: .3s;
}

.favorite-btn:hover {
    transform: scale(1.08);
    background: rgba(212,175,55,.12);
    border-color: rgba(212,175,55,.4);
    color: #d4af37;
}

.favorite-btn--in-cart {
    background: rgba(16, 185, 129, 0.2);
    border-color: rgba(16, 185, 129, 0.5);
    color: #6ee7b7;
}

/* hover "выбрать категорию" */
.card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.85) 0%,
        rgba(0, 0, 0, 0.1) 50%,
        transparent 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 1.5rem;
}

.category-card:hover .card-overlay {
    opacity: 1;
}

.view-text {
    display: inline-block;
    color: #fff;
    font-size: 14px;
    letter-spacing: 2px;
    text-transform: uppercase;
    border-bottom: 1px solid #d4af37;
    padding-bottom: 4px;
    background: none;
    border-radius: 0;
}

/* нижняя "корзина выбора" */
.card-info {
    position: relative;
    padding: 1.2rem;
    background:
        linear-gradient(
            180deg,
            rgba(15,15,15,0.98),
            rgba(10,10,10,1)
        );
    display: flex;
    flex-direction: column;
    gap: .55rem;
    z-index: 5;
}

/* золотая полоска сверху */
.card-info::before {
    content: "";
    position: absolute;
    top: 0;
    left: 1.2rem;
    right: 1.2rem;
    height: 1px;
    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(212,175,55,.5),
            transparent
        );
}

/* название */
.card-title {
    margin: 0;
    color: #fff;
    font-family: 'allodswest' !important;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: .08em;
}

/* тег */
.card-tag {
    display: inline-flex;
    width: fit-content;
    padding: 4px 12px;
    border-radius: 999px;
    background: rgba(212,175,55,.08);
    border: 1px solid rgba(212,175,55,.18);
    color: #d4af37;
    font-size: 9px;
    letter-spacing: 2px;
    font-weight: 700;
    text-transform: uppercase;
}

/* ── Gallery Section ── */
.gallery-section {
    width: 100%;
    padding: 40px 20px 80px;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
}

.gallery-header-with-fit-toggle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 3.5rem;
}

.gallery-header-main-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    width: 100%;
    position: relative;
}

.back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: absolute;
    left: 0;
}

.back-btn:hover {
    border-color: #d4af37;
    color: #d4af37;
    background: rgba(212, 175, 55, 0.05);
}

.gallery-title {
    font-size: 2rem;
    font-weight: 600;
    color: #d4af37;
    margin: 0;
    font-family: 'Georgia', serif;
}

/* ===== CREATIVE LUXURY CARDS ===== */
.gallery-grid.three-columns {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
}

.gallery-item {
    position: relative;
    aspect-ratio: 1/1;
    overflow: hidden;
    border-radius: 22px;
    cursor: pointer;
    isolation: isolate;
    background: #090909;
    border: 1px solid rgba(212, 175, 55, .18);
    box-shadow: 0 12px 30px rgba(0, 0, 0, .45), inset 0 1px 0 rgba(255, 255, 255, .05);
    transition: transform .45s cubic-bezier(.16, 1, .3, 1), box-shadow .45s ease, border-color .35s ease;
}

.gallery-item:nth-child(odd) {
    transform: rotate(-1.2deg);
}

.gallery-item:nth-child(even) {
    transform: rotate(1.2deg);
}

.gallery-item:hover {
    transform: rotate(0deg) translateY(-8px) scale(1.02);
    border-color: rgba(212, 175, 55, .4);
    box-shadow: 0 25px 60px rgba(0, 0, 0, .6), 0 0 22px rgba(212, 175, 55, .12);
}

.gallery-item::before {
    content: "";
    position: absolute;
    inset: 10px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, .08);
    z-index: 4;
    pointer-events: none;
}

.gallery-item::after {
    content: "";
    position: absolute;
    left: 20%;
    bottom: 0;
    width: 60%;
    height: 4px;
    background: radial-gradient(circle, rgba(212, 175, 55, .9), transparent 70%);
    filter: blur(6px);
    opacity: .7;
    z-index: 3;
}

.gallery-image-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
}

.gallery-image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .5s ease, filter .5s ease;
}

.gallery-item:hover img {
    transform: scale(1.015);
    filter: brightness(1.05) contrast(1.05) saturate(1.04);
}

.gallery-image-wrapper::after {
    content: "";
    position: absolute;
    top: -120%;
    left: -40%;
    width: 35%;
    height: 300%;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, .14), transparent);
    transform: rotate(25deg);
    transition: 1s;
    pointer-events: none;
    z-index: 2;
}

.gallery-item:hover .gallery-image-wrapper::after {
    left: 130%;
}

.gallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.25), transparent);
    opacity: 0;
    transition: .35s ease;
    display: flex;
    align-items: flex-end;
    padding: 22px;
    z-index: 5;
}

.gallery-item:hover .gallery-overlay {
    opacity: 1;
}

.gallery-overlay-content {
    transform: translateY(15px);
    opacity: 0;
    transition: .35s ease;
}

.gallery-item:hover .gallery-overlay-content {
    transform: translateY(0);
    opacity: 1;
}

@media (max-width: 768px) {
    .gallery-grid.three-columns {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }
}

@media (max-width: 480px) {
    .gallery-grid.three-columns {
        grid-template-columns: 1fr;
    }
}

/* ── CTA ── */
.vp-cta {
    display: flex;
    align-items: center;
    gap: 3rem;
    padding: 5rem 6%;
    max-width: 1300px;
    margin: 0 auto;
}

.vp-cta__line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
}

.vp-cta__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
    z-index: 2;
}

.vp-cta__title {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    white-space: nowrap;
}
.gold-note {
    color: #d4af37;
    font-size: 0.85rem;
    padding-top: 8px;
}
.vp-cta__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.9rem 2.5rem;
    background: linear-gradient(135deg, #d4af37 0%, #f4e5c2 50%, #d4af37 100%);
    color: #0a0a0a;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 0.870rem;
    text-decoration: none;
    text-transform: uppercase;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
    margin-top: 10px !important;
}

.vp-cta__btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(212, 175, 55, 0.45);
}

/* ── Lightbox ── */
.lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    backdrop-filter: blur(10px);
}

.lightbox-close {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.lightbox-close:hover {
    background: rgba(212, 175, 55, 0.2);
    border-color: #d4af37;
    color: #d4af37;
}

.lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.lightbox-nav:hover {
    background: rgba(212, 175, 55, 0.2);
    border-color: #d4af37;
    color: #d4af37;
}

.lightbox-nav.prev {
    left: 30px;
}

.lightbox-nav.next {
    right: 30px;
}

.lightbox-content {
    max-width: 85vw;
    max-height: 85vh;
    text-align: center;
}

.lightbox-content img {
    max-width: 100%;
    max-height: 70vh;
    border-radius: 12px;
    object-fit: contain;
}

.lightbox-info {
    margin-top: 24px;
}

.lightbox-info h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #fff;
}

.lightbox-info p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1rem;
}

/* ── Transitions ── */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* ── Responsive ── */
@media (max-width: 1280px) {
    .photos-page {
        padding-top: 0;
    }

    .categories-section,
    .gallery-section {
        padding-left: var(--site-gutter, 1.5rem);
        padding-right: var(--site-gutter, 1.5rem);
    }
}

@media (max-width: 1024px) {
    .categories-grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 1.5rem;
    }
}

@media (max-width: 768px) {
    .photos-hero {
        padding: 60px 20px 40px;
    }

    .categories-section {
        padding: 3rem 4%;
    }

    .categories-grid {
        gap: 1rem;
    }

    .category-card {
        width: calc(50% - 0.8rem);
        min-width: 160px;
    }

    .gallery-grid.three-columns {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    .lightbox-nav {
        display: none;
    }

    .lightbox-content {
        max-width: 95vw;
        padding: 0;
    }

    .vp-cta {
        flex-direction: column;
        gap: 1.5rem;
        padding: 3rem 1.25rem;
    }

    .vp-cta__line {
        display: none;
    }

    .vp-cta__title {
        white-space: normal;
        font-size: 1.5rem;
    }

    .vp-cta__btn {
        width: 100%;
        max-width: 320px;
        justify-content: center;
    }

    .back-btn {
        position: static;
        margin-bottom: 1rem;
    }

    .gallery-header-main-content {
        flex-direction: column;
    }
}

@media (max-width: 480px) {
    .categories-grid {
        grid-template-columns: 1fr;
    }

    .category-card {
        width: 100%;
    }

    .card-info {
        padding: 1rem 1.25rem;
    }

    .gallery-grid.three-columns {
        grid-template-columns: 1fr;
    }
}
</style>
