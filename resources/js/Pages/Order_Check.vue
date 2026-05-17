<template>
    <div class="page-wrapper">
        <div class="content-container">

            <div class="page-header">
                <div class="header-accent"></div>
                <h1 class="page-title">Оформление заказа</h1>
                <p class="page-subtitle">Проверьте выбранные услуги и укажите детали съёмки</p>
            </div>

            <div class="checkout-layout">

                <!-- ЛЕВАЯ ЧАСТЬ — Корзина -->
                <div class="cart-section">
                    <div class="section-header">
                        <div class="section-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="section-label">Шаг 1</span>
                            <h2 class="section-title">Ваш выбор</h2>
                        </div>
                    </div>

                    <div class="services-list">
                        <div v-for="(item, index) in cartItems" :key="item.id" class="service-card"
                            :class="{ 'removing': item.removing }">
                            <div class="card-glow"></div>
                            <div class="service-image">
                                <img :src="item.image" :alt="item.name">
                                <div class="image-overlay"></div>
                            </div>

                            <div class="service-info">
                                <div class="service-top">
                                    <span class="service-name">{{ item.name }}</span>
                                    <button class="remove-btn" @click="removeItem(index)" title="Удалить">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2.5">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>
                                <span class="service-type">{{ item.type }}</span>
                                <div class="service-meta">
                                    <span class="duration-tag">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        {{ item.duration }}
                                    </span>
                                    <span class="price-tag">{{ item.price }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Пустая корзина -->
                    <div v-if="cartItems.length === 0" class="empty-cart">
                        <div class="empty-glow"></div>
                        <div class="empty-icon">
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="1.5">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                        </div>
                        <h3>Корзина пуста</h3>
                        <p>Добавьте услуги из раздела тарифов</p>
                        <Link href="/price" class="empty-link">
                            <span>Перейти к тарифам</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>
                    </div>

                    <!-- Итого -->
                    <div v-if="cartItems.length > 0" class="total-block">
                        <div class="total-glow"></div>
                        <div class="total-header">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                            <span>Итоговый расчёт</span>
                        </div>
                        <div class="total-divider"></div>
                        <div class="total-row">
                            <span class="total-label">Сумма заказа</span>

                            <span class="final-price">{{ totalPrice }}</span>
                        </div>
                    </div>
                </div>

                <!-- ПРАВАЯ ЧАСТЬ — Форма -->
                <div class="form-section">
                    <div class="section-header">
                        <div class="section-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </div>
                        <div>
                            <span class="section-label">Шаг 2</span>
                            <h2 class="section-title">Детали съёмки</h2>
                        </div>
                    </div>

                    <form @submit.prevent="submitOrder" class="checkout-form" autocomplete="off">

                        <!-- Дата и Время -->
                        <div class="form-row">
                            <div class="form-group half">
                                <label class="field-label">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    Дата съёмки
                                </label>
                                <div class="input-box">
                                    <input type="date" v-model="form.date" required>
                                </div>
                            </div>
                            <div class="form-group half">
                                <label class="field-label">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    Время
                                </label>
                                <div class="input-box">
                                    <input type="time" v-model="form.time" required>
                                </div>
                            </div>
                        </div>

                        <!-- Количество человек -->
                        <div class="form-group">
                            <label class="field-label">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                Количество человек
                            </label>
                            <div class="input-box">
                                <input type="number" v-model="form.people" min="1" placeholder="Например: 2" required>
                            </div>
                        </div>

                        <!-- Комментарий -->
                        <div class="form-group">
                            <label class="field-label">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <line x1="21" y1="10" x2="3" y2="10"></line>
                                    <line x1="21" y1="6" x2="3" y2="6"></line>
                                    <line x1="21" y1="14" x2="3" y2="14"></line>
                                    <line x1="21" y1="18" x2="3" y2="18"></line>
                                </svg>
                                Комментарий
                            </label>
                            <div class="input-box textarea-box">
                                <textarea v-model="form.comment" rows="4"
                                    placeholder="Особые пожелания, детали съёмки, адрес локации..."></textarea>
                            </div>
                        </div>

                        <div class="agreement-box">
                            <label class="custom-checkbox">
                                <input type="checkbox" v-model="form.agree" required>
                                <span class="checkmark"></span>
                                <span class="check-text">Я согласен с <Link href="/agreements" class="inline-link">условиями
                                        использования</Link></span>
                            </label>
                        </div>
                        <button type="submit" class="submit-btn" :disabled="!form.agree || cartItems.length === 0">
                            <span class="btn-shine"></span>
                            <span class="btn-text">Оформить заявку</span>
                            <span class="btn-arrow">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </span>
                        </button>

                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'
import { useCart } from '../composables/useCart'
import { useRequireAuth } from '../composables/useRequireAuth'

const { cartItems, checkoutForm, totalPrice, removeItem, clearCart } = useCart()
const { requireAuth } = useRequireAuth()

const form = checkoutForm

const submitOrder = () => {
    if (!requireAuth()) return
    if (cartItems.value.length === 0) return
    alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.')
    clearCart()
    form.value = { date: '', time: '', people: '', comment: '', agree: false }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap');

@font-face {
    font-family: 'allodswest';
    src: url(/fonts/allodswest.ttf);
}
@font-face {
    font-family: 'olympiadeco';
    src: url(/fonts/olympiadeco.ttf);
}
h2{
    font-family: 'olympiadeco' !important;

}
label, span{
    font-family: 'allodswest';
}
svg{
    justify-content: center !important;
}
.page-wrapper {
    min-height: 100vh;
    background: #0a0a0a;
    font-family: 'Inter', sans-serif;
    color: #fff;
    padding: 40px 0 80px;
}

.content-container {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 24px;
}

.page-header {
    text-align: center;
    margin-bottom: 52px;
    position: relative;
}

.header-accent {
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #d4af37, #f4e5c2, #d4af37);
    border-radius: 2px;
    margin: 0 auto 20px;
}

.page-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.6rem;
    font-weight: 700;
    margin: 0 0 12px 0;
    background: linear-gradient(135deg, #fff 0%, #d4af37 60%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.page-subtitle {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.4);
    margin: 0;
}

.checkout-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
}

.cart-section,
.form-section {
    background: rgba(255, 255, 255, 0.015);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 24px;
    padding: 32px;
    position: relative;
    overflow: hidden;
}

.cart-section::before,
.form-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
}

.section-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 28px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.section-icon {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05));
    border: 1px solid rgba(212, 175, 55, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d4af37;
    flex-shrink: 0;
}

.section-label {
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #d4af37;
    margin-bottom: 4px;
}

.section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 600;
    margin: 0;
    color: rgba(255, 255, 255, 0.9);
}

.services-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 24px;
}

.service-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 18px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.card-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(180deg, #d4af37, #f4e5c2, #d4af37);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.service-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(212, 175, 55, 0.15);
    transform: translateX(6px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.service-card:hover .card-glow {
    opacity: 1;
}

.service-card.removing {
    transform: translateX(-120%) scale(0.9);
    opacity: 0;
}

.service-image {
    width: 64px;
    height: 64px;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.service-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.12), transparent);
    pointer-events: none;
}

.service-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.service-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.service-name {
    font-weight: 600;
    font-size: 1rem;
    color: #fff;
}

.service-type {
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.45);
    text-transform: uppercase;
    letter-spacing: 0.06em;
}

.service-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 4px;
}

.duration-tag {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.4);
    padding: 4px 12px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.06);
}

.price-tag {
    font-size: 1.05rem;
    font-weight: 700;
    color: #d4af37;
    font-family: 'Playfair Display', serif;
}

.remove-btn {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: transparent;
    color: rgba(255, 255, 255, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    flex-shrink: 0;
}

.remove-btn:hover {
    background: rgba(220, 53, 69, 0.15);
    border-color: rgba(220, 53, 69, 0.3);
    color: #dc3545;
    transform: rotate(90deg) scale(1.1);
}

.empty-cart {
    text-align: center;
    padding: 48px 20px;
    position: relative;
}

.empty-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
    pointer-events: none;
}

.empty-icon {
    color: rgba(255, 255, 255, 0.12);
    margin-bottom: 20px;
    position: relative;

    /* Добавьте эти две строки для точного центрирования иконки */
    display: flex;
    justify-content: center;
}

.empty-cart h3 {
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: rgba(255, 255, 255, 0.6);
}

.empty-cart p {
    font-size: 0.88rem;
    color: rgba(255, 255, 255, 0.35);
    margin: 0 0 20px 0;
}

.empty-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #d4af37;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 10px 20px;
    border: 1px solid rgba(212, 175, 55, 0.25);
    border-radius: 12px;
    transition: all 0.3s ease;
}

.empty-link:hover {
    background: rgba(212, 175, 55, 0.08);
    border-color: rgba(212, 175, 55, 0.4);
    transform: translateX(4px);
}

.empty-link svg {
    transition: transform 0.3s ease;
}

.empty-link:hover svg {
    transform: translateX(4px);
}

.total-block {
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.06), rgba(212, 175, 55, 0.02));
    border: 1px solid rgba(212, 175, 55, 0.12);
    border-radius: 20px;
    padding: 24px;
    position: relative;
    overflow: hidden;
}

.total-glow {
    position: absolute;
    top: -50%;
    right: -20%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
    pointer-events: none;
}

.total-header {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #d4af37;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 16px;
}

.total-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
    margin-bottom: 16px;
}

.total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
}

.total-label {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.5);
}

.total-value {
    font-size: 1rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
}

.total-row.highlight {
    padding-top: 12px;
    margin-top: 8px;
    border-top: 1px dashed rgba(212, 175, 55, 0.2);
}

.final-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #d4af37;
    font-family: 'Playfair Display', serif;
}

.checkout-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group.half {
    flex: 1;
}

.form-row {
    display: flex;
    gap: 16px;
}

.field-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.5);
}

.field-label svg {
    color: #d4af37;
    flex-shrink: 0;
}

.input-box {
    position: relative;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.04);
    border: 1.5px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 0 18px;
    transition: all 0.3s ease;
}

.input-box:focus-within {
    border-color: #d4af37;
    background: rgba(255, 255, 255, 0.06);
    box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.08), 0 0 20px rgba(212, 175, 55, 0.1);
}

.input-box input,
.input-box textarea {
    flex: 1;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 0.95rem;
    font-family: 'Inter', sans-serif;
    padding: 14px 0;
    outline: none;
    width: 100%;
}

.input-box input::placeholder,
.input-box textarea::placeholder {
    color: rgba(255, 255, 255, 0.25);
}

.input-box input[type="number"]::-webkit-inner-spin-button,
.input-box input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.input-box input[type="number"] {
    -moz-appearance: textfield;
}

.textarea-box {
    padding: 12px 18px;
    align-items: flex-start;
}

.textarea-box textarea {
    resize: vertical;
    min-height: 90px;
    line-height: 1.5;
    padding: 4px 0;
}

.agreement-box {
    margin-top: 4px;
}

.custom-checkbox {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    cursor: pointer;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.45);
    line-height: 1.5;
}

.custom-checkbox input {
    display: none;
}

.checkmark {
    width: 20px;
    height: 20px;
    border: 1.5px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
    transition: all 0.3s ease;
}

.checkmark::after {
    content: '✓';
    font-size: 0.75rem;
    color: #0a0a0a;
    font-weight: 700;
    opacity: 0;
    transform: scale(0);
    transition: all 0.2s ease;
}

.custom-checkbox input:checked+.checkmark {
    background: linear-gradient(135deg, #d4af37, #f4e5c2);
    border-color: #d4af37;
}

.custom-checkbox input:checked+.checkmark::after {
    opacity: 1;
    transform: scale(1);
}

.check-text a {
    color: #d4af37;
    text-decoration: none;
    border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    transition: border-color 0.3s ease;
}

.check-text a:hover {
    border-color: #d4af37;
}

.submit-btn {
    width: 100%;
    padding: 18px 32px;
    margin-top: 8px;
    background: linear-gradient(135deg, #d4af37 0%, #c9a227 50%, #d4af37 100%);
    background-size: 200% 100%;
    color: #0a0a0a;
    border: none;
    border-radius: 16px;
    font-size: 0.95rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    transition: all 0.4s ease;
    box-shadow: 0 4px 24px rgba(212, 175, 55, 0.3);
    position: relative;
    overflow: hidden;
}

.btn-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
    transition: left 0.7s ease;
}

.submit-btn:hover .btn-shine {
    left: 100%;
}

.submit-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 35px rgba(212, 175, 55, 0.45);
    background-position: 100% 0;
}

.submit-btn:active {
    transform: translateY(0);
}

.submit-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
}

.btn-arrow {
    display: flex;
    align-items: center;
    transition: transform 0.3s ease;
}

.submit-btn:hover .btn-arrow {
    transform: translateX(6px);
}

@media (max-width: 1280px) {
    .content-container {
        padding-left: var(--site-gutter, 1.5rem);
        padding-right: var(--site-gutter, 1.5rem);
    }
}

@media (max-width: 992px) {
    .checkout-layout {
        grid-template-columns: 1fr;
        gap: 24px;
    }

    .page-title {
        font-size: 2.2rem;
    }

    .service-card {
        flex-wrap: wrap;
    }
}

@media (max-width: 576px) {
    .page-wrapper {
        padding: 24px 0 40px;
    }

    .content-container {
        padding: 0 16px;
    }

    .page-title {
        font-size: 1.8rem;
    }

    .cart-section,
    .form-section {
        padding: 24px 20px;
        border-radius: 20px;
    }

    .form-row {
        flex-direction: column;
        gap: 20px;
    }

    .service-image {
        width: 56px;
        height: 56px;
    }

    .final-price {
        font-size: 1.3rem;
    }

    .submit-btn {
        padding: 16px 24px;
    }
}

input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
    opacity: 0.4;
    cursor: pointer;
}
</style>
