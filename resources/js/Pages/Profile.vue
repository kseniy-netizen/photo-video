<template>
    <div class="page-wrapper">
        <!-- Animated background orbs -->
        <div class="bg-orb bg-orb-1"></div>
        <div class="bg-orb bg-orb-2"></div>

        <div class="content-container">
            <!-- Header -->
            <div class="page-header">
                <div class="header-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                    Личный кабинет
                </div>
                <div class="header-accent-line">
                    <div class="accent-bar"></div>
                    <div class="accent-dots">
                        <div class="accent-dot"></div>
                        <div class="accent-dot"></div>
                        <div class="accent-dot"></div>
                    </div>
                </div>
                <h1 class="page-title">Настройки профиля</h1>
                <p class="page-subtitle">Управление данными аккаунта и параметрами безопасности</p>
            </div>

            <!-- User Preview Card -->
            <div class="user-preview-card">
                <div class="avatar-ring">
                    <div class="avatar-inner">{{ userInitials }}</div>
                </div>
                <div class="user-info">
                    <div class="user-name">{{ user?.name || 'Пользователь' }}</div>
                    <div class="user-email">{{ user?.email || 'email@example.com' }}</div>
                    <div class="user-status">
                        <div class="status-dot"></div>
                        Аккаунт активен
                    </div>
                </div>
            </div>

            <!-- Personal Data Card -->
            <div class="settings-card">
                <div class="card-header">
                    <div class="card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                             stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <div class="card-title-group">
                        <h2 class="card-title">Личные данные</h2>
                        <p class="card-desc">Обновите ваше имя и контактный email</p>
                    </div>
                </div>
                <div class="card-body">
                    <form @submit.prevent="updateProfile" class="settings-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label class="field-label">
                                    Имя <span class="required">*</span>
                                </label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                         stroke-width="1.5" width="18" height="18">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    <input
                                        v-model="form.name"
                                        type="text"
                                        class="field-input"
                                        placeholder="Введите ваше имя"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="field-label">
                                    Email <span class="required">*</span>
                                </label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                         stroke-width="1.5" width="18" height="18">
                                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </svg>
                                    <input
                                        v-model="form.email"
                                        type="email"
                                        class="field-input"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <p v-if="form.errors.name" class="field-error">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                 stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            {{ form.errors.name }}
                        </p>
                        <p v-if="form.errors.email" class="field-error">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                 stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            {{ form.errors.email }}
                        </p>

                        <div class="form-actions">
                            <button type="submit" class="btn-save" :disabled="form.processing">
                                <span v-if="form.processing" class="spinner"></span>
                                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                     stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                    <polyline points="7 3 7 8 15 8"></polyline>
                                </svg>
                                {{ form.processing ? 'Сохранение...' : 'Сохранить изменения' }}
                            </button>
                            <button type="button" class="btn-secondary" @click="resetProfileForm">
                                Отменить
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="section-divider">Безопасность</div>

            <!-- Password Card -->
            <div class="settings-card">
                <div class="card-header">
                    <div class="card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                             stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <div class="card-title-group">
                        <h2 class="card-title">Смена пароля</h2>
                        <p class="card-desc">Обновите пароль для повышения безопасности</p>
                    </div>
                </div>
                <div class="card-body">
                    <form @submit.prevent="updatePassword" class="settings-form">
                        <div class="form-group">
                            <label class="field-label">
                                Текущий пароль <span class="required">*</span>
                            </label>
                            <div class="input-wrapper">
                                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     stroke-width="1.5" width="18" height="18">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                <input
                                    v-model="passwordForm.current_password"
                                    type="password"
                                    class="field-input"
                                    placeholder="Введите текущий пароль"
                                    required
                                />
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="field-label">
                                Новый пароль <span class="required">*</span>
                            </label>
                            <div class="input-wrapper">
                                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     stroke-width="1.5" width="18" height="18">
                                    <path
                                        d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                                </svg>
                                <input
                                    v-model="passwordForm.password"
                                    type="password"
                                    class="field-input"
                                    placeholder="Минимум 8 символов"
                                    required
                                    @input="checkPasswordStrength"
                                />
                            </div>
                            <div class="password-strength">
                                <div class="strength-bars">
                                    <div class="strength-bar" :class="{ active: passwordStrength >= 1 }"></div>
                                    <div class="strength-bar" :class="{ active: passwordStrength >= 2 }"></div>
                                    <div class="strength-bar" :class="{ active: passwordStrength >= 3 }"></div>
                                    <div class="strength-bar" :class="{ active: passwordStrength >= 4 }"></div>
                                </div>
                                <span class="strength-text">{{ strengthText }}</span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="field-label">
                                Подтверждение пароля <span class="required">*</span>
                            </label>
                            <div class="input-wrapper">
                                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     stroke-width="1.5" width="18" height="18">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <input
                                    v-model="passwordForm.password_confirmation"
                                    type="password"
                                    class="field-input"
                                    placeholder="Повторите новый пароль"
                                    required
                                />
                            </div>
                        </div>

                        <p v-if="passwordForm.errors.current_password" class="field-error">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                 stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            {{ passwordForm.errors.current_password }}
                        </p>
                        <p v-if="passwordForm.errors.password" class="field-error">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                 stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            {{ passwordForm.errors.password }}
                        </p>

                        <div class="form-actions">
                            <button type="submit" class="btn-save" :disabled="passwordForm.processing">
                                <span v-if="passwordForm.processing" class="spinner"></span>
                                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                     stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                                {{ passwordForm.processing ? 'Обновление...' : 'Обновить пароль' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Toast Notifications -->
        <div class="toast-container">
            <div v-for="toast in toasts" :key="toast.id" class="toast" :class="toast.type">
                <div class="toast-icon">
                    <svg v-if="toast.type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                </div>
                <div class="toast-content">
                    <div class="toast-title">{{ toast.title }}</div>
                    <div class="toast-message">{{ toast.message }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import {useForm, usePage} from '@inertiajs/vue3'

const page = usePage()
const user = computed(() => page.props.auth?.user)

const userInitials = computed(() => {
    const name = user.value?.name || ''
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

// ===== Profile Form =====
const form = useForm({
    name: user.value?.name ?? '',
    email: user.value?.email ?? '',
})

const resetProfileForm = () => {
    form.name = user.value?.name ?? ''
    form.email = user.value?.email ?? ''
}

const updateProfile = () => {
    form.patch('/profile', {
        preserveScroll: true,
        onSuccess: () => showToast('Успешно!', 'Данные профиля обновлены'),
        onError: () => showToast('Ошибка', 'Проверьте введённые данные', 'error'),
    })
}

// ===== Password Form =====
const passwordForm = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
})

const passwordStrength = ref(0)

const strengthText = computed(() => {
    const texts = ['', 'Слабый', 'Средний', 'Хороший', 'Отличный']
    return texts[passwordStrength.value] || ''
})

const checkPasswordStrength = () => {
    const pwd = passwordForm.password
    let score = 0
    if (pwd.length >= 8) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    passwordStrength.value = score
}

const updatePassword = () => {
    passwordForm.put('/password', {
        preserveScroll: true,
        onSuccess: () => {
            passwordForm.reset()
            passwordStrength.value = 0
            showToast('Пароль обновлён', 'Ваш пароль успешно изменён')
        },
        onError: () => showToast('Ошибка', 'Проверьте введённые данные', 'error'),
    })
}

// ===== Toast System =====
const toasts = ref([])
let toastId = 0

const showToast = (title, message, type = 'success') => {
    const id = ++toastId
    toasts.value.push({id, title, message, type})
    setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== id)
    }, 4000)
}
</script>

<style scoped>

@font-face {
    font-family: 'allodswest';
    src: url(/fonts/allodswest.ttf);
}

label, span{
    font-family: 'allodswest' !important;
}

p{
    font-family: 'allodswest' !important;
}

/* ===== CSS VARIABLES ===== */
.page-wrapper {
    --gold: #d4af37;
    --gold-light: #f4e5c2;
    --gold-dark: #b8960c;
    --bg-primary: #0a0a0a;
    --bg-secondary: #111111;
    --bg-card: #141414;
    --bg-input: rgba(255, 255, 255, 0.04);
    --border-subtle: rgba(255, 255, 255, 0.08);
    --border-gold: rgba(212, 175, 55, 0.3);
    --text-primary: #ffffff;
    --text-secondary: #a0a0a0;
    --text-muted: #6b6b6b;
    --error: #ef4444;
    --error-bg: rgba(239, 68, 68, 0.08);
    --success: #22c55e;
    --shadow-gold: rgba(212, 175, 55, 0.15);

    min-height: calc(100vh - 80px);
    position: relative;
    overflow: hidden;
    padding: 2rem 1.5rem 4rem;
    background: var(--bg-primary);
    font-family: 'Inter', sans-serif;
    color: var(--text-primary);
}

/* ===== ANIMATED BACKGROUND ===== */
.bg-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.04;
    pointer-events: none;
    z-index: 0;
}

.bg-orb-1 {
    width: 600px;
    height: 600px;
    background: var(--gold);
    top: -200px;
    right: -100px;
    animation: orbFloat 20s ease-in-out infinite;
}

.bg-orb-2 {
    width: 400px;
    height: 400px;
    background: var(--gold);
    bottom: -100px;
    left: -100px;
    animation: orbFloat 25s ease-in-out infinite reverse;
}

@keyframes orbFloat {
    0%, 100% {
        transform: translate(0, 0) scale(1);
    }
    33% {
        transform: translate(30px, -30px) scale(1.1);
    }
    66% {
        transform: translate(-20px, 20px) scale(0.95);
    }
}

/* ===== CONTENT ===== */
.content-container {
    max-width: 720px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

/* ===== HEADER ===== */
.page-header {
    margin-bottom: 2.5rem;
    position: relative;
}

.header-badge {
    font-family: 'allodswest';
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 1rem;
    background: rgba(212, 175, 55, 0.1);
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 999px;
    font-size: 0.65rem;
    font-weight: 500;
    color: var(--gold);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 1.25rem;
}

.header-badge svg {
    width: 14px;
    height: 14px;
}

.header-accent-line {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
}

.accent-bar {
    width: 48px;
    height: 3px;
    background: linear-gradient(90deg, var(--gold), transparent);
    border-radius: 2px;
    position: relative;
}

.accent-bar::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: var(--gold);
    border-radius: 50%;
    box-shadow: 0 0 12px var(--gold);
}

.accent-dots {
    display: flex;
    gap: 4px;
}

.accent-dot {
    width: 3px;
    height: 3px;
    background: var(--gold);
    border-radius: 50%;
    opacity: 0.4;
}

.page-title {
    font-family: 'allodswest' !important;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #fff 0%, var(--gold-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.page-subtitle {
    color: var(--text-secondary);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
}

/* ===== USER PREVIEW CARD ===== */
.user-preview-card {
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(20, 20, 20, 0.95) 50%);
    border: 1px solid var(--border-gold);
    border-radius: 1.25rem;
    padding: 1.5rem 2rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    position: relative;
    overflow: hidden;
}

.user-preview-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.avatar-ring {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--gold-dark));
    padding: 2px;
    flex-shrink: 0;
    position: relative;
}

.avatar-ring::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 1px solid rgba(212, 175, 55, 0.3);
    animation: pulseRing 3s ease-in-out infinite;
}

@keyframes pulseRing {
    0%, 100% {
        transform: scale(1);
        opacity: 0.5;
    }
    50% {
        transform: scale(1.08);
        opacity: 0;
    }
}

.avatar-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: var(--bg-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--gold);
}

.user-info {
    flex: 1;
}

.user-name {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
}

.user-email {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
}

.user-status {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
    color: var(--success);
}

.status-dot {
    width: 6px;
    height: 6px;
    background: var(--success);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--success);
    animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.4;
    }
}

/* ===== SETTINGS CARDS ===== */
.settings-card {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: 1.25rem;
    padding: 0;
    margin-bottom: 1.5rem;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.settings-card:hover {
    border-color: var(--border-gold);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4), 0 0 20px var(--shadow-gold);
}

.settings-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold));
    opacity: 0;
    transition: opacity 0.3s ease;
}

.settings-card:hover::before {
    opacity: 1;
}

.card-header {
    padding: 1.5rem 2rem 0;
    display: flex;
    align-items: center;
    gap: 0.875rem;
    margin-bottom: 1.25rem;
}

.card-icon {
    width: 40px;
    height: 40px;
    border-radius: 0.75rem;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0.05));
    border: 1px solid rgba(212, 175, 55, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.card-icon svg {
    width: 20px;
    height: 20px;
    color: var(--gold);
}

.card-title-group {
    flex: 1;
}

.card-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.15rem;
}

.card-desc {
    font-size: 0.8rem;
    color: var(--text-muted);
}

.card-body {
    padding: 0 2rem 1.75rem;
}

/* ===== FORM ===== */
.settings-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.field-label {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--text-muted);
    padding: 5px;
}

.field-label .required {
    color: var(--gold);
}

.input-wrapper {
    position: relative;
}

.field-input {
    width: 100%;
    padding: 0.9rem 1rem 0.9rem 2.75rem;
    background: var(--bg-input);
    border: 1px solid var(--border-subtle);
    border-radius: 0.875rem;
    color: var(--text-primary);
    font-size: 0.95rem;
    font-family: 'Inter', sans-serif;
    transition: all 0.25s ease;
}

.field-input::placeholder {
    color: var(--text-muted);
    opacity: 0.6;
}

.field-input:focus {
    outline: none;
    border-color: var(--gold);
    background: rgba(212, 175, 55, 0.03);
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1), 0 0 20px rgba(212, 175, 55, 0.05);
}

.input-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    transition: color 0.25s ease;
    pointer-events: none;
}

.input-wrapper:focus-within .input-icon {
    color: var(--gold);
}

/* Password strength */
.password-strength {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.35rem;
}

.strength-bars {
    display: flex;
    gap: 3px;
    flex: 1;
}

.strength-bar {
    height: 3px;
    flex: 1;
    border-radius: 2px;
    background: var(--border-subtle);
    transition: background 0.3s ease;
}

.strength-bar.active {
    background: var(--gold);
    box-shadow: 0 0 6px var(--gold);
}

.strength-text {
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

/* ===== ERRORS ===== */
.field-error {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 0.875rem;
    background: var(--error-bg);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 0.625rem;
    color: var(--error);
    font-size: 0.82rem;
    font-weight: 500;
    animation: shakeIn 0.4s ease;
}

.field-error svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
}

@keyframes shakeIn {
    0% {
        transform: translateX(-8px);
        opacity: 0;
    }
    25% {
        transform: translateX(4px);
    }
    50% {
        transform: translateX(-4px);
    }
    75% {
        transform: translateX(2px);
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

/* ===== BUTTONS ===== */
.form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
}

.btn-save {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.8rem 0.8rem;
    border: none;
    border-radius: 9999px;
    background: linear-gradient(135deg, var(--gold), var(--gold-light), var(--gold));
    background-size: 200% 200%;
    color: #0a0a0a;
    font-size: 0.9rem;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(212, 175, 55, 0.25);
    min-width: 180px;
    flex-shrink: 0;
}

.btn-save::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
}

.btn-save:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(212, 175, 55, 0.35);
    background-position: 100% 0;
}

.btn-save:hover:not(:disabled)::before {
    transform: translateX(100%);
}

.btn-save:active:not(:disabled) {
    transform: translateY(0);
}

.btn-save:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
}

.btn-save svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
}

.spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(10, 10, 10, 0.3);
    border-top-color: #0a0a0a;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    flex-shrink: 0;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 1.5rem;
    background: transparent;
    border: 1px solid var(--border-subtle);
    border-radius: 9999px;
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: all 0.25s ease;
    flex-shrink: 0;
}

.btn-secondary:hover {
    border-color: var(--gold);
    color: var(--gold);
    background: rgba(212, 175, 55, 0.05);
}

/* ===== DIVIDER ===== */
.section-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 2rem 0;
    color: var(--gold);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
}

.section-divider::before,
.section-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border-subtle), transparent);
}

/* ===== TOAST ===== */
.toast-container {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.toast {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: var(--bg-card);
    border: 1px solid var(--border-gold);
    border-radius: 0.875rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px var(--shadow-gold);
    animation: toastSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    max-width: 360px;
}

.toast.success {
    border-color: rgba(34, 197, 94, 0.3);
}

.toast-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(212, 175, 55, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.toast.success .toast-icon {
    background: rgba(34, 197, 94, 0.15);
}

.toast-icon svg {
    width: 16px;
    height: 16px;
    color: var(--gold);
}

.toast.success .toast-icon svg {
    color: var(--success);
}

.toast-content {
    flex: 1;
}

.toast-title {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--text-primary);
    margin-bottom: 0.15rem;
}

.toast-message {
    font-size: 0.8rem;
    color: var(--text-secondary);
}

@keyframes toastSlide {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1280px) {
    .page-wrapper {
        padding-left: var(--site-gutter, 1.5rem);
        padding-right: var(--site-gutter, 1.5rem);
    }
}

@media (max-width: 768px) {
    .form-row {
        grid-template-columns: 1fr;
    }

    .user-preview-card {
        flex-direction: column;
        text-align: center;
    }
}

@media (max-width: 640px) {
    .page-wrapper {
        padding: 1.5rem 1rem 3rem;
    }

    .page-title {
        font-size: 1.8rem;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .user-preview-card {
        flex-direction: column;
        text-align: center;
        padding: 1.25rem;
    }

    .card-header {
        padding: 1.25rem 1.25rem 0;
    }

    .card-body {
        padding: 0 1.25rem 1.5rem;
    }

    .form-actions {
        flex-direction: column;
        align-items: stretch;
        gap: 0.75rem;
    }

    .btn-save,
    .btn-secondary {
        justify-content: center;
        width: 100%;
    }

    .toast-container {
        left: 1rem;
        right: 1rem;
        top: 1rem;
    }

    .toast {
        max-width: 100%;
    }
}
</style>
