<template>
    <Teleport to="body">
        <Transition name="auth-fade">
            <div v-if="show" class="auth-modal" @click.self="emit('close')">
                <div class="auth-modal__panel" @click.stop>
                    <slot />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
defineProps({
    show: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['close'])
</script>

<style scoped>
.auth-modal {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(6px);
}

.auth-modal__panel {
    position: relative;
    width: 100%;
    max-width: 440px;
    max-height: calc(100vh - 3rem);
    overflow-y: auto;
}

.auth-fade-enter-active,
.auth-fade-leave-active {
    transition: opacity 0.25s ease;
}

.auth-fade-enter-from,
.auth-fade-leave-to {
    opacity: 0;
}

@media (max-width: 768px) {
    .auth-modal {
        padding: 1rem;
        align-items: flex-end;
    }

    .auth-modal__panel {
        max-height: 92vh;
        border-radius: 1.25rem 1.25rem 0 0;
    }
}

@media (max-width: 480px) {
    .auth-modal {
        padding: 0;
    }

    .auth-modal__panel {
        max-width: 100%;
        max-height: 100vh;
        border-radius: 0;
    }
}
</style>
