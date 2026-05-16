<template>
    <div class="registration-container registration-container--modal">
        <button type="button" class="modal-close-btn" @click="emit('close')">&times;</button>
        <div class="registration-form">
            <div class="registration-form__header">
                <h1 class="registration-title">Регистрация</h1>
                <p class="registration-subtitle">Ваши снимки заслуживают лучшего</p>
            </div>

            <div class="input-group">
                <label class="input-label">Имя пользователя</label>
                <div class="input-wrap">
                    <input type="text" class="registration-input" placeholder="Введите имя" v-model="name"/>
                </div>
            </div>

            <div class="input-group">
                <label class="input-label">Email</label>
                <div class="input-wrap">
                    <input type="email" class="registration-input" placeholder="example@mail.com" v-model="email"/>
                </div>
            </div>

            <div class="input-group">
                <label class="input-label">Пароль</label>
                <div class="input-wrap">
                    <input type="password" class="registration-input" placeholder="••••••••" v-model="password"/>
                </div>
            </div>

            <div class="input-group">
                <label class="input-label">Подтверждение пароля</label>
                <div class="input-wrap">
                    <input type="password" class="registration-input" placeholder="Повторите пароль"
                           v-model="password_confirmation"/>
                </div>
            </div>

            <div class="checkbox-container">
                <label class="checkbox-label">
                    <input type="checkbox" class="real-checkbox" v-model="agreed">
                    <span class="custom-checkbox"></span>
                    <span class="checkbox-text">Я согласен с условиями использования</span>
                </label>
            </div>

            <button class="registration-button" type="button" @click="handleRegister" :disabled="loading">
                <span v-if="!loading">Создать аккаунт</span>
                <span v-else>Отправка…</span>
            </button>

            <div class="divider"><span>или войти через</span></div>

            <div class="social-buttons">
                <button class="social-button" type="button">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"/>
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"/>
                        <path
                            d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                            fill="#FBBC05"/>
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"/>
                    </svg>
                    Google
                </button>
                <button class="social-button" type="button">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M17.05 20.28c-.96.95-2.05 1.72-3.26 1.72-1.15 0-1.55-.71-2.92-.71-1.39 0-1.84.69-2.92.71-1.19 0-2.38-.85-3.37-2.05-2.01-2.45-2.32-6.52-1.16-8.72.93-1.78 2.58-2.91 4.39-2.91 1.13 0 2.06.66 2.87.66.78 0 1.83-.71 3.12-.71 1.58 0 3 .89 3.79 2.21-3.21 1.54-2.69 5.7.53 7.31-.63 1.5-1.5 3.01-2.5 4.41zM12.03 7.25c-.15-2.23 1.66-4.07 3.61-4.25.26 2.37-1.87 4.31-3.61 4.25z"/>
                    </svg>
                    Apple
                </button>
            </div>

            <div class="login-link">
                Уже есть аккаунт?
                <button type="button" class="link link-btn" @click="emit('open-login')">Войти</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {router} from '@inertiajs/vue3'

const emit = defineEmits(['close', 'open-login'])

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const agreed = ref(false)
const loading = ref(false)

const handleRegister = () => {
    if (!agreed.value) {
        alert('Нужно принять условия использования')
        return
    }
    if (!name.value || !email.value || !password.value) {
        alert('Заполните все поля')
        return
    }
    loading.value = true
    router.post('/register', {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
    }, {
        preserveScroll: true,
        onFinish: () => {
            loading.value = false
        },
        onSuccess: () => {
            emit('close')
        },
        onError: (errors) => {
            const msg = Object.values(errors).flat().join('\n') || 'Ошибка регистрации'
            alert(msg)
        },
    })
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:wght@700&display=swap');

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}


label, span {
    font-family: 'allodswest' !important;
}

p {
    font-family: 'allodswest' !important;
}

.registration-container {
    position: relative;
    font-family: 'Inter', sans-serif;
    color: #fff;
    width: 100%;
}

.registration-container--modal {
    width: 100%;
}

.modal-close-btn {
    position: absolute;
    top: 12px;
    right: 14px;
    background: none;
    border: none;
    font-size: 45px;
    color: #fff;
    cursor: pointer;
    z-index: 10;
    line-height: 1;
    margin: 1px 30px;
}

.modal-close-btn:hover {
    color: #d4af37;
}

.registration-form {
    background: rgba(10, 10, 10, 0.82);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 1.5rem;
    padding: 1.6rem 2.2rem;
    width: 100%;
    max-width: 420px;
    margin-left: 0;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8);
    animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.registration-title {
    font-size: 2.2rem;
    text-align: center;
    background: linear-gradient(to bottom, #fff, #d4af37);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.4rem;
}

.registration-subtitle {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 1.6rem;
}

/* Инпуты */
.input-label {
    display: block;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.2rem;
}

.input-group {
    margin-bottom: 1rem;
}

.registration-input {
    width: 100%;
    padding: 0.9rem 1.2rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 0.8rem;
    color: #fff;
    font-size: 0.95rem;
    transition: all 0.3s ease;
}

.registration-input:focus {
    outline: none;
    border-color: #d4af37;
    background: rgba(255, 255, 255, 0.08);
}

.checkbox-text {
    font-size: 14px;
}

/* Чекбокс */
.checkbox-container {
    margin-bottom: 1.5rem;
}

.checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 0.7rem;
}

.real-checkbox {
    display: none;
}

.custom-checkbox {
    width: 18px;
    height: 18px;
    border: 1px solid #d4af37;
    border-radius: 4px;
    position: relative;
    transition: 0.3s;
}

.real-checkbox:checked + .custom-checkbox {
    background: #d4af37;
}

.real-checkbox:checked + .custom-checkbox::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #000;
    font-weight: bold;
}

/* Кнопка */
.registration-button {
    width: 100%;
    background: linear-gradient(135deg, #d4af37, #f4e5c2, #d4af37);
    background-size: 200% auto;
    color: #0a0a0a;
    padding: 1rem;
    border: none;
    border-radius: 2rem;
    font-weight: 800;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.4s;
    box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2);
    margin-bottom: 1.5rem;
}

.registration-button:hover {
    background-position: right center;
    transform: translateY(-2px);
}

/* --- РАЗДЕЛИТЕЛЬ КАК У ВХОДА --- */
.divider {
    align-items: center;
    text-align: center;
    margin-bottom: 1.25rem;
    color: #8e8e8e;
    font-size: 0.75rem;
}

.divider::before,
.divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.15);
}

.divider span {
    padding: 0 12px;
}

/* ------------------------------- */

.social-buttons {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}

.social-button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 0.85rem;
    color: #fff;
    padding: 0.75rem;
    cursor: pointer;
    transition: 0.3s;
    font-size: 0.85rem;
    font-weight: 600;
}

.social-button:hover {
    background: rgba(212, 175, 55, 0.1);
    border-color: #d4af37;
}

.login-link {
    font-family: 'allodswest';
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.75rem;
}

.link {
    color: #d4af37;
    text-decoration: none;
    font-weight: 700;
    transition: 0.3s;
}

.link:hover {
    text-decoration: underline;
}

.link-btn {
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;
    padding: 0;
}

@media (max-width: 480px) {
    .registration-container--modal {
        padding: 1.25rem 1rem 1.5rem;
    }

    .registration-title {
        font-size: 1.5rem;
    }

    .social-buttons {
        flex-direction: column;
    }
}

</style>
