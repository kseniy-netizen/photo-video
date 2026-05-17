<template>
    <footer class="footer">
        <div class="footer__container">
            <div class="footer__top">
                <div class="footer__brand">
                    <Link href="/" class="footer__logo">
                        <span class="logo__text">Luxury Shoot</span>
                    </Link>
                    <p class="footer__description">
                        Профессиональная фото и видеосъёмка для ваших особенных моментов.
                    </p>
                    <div class="footer__socials">
                        <a
                            v-for="icon in icons"
                            :key="icon.id"
                            :href="getSocialLink(icon.name)"
                            class="social__link"
                            target="_blank"
                            rel="noopener noreferrer"
                            :title="icon.name"
                        >
                            <svg v-if="icon.name === 'WhatsApp'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>

                            <svg v-else-if="icon.name === 'Telegram'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                            </svg>

                            <svg v-else-if="icon.name === 'VK'" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.713-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.566c0 .422-.135.677-1.244.677-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.408 4 7.938c0-.254.102-.491.593-.491h1.744c.441 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.168-3.608 2.168-3.608.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354
4.031-.186.305-.254.44 0 .78.186.254.796.779 1.202 1.253.745.847 1.32 1.558 1.473 2.049.17.49-.085.745-.576.745z"/>
                            </svg>

                            <span v-else>{{ icon.name[0] }}</span>
                        </a>
                    </div>
                </div>

                <div class="footer__nav">
                    <div class="footer__column">
                        <h4 class="footer__title">Навигация</h4>
                        <ul class="footer__links">
                            <li><Link href="/">Главная</Link></li>
                            <li><Link href="/photos">Фотосъёмка</Link></li>
                            <li><Link href="/video">Видеосъёмка</Link></li>
                            <li><Link href="/price">Тарифы</Link></li>
                            <li><Link href="/rent">Аренда студии</Link></li>
                        </ul>
                    </div>
                    <div class="footer__column">
                        <h4 class="footer__title">Контакты</h4>
                        <ul class="footer__contacts">
                            <li>+7 (999) 999-99-99</li>
                            <li>luxuryshoot@gmail.com</li>
                            <li>г. Москва, ул. Примерная, 123</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="footer__bottom">
                <p class="footer__copyright">© 2026 Luxury Shoot. Все права защищены.</p>
                <div class="footer__legal">
                    <Link href="/agreements">Пользовательское соглашение</Link>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Link } from '@inertiajs/vue3'

const icons = ref([])

const socialLinks = {
    WhatsApp: 'https://chat.whatsapp.com/Iky5zxzz5Ed8fkih52vX1C?mode=hqrt1',
    Telegram: 'https://t.me/capture_studio_of',
    VK: 'https://vk.ru/club234605221',
}

const getSocialLink = (name) => socialLinks[name] || '#'

onMounted(async () => {
    try {
        const { data } = await axios.get('/data/icons')
        icons.value = data || []
    } catch {
        icons.value = []
    }
})
</script>

<style scoped>
.footer {
    background: #141414;
    border-top: 1px solid #2a2a2a;
    padding: 4rem 0 2rem;
    margin-top: auto;
}

.footer__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

.footer__top {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
    margin-bottom: 3rem;
}

.footer__brand {
    max-width: 300px;
}

.footer__logo {
    text-decoration: none;
}

.logo__text {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
}

.footer__description {
    color: #a0a0a0;
    font-size: 0.875rem;
    line-height: 1.7;
    margin: 1rem 0;
}

.footer__socials {
    display: flex;
    gap: 1rem;
}

.social__link {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a0a0a0;
    border: 1px solid #2a2a2a;
    border-radius: 50%;
    text-decoration: none;
    transition: all 0.3s ease;
    padding: 8px;
}

.social__link:hover {
    border-color: #d4af37;
    color: #d4af37;
}

.footer__nav {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}

.footer__title {
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: white;
    margin-bottom: 1.5rem;
}

.footer__links,
.footer__contacts {
    list-style: none;
}

.footer__links li,
.footer__contacts li {
    margin-bottom: 0.75rem;
}

.footer__links a {
    color: #a0a0a0;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.3s ease;
}

.footer__links a:hover {
    color: #d4af37;
}

.footer__contacts {
    color: #a0a0a0;
    font-size: 0.875rem;
}
.footer__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    border-top: 1px solid #2a2a2a;
}

.footer__copyright {
    color: #666;
    font-size: 0.875rem;
}

.footer__legal a {
    font-family: 'allodswest';
    color: #666;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.3s ease;
}

.footer__legal a:hover {
    color: #a0a0a0;
}

@media (max-width: 1280px) {
    .footer__container {
        padding-left: var(--site-gutter, 1.5rem);
        padding-right: var(--site-gutter, 1.5rem);
    }
}

@media (max-width: 768px) {
    .footer__top {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .footer__nav {
        grid-template-columns: 1fr;
    }

    .footer__bottom {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
}

@media (max-width: 480px) {
    .footer {
        padding: 2.5rem 0 1.5rem;
    }

    .logo__text {
        font-size: 1.25rem;
    }

    .footer__description {
        font-size: 0.85rem;
    }
}
</style>
