import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { useAuthModal } from './useAuthModal'

export function useRequireAuth() {
    const page = usePage()
    const { openLogin } = useAuthModal()

    const user = computed(() => page.props.auth?.user ?? null)
    const isAuthenticated = computed(() => Boolean(user.value))

    const requireAuth = () => {
        if (isAuthenticated.value) {
            return true
        }
        openLogin()
        return false
    }

    const handleCartLinkClick = (event) => {
        if (isAuthenticated.value) {
            return
        }
        event.preventDefault()
        openLogin()
    }

    return {
        user,
        isAuthenticated,
        requireAuth,
        handleCartLinkClick,
    }
}
