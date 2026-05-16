import { ref } from 'vue'

const showLoginModal = ref(false)
const showRegisterModal = ref(false)

export function useAuthModal() {
    const openLogin = () => {
        showRegisterModal.value = false
        showLoginModal.value = true
    }

    const closeLogin = () => {
        showLoginModal.value = false
    }

    const openRegister = () => {
        showLoginModal.value = false
        showRegisterModal.value = true
    }

    const closeRegister = () => {
        showRegisterModal.value = false
    }

    const openLoginFromRegister = () => {
        showRegisterModal.value = false
        showLoginModal.value = true
    }

    return {
        showLoginModal,
        showRegisterModal,
        openLogin,
        closeLogin,
        openRegister,
        closeRegister,
        openLoginFromRegister,
    }
}
