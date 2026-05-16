import '../css/app.css';
import '../css/responsive.css';
import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import App from './Layouts/App.vue';  // ← основной файл

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => title || appName,
    resolve: (name) => {
        const page = resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue'));
        page.then((module) => {
            // Если у страницы нет своего layout, используем App
            module.default.layout = module.default.layout || App;
        });
        return page;
    },
    setup({ el, App: InertiaApp, props, plugin }) {
        return createApp({ render: () => h(InertiaApp, props) })
            .use(plugin)
            .mount(el);
    },
    progress: {
        color: '#4b5563',
    },
});
