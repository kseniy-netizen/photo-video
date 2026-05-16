<template>
    <div class="login-container login-container--modal">
        <button type="button" class="modal-close-btn" @click="emit('close')">&times;</button>
        <div class="login-form">
            <div class="login-form__header">
                <h1 class="login-title">Вход в аккаунт</h1>
                <p class="login-subtitle">Рады видеть вас снова</p>
            </div>

            <div class="input-group">
                <label class="input-label">Email ИЛИ Логин</label>
                <div class="input-wrap">
                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="1.5">
                        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <input
                        type="email"
                        class="login-input"
                        placeholder="your@email.com"
                        v-model="email"
                    />
                </div>
            </div>

            <div class="input-group">
                <label class="input-label">Пароль</label>
                <div class="input-wrap">
                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="1.5">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>

                    <input
                        :type="showPassword ? 'text' : 'password'"
                        class="login-input"
                        placeholder="••••••••"
                        v-model="password"
                    />

                    <button class="input-toggle" @click="showPassword = !showPassword" type="button">
                        <svg v-if="!showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="1.5">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             stroke-width="1.5">
                            <path
                                d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                            <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                    </button>
                </div>

                <div class="input-footer">
                    <p class="password-hint">*Не менее 8 символов</p>
                    <a href="#" class="forgot-link">Забыли пароль?</a>
                </div>
            </div>

            <button class="login-button" @click="handleLogin" :disabled="loading">
                <span v-if="!loading">Войти</span>
                <span v-else class="login-button__loader"></span>
            </button>

            <div class="divider"><span>или войти через</span></div>

            <div class="social-buttons">
                <button class="social-button" type="button">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                </button>

                <button class="social-button" type="button">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95
1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Apple
                </button>
            </div>

            <div class="register-link">
                Ещё нет аккаунта?
                <button type="button" class="link link-btn" @click="emit('open-register')">Зарегистрироваться</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const emit = defineEmits(['close', 'open-register'])

const handleLogin = async () => {
    if (!email.value || !password.value) return
    loading.value = true
    router.post('/login', {
        email: email.value,
        password: password.value,
        remember: false,
    }, {
        preserveScroll: true,
        onFinish: () => {
            loading.value = false
        },
        onSuccess: () => {
            emit('close')
        },
        onError: (errors) => {
            const msg = errors.email || errors.password || Object.values(errors).flat().join(' ')
            alert(typeof msg === 'string' ? msg : 'Не удалось войти')
        },
    })

}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap');


h1{
    font-family: 'allodswest' !important;
}

label, span{
    font-family: 'allodswest';
}

p{
    font-family: 'allodswest' !important;
}

.login-container {
    font-family: 'Inter', sans-serif;
    color: #fff;
    position: relative;
}

.login-container--modal {
    width: 100%;
}

.login-form {
    position: relative;
    z-index: 1;
    background: rgba(8, 8, 8, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 1.5rem;
    padding: 1.6rem 2.2rem;
    width: 100%;
    max-width: 400px;
    margin-left: 0;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8);
}

.login-form__header {
    text-align: center;
    margin-bottom: 1.25rem;
}

.login-title {
    font-size: 2.2rem;
    text-align: center;
    background: linear-gradient(to bottom, #fff, #d4af37);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.4rem;
}


.login-subtitle {
    color: #c7c7c7;
    font-size: 0.88rem;
}
.modal-close-btn {
    position: absolute;
    top: 16px;
    right: 20px;
    background: none;
    border: none;
    font-size: 45px;
    font-weight: 300;
    color: #fff;
    cursor: pointer;
    z-index: 10;
    transition: 0.2s;
    margin: 10px 40px;
}
.modal-close-btn:hover {
    color: #d4af37;
    transform: scale(1.1);
}



.input-group {
    margin-bottom: 1.25rem;
}

.input-label {
    display: block;
    color: #ffffffb8 !important;
    padding: 0.2rem !important;
    font-size: 0.7rem !important;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
}

.input-wrap {
    position: relative;
    display: flex;
    align-items: center;
}

.input-icon {
    position: absolute;
    left: 0.9rem;
    color: #d4af37;
    filter: drop-shadow(0 0 6px rgba(212, 175, 55, 0.35));
    pointer-events: none;
}

.login-input {
    width: 100%;
    padding: 0.95rem 1rem 0.95rem 2.65rem;
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 0.85rem;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    background: rgba(0, 0, 0, 0.3);
    color: #ffffff;
}

.login-input:focus {
    outline: none;
    border-color: #d4af37;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
}

.input-toggle {
    position: absolute;
    right: 0.9rem;
    background: none;
    border: none;
    color: #9c9c9c;
    cursor: pointer;
    padding: 0;
    display: flex;
}

.input-toggle:hover {
    color: #d4af37;
}

.input-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.45rem;
}

.password-hint {
    color: #b8b8b8;
    font-size: 0.72rem;
    font-style: italic;
}

.forgot-link {
    color: #d4af37;
    font-size: 0.75rem;
    text-decoration: none;
}

.login-button {
    width: 100%;
    border: none;
    border-radius: 9999px;
    padding: 0.95rem;
    margin-top: 0.75rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #d4af37 0%, #f4e5c2 50%, #d4af37 100%);
    background-size: 200% 200%;
    color: #0a0a0a;
    font-size: 0.9rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(212, 175, 55, 0.3);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-button:hover:not(:disabled) {
    animation: gradientMove 1.6s ease infinite;
    transform: translateY(-2px);
    box-shadow: 0 10px 26px rgba(212, 175, 55, 0.45);
}

@keyframes gradientMove {
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

.divider {
    text-align: center;
    position: relative;
    margin-bottom: 1.25rem;
    color: #8e8e8e;
    font-size: 0.75rem;
}

.divider::before, .divider::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30%;
    height: 1px;
    background: rgba(255, 255, 255, 0.15);
}

.divider::before {
    left: 0;
}

.divider::after {
    right: 0;
}

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
    padding: 0.75rem;
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 0.85rem;
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.social-button:hover {
    background: rgba(212, 175, 55, 0.1);
    border-color: rgba(212, 175, 55, 0.5);
}

.register-link {
    font-family: 'allodswest';
    text-align: center;
    color: #d1d1d1;
    font-size: 0.75rem;
    justify-content: center;
    gap: 0.4rem;
}

.link {
    color: #d4af37 !important;
    text-decoration: none !important;
    font-weight: 700 !important;
    position: relative !important;
}

.link::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: #d4af37;
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.link:hover::after {
    transform: scaleX(1);
}

.link-btn {
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;
    padding: 0;
}

@media (max-width: 480px) {
    .login-container--modal {
        padding: 1.25rem 1rem 1.5rem;
    }

    .login-title {
        font-size: 1.5rem;
    }

    .social-buttons {
        flex-direction: column;
    }
}
</style>
