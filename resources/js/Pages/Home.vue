<template>
    <div class="home">
        <!-- Hero Section -->
        <section class="hero">
            <h1 class="sr-only">Luxury Shoot — студия профессиональной фото и видеосъёмки</h1>
            <div class="hero__content">
                <!--
                    ВСТАВЬТЕ СЮДА ФОТО (картинку в центре как на примере):
                    1) Положите файл в ваш проект (например, в src/assets/)
                    2) Замените значение src ниже на путь к файлу.
                -->
                <div class="brand-mark" aria-label="Luxury Shoot">
                    <span class="brand-mark__word brand-mark__word--left">LUXURY</span>
                    <span class="brand-mark__sub-left">Ваше видение</span>
                    <div class="brand-mark__circle" aria-hidden="true">
                        <span class="brand-mark__tick brand-mark__tick--top" aria-hidden="true"></span>
                        <span class="brand-mark__tick brand-mark__tick--bottom" aria-hidden="true"></span>
                        <img :src="getLogoUrl()" class="brand-mark__circle-img" alt="Camera lens">
                    </div>
                    <span class="brand-mark__word brand-mark__word--right">SHOOT</span>
                    <span class="brand-mark__sub-right">Наше воплощение</span>
                </div>


                <div class="block">
                    <h3 class="hero__choose-label">Выберите раздел</h3>
                    <div class="hero__selector">
                        <Link href="/photos" class="hero__option">
                            <div class="hero__option-icon">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <path
                                        d="M14.5 4h-5L7.8 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.8l-1.7-3z"/>
                                    <circle cx="12" cy="13" r="4"/>
                                </svg>
                            </div>
                            <div class="hero__option-text">
                                <span class="hero__option-name">Фотосъёмка</span>
                                <span class="hero__option-hint">Портреты, события, бизнес</span>
                            </div>
                        </Link>


                        <Link href="/video" class="hero__option">
                            <div class="hero__option-icon">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     stroke-width="1.5">
                                    <polygon points="23 7 16 12 23 17 23 7"/>
                                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                                </svg>
                            </div>
                            <div class="hero__option-text">
                                <span class="hero__option-name">Видеосъёмка</span>
                                <span class="hero__option-hint">Клипы, реклама, события</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section class="about section">
            <div class="container">
                <h2 class="section__title">О студии</h2>
                <p class="about__text">
                    Фотография — это искусство останавливать время, позволяющее вам вновь и вновь переживать самые
                    счастливые
                    моменты вашей жизни.
                    Мы верим, что каждый человек уникален, и каждый момент особенен.
                </p>
            </div>
        </section>

        <!-- Why Us Section -->
        <section class="why-us section">
            <div class="container">
                <div class="why-us__header">
                    <h2 class="section__title">ПОЧЕМУ ИМЕННО МЫ</h2>
                    <p class="why-us__subtitle">Мы в цифрах</p>
                </div>

                <div class="stats-wave" ref="statsWave">
                    <!-- SVG линия рисуется через JS -->
                    <svg class="stats-svg-line" ref="statsSvg" aria-hidden="true"></svg>

                    <!-- 1: внизу -->
                    <div class="stat-item stat-pos-low" data-wave="low">
                        <div class="stat-circle" ref="circle0">
                            <span class="stat-number">500+</span>
                        </div>
                        <div class="stat-content">
                            <h3 class="stat-title">Счастливых клиентов</h3>
                            <p class="stat-desc">Доверили нам самые важные моменты своей жизни</p>
                        </div>
                    </div>

                    <!-- 2: вверху -->
                    <div class="stat-item stat-pos-high" data-wave="high">
                        <div class="stat-circle" ref="circle1">
                            <span class="stat-number">8</span>
                            <span class="stat-unit">лет</span>
                        </div>
                        <div class="stat-content">
                            <h3 class="stat-title">Профессионального опыта</h3>
                            <p class="stat-desc">С 2017 года создаём изображения премиум уровня</p>
                        </div>
                    </div>

                    <!-- 3: внизу -->
                    <div class="stat-item stat-pos-low" data-wave="low">
                        <div class="stat-circle" ref="circle2">
                            <span class="stat-number">98</span>
                            <span class="stat-unit">%</span>
                        </div>
                        <div class="stat-content">
                            <h3 class="stat-title">Повторных обращений</h3>
                            <p class="stat-desc">Клиенты возвращаются к нам снова и снова</p>
                        </div>
                    </div>

                    <!-- 4: вверху -->
                    <div class="stat-item stat-pos-high" data-wave="high">
                        <div class="stat-circle" ref="circle3">
                            <span class="stat-number">1200+</span>
                        </div>
                        <div class="stat-content">
                            <h3 class="stat-title">Реализованных проектов</h3>
                            <p class="stat-desc">Фотосессии • Видео • Корпоративные съёмки</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Team Section - Compact Premium -->
        <section class="team section">
            <div class="container">
                <div class="team__header">
                    <h2 class="section__title">Наши специалисты</h2>

                </div>

                <div v-if="teamLoading" class="loading">Загрузка...</div>
                <div v-else-if="teamError" class="error">{{ teamError }}</div>

                <div v-else class="team__grid">
                    <div class="team-card" v-for="member in team" :key="member.id">
                        <div class="team-card__image-wrapper">
                            <img :src="resolveMediaUrl(member.image_url)" :alt="member.name" class="team-card__photo">
                        </div>

                        <div class="team-card__content">
                            <h3 class="team-card__name">{{ member.name }}</h3>
                            <p class="team-card__role">{{ member.position }}</p>
                            <p class="team-card__desc">{{ member.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <!-- Process Section -->
        <section class="process" id="process" ref="processSection">
            <!-- WebGL Canvas Background -->
            <canvas class="process__canvas" ref="processCanvas"></canvas>

            <!-- Floating particles overlay -->
            <div class="process__particles" ref="particlesContainer"></div>

            <div class="process__container">
                <!-- Header with glitch effect -->
                <div class="process__header">
                    <div class="process__badge" data-text="WORKFLOW">
                        <span>ПРОЦЕСС</span>
                    </div>
                    <h2 class="process__title" ref="processTitle">
                        <span class="process__title-word">Как</span>
                        <span class="processtitle-word processtitle-word--accent">мы</span>
                        <span class="process__title-word">работаем</span>
                    </h2>
                    <p class="process__subtitle" ref="processSubtitle">
                        Шесть этапов создания визуальной истории. От концепции до финального кадра.
                    </p>
                </div>

                <!-- 3D Stack Cards -->
                <div class="process__stack" ref="cardStack">
                    <div v-for="(step, index) in processSteps" :key="step.id" class="process__card" :class="{
                        'process__card--active': activeCard === index,
                        'process__card--prev': activeCard > index,
                        'process__card--next': activeCard < index
                    }" :style="getCardStyle(index)" @click="setActiveCard(index)" ref="cardRefs">
                        <!-- Holographic border -->
                        <div class="process__card-holo"></div>

                        <!-- Card number with liquid effect -->
                        <div class="process__card-num">
                            <span class="process__card-num-digit">{{ String(index + 1).padStart(2, '0') }}</span>
                            <div class="process__card-num-glow"></div>
                        </div>

                        <!-- Icon with morphing blob -->
                        <div class="process__card-icon-wrap">
                            <div class="process__card-blob" :style="{ background: step.gradient }"></div>
                            <div class="process__card-icon" v-html="step.icon"></div>
                        </div>

                        <!-- Content -->
                        <div class="process__card-content">
                            <h3 class="process__card-title">{{ step.title }}</h3>
                            <p class="process__card-desc">{{ step.desc }}</p>

                            <!-- Tech specs -->
                            <div class="process__card-specs">
                                <div class="process__spec" v-for="spec in step.specs" :key="spec">
                                    <span class="process__spec-dot"></span>
                                    <span class="process__spec-text">{{ spec }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Progress bar -->
                        <div class="process__card-progress">
                            <div class="process__card-progress-bar"
                                 :style="{ width: activeCard >= index ? '100%' : '0%' }"></div>
                        </div>

                        <!-- Corner decorations -->
                        <div class="processcard-corner processcard-corner--tl"></div>
                        <div class="processcard-corner processcard-corner--tr"></div>
                        <div class="processcard-corner processcard-corner--bl"></div>
                        <div class="processcard-corner processcard-corner--br"></div>
                    </div>
                </div>

                <!-- Navigation dots -->
                <div class="process__nav">
                    <button v-for="(_, index) in processSteps" :key="index" class="process__nav-dot"
                            :class="{ 'process__nav-dot--active': activeCard === index }" @click="setActiveCard(index)">
                        <span class="process__nav-dot-inner"></span>
                    </button>
                </div>

                <!-- Scroll indicator -->
                <div class="process__scroll-hint" v-if="!hasScrolled">
                    <div class="process__scroll-mouse">
                        <div class="process__scroll-wheel"></div>
                    </div>
                    <span>Листайте</span>
                </div>
            </div>
        </section>


        <!-- Portfolio Section -->
        <section class="section portfolio">
            <div class="container">
                <div class="section-header section-header--between">
                    <h2 class="section-title-best">Лучшие работы</h2>
                </div>

                <div v-if="portfolioLoading" class="loading">Загрузка...</div>
                <div v-else-if="portfolioError" class="error">{{ portfolioError }}</div>
                <p v-else-if="portfolio.length === 0" class="portfolio__empty">
                    Работы портфолио пока не загружены.
                </p>

                <div v-else class="portfolio__masonry">
                    <!-- Большое фото свадьбы (индекс 0) — слева, 2x2 -->
                    <div v-if="portfolio[0]" class="portfolio__item portfolio__item--large">
                        <img :src="resolveMediaUrl(portfolio[0].image_url)" :alt="portfolio[0].title || ''"/>
                        <div class="portfolio__meta">
                            <span v-if="portfolio[0].tag" class="portfolio__tag">{{ portfolio[0].tag }}</span>
                            <h4>{{ portfolio[0].title }}</h4>
                        </div>
                    </div>

                    <!-- Лес (индекс 1) — справа сверху -->
                    <div v-if="portfolio[1]" class="portfolio__item">
                        <img :src="resolveMediaUrl(portfolio[1].image_url)" :alt="portfolio[1].title || ''"/>
                        <div class="portfolio__meta">
                            <span v-if="portfolio[1].tag" class="portfolio__tag">{{ portfolio[1].tag }}</span>
                            <h4>{{ portfolio[1].title }}</h4>
                        </div>
                    </div>

                    <!-- Девушка с шарами (индекс 2) — справа рядом с лесом -->
                    <div v-if="portfolio[2]" class="portfolio__item">
                        <img :src="resolveMediaUrl(portfolio[2].image_url)" :alt="portfolio[2].title || ''"/>
                        <div class="portfolio__meta">
                            <span v-if="portfolio[2].tag" class="portfolio__tag">{{ portfolio[2].tag }}</span>
                            <h4>{{ portfolio[2].title }}</h4>
                        </div>
                    </div>

                    <!-- ВИДЕО — внизу справа, широкое -->
                    <div class="portfolio__item portfolio__item--wide portfolio__item--video">
                        <div class="portfolio__video-wrapper">
                            <iframe src="https://kinescope.io/embed/ktQGbHn6WHZQiie4NS6pVr" frameborder="0"
                                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write"
                                    allowfullscreen loading="lazy"></iframe>
                        </div>
                        <div class="portfolio__meta">
                            <h4>Открытие магазина одежды</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section — Premium Final -->
        <!-- CTA Section — Premium Final -->
        <section class="cta-final" id="contact" ref="ctaSection">
            <div class="cta-final__bg"></div>
            <div class="cta-final__container">
                <div class="cta-final__card">
                    <div class="cta-final__eyebrow">
                        <span class="line"></span>
                        <span class="text">Начните сейчас</span>
                        <span class="line"></span>
                    </div>

                    <h2 class="cta-final__title">
                        <span class="word word--main">Готовы создать</span>
                        <span class="word word--accent">историю?</span>
                    </h2>

                    <p class="cta-final__subtitle">
                        Обсудим ваш проект. Предложим концепцию и смету —
                        <strong class="highlight">бесплатно и без обязательств</strong>.
                    </p>

                    <div class="cta-final__actions">
                        <Link href="/orders" class="cta-final__btn" @click="handleCartLinkClick">
                            <span>Обсудить проект</span>
                            <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
import {ref, onMounted, onUnmounted, nextTick} from 'vue'
import axios from 'axios'
import { Link } from '@inertiajs/vue3'
import { useRequireAuth } from '../composables/useRequireAuth'
import { resolveMediaUrl } from '../utils/mediaUrl'

const { handleCartLinkClick } = useRequireAuth()

// ========== SVG ICONS ==========
const iconMeeting = ` <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`

const iconTask = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`

const iconTime = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`

const iconCamera = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M14.5 4h-5L7.8 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.8l-1.7-3z"/><circle cx="12" cy="13" r="4"/></svg>`

const iconUpload = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`

const iconStar = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`

// ========== DATA ==========
const processSteps = [
    {
        id: 1,
        title: 'Знакомство',
        desc: 'Встречаемся на локации или созваниваемся. Обсуждаем ваше видение, стиль и ожидания. Фиксируем ключевые детали в брифе.',
        specs: ['Бриф', 'Консультация', 'Мудборд'],
        gradient: 'linear-gradient(135deg, #d4af37, #f4e5c2)',
        icon: iconMeeting
    },
    {
        id: 2,
        title: 'Постановка задачи',
        desc: 'Детализируем техническое задание: формат, количество кадров, цветокоррекция, сроки. Подписываем договор.',
        specs: ['ТЗ', 'Договор', 'Смета'],
        gradient: 'linear-gradient(135deg, #c9a227, #e8d5a3)',
        icon: iconTask
    },
    {
        id: 3,
        title: 'Согласование',
        desc: 'Формируем расписание съёмочного дня с учётом освещения и логистики. Резервируем дату с предоплатой 30%.',
        specs: ['Календарь', 'Бронь', 'Логистика'],
        gradient: 'linear-gradient(135deg, #b8960b, #d4af37)',
        icon: iconTime
    },
    {
        id: 4,
        title: 'Проф. съёмка',
        desc: 'Работаем с премиальным оборудованием, контролируем свет и композицию. Прямой эфир с площадки.',
        specs: ['Canon R5', 'ProLight', '4K RAW'],
        gradient: 'linear-gradient(135deg, #d4af37, #c9a227)',
        icon: iconCamera
    },
    {
        id: 5,
        title: 'Постпродакшн',
        desc: 'Цветокоррекция, ретушь, монтаж. 2 раунда правок бесплатно. Материалы в облаке за 5 дней.',
        specs: ['Color Grade', 'Retouch', 'Delivery'],
        gradient: 'linear-gradient(135deg, #e8d5a3, #f4e5c2)',
        icon: iconUpload
    },
    {
        id: 6,
        title: 'Результат',
        desc: '98% клиентов возвращаются. Гарантия качества — если не впечатлит, переделаем бесплатно.',
        specs: ['Гарантия', 'Support', 'Bonus'],
        gradient: 'linear-gradient(135deg, #f4e5c2, #d4af37)',
        icon: iconStar
    }
]

// ========== STATE ==========
const activeCard = ref(0)
const hasScrolled = ref(false)
const cardRefs = ref([])
const processCanvas = ref(null)
const particlesContainer = ref(null)
const cardStack = ref(null)
const ctaSection = ref(null)
// ========== DRAG / SWIPE STATE ==========
const isDragging = ref(false)
const dragStartX = ref(0)
const dragCurrentX = ref(0)
const dragOffset = ref(0)

// ========== CARD LOGIC ==========
function setActiveCard(index) {
    if (index < 0) index = 0
    if (index >= processSteps.length) index = processSteps.length - 1
    activeCard.value = index
}

function getCardStyle(index) {
    const diff = index - activeCard.value
    const abs = Math.abs(diff)

    // Добавляем drag offset для интерактивного смещения
    const dragShift = isDragging.value ? dragOffset.value * 0.5 : 0

    if (diff === 0) {
        return {
            transform: `translateX(${dragShift}px) translateZ(100px) rotateY(${-dragOffset.value * 0.05}deg) scale(1.05)`,
            zIndex: 10,
            opacity: 1,
            transition: isDragging.value ? 'none' : 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
        }
    }

    const direction = diff > 0 ? 1 : -1
    const baseX = direction * (140 + abs * 20) // увеличил разнос
    const translateX = baseX + dragShift * direction * 0.3
    const rotateY = direction * -35 + (isDragging.value ? dragOffset.value * 0.02 : 0)
    const translateZ = -100 - abs * 50
    const scale = 0.85 - abs * 0.05
    const opacity = Math.max(0.2, 0.5 - abs * 0.15)

    return {
        transform: `translateZ(${translateZ}px) translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`,
        zIndex: 10 - abs,
        opacity,
        transition: isDragging.value ? 'none' : 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
    }
}

// ========== DRAG HANDLERS ==========
function onDragStart(e) {
    isDragging.value = true
    dragStartX.value = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
    dragCurrentX.value = dragStartX.value
    dragOffset.value = 0
}

function onDragMove(e) {
    if (!isDragging.value) return
    e.preventDefault()

    const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
    dragCurrentX.value = currentX
    dragOffset.value = currentX - dragStartX.value
}

function onDragEnd() {
    if (!isDragging.value) return
    isDragging.value = false

    const threshold = 80 // минимальное смещение для свайпа

    if (dragOffset.value > threshold && activeCard.value > 0) {
        // Свайп вправо — предыдущая карточка
        setActiveCard(activeCard.value - 1)
    } else if (dragOffset.value < -threshold && activeCard.value < processSteps.length - 1) {
        // Свайп влево — следующая карточка
        setActiveCard(activeCard.value + 1)
    }

    dragOffset.value = 0
}

// ========== INIT DRAG ==========
function initDrag() {
    const stack = cardStack.value
    if (!stack) return

    // Mouse events
    stack.addEventListener('mousedown', onDragStart)
    window.addEventListener('mousemove', onDragMove)
    window.addEventListener('mouseup', onDragEnd)

    // Touch events (для мобильных)
    stack.addEventListener('touchstart', onDragStart, {passive: false})
    window.addEventListener('touchmove', onDragMove, {passive: false})
    window.addEventListener('touchend', onDragEnd)

    return () => {
        stack.removeEventListener('mousedown', onDragStart)
        window.removeEventListener('mousemove', onDragMove)
        window.removeEventListener('mouseup', onDragEnd)
        stack.removeEventListener('touchstart', onDragStart)
        window.removeEventListener('touchmove', onDragMove)
        window.removeEventListener('touchend', onDragEnd)
    }
}

// ========== WEBGL BACKGROUND ==========
function initWebGL() {
    const canvas = processCanvas.value
    if (!canvas) return null

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return null

    const resize = () => {
        const dpr = Math.min(window.devicePixelRatio, 2)
        canvas.width = canvas.offsetWidth * dpr
        canvas.height = canvas.offsetHeight * dpr
        gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const vsSource = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }`


    const fsSource = `
    precision mediump float;
    uniform float time;
    uniform vec2 resolution;

    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float smoothNoise(vec2 p) {
vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution;
      vec2 p = uv * 3.0;

      float n = smoothNoise(p + time * 0.1) * 0.5 +
                smoothNoise(p * 2.0 - time * 0.15) * 0.25 +
                smoothNoise(p * 4.0 + time * 0.2) * 0.125;

      vec3 gold = vec3(0.83, 0.69, 0.22);
      vec3 dark = vec3(0.02, 0.02, 0.02);

      float lines = sin(uv.y * 50.0 + time * 0.5 + n * 10.0) * 0.5 + 0.5;
      lines = pow(lines, 8.0) * 0.15;

      float glow = smoothNoise(p * 0.5 + time * 0.05) * 0.3;

      vec3 color = mix(dark, gold * 0.3, n * 0.3 + glow * 0.2);
      color += gold * lines;

      gl_FragColor = vec4(color, 1.0);
    }
  `

    function createShader(type, source) {
        const shader = gl.createShader(type)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        return shader
    }

    const vs = createShader(gl.VERTEX_SHADER, vsSource)
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource)

    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const timeUniform = gl.getUniformLocation(program, 'time')
    const resolutionUniform = gl.getUniformLocation(program, 'resolution')

    let startTime = Date.now()
    let animId

    function render() {
        const time = (Date.now() - startTime) * 0.001
        gl.uniform1f(timeUniform, time)
        gl.uniform2f(resolutionUniform, canvas.width, canvas.height)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        animId = requestAnimationFrame(render)
    }

    render()

    return () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('resize', resize)
    }
}

// ========== PARTICLES ==========
function initParticles() {
    const container = particlesContainer.value
    if (!container) return

    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div')
        p.className = 'process__particle'
        p.style.left = Math.random() * 100 + '%'
        p.style.top = Math.random() * 100 + '%'
        p.style.animationDelay = Math.random() * 8 + 's'
        p.style.animationDuration = (6 + Math.random() * 6) + 's'
        container.appendChild(p)
    }
}

// ========== SCROLL DETECTION ==========
function initScrollDetection() {
    const onScroll = () => {
        if (!hasScrolled.value) {
            hasScrolled.value = true
        }
    }
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
}

// ========== TEAM & PORTFOLIO ==========
const team = ref([])
const portfolio = ref([])
const teamLoading = ref(true)
const portfolioLoading = ref(true)
const teamError = ref(null)
const portfolioError = ref(null)

const loadTeam = async () => {
    try {
        teamLoading.value = true
        const {data} = await axios.get('/data/specialists')
        team.value = data || []
    } catch (err) {
        teamError.value = 'Ошибка загрузки специалистов: ' + (err?.message || String(err))
    } finally {
        teamLoading.value = false
    }
}

const loadPortfolio = async () => {
    try {
        portfolioLoading.value = true
        const {data} = await axios.get('/data/portfolio')
        portfolio.value = data || []
    } catch (err) {
        portfolioError.value = 'Ошибка загрузки портфолио: ' + (err?.message || String(err))
    } finally {
        portfolioLoading.value = false
    }
}

// ========== WAVE LINE ==========
const statsWave = ref(null)
const statsSvg = ref(null)
const circle0 = ref(null)
const circle1 = ref(null)
const circle2 = ref(null)
const circle3 = ref(null)

function drawWaveLine() {
    const svg = statsSvg.value
    const wrap = statsWave.value
    if (!svg || !wrap) return
    const circles = [circle0.value, circle1.value, circle2.value, circle3.value]
    if (circles.some(c => !c)) return

    const wRect = wrap.getBoundingClientRect()
    const pts = circles.map(c => {
        const r = c.getBoundingClientRect()
        return {
            x: r.left - wRect.left + r.width / 2,
            y: r.top - wRect.top + r.height / 2
        }
    })

    while (svg.firstChild) svg.removeChild(svg.firstChild)

    let d = `M ${pts[0].x} ${pts[0].y}`

    for (let i = 0; i < pts.length - 1; i++) {
        const p1 = pts[i]
        const p2 = pts[i + 1]
        const dy = p2.y - p1.y

        const ctrl1x = p1.x + (p2.x - p1.x) * 0.35
        const ctrl1y = p1.y - dy * 1
        const ctrl2x = p1.x + (p2.x - p1.x) * 0.65
        const ctrl2y = p2.y + dy * 1

        d += `C ${ctrl1x} ${ctrl1y}, ${ctrl2x} ${ctrl2y}, ${p2.x} ${p2.y}`
    }

    const glow = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    glow.setAttribute('d', d)
    glow.setAttribute('fill', 'none')
    glow.setAttribute('stroke', '#d4af37')
    glow.setAttribute('stroke-width', '12')
    glow.setAttribute('stroke-linecap', 'round')
    glow.setAttribute('opacity', '0.2')
    glow.style.filter = 'blur(8px)'
    svg.appendChild(glow)

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', d)
    path.setAttribute('fill', 'none')
    path.setAttribute('stroke', 'url(#goldGrad)')
    path.setAttribute('stroke-width', '2.5')
    path.setAttribute('stroke-linecap', 'round')
    path.setAttribute('opacity', '0.9')
    svg.appendChild(path)

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
    grad.setAttribute('id', 'goldGrad')
    grad.setAttribute('x1', '0%')
    grad.setAttribute('y1', '0%')
    grad.setAttribute('x2', '100%')
    grad.setAttribute('y2', '0%')

    const stops = [
        {offset: '0%', color: '#b8860b'},
        {offset: '30%', color: '#f4e5a1'},
        {offset: '50%', color: '#d4af37'},
        {offset: '70%', color: '#f4e5a1'},
        {offset: '100%', color: '#b8860b'}
    ]
    stops.forEach(s => {
        const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
        stop.setAttribute('offset', s.offset)
        stop.setAttribute('stop-color', s.color)
        grad.appendChild(stop)
    })
    defs.appendChild(grad)
    svg.insertBefore(defs, svg.firstChild)
}

let _resizeTimer = null

function onResize() {
    clearTimeout(_resizeTimer)
    _resizeTimer = setTimeout(drawWaveLine, 80)
}

// ========== LIFECYCLE ==========
let cleanupWebGL = null
let cleanupScroll = null
let cleanupDrag = null

function getLogoUrl() {
    return '/photo.png';
}

onMounted(async () => {
    loadTeam()
    loadPortfolio()
    await nextTick()

    setTimeout(drawWaveLine, 500)
    window.addEventListener('resize', onResize)

    cleanupWebGL = initWebGL()
    initParticles()
    cleanupScroll = initScrollDetection()
    cleanupDrag = initDrag()
})

onUnmounted(() => {
    window.removeEventListener('resize', onResize)
    if (cleanupWebGL) cleanupWebGL()
    if (cleanupScroll) cleanupScroll()
    if (cleanupDrag) cleanupDrag()
})
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Chiron+Sung+HK:ital,wght@0,200..900;1,200..900&family=Imbue:opsz,wght@10..100,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&display=swap');

@font-face {
    font-family: 'logos';
    src: url(/fonts/A_DAY_WITHOUT_SUN.ttf);
}

@font-face {
    font-family: 'olympiadeco';
    src: url(/fonts/olympiadeco.ttf);
}

@font-face {
    font-family: 'neon';
    src: url(/fonts/aa_neon.ttf);
}

@font-face {
    font-family: 'allodswest';
    src: url(/fonts/allodswest.ttf);
}

@font-face {
    font-family: 'kurale';
    src: url(/fonts/kurale.ttf);
}

@font-face {
    font-family: 'bonjourmonamirus';
    src: url(/fonts/bonjourmonamirus.ttf);
}
@font-face {
    font-family: 'icekingdom';
    src: url(/fonts/icekingdom.ttf);
}

.home {
    width: 100vw;
    max-width: 100%;
    overflow-x: hidden;
}

h2 {
    font-family: 'olympiadeco' !important;
}

p,
h3 {
    font-family: 'allodswest' !important;
}

h4 {
    font-family: 'kurale' !important;
}

/* Hero */
.hero {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 0.7) 50%, rgba(10, 10, 10, 0.9) 100%),
    url('https://images.unsplash.com/photo-1554048612-387768052bf7?w=1920&q=80') center/cover no-repeat;
    text-align: center;
    padding: 2rem;
    position: relative;
    margin: 0;
}

.hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(10, 10, 10, 0.4) 100%);
    pointer-events: none;
}

.hero__content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1900px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 2rem;
    /* gap: 1.75rem; */
}

.hero__badge {
    display: inline-block;
    padding: 0.6rem 1.6rem;
    background: rgba(212, 175, 55, 0.15);
    border: 1px solid rgba(212, 175, 55, 0.45);
    border-radius: 9999px;
    color: #d4af37;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    margin-bottom: 2.5rem;
    backdrop-filter: blur(10px);
}

.hero__title {
    margin-bottom: 1.75rem;
    width: 100%;
}

.title__line {
    display: block;
    font-optical-sizing: auto;
    font-style: normal;
    font-size: clamp(2.8rem, 9vw, 6.5rem);
    font-weight: 700;
    line-height: 1;
    color: #ffffff;
    text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    padding-bottom: 10px;
}

.title__line--accent {
    background: linear-gradient(135deg, #d4af37 0%, #f4e5c2 50%, #d4af37 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
    filter: drop-shadow(0 4px 10px rgba(212, 175, 55, 0.3));
    font-size: clamp(2rem, 6vw, 4.5rem);
}

.hero__subtitle {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: #cccccc;
    margin-bottom: 3rem;
    line-height: 1.7;
    max-width: 620px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.hero__choose-label {
    font-optical-sizing: auto;
    font-style: normal;
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    color: #ffffff;
    text-shadow: 0 0 40px rgba(212, 175, 55, 0.25), 0 4px 20px rgba(0, 0, 0, 0.5);
    margin-bottom: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    margin-top: 20px;
}

/* Luxury / Shoot hero mark */
.brand-mark {
    width: 100%;
    margin: 0 auto;
    position: relative;
    display: flex !important;
    flex-direction: column;
    align-items: center;
    padding-top: 0.4rem;
    overflow: hidden;
}

.brand-mark__word {
    font-size: 350px !important;
    position: absolute;
    top: 48%;
    z-index: 3;
    font-family: 'logos';
    font-optical-sizing: auto;
    font-style: normal;
    font-weight: 400;
    font-size: clamp(3.2rem, 7.2vw, 10.4rem);
    line-height: 1;
    letter-spacing: -0.04em;
    color: #d4af37;
    -webkit-text-stroke: 2px rgba(0, 0, 0, 0.8);
    filter: drop-shadow(0 12px 26px rgba(0, 0, 0, 0.45));
    white-space: nowrap;
    pointer-events: none;
    text-shadow: 0 0 24px rgba(212, 175, 55, 0.18);
}

.brand-mark__word--left {
    left: 45%;
<<<<<<< HEAD
    transform: translate(calc(-100% - clamp(7rem, 18vw, 11rem)), -50%);
=======
    transform: translate(calc(-100% - clamp(7rem, 18vw, 11rem)), -40%);
>>>>>>> a0a44d2579585891a144e1d1a09da87e10c4b6f5
    letter-spacing: 1px;
}

.brand-mark__word--right {
<<<<<<< HEAD
    left: 54%;
    transform: translate(clamp(7rem, 18vw, 11rem), -50%);
=======
    left: 53%;
    transform: translate(clamp(7rem, 18vw, 11rem), -40%);
>>>>>>> a0a44d2579585891a144e1d1a09da87e10c4b6f5
}

.brand-mark__circle {
    z-index: 1;
    width: clamp(420px, 58vw, 760px);
    height: clamp(420px, 58vw, 760px);
    border-radius: 0;
    border: 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    background: transparent;
    box-shadow: none;
    backdrop-filter: none;
}

.brand-mark__circle::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 0;
    opacity: 0;
    pointer-events: none;
}

.brand-mark__circle-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0;
    border: 0;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.65),
    inset 0 0 0 2px rgba(0, 0, 0, 0.35);
    filter: contrast(1.08) saturate(1.05) brightness(0.98);
}

.brand-mark__tick {
    display: none;
}

.brand-mark__tick--top {
    top: -2px;
}

.brand-mark__tick--bottom {
    bottom: -2px;
}

.brand-mark__sub {
    width: 100%;
    margin-top: clamp(1.5rem, 2.6vw, 2.2rem);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 1rem;
}

.brand-mark__sub-left,
.brand-mark__sub-right {
    font-family: 'bonjourmonamirus';
    position: absolute;
    font-weight: 560;
    font-size: clamp(1.1rem, 2.2vw, 1.8rem);
    color: rgba(255, 255, 255, 0.92);
    text-shadow: 0 0 24px rgba(212, 175, 55, 0.12), 0 6px 24px rgba(0, 0, 0, 0.6);
    letter-spacing: 0.02em;
    z-index: 4;
    white-space: nowrap;
}

.brand-mark__sub-left {
    left: 42%;
    top: 70%;
    transform: translate(calc(-100% - clamp(5rem, 14vw, 9rem)), 0);
}

.brand-mark__sub-right {
    left: 56%;
    top: 70%;
    transform: translate(clamp(5rem, 14vw, 9rem), 0);
}


@media (max-width: 768px) {
    .brand-mark__sub {
        padding: 0 0.5rem;
        margin-top: 1.1rem;
    }

    .brand-mark__word {
        -webkit-text-stroke: 1.4px rgba(0, 0, 0, 0.8);
        letter-spacing: -0.02em;
    }

    .brand-mark__word--left {
        transform: translate(calc(-100% - clamp(4.5rem, 14vw, 7rem)), -40%);
    }

    .brand-mark__word--right {
        transform: translate(clamp(4.5rem, 14vw, 7rem), -40%);
    }

    .brand-mark__circle {
        width: clamp(300px, 62vw, 430px);
        height: clamp(300px, 62vw, 430px);
    }

    .brand-mark__circle-img {
        width: 100%;
        height: 100%;
    }

    .brand-mark__sub-left,
    .brand-mark__sub-right {
        font-size: clamp(1.0rem, 3.5vw, 1.35rem);
    }
}

.block {
    margin: 50px 0px;
}

.hero__selector {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 15px;
}

.hero__option {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: #ffffff;
    padding: 1rem 1.75rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(12px);
    transition: all 0.3s ease;
    min-width: 220px;
}

.hero__option:hover {
    background: rgba(212, 175, 55, 0.15);
    border-color: #d4af37;
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(212, 175, 55, 0.2);
}

.hero__option-icon {
    color: #d4af37;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(212, 175, 55, 0.18);
    border-radius: 0.6rem;
    padding: 0.6rem;
    flex-shrink: 0;
}

.hero__option-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
}

.hero__option-name {
    font-family: 'kurale';
    font-size: 1.05rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #ffffff;
}

.hero__option-hint {
    font-family: 'allodswest';
    font-size: 0.8rem;
    color: #999999;
    letter-spacing: 0.02em;
}

.hero__selector-divider {
    color: #888888;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    flex-shrink: 0;
}

/* Common */
.section {
    width: 100vw;
    padding: 7rem 1rem;
    margin: 0;
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.section__title {
    font-size: clamp(2rem, 4vw, 2.8rem);
    text-align: center;
    margin-bottom: 2rem;
    font-optical-sizing: auto;
    font-style: normal;
    color: #ffffff;
    letter-spacing: 0.02em;
}

.section-title-best {
    font-size: clamp(2rem, 4vw, 2.8rem);
    text-align: center !important;
    margin-bottom: 3rem;
    font-family: 'neon' !important;
    font-optical-sizing: auto;
    font-style: normal;
    color: #ffffff;
    letter-spacing: 0.02em;
}

/* About */
.about {
    background: #0a0a0a;
    border-top: 1px solid #1a1a1a;
    border-bottom: 1px solid #1a1a1a;
}

.about__text {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    font-size: clamp(1rem, 1.8vw, 1.2rem);
    color: #a0a0a0;
    line-height: 1.9;
}

/* ====================== WHY US — ВОЛНА ====================== */
.why-us {
    background: #050505;
    padding: 8rem 1rem 8.5rem;
    position: relative;
    overflow: hidden;
}

.why-us__header {
    text-align: center;
    margin-bottom: 4rem;
}

.why-us__subtitle {
    color: #d4af37;
    font-size: 1.35rem;
    letter-spacing: 0.22em;
    font-family: 'kurale', sans-serif;
}

.stats-wave {
    position: relative;
    max-width: 1300px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    min-height: 420px;
}

.stats-svg-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: visible;
}

.stat-item {
    position: relative;
    z-index: 2;
    text-align: center;
    flex: 1;
    max-width: 255px;
}

.stat-pos-low {
    margin-top: 130px;
}

.stat-pos-high {
    margin-top: 0px;
}

.stat-pos-high .stat-content,
.stat-pos-low .stat-content {
    margin-top: 1.7rem;
}

.stat-circle {
    width: 178px;
    height: 178px;
    margin: 0 auto;
    border: 3px solid #d4af37;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 40% 40%, #1a1a1a, #0a0a0a);
    box-shadow: 0 0 50px rgba(212, 175, 55, 0.4),
    inset 0 0 30px rgba(0, 0, 0, 0.8);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    z-index: 3;
}

.stat-item:hover .stat-circle {
    transform: scale(1.12) rotate(4deg);
    box-shadow: 0 0 75px rgba(212, 175, 55, 0.6),
    inset 0 0 40px rgba(0, 0, 0, 0.9);
    border-color: #f4e5c2;
}

.stat-number {
    font-family: 'Cinzel', serif;
    font-size: 3.1rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1;
    text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
}

.stat-unit {
    position: absolute;
    bottom: 26px;
    right: 28px;
    font-size: 1.12rem;
    color: #d4af37;
    font-weight: 500;
}

.stat-content h3 {
    font-size: 1.42rem;
    color: #ffffff;
    margin-bottom: 0.6rem;
}

.stat-content p {
    color: #a0a0a0;
    line-height: 1.65;
    font-size: 0.96rem;
}

@media (max-width: 1024px) {
    .stats-wave {
        flex-wrap: wrap;
        gap: 3.5rem 2rem;
        justify-content: center;
        min-height: unset;
    }

    .stat-pos-low,
    .stat-pos-high {
        margin-top: 0;
    }

    .stats-svg-line {
        display: none;
    }
}


/* ====================== TEAM — COMPACT PREMIUM ====================== */
.team {
    background: #0a0a0a;
    padding: 5.5rem 1rem 6rem;
}

.team__header {
    text-align: center;
    margin-bottom: 3.8rem;
}


/* Grid */
.team__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.2rem;
    max-width: 1300px;
    margin: 0 auto;
}

/* Card */
.team-card {
    background: #111;
    border-radius: 1.25rem;
    overflow: hidden;
    border: 1px solid #1c1c1c;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100%;
    display: flex;
    flex-direction: column;
}

.team-card:hover {
    transform: translateY(-10px);
    border-color: #d4af37;
    box-shadow: 0 25px 50px -15px rgba(212, 175, 55, 0.16);
}

/* Изображение */
.team-card__image-wrapper {
    position: relative;
    height: 320px;
    overflow: hidden;
}

.team-card__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s ease;
}

.team-card:hover .team-card__photo {
    transform: scale(1.06);
}

/* Контент */
.team-card__content {
    padding: 1.8rem 1.6rem 1.9rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.team-card__name {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.4rem;
    transition: color 0.3s ease;
    text-align: center;
}

.team-card:hover .team-card__name {
    color: #d4af37;
}

.team-card__role {
    color: #d4af37;
    font-size: 0.92rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 1.1rem;
    font-weight: 500;
}

.team-card__desc {
    color: #aaaaaa;
    line-height: 1.7;
    font-size: 0.98rem;
    flex-grow: 1;
    text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
    .team {
        padding: 4rem 1rem 4.5rem;
    }

    .team__grid {
        gap: 2rem;
    }

    .team-card__image-wrapper {
        height: 280px;
    }
}

/* ====================== PROCESS HEADER FIX ====================== */

.process {
    position: relative;
    min-height: 100vh;
    background: #020202;
    /* Сплошной фон вместо прозрачного */
    overflow: hidden;
    padding: 6rem 0 8rem;
    isolation: isolate;
    /* Создаём новый контекст наложения */
}

/* WebGL Canvas — STRICTLY INSIDE SECTION */
.process__canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.6;
    pointer-events: none;
    /* Ограничиваем canvas границами секции */
    clip-path: inset(0 0 0 0);
}

/* Particles — STRICTLY INSIDE SECTION */
.process__particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
    clip-path: inset(0 0 0 0);
}

.process__header {
    text-align: center !important;
    margin-bottom: 5rem;
    width: 100%;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
}

.process__badge {
    display: inline-block !important;
    position: relative;
    font-family: 'Courier New', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: #d4af37;
    margin: 0 auto 2rem auto !important;
    padding: 0.6rem 1.6rem;
    border: 1px solid rgba(212, 175, 55, 0.3);
    background: rgba(212, 175, 55, 0.05);
    overflow: hidden;
    text-align: center !important;
}

.process__title {
    font-family: 'olympiadeco' !important;
    font-size: clamp(2.5rem, 6vw, 2.8rem) !important;
    font-weight: 700 !important;
    line-height: 1.1 !important;
    margin: 0 auto 1.5rem auto !important;
    display: flex !important;
    flex-wrap: wrap;
    justify-content: center !important;
    align-items: center !important;
    gap: 0.3em;
    width: 100%;
    text-align: center !important;
    color: #fff !important;
}

.process__title-word {
    display: inline-block !important;
    color: #fff !important;
    text-align: center !important;
    float: none !important;
    position: static !important;
}

.process__title-word--accent {
    background: linear-gradient(135deg, #d4af37, #f4e5c2, #d4af37) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
}

.process__subtitle {
    font-size: clamp(1rem, 1.5vw, 1.25rem) !important;
    color: #888 !important;
    max-width: 600px;
    margin: 0 auto !important;
    line-height: 1.7 !important;
    text-align: center !important;
    display: block !important;
    width: 100%;
}

/* Container fix */
.process__container {
    position: relative;
    z-index: 2;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    width: 100%;
}

/* 3D Card Stack — FIXED CENTERING */
.process__stack {
    position: relative;
    width: 100%;
    max-width: 500px;
    height: 520px;
    perspective: 2000px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    touch-action: pan-y;
}

.process__stack:active {
    cursor: grabbing;
}

/* Card — FIXED ABSOLUTE CENTER */
.process__card {
    position: absolute;
    width: 380px;
    height: 480px;
    left: 50%;
    top: 50%;
    margin-left: -190px;
    margin-top: -240px;
    background: rgba(10, 10, 10, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 2.5rem;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    overflow: hidden;
    will-change: transform, opacity;
}

/* Holographic border */
.process__card-holo {
    position: absolute;
    inset: -2px;
    border-radius: 26px;
    background: linear-gradient(135deg,
    transparent 40%,
    rgba(212, 175, 55, 0.1) 45%,
    rgba(212, 175, 55, 0.4) 50%,
    rgba(212, 175, 55, 0.1) 55%,
    transparent 60%);
    background-size: 200% 200%;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.5s;
    animation: holo-shift 3s ease infinite;
    pointer-events: none;
}

.processcard:hover .processcard-holo,
.processcard--active .processcard-holo {
    opacity: 1;
}

@keyframes holo-shift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

/* Card states */
.process__card--active {
    z-index: 10;
    transform: translateZ(100px) rotateY(0deg) scale(1.05);
    border-color: rgba(212, 175, 55, 0.4);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5),
    0 0 60px rgba(212, 175, 55, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.process__card--prev {
    z-index: 5;
    transform: translateZ(-100px) translateX(-140%) rotateY(35deg) scale(0.85);
    opacity: 0.4;
    filter: brightness(0.6);
}

.process__card--next {
    z-index: 5;
    transform: translateZ(-100px) translateX(140%) rotateY(-35deg) scale(0.85);
    opacity: 0.4;
    filter: brightness(0.6);
}

/* Card number */
.process__card-num {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-family: 'Cinzel', serif;
    font-size: 3rem;
    font-weight: 700;
    color: rgba(212, 175, 55, 0.15);
    line-height: 1;
}

.process__card-num-digit {
    position: relative;
    z-index: 2;
}

.process__card-num-glow {
    position: absolute;
    inset: -20px;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.2), transparent 70%);
    filter: blur(15px);
    opacity: 0;
    transition: opacity 0.5s;
}

.processcard--active .processcard-num-glow {
    opacity: 1;
}

/* Icon with blob */
.process__card-icon-wrap {
    position: relative;
    width: 80px;
    height: 80px;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.process__card-blob {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    filter: blur(20px);
    opacity: 0.4;
    transform: scale(0.8);
    transition: all 0.6s ease;
}

.processcard--active .processcard-blob {
    transform: scale(1.2);
    opacity: 0.6;
    animation: blob-morph 4s ease-in-out infinite;
}

@keyframes blob-morph {

    0%,
    100% {
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    }

    50% {
        border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    }
}

.process__card-icon {
    position: relative;
    z-index: 2;
    color: #fff;
    transition: transform 0.5s ease;
}

.processcard--active .processcard-icon {
    transform: scale(1.1);
}

/* Content */
.process__card-content {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

.process__card-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
    transition: color 0.3s;
}

.processcard--active .processcard-title {
    color: #f4e5c2;
}

.process__card-desc {
    font-family: 'allodswest', sans-serif;
    font-size: 0.95rem;
    color: #888;
    line-height: 1.7;
    margin: 0;
}

/* Specs */
.process__card-specs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.process__spec {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.8rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 100px;
    font-size: 0.7rem;
    color: #aaa;
    letter-spacing: 0.05em;
}

.process__spec-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #d4af37;
    box-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
}

/* Progress bar */
.process__card-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(255, 255, 255, 0.05);
}

.process__card-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #d4af37, #f4e5c2);
    transition: width 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
}

/* Corner decorations */
.process__card-corner {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid rgba(212, 175, 55, 0.3);
    opacity: 0;
    transition: all 0.5s;
}

.process__card-corner--tl {
    top: -1px;
    left: -1px;
    border-right: 0;
    border-bottom: 0;
    border-radius: 24px 0 0 0;
}

.process__card-corner--tr {
    top: -1px;
    right: -1px;
    border-left: 0;
    border-bottom: 0;
    border-radius: 0 24px 0 0;
}

.process__card-corner--bl {
    bottom: -1px;
    left: -1px;
    border-right: 0;
    border-top: 0;
    border-radius: 0 0 0 24px;
}

.process__card-corner--br {
    bottom: -1px;
    right: -1px;
    border-left: 0;
    border-top: 0;
    border-radius: 0 0 24px 0;
}

.processcard--active .processcard-corner {
    opacity: 1;
    width: 30px;
    height: 30px;
}

/* Navigation */
.process__nav {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 3rem;
}

.process__nav-dot {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease;
    position: relative;
    padding: 0;
}

.process__nav-dot::before {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 1px solid rgba(212, 175, 55, 0);
    transition: all 0.4s;
}

.process__nav-dot:hover {
    border-color: rgba(212, 175, 55, 0.5);
    transform: scale(1.1);
}

.process__nav-dot--active {
    border-color: #d4af37;
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
}

.process__nav-dot--active::before {
    border-color: rgba(212, 175, 55, 0.3);
    animation: dot-pulse 2s infinite;
}

@keyframes dot-pulse {

    0%,
    100% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(1.3);
        opacity: 0;
    }
}

.process__nav-dot-inner {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #444;
    transition: all 0.3s;
}

.processnav-dot--active .processnav-dot-inner {
    background: #d4af37;
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
}

/* Scroll hint */
.process__scroll-hint {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #666;
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    animation: fade-bounce 2s infinite;
    pointer-events: none;
}

.process__scroll-mouse {
    width: 24px;
    height: 36px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    padding-top: 8px;
}

.process__scroll-wheel {
    width: 2px;
    height: 6px;
    background: #d4af37;
    border-radius: 1px;
    animation: scroll-wheel 1.5s infinite;
}

@keyframes scroll-wheel {
    0% {
        transform: translateY(0);
        opacity: 1;
    }

    100% {
        transform: translateY(8px);
        opacity: 0;
    }
}

@keyframes fade-bounce {

    0%,
    100% {
        opacity: 0.5;
        transform: translateX(-50%) translateY(0);
    }

    50% {
        opacity: 1;
        transform: translateX(-50%) translateY(-5px);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .process__stack {
        height: 420px;
        max-width: 340px;
    }

    .process__card {
        width: 300px;
        height: 400px;
        margin-left: -150px;
        margin-top: -200px;
        padding: 1.5rem;
    }

    .process__card--prev {
        transform: translateZ(-100px) translateX(-110%) rotateY(35deg) scale(0.8);
    }

    .process__card--next {
        transform: translateZ(-100px) translateX(110%) rotateY(-35deg) scale(0.8);
    }

    .process__title {
        flex-direction: column;
        gap: 0.1em;
    }

    .process__card-num {
        font-size: 2rem;
    }
}

@media (max-width: 480px) {
    .process__stack {
        max-width: 280px;
        height: 400px;
    }

    .process__card {
        width: 260px;
        height: 380px;
        margin-left: -130px;
        margin-top: -190px;
        padding: 1.25rem;
    }

    .process__card--prev {
        transform: translateZ(-100px) translateX(-100%) rotateY(35deg) scale(0.75);
    }

    .process__card--next {
        transform: translateZ(-100px) translateX(100%) rotateY(-35deg) scale(0.75);
    }
}

/* Portfolio */

.portfolio__masonry {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 340px);
    gap: 1rem;
}

/* Элемент 1: Большое фото — слева на 2 колонки и 2 строки */
.portfolio__item:nth-child(1) {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
}

/* Элемент 2: Лес — верхняя правая */
.portfolio__item:nth-child(2) {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
}

/* Элемент 3: Девушка с шарами — верхняя правая рядом с лесом */
.portfolio__item:nth-child(3) {
    grid-column: 4 / 5;
    grid-row: 1 / 2;
}

/* Элемент 4: Видео — нижняя правая, на 2 колонки */
.portfolio__item:nth-child(4) {
    grid-column: 3 / 5;
    grid-row: 2 / 3;
}

.portfolio__item {
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.4s ease;
    min-height: 0;
}

.portfolio__item:hover {
    transform: scale(1.02);
    border-color: var(--gold);
    z-index: 2;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
}

/* Убираем старые классы-модификаторы, т.к. теперь позиционирование через nth-child */
.portfolio__item--large,
.portfolio__item--wide {
    /* оставляем для совместимости, но grid теперь управляет через nth-child */
}

.portfolio__item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
    display: block;
}

.portfolio__item:hover img {
    transform: scale(1.08);
}

/* Видео-элемент */
.portfolio__item--video {
    background: #000;
}

.portfolio__video-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden;
}

.portfolio__video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    object-fit: cover;
}

.portfolio__meta {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 50%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.5rem;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    z-index: 3;
}

.portfolio__item:hover .portfolio__meta {
    opacity: 1;
}

.portfolio__tag {
    color: var(--gold);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
}

.portfolio__meta h4 {
    font-optical-sizing: auto;
    font-style: normal;
    font-size: 1.25rem;
    font-weight: 700;
}

.section-header--between {
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2rem;
}

.section-label {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--gold);
    margin-bottom: 0.75rem;
}

.section-title {
    font-optical-sizing: auto;
    font-style: normal;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    line-height: 1.2;
    font-family: 'neon';
}

.link-all {
    color: var(--gold);
    text-decoration: none;
    font-weight: 600;
}

/* ====================== CTA FINAL — ULTRA COMPACT & CENTERED ====================== */
.cta-final {
    --gold: #d4af37;
    --gold-light: #f4e5c2;
    --gold-dark: #b8860b;
    --text-primary: #ffffff;
    --text-secondary: #a0a0a0;
    --glass-bg: rgba(255, 255, 255, 0.035);
    --glass-border: rgba(212, 175, 55, 0.15);
    position: relative;
    padding: 3rem 1.5rem 3.5rem;
    /* Немного уменьшил вертикальные отступы */
    background: linear-gradient(180deg, #030303 0%, #0a0a0a 50%, #050505 100%);
    overflow: hidden;
    min-height: min(50vh, 420px);
    /* Ещё ниже высота */
    display: flex;
    align-items: center;
    justify-content: center;
}

.cta-final__bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 40%, rgba(212, 175, 55, 0.05) 0%, transparent 60%);
    pointer-events: none;
}

.cta-final__bg::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.025;
    mix-blend-mode: overlay;
    pointer-events: none;
}

.cta-final__container {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 620px;
    /* Было 720px — сузили */
    margin: 0 auto;
    display: flex;
    justify-content: center;
    /* Строго по центру */
}

.cta-final__card {
    background: var(--glass-bg);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--glass-border);
    border-radius: 1.6rem;
    /* Было 1.75rem */
    padding: 2.2rem 1.8rem 2.6rem;
    /* Было 2.8rem 2.5rem 3.2rem — компактнее */
    text-align: center;
    /* Строго по центру */
    position: relative;
    overflow: hidden;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.cta-finalcard::before,
.cta-finalcard::after {
    content: '';
    position: absolute;
    width: 40px;
    /* Было 48px */
    height: 40px;
    border: 1.5px solid transparent;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    pointer-events: none;
}

.cta-final__card::before {
    top: -1px;
    left: -1px;
    border-top-color: var(--gold);
    border-right-color: var(--gold);
    border-radius: 1.6rem 0 0 0;
    opacity: 0.6;
}

.cta-final__card::after {
    bottom: -1px;
    right: -1px;
    border-bottom-color: var(--gold);
    border-left-color: var(--gold);
    border-radius: 0 0 1.6rem 0;
    opacity: 0.6;
}

.cta-final__eyebrow {
    display: flex;
    align-items: center;
    justify-content: center;
    /* По центру */
    gap: 0.8rem;
    margin: 0 auto 1.4rem;
    /* Центрирование блока и отступ */
    opacity: 0;
    transform: translateY(18px);
    animation: ctaFadeUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.15s forwards;
}

.cta-final__eyebrow .line {
    width: 24px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold));
}

.cta-final__eyebrow .line:last-child {
    background: linear-gradient(90deg, var(--gold), transparent);
}

.cta-final__eyebrow .text {
    font-family: 'kurale', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
}

.cta-final__title {
    font-size: clamp(1.8rem, 3.8vw, 2.6rem);
    /* Было clamp(2.2rem...) — уменьшили шрифт */
    font-weight: 700;
    line-height: 1.1;
    margin: 0 auto 1.2rem;
    /* Центрирование и отступ */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /* По центру */
    align-items: center;
    gap: 0 0.3em;
    opacity: 0;
    transform: translateY(18px);
    animation: ctaFadeUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.3s forwards;
}

.cta-final__title .word {
    display: inline-block;
}

.cta-final__title .word--main {
    color: var(--text-primary);
}

.cta-final__title .word--accent {
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 45%, var(--gold) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 3px 10px rgba(212, 175, 55, 0.25));
}

.cta-final__subtitle {
    font-family: 'allodswest', sans-serif;
    font-size: clamp(0.9rem, 1.3vw, 1.05rem);
    color: var(--text-secondary);
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto 2rem;
    opacity: 0;
    transform: translateY(18px);
    animation: ctaFadeUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.45s forwards;
}

.cta-final__subtitle .highlight {
    color: var(--gold-light);
    font-weight: 600;
    position: relative;
    white-space: nowrap;
}

.cta-final__subtitle .highlight::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1.2px;
    background: var(--gold);
    opacity: 0.45;
    border-radius: 2px;
}

.cta-final__actions {
    opacity: 0;
    transform: translateY(18px);
    animation: ctaFadeUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.6s forwards;
    display: flex;
    justify-content: center;
    /* Строго по центру */
}

.cta-final__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.9rem 2rem;
    /* Было 0.95rem 2.2rem — кнопка чуть меньше */
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
    color: #0a0a0a;
    font-family: 'kurale', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 100px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0 8px 24px rgba(212, 175, 55, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.cta-final__btn:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 20px rgba(212, 175, 55, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
    background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 80%);
}

.cta-final__btn .btn-arrow {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
}

.cta-final__btn:hover .btn-arrow {
    transform: translateX(4px);
}

.cta-final__btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.6s ease;
    pointer-events: none;
}

.cta-final__btn:hover::after {
    left: 100%;
}

@keyframes ctaFadeUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .cta-final {
        padding: 2.5rem 1rem 3rem;
        min-height: auto;
    }

    .cta-final__card {
        padding: 2rem 1.4rem 2.2rem;
        border-radius: 1.4rem;
    }

    .cta-final__title {
        font-size: clamp(1.6rem, 5.5vw, 2.2rem);
        margin-bottom: 1rem;
    }

    .cta-final__subtitle {
        font-size: 0.95rem;
        margin-bottom: 1.8rem;
        max-width: 100%;
    }

    .cta-final__btn {
        width: 100%;
        padding: 0.9rem 0;
    }
}


/* Loading / error */
.loading,
.error,
.portfolio__empty {
    color: #ffffff;
    text-align: center;
    padding: 2rem 0;
}

/* Mobile */
@media (max-width: 768px) {
    .hero {
        padding: 1.5rem;
    }

    .hero__content {
        padding: 2rem 1rem;
    }

    .hero__selector {
        flex-direction: column;
        gap: 0.75rem;
        width: 100%;
    }

    .hero__option {
        width: 100%;
        max-width: 320px;
        justify-content: flex-start;
        min-width: unset;
    }

    .section {
        padding: 4rem 1rem;
    }

    .team__grid {
        grid-template-columns: 1fr;
    }

    .portfolio__masonry {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-auto-rows: 240px;
    }

    /* На мобильных все элементы в одну колонку */
    .portfolio__item:nth-child(1),
    .portfolio__item:nth-child(2),
    .portfolio__item:nth-child(3),
    .portfolio__item:nth-child(4) {
        grid-column: 1 / -1;
        grid-row: auto;
    }

    .portfolio__item--large {
        grid-row: span 2;
    }

    .section-header--between {
        flex-direction: column;
        align-items: flex-start;
    }

    .container {
        padding: 0 1rem;
    }
}

@media (max-width: 1280px) {
    .container {
        padding-left: var(--site-gutter, 1.5rem);
        padding-right: var(--site-gutter, 1.5rem);
    }
}

@media (max-width: 480px) {
    .hero__badge {
        font-size: 0.7rem;
        padding: 0.5rem 1.1rem;
    }

    .title__line {
        font-size: 2.4rem;
    }

    .hero__subtitle {
        font-size: 0.95rem;
    }

    .hero__choose-label {
        font-size: 1.3rem;
    }

    .cta__box {
        padding: 2rem 1.25rem;
    }
}
</style>
