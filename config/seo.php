<?php

return [

    'site_name' => env('SEO_SITE_NAME', 'Luxury Shoot'),

    /*
    |--------------------------------------------------------------------------
    | Публичные URL для sitemap.xml
    |--------------------------------------------------------------------------
    */
    'sitemap_urls' => [
        ['loc' => '/', 'changefreq' => 'weekly', 'priority' => '1.0'],
        ['loc' => '/photos', 'changefreq' => 'weekly', 'priority' => '0.9'],
        ['loc' => '/video', 'changefreq' => 'weekly', 'priority' => '0.9'],
        ['loc' => '/price', 'changefreq' => 'monthly', 'priority' => '0.8'],
        ['loc' => '/rent', 'changefreq' => 'monthly', 'priority' => '0.8'],
        ['loc' => '/agreements', 'changefreq' => 'yearly', 'priority' => '0.3'],
        ['loc' => '/processing', 'changefreq' => 'yearly', 'priority' => '0.3'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Мета-теги по имени маршрута (title ≤ 60, description ≤ 160 символов)
    |--------------------------------------------------------------------------
    */
    'pages' => [
        'home' => [
            'title' => 'Luxury Shoot — фото и видеосъёмка',
            'description' => 'Студия Luxury Shoot: профессиональная фото- и видеосъёмка, портреты, события, реклама, тарифы и аренда студии.',
        ],
        'photos' => [
            'title' => 'Фотосъёмка — Luxury Shoot',
            'description' => 'Закажите фотосъёмку в студии Luxury Shoot: портреты, свадьбы, бизнес и творческие проекты с опытными фотографами.',
        ],
        'video' => [
            'title' => 'Видеосъёмка — Luxury Shoot',
            'description' => 'Видеосъёмка под ключ: клипы, репортаж, реклама и ролики для бизнеса. Luxury Shoot — качество и стиль.',
        ],
        'price' => [
            'title' => 'Тарифы — Luxury Shoot',
            'description' => 'Тарифные планы на фото- и видеосъёмку и комбо-пакеты. Прозрачные цены и удобный выбор услуг на сайте Luxury Shoot.',
        ],
        'rent' => [
            'title' => 'Аренда студии — Luxury Shoot',
            'description' => 'Аренда профессиональных фотостудий Luxury Shoot: оборудование, свет и уютные локации для ваших съёмок.',
        ],
        'agreements' => [
            'title' => 'Пользовательское соглашение',
            'description' => 'Условия использования сайта Luxury Shoot: права и обязанности пользователей, правила размещения материалов.',
        ],
        'processing' => [
            'title' => 'Обработка персональных данных',
            'description' => 'Соглашение об обработке персональных данных и политика конфиденциальности сайта Luxury Shoot.',
        ],
        'orders' => [
            'title' => 'Оформление заказа — Luxury Shoot',
            'description' => 'Корзина и оформление заказа услуг фото- и видеосъёмки, аренды студии и тарифов Luxury Shoot.',
        ],
        'profile' => [
            'title' => 'Личный кабинет — Luxury Shoot',
            'description' => 'Настройки профиля, контактные данные и управление аккаунтом на сайте Luxury Shoot.',
        ],
        'login' => [
            'title' => 'Вход — Luxury Shoot',
            'description' => 'Авторизация в личном кабинете Luxury Shoot для оформления заказов и управления профилем.',
        ],
        'register' => [
            'title' => 'Регистрация — Luxury Shoot',
            'description' => 'Создайте аккаунт на сайте Luxury Shoot, чтобы оформлять заказы и сохранять данные профиля.',
        ],
        'password.request' => [
            'title' => 'Восстановление пароля',
            'description' => 'Запрос ссылки для сброса пароля аккаунта на сайте Luxury Shoot.',
        ],
        'password.reset' => [
            'title' => 'Новый пароль — Luxury Shoot',
            'description' => 'Установка нового пароля для входа в личный кабинет Luxury Shoot.',
        ],
        'verification.notice' => [
            'title' => 'Подтверждение email',
            'description' => 'Подтвердите адрес электронной почты для доступа ко всем функциям сайта Luxury Shoot.',
        ],
        'password.confirm' => [
            'title' => 'Подтверждение пароля',
            'description' => 'Подтвердите пароль для доступа к защищённым разделам сайта Luxury Shoot.',
        ],
        'notfound' => [
            'title' => 'Страница не найдена — Luxury Shoot',
            'description' => 'Запрошенная страница не существует. Вернитесь на главную Luxury Shoot — фото и видеосъёмка.',
        ],
    ],

    'default' => [
        'title' => 'Luxury Shoot — фото и видеосъёмка',
        'description' => 'Профессиональная студия фото и видеосъёмки Luxury Shoot.',
    ],

];
