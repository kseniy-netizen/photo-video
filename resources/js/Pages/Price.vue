<template>
  <div class="price-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">Тарифный план</h1>
      </div>
    </div>

    <section class="pricing section">
      <div class="container">

        <p
          v-if="tariffSectionsAllowed.hint"
          class="pricing-portfolio-hint"
        >
          {{ tariffSectionsAllowed.hint }}
        </p>

        <!-- Фотограф -->
        <div
          class="pricing__category"
          :class="{ 'pricing__category--locked': !tariffSectionsAllowed.photo }"
        >
          <h2 class="pricing__title">Фотограф</h2>
          <div class="pricing__grid">
            <div
              v-for="plan in photoPlans"
              :key="plan.cartKey"
              class="pricing-card"
              :class="{
                'pricing-card--featured': plan.featured,
                'pricing-card--locked': !tariffSectionsAllowed.photo,
              }"
            >
              <div
                class="pricing-card__bg"
                :style="{ backgroundImage: `url('${photoBg}')` }"
              ></div>
              <div v-if="plan.badge" class="pricing-card__badge">{{ plan.badge }}</div>
              <div class="pricing-card__inner">
                <h3 class="pricing-card__name">{{ plan.tier }}</h3>
                <div class="pricing-card__price">{{ formatPriceShort(plan.priceAmount) }}₽</div>
                <ul class="pricing-card__features">
                  <li v-for="(line, i) in plan.features" :key="i">{{ line }}</li>
                </ul>
                <div class="pricing-card__btn-wrap">
                  <button
                    type="button"
                    class="btn"
                    :class="[
                      plan.featured ? 'btn--primary' : 'btn--outline',
                      { 'btn--in-cart': isInCart(plan.cartKey) },
                    ]"
                    :disabled="photoTariffButtonDisabled(plan)"
                    @click="toggleTariffInCart(plan, 'photo')"
                  >
                    {{ isInCart(plan.cartKey) ? 'Убрать' : 'Выбрать' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Видеограф -->
        <div
          class="pricing__category"
          :class="{ 'pricing__category--locked': !tariffSectionsAllowed.video }"
        >
          <h2 class="pricing__title">Видеограф</h2>
          <div class="pricing__grid">
            <div
              v-for="plan in videoPlans"
              :key="plan.cartKey"
              class="pricing-card"
              :class="{
                'pricing-card--featured': plan.featured,
                'pricing-card--locked': !tariffSectionsAllowed.video,
              }"
            >
              <div
                class="pricing-card__bg"
                :style="{ backgroundImage: `url('${videoBg}')` }"
              ></div>
              <div v-if="plan.badge" class="pricing-card__badge">{{ plan.badge }}</div>
              <div class="pricing-card__inner">
                <h3 class="pricing-card__name">{{ plan.tier }}</h3>
                <div class="pricing-card__price">{{ formatPriceShort(plan.priceAmount) }}₽</div>
                <ul class="pricing-card__features">
                  <li v-for="(line, i) in plan.features" :key="i">{{ line }}</li>
                </ul>
                <div class="pricing-card__btn-wrap">
                  <button
                    type="button"
                    class="btn"
                    :class="[
                      plan.featured ? 'btn--primary' : 'btn--outline',
                      { 'btn--in-cart': isInCart(plan.cartKey) },
                    ]"
                    :disabled="videoTariffButtonDisabled(plan)"
                    @click="toggleTariffInCart(plan, 'video')"
                  >
                    {{ isInCart(plan.cartKey) ? 'Убрать' : 'Выбрать' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Комбо -->
        <div
          class="pricing__category"
          :class="{ 'pricing__category--locked': !tariffSectionsAllowed.combo }"
        >
          <h2 class="pricing__title">
            <span class="pricing__title-sub">Комбо</span>
            Фотограф + Видеограф
          </h2>
          <div class="pricing__grid">
            <div
              v-for="plan in comboPlans"
              :key="plan.cartKey"
              class="pricing-card"
              :class="{
                'pricing-card--featured': plan.featured,
                'pricing-card--locked': !tariffSectionsAllowed.combo,
              }"
            >
              <div
                class="pricing-card__bg"
                :style="{ backgroundImage: `url('${comboBg}')` }"
              ></div>
              <div v-if="plan.badge" class="pricing-card__badge">{{ plan.badge }}</div>
              <div class="pricing-card__inner">
                <h3 class="pricing-card__name">{{ plan.tier }}</h3>
                <div class="pricing-card__price">{{ formatPriceShort(plan.priceAmount) }}₽</div>
                <ul class="pricing-card__features">
                  <li v-for="(line, i) in plan.features" :key="i">{{ line }}</li>
                </ul>
                <div class="pricing-card__btn-wrap">
                  <button
                    type="button"
                    class="btn"
                    :class="[
                      plan.featured ? 'btn--primary' : 'btn--outline',
                      { 'btn--in-cart': isInCart(plan.cartKey) },
                    ]"
                    :disabled="comboTariffButtonDisabled(plan)"
                    @click="toggleTariffInCart(plan, 'combo')"
                  >
                    {{ isInCart(plan.cartKey) ? 'Убрать' : 'Выбрать' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="count > 0" class="pricing-cart-cta">
          <Link href="/orders" class="pricing-cart-cta__btn" @click="handleCartLinkClick">
            Перейти в корзину ({{ count }})
          </Link>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'
import { useCart } from '../composables/useCart'
import { useRequireAuth } from '../composables/useRequireAuth'

const { toggleItem, isInCart, count, formatPrice, tariffSectionsAllowed } = useCart()
const { handleCartLinkClick } = useRequireAuth()

const photoBg = '/pricing/photo-bg.jpg'
const videoBg = '/pricing/video-bg.jpg'
const comboBg = '/pricing/combo-bg.jpg'

const categoryMeta = {
  photo: { label: 'Фотограф', type: 'Фотосъёмка', image: photoBg },
  video: { label: 'Видеограф', type: 'Видеосъёмка', image: videoBg },
  combo: { label: 'Комбо', type: 'Комбо', image: comboBg },
}

const photoPlans = [
  {
    cartKey: 'tariff-photo-econom',
    tier: 'Экономный',
    priceAmount: 30_000,
    featured: false,
    badge: null,
    features: [
      '4 Часа Фотосъёмки',
      '+ Стандартная Цветокоррекция',
      '+ Готовность Фото: 14 Дней',
    ],
  },
  {
    cartKey: 'tariff-photo-optimal',
    tier: 'Оптимальный',
    priceAmount: 40_000,
    featured: true,
    badge: 'Популярный',
    features: [
      '6 Часов Фотосъёмки',
      '+ Расширенная Цветокоррекция',
      '+ Ретушь',
      '+ Готовность Фото: 10 Дней',
    ],
  },
  {
    cartKey: 'tariff-photo-premium',
    tier: 'Премиум',
    priceAmount: 50_000,
    featured: false,
    badge: null,
    features: [
      '9 Часов Фотосъёмки',
      '+ Художественная Ретушь',
      '+ Готовность Фото: 7 Дней',
    ],
  },
]

const videoPlans = [
  {
    cartKey: 'tariff-video-econom',
    tier: 'Экономный',
    priceAmount: 15_000,
    featured: false,
    badge: null,
    features: [
      '4 Часа Видеосъёмки',
      '+ Базовое Цветокоррекция',
      '+ Срок Видео: 14 Дней',
    ],
  },
  {
    cartKey: 'tariff-video-optimal',
    tier: 'Оптимальный',
    priceAmount: 45_000,
    featured: true,
    badge: 'Популярный',
    features: [
      '6 Часов Видеосъёмки',
      '+ Стандартная Вертикальная Цветокоррекция',
      '+ Срок Видео: 10 Дней',
    ],
  },
  {
    cartKey: 'tariff-video-premium',
    tier: 'Премиум',
    priceAmount: 63_000,
    featured: false,
    badge: null,
    features: [
      '11 Часов Видеосъёмки',
      '+ Детальный Монтаж, Мьюзик, Цветокоррекция',
      '+ Срок Видео: 7 Дней',
    ],
  },
]

const comboPlans = [
  {
    cartKey: 'tariff-combo-basic',
    tier: 'Базовый',
    priceAmount: 50_000,
    featured: false,
    badge: null,
    features: [
      '4 Часа Фотосъёмки + Видеосъёмка',
      '+ Базовая Цветокоррекция и Кодирование',
      '+ Срок Сдачи: 14 Дней',
    ],
  },
  {
    cartKey: 'tariff-combo-advanced',
    tier: 'Продвинутый',
    priceAmount: 75_000,
    featured: true,
    badge: 'Выгодно',
    features: [
      '6 Часов Фотосъёмки + Видеосъёмка',
      '+ Постобработка Облака, Ретушь',
      '+ Срок Сдачи: 10 Дней',
    ],
  },
  {
    cartKey: 'tariff-combo-premium',
    tier: 'Премиум',
    priceAmount: 100_000,
    featured: false,
    badge: null,
    features: [
      '9 Часов Фотосъёмки + Видеосъёмка',
      '+ Профессиональный Монтаж, Цветокоррекция и Звуковой Дизайн',
      '+ Срок Сдачи: 7 Дней',
    ],
  },
]

const formatPriceShort = (amount) =>
  amount.toLocaleString('ru-RU').replace(/\s/g, ' ')

const tariffSectionAllows = (key) => tariffSectionsAllowed.value[key]

const photoTariffButtonDisabled = (plan) =>
  !tariffSectionAllows('photo') && !isInCart(plan.cartKey)

const videoTariffButtonDisabled = (plan) =>
  !tariffSectionAllows('video') && !isInCart(plan.cartKey)

const comboTariffButtonDisabled = (plan) =>
  !tariffSectionAllows('combo') && !isInCart(plan.cartKey)

const toggleTariffInCart = (plan, categoryKey) => {
  if (!isInCart(plan.cartKey) && !tariffSectionAllows(categoryKey)) return
  const meta = categoryMeta[categoryKey]
  toggleItem({
    cartKey: plan.cartKey,
    name: `Тариф «${plan.tier}» — ${meta.label}`,
    type: meta.type,
    duration: plan.features[0],
    price: formatPrice(plan.priceAmount),
    priceAmount: plan.priceAmount,
    image: meta.image,
    source: 'price',
  })
}
</script>

<style scoped>
.price-page {
  padding-top: 80px;
  background: #0a0a0a;
  color: #ffffff;
}

.page-header {
  background: #141414;
  padding: 3rem 0;
  text-align: center;
  border-bottom: 1px solid #2a2a2a;
}

.page-title {
  font-size: 2.5rem;
  font-family: 'Playfair Display', serif;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section {
  padding: 4rem 0;
}

.pricing-portfolio-hint {
  max-width: 720px;
  margin: 0 auto 2.5rem;
  padding: 1rem 1.35rem;
  text-align: center;
  font-size: 0.92rem;
  line-height: 1.55;
  color: #f0e6c8;
  background: rgba(212, 175, 55, 0.09);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 0.85rem;
}

.pricing__category--locked .pricing__title {
  opacity: 0.55;
}

.pricing-card--locked {
  opacity: 0.48;
}

.pricing-card--locked:hover {
  transform: none !important;
  box-shadow: none !important;
}

.pricing__category--locked .pricing-card--featured {
  transform: none;
}

.pricing__category--locked .pricing-card--featured:hover {
  transform: none !important;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.btn--in-cart:disabled {
  opacity: 0.55;
}

/* ── Категория ── */
.pricing__category {
  margin-bottom: 5rem;
}

/* ── Заголовок ── */
.pricing__title {
  text-align: center;
  font-size: 1.7rem;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #d4af37;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  line-height: 1.3;
}

.pricing__title-sub {
  font-size: 1.4rem;
  letter-spacing: 0.4em;
  color: #d4af37;
  opacity: 0.8;
  font-weight: 600;
}

/* ── Сетка ── */
.pricing__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 1rem;
}

/* ── Карточка ── */
.pricing-card {
  border-radius: 1.25rem;
  overflow: visible;
  position: relative;
  border: 1px solid #2a2a2a;
  transition: all 0.35s ease;
  display: flex;
  flex-direction: column;
  min-height: 460px;
}

.pricing-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 40px rgba(0, 0, 0, 0.5);
  border-color: rgba(212, 175, 55, 0.4);
}

.pricing-card--featured {
  border-color: #d4af37;
  transform: scale(1.03);
}

.pricing-card--featured:hover {
  transform: scale(1.03) translateY(-6px);
}

/* Фон */
.pricing-card__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-color: #1a1a1a;
  border-radius: 1.25rem;
  overflow: hidden;
}

.pricing-card__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom,
      rgba(10, 10, 10, 0.6) 0%,
      rgba(10, 10, 10, 0.82) 50%,
      rgba(10, 10, 10, 0.97) 100%);
}

/* Бейдж */
.pricing-card__badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #d4af37 0%, #f4e5c2 100%);
  color: #0a0a0a;
  padding: 0.3rem 1.2rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  z-index: 10;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
}

/* Контент */
.pricing-card__inner {
  position: relative;
  z-index: 1;
  padding: 2.5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
  gap: 0;
}

.pricing-card__name {
  font-size: 1.15rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #ffffff;
  margin-bottom: 0.75rem;
  font-family: 'Playfair Display', serif;
}

.pricing-card__price {
  font-size: 2.6rem;
  font-weight: 700;
  color: #d4af37;
  margin-bottom: 1.25rem;
  font-family: 'Playfair Display', serif;
  line-height: 1;
  text-shadow:
    0 0 20px rgba(212, 175, 55, 0.562),
    0 0 40px rgba(212, 175, 55, 0.4),
    0 0 80px rgba(212, 175, 55, 0.2);
}

.pricing-card__features {
  list-style: none;
  margin-bottom: 1.75rem;
  flex: 1;
  text-align: left;
}

.pricing-card__features li {
  padding: 0.75rem 0;
  color: #cccccc;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.9rem;
  line-height: 1.45;
}

.pricing-card__features li:last-child {
  border-bottom: none;
}

.pricing-card__btn-wrap {
  display: flex;
  justify-content: center;
  padding-top: 1em;
}

/* === Кнопки — мягкое свечение только при наведении === */
.btn {
  padding: 1rem 2.2rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: none;
  min-width: 140px;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

/* Залитая кнопка */
.btn--primary {
  background: linear-gradient(135deg, #d4af37 0%, #f4e5c2 50%, #d4af37 100%);
  color: #0a0a0a;
  box-shadow: none;
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow:
    0 8px 20px rgba(212, 175, 55, 0.4),
    0 0 30px rgba(212, 175, 55, 0.25);
}

/* Обводная кнопка */
.btn--outline {
  border: 2px solid #d4af37;
  color: #d4af37;
  background: transparent;
  box-shadow: none;
}

.btn--outline:hover {
  background: #d4af37;
  color: #0a0a0a;
  box-shadow:
    0 8px 20px rgba(212, 175, 55, 0.35),
    0 0 25px rgba(212, 175, 55, 0.2);
  transform: translateY(-2px);
}

.btn--in-cart.btn--outline {
  background: rgba(16, 185, 129, 0.12);
  border-color: rgba(16, 185, 129, 0.55);
  color: #6ee7b7;
}

.btn--in-cart.btn--outline:hover {
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(52, 211, 153, 0.75);
  color: #a7f3d0;
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.2);
}

.btn--in-cart.btn--primary {
  background: rgba(16, 185, 129, 0.22);
  border: 2px solid rgba(16, 185, 129, 0.55);
  color: #a7f3d0;
  box-shadow: none;
}

.btn--in-cart.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.25);
}

.pricing-cart-cta {
  text-align: center;
  padding: 0 0 1rem;
  margin-top: -2rem;
}

.pricing-cart-cta__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 2rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-decoration: none;
  border: 1px solid rgba(212, 175, 55, 0.4);
  color: #d4af37;
  background: transparent;
  transition: all 0.3s ease;
}

.pricing-cart-cta__btn:hover {
  border-color: #d4af37;
  background: rgba(212, 175, 55, 0.08);
}

@media (max-width: 1280px) {
  .pricing__grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: 100%;
  }

  .container {
    padding-left: var(--site-gutter, 1.5rem);
    padding-right: var(--site-gutter, 1.5rem);
  }
}

@media (max-width: 900px) {
  .price-page {
    padding-top: 0;
  }

  .pricing__grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    padding-top: 1.5rem;
  }

  .pricing-card--featured {
    transform: none;
  }

  .pricing-card--featured:hover {
    transform: translateY(-6px);
  }

  .pricing__category {
    margin-bottom: 3.5rem;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 2rem 0;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .pricing-card {
    min-height: auto;
  }

  .pricing-card__inner {
    padding: 2rem 1.25rem 1.5rem;
  }

  .pricing-card__price {
    font-size: 2rem;
  }

  .pricing__title {
    font-size: 1.1rem;
  }

  .btn {
    min-width: 120px;
    padding: 0.85rem 1.5rem;
  }

  .pricing-portfolio-hint {
    font-size: 0.85rem;
    margin-bottom: 1.5rem;
  }
}
</style>