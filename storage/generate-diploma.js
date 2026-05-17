/**
 * Пояснительная записка: Luxury Shoot
 * Структура по заданию на ДП (сайты 2025) и образцу ДИПЛОМ.docx
 * Без «воды» — только по делу + фрагменты кода проекта
 */
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageBreak, TabStopType, TabStopPosition, LeaderType,
  Table, TableRow, TableCell, WidthType,
} = require('docx');

const FONT = 'Times New Roman';
const SZ = 28;

function p(text, opts = {}) {
  const runs = Array.isArray(text) ? text : [new TextRun({ text, font: FONT, size: SZ, ...opts.run })];
  return new Paragraph({
    alignment: opts.center ? AlignmentType.CENTER : opts.right ? AlignmentType.RIGHT : AlignmentType.JUSTIFIED,
    spacing: { line: 360, before: opts.before || 0, after: opts.after ?? 120 },
    indent: opts.indent ? { firstLine: 720 } : undefined,
    children: runs,
    heading: opts.heading,
    pageBreakBefore: opts.pageBreak,
  });
}

function h1(t) { return p(t, { heading: HeadingLevel.HEADING_1, before: 240, after: 200, run: { bold: true, size: 32 } }); }
function h2(t) { return p(t, { heading: HeadingLevel.HEADING_2, before: 200, after: 160, run: { bold: true, size: SZ } }); }
function h3(t) { return p(t, { before: 160, after: 120, run: { bold: true, size: SZ } }); }
function pb() { return new Paragraph({ children: [new PageBreak()] }); }
function fig(n, t) { return p(`Рисунок ${n} – ${t}`, { center: true, after: 200, run: { italics: true } }); }
function ph(t) { return p(`[${t}]`, { center: true, after: 300, run: { italics: true, color: '888888' } }); }
function step(t) {
  return new Paragraph({
    spacing: { line: 360, after: 60 },
    indent: { left: 360 },
    children: [new TextRun({ text: t, font: FONT, size: SZ })],
  });
}
function code(lines, caption) {
  const out = lines.map((line) => new Paragraph({
    spacing: { line: 276, after: 0 },
    indent: { left: 540 },
    children: [new TextRun({ text: line, font: 'Consolas', size: 20 })],
  }));
  if (caption) out.push(p(caption, { run: { italics: true }, indent: true, after: 160 }));
  return out;
}

// ——— Титул и задание (шаблон) ———
const titleBlock = [
  p('Министерство профессионального образования и занятости населения', { center: true }),
  p('Приморского края', { center: true }),
  p('краевое государственное автономное профессиональное образовательное учреждение', { center: true }),
  p('«Владивостокский судостроительный колледж»', { center: true }),
  p('', { after: 200 }),
  p('ДОПУСТИТЬ К ЗАЩИТЕ', { center: true }),
  p('Зам. директора по УР ____________ Ю.Н. Топеха', { center: true }),
  p('«____» __________ 2025', { center: true }),
  p('', { after: 200 }),
  p('РАЗРАБОТКА ИНФОРМАЦИОННО-ТЕХНИЧЕСКОГО ОБЕСПЕЧЕНИЯ', { center: true, run: { bold: true } }),
  p('ИНФОРМАЦИОННОЙ СИСТЕМЫ ФОТО- И ВИДЕОСТУДИИ LUXURY SHOOT', { center: true, run: { bold: true } }),
  p('', { after: 120 }),
  p('Дипломный проект', { center: true }),
  p('Пояснительная записка', { center: true }),
  p('ВСК.09.02.07.14.00.000 ПЗ', { center: true }),
  p('', { after: 200 }),
  p('Руководитель ____________ /____________/', { center: true }),
  p('Рецензент ____________ /____________/', { center: true }),
  p('Студент группы 16-241 ____________ /____________/', { center: true }),
  p('«____» __________ 2025', { center: true }),
  p('2025', { center: true }),
  pb(),
];

const assignment = [
  p('ЗАДАНИЕ', { center: true, run: { bold: true } }),
  p('на выполнение дипломного проекта', { center: true }),
  p('Ф.И.О. _________________________________________________'),
  p('обучающемуся группы 16-241, специальность 09.02.07'),
  p('Тема: «Разработка информационно-технического обеспечения информационной системы фото- и видеостудии Luxury Shoot»'),
  p('Цель: разработать информационно-техническое обеспечение информационной системы организации.', { indent: true }),
  pb(),
];

const toc = [
  p('СОДЕРЖАНИЕ', { center: true, run: { bold: true } }),
  ...[
    ['Введение', '3'],
    ['1 Основная часть', '5'],
    ['1.1 Предметная область', '5'],
    ['1.2 Разработка TaskFlow и CJM сценариев', '9'],
    ['1.3 Разработка Web-сайта на заданную тему', '14'],
    ['1.3.1 Обоснование актуальности сайта', '14'],
    ['1.3.2 Требования к сайту', '16'],
    ['1.3.3 Этапы разработки (серверная и клиентская часть)', '18'],
    ['1.3.4 Реализация корзины и ограничение доступа', '32'],
    ['1.3.5 Публикация и продвижение сайта', '42'],
    ['2 Мероприятия по обеспечению информационной безопасности', '48'],
    ['2.1 План мероприятий для обеспечения целостности данных', '48'],
    ['2.2 План мероприятий для обеспечения информационной безопасности', '52'],
    ['Заключение', '56'],
    ['Список использованных источников', '58'],
    ['Приложения', '60'],
  ].map(([name, pg]) => new Paragraph({
    spacing: { line: 360 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: LeaderType.DOT }],
    children: [
      new TextRun({ text: name, font: FONT, size: SZ }),
      new TextRun({ text: `\t${pg}`, font: FONT, size: SZ }),
    ],
  })),
  pb(),
];

// ——— Введение (по заданию, без лишнего) ———
const introduction = [
  h1('Введение'),
  p('Фото- и видеостудии ведут приём заказов через сайт, мессенджеры и звонки. Без единой информационной системы услуги, цены и заявки клиентов оказываются разрозненными: менеджер тратит время на повторные консультации, клиент не видит итоговую стоимость до звонка.', { indent: true }),
  p('Объект исследования — информационная система фото- и видеостудии. Предмет — методы проектирования и реализации веб-приложения для представления услуг, формирования заказа и работы с учётными записями клиентов.', { indent: true }),
  p('Цель дипломного проекта (по заданию): разработать информационно-техническое обеспечение информационной системы организации.', { indent: true }),
  p('Задачи:', { indent: true }),
  step('1) описать структуру и функции организации, роль и место ИС в работе организации;'),
  step('2) сформировать TaskFlow и CJM; разработать сайт по методике проектирования (без CMS и конструкторов);'),
  step('3) разработать план обеспечения информационной безопасности при работе с ИС.'),
  p('В пояснительной записке: глава 1 — предметная область, сценарии, реализация сайта Luxury Shoot (Laravel 10, Vue 3, Inertia.js, MySQL); глава 2 — меры по целостности данных и ИБ; приложения — схемы и скриншоты.', { indent: true }),
  pb(),
];

function makeTable(headers, rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: headers.map((h) => new TableCell({ children: [p(h, { run: { bold: true } })] })),
      }),
      ...rows.map((row) => new TableRow({
        children: row.map((c) => new TableCell({ children: [p(c)] })),
      })),
    ],
  });
}

const section11fixed = [
  h1('1 Основная часть'),
  h2('1.1 Предметная область'),
  p('Организация: студия Luxury Shoot — профессиональная фото- и видеосъёмка, тарифные пакеты, аренда фотостудий.', { indent: true }),
  p('Персонал: руководитель; исполнители (фото/видео); администратор; обработка материалов. Взаимодействие с клиентом — через сайт, телефон, мессенджеры.', { indent: true }),
  ph('Организационная структура — Приложение А'),
  p('Роль ИС: единая точка информации об услугах; сбор структурированной заявки; разграничение доступа (гость не оформляет заказ без регистрации); хранение изменяемого контента в БД.', { indent: true }),
  p('Таблица 1 — Функции информационной системы', { run: { bold: true }, after: 80 }),
  makeTable(
    ['Функция', 'Описание', 'Компонент'],
    [
      ['Каталог услуг', 'Фото, видео, тарифы, аренда', 'Pages: Photos, Video, Price, Rent'],
      ['Корзина', 'Выбор услуг, расчёт суммы', 'useCart.js, Order_Check.vue'],
      ['Аутентификация', 'Регистрация, вход, профиль', 'Laravel Breeze, Enter.vue'],
      ['Контент', 'Портфолио, галерея, студии', 'SiteContentController, API'],
      ['SEO', 'Индексация, мета-теги', 'SeoController, SeoHead.vue'],
    ],
  ),
  p('Таблица 1 — Функции информационной системы', { center: true, after: 200, run: { italics: true } }),
  pb(),
];

// ——— 1.2 TaskFlow и CJM ———
const section12 = [
  h2('1.2 Разработка TaskFlow и CJM сценариев'),
  p('TaskFlow — пошаговые действия пользователя при типовых задачах на сайте.', { indent: true }),
  h3('Сценарий 1. Ознакомление и выбор услуги'),
  step('Открыть главную страницу /.'),
  step('Перейти в «Фотосъёмка», «Видеосъёмка», «Тарифы» или «Аренда студии».'),
  step('Просмотреть портфолио / галерею / тарифные карточки.'),
  step('Нажать «Добавить в корзину» (требуется вход — см. сценарий 2).'),
  h3('Сценарий 2. Регистрация и вход'),
  step('Нажать «Войти» или попытаться добавить услугу в корзину.'),
  step('В модальном окне ввести email и пароль; при отсутствии аккаунта — «Зарегистрироваться».'),
  step('После POST /login или POST /register — доступ к корзине и /orders.'),
  h3('Сценарий 3. Оформление заявки'),
  step('Добавить услуги в корзину (фото-категория, видео, тариф, студия).'),
  step('Открыть «Корзина» (/orders).'),
  step('Заполнить дату, время, число участников, комментарий; отметить согласие на обработку ПДн.'),
  step('Отправить заявку (подтверждение на клиенте).'),
  p('CJM (карта путешествия клиента) — этапы:', { indent: true }),
  step('1. Осведомлённость: поиск, соцсети → главная, блок «О студии».'),
  step('2. Рассмотрение: просмотр /photos, /video, /price.'),
  step('3. Решение: корзина, регистрация при необходимости.'),
  step('4. Оформление: /orders, форма заявки.'),
  step('5. Съёмка и постобработка — вне сайта (офлайн).'),
  ph('Вставить рисунок CJM — Приложение Б'),
  fig(1, 'CJM сайта Luxury Shoot'),
  pb(),
];

// ——— 1.3 Web-сайт ———
const section13 = [
  h2('1.3 Разработка Web-сайта на заданную тему'),
  h3('1.3.1 Обоснование актуальности сайта'),
  p('Клиенты выбирают студию по портфолио и прозрачности цен. Сайт без CMS собран на Laravel + Vue: полный контроль над логикой корзины, тарифов и доступом. Соответствует требованию задания — не конструктор и не готовая CMS.', { indent: true }),
  h3('1.3.2 Требования к сайту (по заданию на ДП)'),
  p('Технические:', { indent: true }),
  step('— без конструктора и CMS;'),
  step('— корректная работа в Google Chrome;'),
  step('— адаптивная вёрстка;'),
  step('— оптимизированные изображения.'),
  p('Контент и функции:', { indent: true }),
  step('— тематика фото/видео/аренды;'),
  step('— рабочие ссылки и материалы;'),
  step('— форма заявки с введёнными данными;'),
  step('— UI-эффекты (модальные окна, анимации карточек);'),
  step('— ограничение доступа незарегистрированному пользователю к корзине;'),
  step('— мультимедиа: галерея, встроенное видео Kinescope.'),
  h3('1.3.3 Этапы разработки'),
  p('Среда: OSPanel (Windows), PHP 8.1+, MySQL, Node.js, VS Code. Создан проект Laravel, подключены Inertia и Breeze (Vue).', { indent: true }),
  ph('Рисунок 2 — Структура каталогов проекта в VS Code'),
  p('Шаг 1. Маршруты публичных страниц (файл routes/web.php):', { indent: true }),
  ...code([
    "Route::get('/', fn () => Inertia::render('Home'))->name('home');",
    "Route::get('/photos', fn () => Inertia::render('Photos'))->name('photos');",
    "Route::get('/price', fn () => Inertia::render('Price'))->name('price');",
    "Route::middleware('auth')->group(function () {",
    "    Route::get('/orders', fn () => Inertia::render('Order_Check'))->name('orders');",
    "    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile');",
    "});",
  ], 'Листинг 1 — Фрагмент routes/web.php'),
  p('Шаг 2. Передача данных авторизации и SEO во все страницы — HandleInertiaRequests.php:', { indent: true }),
  ...code([
    'public function share(Request $request): array',
    '{',
    '    return [',
    '        ...parent::share($request),',
    "        'auth' => ['user' => $request->user()],",
    "        'seo' => Seo::forRoute($request->route()?->getName()),",
    '    ];',
    '}',
  ], 'Листинг 2 — Общие props Inertia'),
  p('Шаг 3. API контента из MySQL (SiteContentController):', { indent: true }),
  ...code([
    'public function photoCategories(): JsonResponse',
    '{',
    '    $categories = DB::table(\'photos\')->orderBy(\'id\')->limit(6)->get();',
    '    $out = $categories->map(function ($cat) {',
    '        $cover = DB::table(\'gallery_photos\')',
    '            ->where(\'category_id\', $cat->id)->where(\'is_featured\', true)',
    '            ->value(\'image_url\');',
    '        return [\'id\' => $cat->id, \'name\' => $cat->name,',
    '            \'cover_image\' => $cover ?? \'\'];',
    '    });',
    '    return response()->json($out);',
    '}',
  ], 'Листинг 3 — API категорий фотосъёмки'),
  p('Регистрация маршрутов API (routes/api.php): /api/specialists, /api/portfolio, /api/studios, /api/photo-categories, /api/gallery-photos/{id}.', { indent: true }),
  p('Шаг 4. Клиент: загрузка данных на главной (Home.vue):', { indent: true }),
  ...code([
    "const { data: specialists } = await axios.get('/api/specialists')",
    "const { data: portfolio } = await axios.get('/api/portfolio')",
  ], 'Листинг 4a — Запросы Axios на главной'),
  p('Шаг 5. Инициализация Inertia (resources/js/app.js):', { indent: true }),
  ...code([
    'createInertiaApp({',
    '    resolve: (name) => {',
    '        const page = resolvePageComponent(`./Pages/${name}.vue`,',
    '            import.meta.glob(\'./Pages/**/*.vue\'))',
    '        page.then((m) => { m.default.layout = m.default.layout || App })',
    '        return page',
    '    },',
    '    setup({ el, App, props, plugin }) {',
    '        return createApp({ render: () => h(App, props) }).use(plugin).mount(el)',
    '    },',
    '})',
  ], 'Листинг 4 — Подключение Inertia и layout App.vue'),
  p('Шаг 6. Миграция таблицы категорий фото (database/migrations/..._create_photos_table.php):', { indent: true }),
  ...code([
    "Schema::create('photos', function (Blueprint $table) {",
    '    $table->id();',
    '    $table->string(\'name\');',
    '    $table->text(\'description\')->nullable();',
    '    $table->unsignedInteger(\'base_price\')->nullable();',
    '    $table->unsignedInteger(\'photo_count\')->default(0);',
    '});',
  ], 'Листинг 5 — Миграция таблицы photos'),
  p('Аналогично созданы таблицы: specialists, portfolio, studio, gallery_photos, icons, users. Команда применения: php artisan migrate.', { indent: true }),
  p('Шаг 7. Страница Photos.vue — добавление категории в корзину:', { indent: true }),
  ...code([
    'const toggleCategoryCart = (category) => {',
    '    toggleItem({',
    '        cartKey: `photo-${category.id}`,',
    '        name: category.name,',
    "        type: 'Фотосъёмка',",
    '        image: category.cover_image,',
    "        source: 'photo',",
    '    })',
    '}',
  ], 'Листинг 6 — toggleCategoryCart на странице фотосъёмки'),
  p('Шаг 8. Файл routes/api.php — регистрация REST-эндпоинтов:', { indent: true }),
  ...code([
    "Route::get('/specialists', [SiteContentController::class, 'specialists']);",
    "Route::get('/portfolio', [SiteContentController::class, 'portfolio']);",
    "Route::get('/icons', [SiteContentController::class, 'icons']);",
    "Route::get('/studios', [SiteContentController::class, 'studios']);",
    "Route::get('/photo-categories', [SiteContentController::class, 'photoCategories']);",
    "Route::get('/gallery-photos/{categoryId}', [SiteContentController::class, 'galleryPhotos']);",
  ], 'Листинг 7 — routes/api.php'),
  p('Шаг 9. Загрузка категорий на странице Photos.vue (fetchCategories):', { indent: true }),
  ...code([
    'const fetchCategories = async () => {',
    '    loading.value = true',
    '    try {',
    "        const { data } = await axios.get('/api/photo-categories')",
    '        categories.value = (data || []).map((cat) => ({',
    '            id: cat.id, name: cat.name,',
    '            cover_image: cat.cover_image || \'\',',
    '            photo_count: cat.photo_count || 0,',
    '        }))',
    '    } catch { categories.value = [] }',
    '    finally { loading.value = false }',
    '}',
  ], 'Листинг 8 — Загрузка категорий фотосъёмки'),
  p('Шаг 10. Регистрация пользователя (Registration.vue):', { indent: true }),
  ...code([
    "router.post('/register', {",
    '    name: name.value,',
    '    email: email.value,',
    '    password: password.value,',
    '    password_confirmation: password_confirmation.value,',
    '}, { onSuccess: () => emit(\'close\') })',
  ], 'Листинг 9 — POST /register'),
  p('Шаг 11. Сборка: npm install, npm run build. Шаблон resources/views/app.blade.php — директивы @vite, @inertiaHead, @inertia.', { indent: true }),
  ph('Рисунок 3 — Главная страница сайта'),
  ph('Рисунок 4 — Страница «Фотосъёмка» с галереей'),
  ph('Рисунок 5 — Страница «Тарифы»'),
  pb(),
  h3('1.3.4 Реализация корзины и ограничение доступа'),
  p('Корзина — composable useCart.js. Состояние в localStorage, синхронизация при изменении. Добавление только для авторизованного пользователя:', { indent: true }),
  ...code([
    'const addItem = (item) => {',
    '    if (!isAuthenticated()) {',
    '        openLogin()',
    '        return { added: false, requiresAuth: true }',
    '    }',
    '    // проверка дубликата и правил тарифов...',
    '    cartItems.value.push({ cartKey, name, price, source, ... })',
    '    return { added: true }',
    '}',
  ], 'Листинг 7 — addItem с проверкой авторизации'),
  p('Правила тарифов: если в корзине есть позиция source «photo» и «video» из портфолио — на странице Price доступны только комбо-тарифы (resolveTariffSectionsAllowed).', { indent: true }),
  p('Composable useRequireAuth.js — перехват клика по корзине для гостя:', { indent: true }),
  ...code([
    'const handleCartLinkClick = (event) => {',
    '    if (isAuthenticated.value) return',
    '    event.preventDefault()',
    '    openLogin()',
    '}',
  ], 'Листинг 8 — useRequireAuth.js'),
  p('Вход через модальное окно (Enter.vue), POST на сервер:', { indent: true }),
  ...code([
    "router.post('/login', {",
    '    email: email.value,',
    '    password: password.value,',
    '    remember: false,',
    '}, { onSuccess: () => emit(\'close\') })',
  ], 'Листинг 9 — Отправка формы входа'),
  p('Страница оформления Order_Check.vue — форма заявки:', { indent: true }),
  ...code([
    'const submitOrder = () => {',
    '    if (!requireAuth()) return',
    '    if (cartItems.value.length === 0) return',
    "    alert('Заявка успешно отправлена!...')",
    '    clearCart()',
    '}',
  ], 'Листинг 10 — submitOrder'),
  p('Гость при прямом заходе на /orders перенаправляется middleware auth на главную с ?login=1; Header открывает модалку входа.', { indent: true }),
  ph('Рисунок 6 — Модальное окно входа'),
  ph('Рисунок 7 — Страница оформления заказа'),
  pb(),
  h3('1.3.5 Публикация и продвижение сайта'),
  p('Публикация: регистрация домена; хостинг с PHP и MySQL; загрузка проекта; .env (APP_URL, DB_*); php artisan migrate; npm run build; php artisan storage:link; SSL (Let\'s Encrypt).', { indent: true }),
  p('Продвижение: файл config/seo.php — title/description по маршрутам; SeoController отдаёт robots.txt и sitemap.xml; регистрация в Яндекс.Вебмастер и Google Search Console; внутренняя перелинковка разделов.', { indent: true }),
  ...code([
    "Route::get('/robots.txt', [SeoController::class, 'robots']);",
    "Route::get('/sitemap.xml', [SeoController::class, 'sitemap']);",
    '// Disallow: /orders, /profile, /login — закрытые разделы',
  ], 'Листинг 11 — SEO-маршруты'),
  p('Таблица 2 — Страницы в sitemap.xml', { run: { bold: true }, after: 80 }),
  makeTable(
    ['URL', 'Приоритет', 'Частота обновления'],
    [
      ['/', '1.0', 'weekly'],
      ['/photos', '0.9', 'weekly'],
      ['/video', '0.9', 'weekly'],
      ['/price', '0.8', 'monthly'],
      ['/rent', '0.8', 'monthly'],
    ],
  ),
  p('Таблица 2 — Страницы в sitemap.xml', { center: true, after: 200, run: { italics: true } }),
  pb(),
];

// ——— Глава 2 ———
const section2 = [
  h1('2 Мероприятия по обеспечению информационной безопасности'),
  h2('2.1 План мероприятий для обеспечения целостности данных'),
  makeTable(
    ['№', 'Мероприятие', 'Периодичность'],
    [
      ['1', 'Резервное копирование БД MySQL', 'Ежедневно'],
      ['2', 'Контроль миграций и структуры таблиц', 'При обновлении'],
      ['3', 'Валидация форм на сервере (LoginRequest, ProfileUpdateRequest)', 'Постоянно'],
      ['4', 'Хеширование паролей (bcrypt)', 'Постоянно'],
      ['5', 'Очистка корзины гостя при выходе (useCart watch)', 'В приложении'],
    ],
  ),
  p('Таблица 3 — План обеспечения целостности данных', { center: true, after: 200, run: { italics: true } }),
  h2('2.2 План мероприятий для обеспечения информационной безопасности'),
  p('Угрозы: несанкционированный доступ к /orders и /profile; перебор паролей; XSS/CSRF; утечка ПДн из формы заявки.', { indent: true }),
  p('Меры:', { indent: true }),
  step('— middleware auth на защищённых маршрутах;'),
  step('— throttle на /login (5 попыток, блокировка);'),
  step('— CSRF-токен Laravel для POST;'),
  step('— SecurityHeaders (CSP, X-Frame-Options);'),
  step('— страницы /agreements, /processing; галочка согласия в форме заказа.'),
  makeTable(
    ['№', 'Мероприятие', 'Реализация в проекте'],
    [
      ['1', 'Разграничение доступа', 'middleware auth, useRequireAuth'],
      ['2', 'Защита сессии', 'regenerate при login, invalidate при logout'],
      ['3', 'Ограничение индексации ЛК', 'robots Disallow /profile, /orders'],
      ['4', 'HTTPS на сервере', 'Сертификат при публикации'],
      ['5', 'Журнал ошибок', 'storage/logs/laravel.log'],
    ],
  ),
  p('Таблица 4 — План обеспечения информационной безопасности', { center: true, after: 200, run: { italics: true } }),
  p('Ограничение текущей версии: заявка не сохраняется в БД на сервере — при внедрении нужны таблица orders, серверная валидация и шифрование канала (HTTPS).', { indent: true }),
  pb(),
];

const conclusion = [
  h1('Заключение'),
  p('Разработано информационно-техническое обеспечение ИС студии Luxury Shoot: веб-сайт на Laravel и Vue, корзина с бизнес-правилами тарифов, авторизация, API контента, SEO.', { indent: true }),
  p('Задачи задания выполнены: описаны организация и роль ИС; построены TaskFlow и CJM; сайт соответствует требованиям (без CMS, адаптивность, форма заявки, ограничение для гостей); составлены планы ИБ и целостности данных.', { indent: true }),
  p('Дальнейшее развитие: сохранение заказов в БД, email-уведомления менеджеру, админ-панель контента.', { indent: true }),
  pb(),
];

const sources = [
  h1('Список использованных источников'),
  ...[
    'Белугина С. В. Архитектура компьютерных систем : учеб. пособие. — СПб. : Лань, 2020.',
    'Вейцман В. М. Проектирование информационных систем : учеб. пособие для СПО. — СПб. : Лань, 2020.',
    'Гвоздева Т. В., Баллод Б. А. Проектирование информационных систем. Основы управления проектами : практикум. — СПб. : Лань, 2020.',
    'Официальная документация Laravel 10 [Электронный ресурс]. — URL: https://laravel.com/docs/10.x',
    'Документация Vue.js 3 [Электронный ресурс]. — URL: https://vuejs.org',
    'Inertia.js [Электронный ресурс]. — URL: https://inertiajs.com',
    'ФЗ № 152-ФЗ «О персональных данных».',
    'Общие требования к текстовой документации УЗ-2021: Владивостокский судостроительный колледж.',
  ].map((s, i) => p(`${i + 1}. ${s}`, { indent: true })),
  pb(),
];

const appendices = [
  h1('ПРИЛОЖЕНИЯ'),
  h2('Приложение А — Организационная структура предприятия'),
  ph('Вставить схему организационной структуры студии'),
  h2('Приложение Б — Сценарии UX (TaskFlow, CJM)'),
  ph('Вставить диаграммы TaskFlow и CJM'),
  h2('Приложение В — Карта сайта'),
  ph('Вставить карту: /, /photos, /video, /price, /rent, /orders (auth), /profile (auth), /agreements, /processing'),
  h2('Приложение Г — USB-носитель'),
  p('Исходный код проекта photo-video, сборка public/build, электронная версия пояснительной записки.', { indent: true }),
];

const children = [
  ...titleBlock,
  ...assignment,
  ...toc,
  ...introduction,
  ...section11fixed,
  ...section12,
  ...section13,
  ...section2,
  ...conclusion,
  ...sources,
  ...appendices,
];

const doc = new Document({
  sections: [{
    properties: { page: { margin: { top: 1134, right: 850, bottom: 1134, left: 1701 } } },
    children,
  }],
});

const outPath = process.argv[2];

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outPath, buffer);
  console.log('OK:', outPath, 'bytes:', buffer.length);
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
