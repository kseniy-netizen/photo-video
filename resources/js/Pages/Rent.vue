<template>
  <div class="rent-page">
    <header class="rent-hero">
      <div class="container">
        <span class="rent-label">— Professional Locations —</span>
        <h1 class="rent-title">АРЕНДА <em>СТУДИИ</em></h1>
        <div class="rent-divider"></div>
        <p class="rent-description">
          Два уникальных пространства для реализации ваших самых смелых идей
        </p>
      </div>
    </header>

    <main class="container">
      <div class="studio-showcase">
        <div v-for="studio in studios" :key="studio.id" class="studio-card">

          <div class="studio-visual">
            <div class="image-wrapper">
              <img :src="studio.image_url" :alt="studio.name" class="studio-img" />
              <div class="light-flash"></div>
            </div>

            <div class="angled-price-badge">
              <div class="badge-bg"></div>
              <div class="badge-content">
                <span class="price-val">{{ studio.id === 1 ? '5 000' : '8 000' }} ₽</span>
                <span class="price-type">стоимость часа</span>
              </div>
            </div>
          </div>

          <div class="studio-content">
            <div class="studio-header">
              <h2 class="studio-name">{{ studio.name }}</h2>
              <div class="min-time-badge">Мин. время аренды: 2 часа</div>
            </div>

            <div class="features-grid">
              <div class="feature-column">
                <p class="feature-title">Технологии:</p>
                <ul class="feature-list">
                  <template v-if="studio.id === 1">
                    <li>Профессиональный свет</li>
                    <li>Световые модификаторы</li>
                    <li>Кондиционер</li>
                  </template>
                  <template v-else>
                    <li>LED-экран 4 метра</li>
                    <li>Пульт управления</li>
                    <li>Звукоизоляция</li>
                  </template>
                </ul>
              </div>
              <div class="feature-column line-left">
                <p class="feature-title">Комфорт:</p>
                <ul class="feature-list">
                  <li>Гримерная зона</li>
                  <li>Техническая поддержка</li>
                  <li>Высокоскоростной Wi-Fi</li>
                </ul>
              </div>
            </div>

            <div class="studio-footer">
              <p class="parking-info">Бесплатная парковка для клиентов</p>

              <button
                type="button"
                class="booking-btn-line"
                :class="{ 'booking-btn-line--added': isInCart(cartKeyForStudio(studio)) }"
                @click="toggleStudioInCart(studio)"
              >
                <span class="btn-text">
                  {{ isInCart(cartKeyForStudio(studio)) ? 'Убрать' : 'Забронировать локацию' }}
                </span>
                <div class="hover-line"></div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useCart } from '../composables/useCart';

const { toggleItem, isInCart, formatPrice } = useCart();

const studios = ref([]);

const cartKeyForStudio = (studio) => `rent-${studio.id}`;

const toggleStudioInCart = (studio) => {
  const hourly = studio.id === 1 ? 5000 : 8000;
  const minTotal = hourly * 2;

  toggleItem({
    cartKey: cartKeyForStudio(studio),
    name: studio.name,
    type: 'Аренда студии',
    duration: 'от 2 часов',
    price: `от ${formatPrice(minTotal)}`,
    priceAmount: minTotal,
    image: studio.image_url,
    source: 'rent',
  });
};
const fetchStudios = async () => {
  try {
    const { data } = await axios.get('/data/studios');
    studios.value = data || [];
  } catch {
    studios.value = [];
  }
};

onMounted(fetchStudios);
</script>

<style scoped>
.rent-page {
  background: #000;
  color: #fff;
  min-height: 100vh;
  padding-bottom: 120px;
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 30px;
}

/* Header */
.rent-hero {
  padding: 120px 0 60px;
  text-align: center;
}

.rent-label {
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 0.5em;
  font-size: 11px;
}

.rent-title {
  font-size: clamp(40px, 6vw, 60px);
  font-weight: 900;
  margin: 20px 0;
  line-height: 1;
}

.rent-title em {
  font-style: normal;
  color: #d4af37;
  -webkit-text-stroke: 1px #d4af37;
  -webkit-text-fill-color: transparent;
}

.rent-divider {
  width: 50px;
  height: 1px;
  background: #d4af37;
  margin: 40px auto;
}

.rent-description {
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Карточка */
.studio-showcase {
  display: flex;
  flex-direction: column;
  gap: 100px;
}

.studio-card {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 60px;
  align-items: center;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 40px;
  transition: border-color 0.4s ease;
}

.studio-card:hover {
  border-color: rgba(212, 175, 55, 0.2);
}

/* ФОТО БЛОК */
.studio-visual {
  position: relative;
  aspect-ratio: 16/10;
}

.image-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.studio-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 1.2s cubic-bezier(0.2, 1, 0.3, 1);
  filter: brightness(1);
  /* Без затемнения */
}

/* Эффект глянцевого блика */
.light-flash {
  position: absolute;
  top: 0;
  left: -150%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent);
  transform: skewX(-20deg);
  transition: 1s;
}

.studio-card:hover .studio-img {
  transform: scale(1.08);
}

.studio-card:hover .light-flash {
  left: 150%;
}

/* ЦЕННИК С ПОРЕЗАННЫМИ УГЛАМИ */
.angled-price-badge {
  position: absolute;
  top: -10px;
  /* Вылет вверх */
  right: -10px;
  /* Вылет вправо */
  z-index: 5;
  min-width: 160px;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5));
  transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.badge-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #d4af37;
  clip-path: polygon(0 0, 100% 0, 100% 75%, 85% 100%, 0 100%);
}

.badge-content {
  position: relative;
  padding: 22px 25px;
  color: #000;
  text-align: center;
}

.price-val {
  font-size: 26px;
  font-weight: 900;
  display: block;
  line-height: 1;
}

.price-type {
  font-size: 9px;
  text-transform: uppercase;
  font-weight: 700;
  margin-top: 5px;
  letter-spacing: 1px;
}

.studio-card:hover .angled-price-badge {
  transform: scale(1.1) rotate(2deg);
}

/* Контентная часть */
.studio-name {
  font-size: 42px;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 10px;
  letter-spacing: -1px;
}

.min-time-badge {
  display: inline-block;
  font-size: 11px;
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 6px 14px;
  margin-bottom: 40px;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 50px;
}

.line-left {
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding-left: 30px;
}

.feature-title {
  font-size: 12px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 15px;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  font-size: 15px;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
}

.feature-list li::before {
  content: "";
  width: 5px;
  height: 1px;
  background: #d4af37;
  margin-right: 12px;
}

/* КНОПКА С ЛИНИЕЙ */
.parking-info {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  margin-bottom: 25px;
  letter-spacing: 1px;
}

.booking-btn-line {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 22px 0;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 4px;
  cursor: pointer;
  width: 100%;
  position: relative;
  transition: 0.4s;
}

.btn-text {
  position: relative;
  z-index: 2;
}

.hover-line {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #d4af37;
  transition: 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  transform: translateX(-50%);
}

.booking-btn-line:hover {
  color: #d4af37;
  border-color: rgba(212, 175, 55, 0.3);
}

.booking-btn-line:hover .hover-line {
  width: 100%;
}

.booking-btn-line--added {
  color: #6ee7b7;
  border-color: rgba(16, 185, 129, 0.45);
}

@media (max-width: 1280px) {
  .container {
    padding-left: var(--site-gutter, 1.5rem);
    padding-right: var(--site-gutter, 1.5rem);
  }
}

@media (max-width: 1024px) {
  .studio-card {
    grid-template-columns: 1fr;
    padding: 25px;
  }

  .line-left {
    border-left: none;
    padding-left: 0;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .rent-hero {
    padding: 4rem 0 2.5rem;
  }

  .rent-title {
    font-size: clamp(2rem, 8vw, 3rem);
  }

  .studio-showcase {
    gap: 2rem;
  }

  .studio-visual {
    min-height: 220px;
  }

  .booking-btn-line {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .studio-card {
    padding: 1rem;
  }

  .studio-name {
    font-size: 1.35rem;
  }

  .angled-price-badge {
    transform: scale(0.9);
    transform-origin: top right;
  }
}
</style>