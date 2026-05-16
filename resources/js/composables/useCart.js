import { ref, computed, watch } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { useAuthModal } from './useAuthModal'

const STORAGE_KEY = 'photo_video_cart_v1'
const FORM_STORAGE_KEY = 'photo_video_cart_form_v1'

const cartItems = ref([])
const checkoutForm = ref({
    date: '',
    time: '',
    people: '',
    comment: '',
    agree: false,
})

let initialized = false

function parsePriceAmount(price) {
    if (!price || typeof price !== 'string') return 0
    const digits = price.replace(/[^\d]/g, '')
    return digits ? parseInt(digits, 10) : 0
}

function formatPrice(amount) {
    if (!amount) return 'По запросу'
    return `${amount.toLocaleString('ru-RU')} ₽`
}

function loadFromStorage() {
    if (initialized) return
    initialized = true

    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
            const parsed = JSON.parse(raw)
            if (Array.isArray(parsed)) {
                cartItems.value = parsed.map((item) => ({
                    ...item,
                    removing: false,
                }))
            }
        }
    } catch {
        cartItems.value = []
    }

    try {
        const rawForm = localStorage.getItem(FORM_STORAGE_KEY)
        if (rawForm) {
            const parsed = JSON.parse(rawForm)
            checkoutForm.value = {
                date: parsed.date ?? '',
                time: parsed.time ?? '',
                people: parsed.people ?? '',
                comment: parsed.comment ?? '',
                agree: Boolean(parsed.agree),
            }
        }
    } catch {
        /* форма по умолчанию */
    }
}

function saveCart() {
    const payload = cartItems.value.map(({ removing, ...item }) => item)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

function saveForm() {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(checkoutForm.value))
}

watch(cartItems, saveCart, { deep: true })
watch(checkoutForm, saveForm, { deep: true })

function priceTariffKind(cartKey) {
    if (!cartKey || typeof cartKey !== 'string') return null
    if (cartKey.startsWith('tariff-photo-')) return 'photo'
    if (cartKey.startsWith('tariff-video-')) return 'video'
    if (cartKey.startsWith('tariff-combo-')) return 'combo'
    return null
}

function resolveTariffSectionsAllowed(items) {
    const hasPhotoPortfolio = items.some((i) => i.source === 'photo')
    const hasVideoPortfolio = items.some((i) => i.source === 'video')

    if (!hasPhotoPortfolio && !hasVideoPortfolio) {
        return { photo: true, video: true, combo: true, hint: null }
    }
    if (hasPhotoPortfolio && hasVideoPortfolio) {
        return {
            photo: false,
            video: false,
            combo: true,
            hint: 'Вы выбрали и фотосъёмку, и видеосъёмку в портфолио — доступны только комбо-тарифы (фото + видео).',
        }
    }
    if (hasPhotoPortfolio && !hasVideoPortfolio) {
        return {
            photo: true,
            video: false,
            combo: false,
            hint: 'Вы выбрали фотосъёмку — доступны только тарифы фотографа. Добавьте видео в корзину, если нужен комбо-пакет.',
        }
    }
    return {
        photo: false,
        video: true,
        combo: false,
        hint: 'Вы выбрали видеосъёмку — доступны только тарифы видеографа. Добавьте фотосъёмку, если нужен комбо-пакет.',
    }
}

function shouldDropPriceTariffForRules(item, allowed) {
    if (item.source !== 'price') return false
    const kind = priceTariffKind(item.cartKey)
    if (!kind) return false
    if (kind === 'photo') return !allowed.photo
    if (kind === 'video') return !allowed.video
    return !allowed.combo
}

let portfolioSanitizeWatchStarted = false
let portfolioSanitizing = false
let guestCartWatchStarted = false

function tryRegisterPortfolioSanitizeWatch() {
    if (portfolioSanitizeWatchStarted) return
    portfolioSanitizeWatchStarted = true

    watch(
        cartItems,
        () => {
            if (portfolioSanitizing) return
            const allowed = resolveTariffSectionsAllowed(cartItems.value)
            const filtered = cartItems.value.filter(
                (item) => !shouldDropPriceTariffForRules(item, allowed),
            )
            if (filtered.length === cartItems.value.length) return
            portfolioSanitizing = true
            cartItems.value = filtered.map((item) => ({
                ...item,
                removing: item.removing ?? false,
            }))
            portfolioSanitizing = false
        },
        { deep: true, immediate: true },
    )
}

function tryRegisterGuestCartWatch(page) {
    if (guestCartWatchStarted) return
    guestCartWatchStarted = true

    watch(
        () => page.props.auth?.user,
        (user) => {
            if (!user && cartItems.value.length) {
                cartItems.value = []
            }
        },
        { immediate: true },
    )
}

export function useCart() {
    loadFromStorage()
    tryRegisterPortfolioSanitizeWatch()

    const page = usePage()
    const { openLogin } = useAuthModal()
    tryRegisterGuestCartWatch(page)

    const isAuthenticated = () => Boolean(page.props.auth?.user)

    const tariffSectionsAllowed = computed(() =>
        resolveTariffSectionsAllowed(cartItems.value),
    )

    const count = computed(() => cartItems.value.length)

    const totalPrice = computed(() => {
        const sum = cartItems.value.reduce(
            (acc, item) => acc + (item.priceAmount ?? parsePriceAmount(item.price)),
            0,
        )
        return formatPrice(sum)
    })

    const isInCart = (cartKey) =>
        cartItems.value.some((item) => item.cartKey === cartKey)

    const addItem = (item) => {
        if (!isAuthenticated()) {
            openLogin()
            return { added: false, requiresAuth: true }
        }

        const cartKey = item.cartKey ?? `${item.source}-${item.name}`

        if (isInCart(cartKey)) {
            return { added: false, duplicate: true }
        }

        if (item.source === 'price') {
            const kind = priceTariffKind(cartKey)
            if (kind) {
                const allowed = resolveTariffSectionsAllowed(cartItems.value)
                const blocked =
                    (kind === 'photo' && !allowed.photo) ||
                    (kind === 'video' && !allowed.video) ||
                    (kind === 'combo' && !allowed.combo)
                if (blocked) {
                    return { added: false, blocked: true }
                }
            }
        }

        const priceAmount = item.priceAmount ?? parsePriceAmount(item.price)

        cartItems.value.push({
            id: `${cartKey}-${Date.now()}`,
            cartKey,
            name: item.name,
            type: item.type,
            duration: item.duration ?? '—',
            price: item.price ?? formatPrice(priceAmount),
            priceAmount,
            image: item.image || '/storage/app/public/images/logo.jpg',
            source: item.source ?? 'other',
            removing: false,
        })

        return { added: true }
    }

    const removeItem = (index) => {
        if (!isAuthenticated()) {
            openLogin()
            return
        }

        if (!cartItems.value[index]) return

        cartItems.value[index].removing = true
        setTimeout(() => {
            cartItems.value.splice(index, 1)
        }, 400)
    }

    const removeItemByCartKey = (cartKey) => {
        if (!isAuthenticated()) {
            openLogin()
            return false
        }

        const index = cartItems.value.findIndex((i) => i.cartKey === cartKey)
        if (index === -1) return false
        cartItems.value.splice(index, 1)
        return true
    }

    const toggleItem = (item) => {
        const cartKey = item.cartKey ?? `${item.source}-${item.name}`
        if (isInCart(cartKey)) {
            if (!isAuthenticated()) {
                openLogin()
                return { inCart: true, requiresAuth: true }
            }
            removeItemByCartKey(cartKey)
            return { inCart: false }
        }
        const result = addItem(item)
        if (result.requiresAuth) {
            return { inCart: false, requiresAuth: true }
        }
        if (result.blocked) {
            return { inCart: false, blocked: true }
        }
        return { inCart: true }
    }

    const clearCart = () => {
        cartItems.value = []
    }

    return {
        cartItems,
        checkoutForm,
        count,
        totalPrice,
        addItem,
        removeItem,
        removeItemByCartKey,
        toggleItem,
        isInCart,
        clearCart,
        parsePriceAmount,
        formatPrice,
        tariffSectionsAllowed,
    }
}
