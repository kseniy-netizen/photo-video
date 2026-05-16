<template>
    <div class="video-page">
        <div class="vp-header">
            <div class="floating-particles header-particles">
                <span
                    v-for="(p, i) in headerParticles"
                    :key="i"
                    :style="{
                        left: p.left,
                        animationDelay: p.delay,
                        animationDuration: p.duration,
                    }"
                ></span>
            </div>

            <div class="vp-header__inner">
                <span class="vp-eyebrow">— Наши работы —</span>
                <h1 class="vp-title">Видео<em>съёмка</em></h1>
                <div class="vp-title__line"></div>
                <p class="vp-desc">Создаём видео которое цепляет — клипы, промо, события</p>
            </div>
        </div>

        <div class="vp-list">
            <div v-for="video in videoItems" :key="video.cartKey" class="vp-item">
                <div class="vp-item__meta">
                    <span class="vp-item__index">{{ video.index }}</span>
                    <div>
                        <p class="vp-item__title">{{ video.title }}</p>
                        <span class="vp-item__tag">{{ video.tag }}</span>
                        <div class="add-to-cart-wrapper">
                            <button
                                type="button"
                                class="add-to-cart-btn"
                                :class="{ added: isInCart(video.cartKey) }"
                                @click="toggleVideoCart(video)"
                            >
                                <span v-if="!isInCart(video.cartKey)" class="btn-icon">+</span>
                                <span v-else class="btn-icon">✓</span>
                                {{ isInCart(video.cartKey) ? 'Убрать' : 'Добавить' }}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="vp-item__video">
                    <div class="vp-item__frame">
                        <iframe
                            :src="video.embedUrl"
                            allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                            frameborder="0"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>

        <div class="vp-cta">
            <div class="floating-particles cta-particles">
                <span
                    v-for="(p, i) in ctaParticles"
                    :key="i"
                    :style="{
                        left: p.left,
                        animationDelay: p.delay,
                        animationDuration: p.duration,
                    }"
                ></span>
            </div>

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
                        <path d="M5 12h14M12 5l7 7-7 7"/>
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
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Link } from '@inertiajs/vue3'
import { useCart } from '../composables/useCart'
import { useRequireAuth } from '../composables/useRequireAuth'

const { toggleItem, isInCart, count } = useCart()
const { handleCartLinkClick } = useRequireAuth()

const headerParticles = ref([])
const ctaParticles = ref([])

const videoItems = [
    {
        cartKey: 'video-dance-cover',
        index: '01',
        title: 'Танцевальный кавер',
        tag: 'Кавер',
        type: 'Видеосъёмка',
        duration: 'По договорённости',
        price: 'По запросу',
        priceAmount: 0,
        image: '/pricing/video-bg.jpg',
        embedUrl: 'https://kinescope.io/embed/mZZ5tnnLNKugxB9QUanL2f',
    },
    {
        cartKey: 'video-reportage',
        index: '02',
        title: 'Репортаж',
        tag: 'Ролик',
        type: 'Видеосъёмка',
        duration: 'По договорённости',
        price: 'По запросу',
        priceAmount: 0,
        image: '/pricing/video-bg.jpg',
        embedUrl: 'https://kinescope.io/embed/sRuuaCtkaMXj1ep9Am3ATs',
    },
    {
        cartKey: 'video-graduation',
        index: '03',
        title: 'Последний звонок',
        tag: 'Выпускной',
        type: 'Видеосъёмка',
        duration: 'По договорённости',
        price: 'По запросу',
        priceAmount: 0,
        image: '/pricing/video-bg.jpg',
        embedUrl: 'https://kinescope.io/embed/6a4GHL4H4mpgzJgYGF1xNQ',
    },
    {
        cartKey: 'video-realty',
        index: '04',
        title: 'Недвижимость',
        tag: 'Продажа',
        type: 'Видеосъёмка',
        duration: 'По договорённости',
        price: 'По запросу',
        priceAmount: 0,
        image: '/pricing/video-bg.jpg',
        embedUrl: 'https://kinescope.io/embed/eRckS4taaYrTdtqfBKgLAq',
    },
]

const toggleVideoCart = (video) => {
    toggleItem({
        cartKey: video.cartKey,
        name: video.title,
        type: video.type,
        duration: video.duration,
        price: video.price,
        priceAmount: video.priceAmount,
        image: video.image,
        source: 'video',
    })
}

onMounted(() => {
    headerParticles.value = Array.from({ length: 40 }, (_, i) => ({
        left: `${i * (100 / 40) + Math.random() * 2}%`,
        delay: `-${Math.random() * 25}s`,
        duration: `${20 + Math.random() * 20}s`,
    }))

    ctaParticles.value = Array.from({ length: 30 }, (_, i) => ({
        left: `${i * (100 / 30) + Math.random() * 2}%`,
        delay: `-${Math.random() * 20}s`,
        duration: `${15 + Math.random() * 15}s`,
    }))
})
</script>

<style scoped>
.video-page {
    background: #0a0a0a;
    min-height: 100vh;
    color: #fff;
    font-family: sans-serif;
}

.vp-header {
    padding: 6rem 6% 5rem;
    border-bottom: 1px solid #1a1a1a;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.vp-header::before {
    content: 'VIDEO';
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
}

.vp-header__inner {
    position: relative;
    z-index: 2;
}

.vp-eyebrow {
    display: block;
    font-size: 0.72rem;
    color: #d4af37;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    margin-bottom: 1.5rem;
    font-weight: 600;
}

.vp-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 5vw, 7rem);
    font-weight: 700;
    line-height: 1;
    margin: 0 0 1.5rem;
}

.vp-title em {
    font-style: italic;
    background: linear-gradient(135deg, #d4af37, #f4e5c2, #d4af37);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.vp-title__line {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #d4af37, transparent);
    margin: 0 auto 1.5rem;
}

.vp-desc {
    color: #666;
    font-size: 0.98rem;
    font-style: italic;
    margin: 0;
}

.floating-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
}

.floating-particles span {
    position: absolute;
    bottom: -20px;
    width: 5px;
    height: 5px;
    background: #d4af37;
    border-radius: 50%;
    box-shadow: 0 0 15px #d4af37;
    opacity: 0;
    animation: floatParticle linear infinite;
}

@keyframes floatParticle {
    0% { transform: translateY(0) scale(0.5); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 0.9; }
    100% { transform: translateY(-220vh) scale(1.3); opacity: 0; }
}

.vp-list {
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 6%;
}

.vp-item {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 3rem;
    align-items: center;
    padding: 5rem 0;
    border-bottom: 1px solid #1a1a1a;
}

.vp-item:hover {
    background: rgba(212, 175, 55, 0.02);
}

.vp-item__meta {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    padding-right: 2rem;
    border-right: 1px solid #1a1a1a;
}

.vp-item__index {
    font-family: 'Playfair Display', serif;
    font-size: 4rem;
    color: #d4af37;
    margin-top: -35px;
}

.vp-item__title {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
}

.vp-item__tag {
    display: inline-block;
    font-size: 0.65rem;
    color: #d4af37;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    padding: 0.2rem 0.7rem;
    border: 1px solid rgba(212, 175, 55, 0.25);
    border-radius: 9999px;
    background: rgba(212, 175, 55, 0.06);
}

.vp-item__frame {
    position: relative;
    padding-bottom: 56.25%;
    background: #111;
    border: 1px solid #d4af37;
    overflow: hidden;
}

.vp-item__frame iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
}

.add-to-cart-wrapper {
    margin-top: 1rem;
}

.add-to-cart-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1rem;
    border-radius: 9999px;
    border: 1px solid rgba(212, 175, 55, 0.35);
    background: rgba(212, 175, 55, 0.08);
    color: #f4e5c2;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
    background: rgba(212, 175, 55, 0.18);
    border-color: #d4af37;
}

.add-to-cart-btn.added {
    background: rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.5);
    color: #6ee7b7;
}

.btn-icon {
    font-size: 1rem;
    line-height: 1;
}

.vp-cta {
    display: flex;
    align-items: center;
    gap: 3rem;
    padding: 5rem 6%;
    max-width: 1300px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
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

.vp-cta__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.9rem 2.5rem;
    background: linear-gradient(135deg, #d4af37, #f4e5c2, #d4af37);
    color: #0a0a0a;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 0.87rem;
    text-decoration: none;
    text-transform: uppercase;
    transition: all 0.3s ease;
}

.vp-cta__btn--cart {
    background: transparent;
    color: #d4af37;
    border: 1px solid rgba(212, 175, 55, 0.4);
}

.gold-note {
    color: #d4af37;
    font-size: 0.85rem;
    padding-top: 8px;
}

@media (max-width: 1280px) {
    .vp-list {
        padding-left: 4%;
        padding-right: 4%;
    }
}

@media (max-width: 768px) {
    .vp-header {
        padding: 4rem 1.25rem 3rem;
    }

    .vp-list {
        padding: 0 1rem 2rem;
    }

    .vp-item {
        grid-template-columns: 1fr;
    }

    .vp-item__meta {
        border-right: none;
        border-bottom: 1px solid #1a1a1a;
        padding-bottom: 1rem;
    }

    .vp-item__frame {
        min-height: 200px;
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
}

@media (max-width: 480px) {
    .vp-title {
        font-size: 2.25rem;
    }

    .add-to-cart-btn {
        width: 100%;
        justify-content: center;
    }
}
</style>
