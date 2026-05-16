<template>
    <div class="page-wrapper">
        <div class="content-container">

            <div class="page-header">
                <div class="header-line"></div>
                <h1 class="page-title">Пользовательское соглашение</h1>
                <p class="page-subtitle">Условия использования сайта</p>
                <div class="header-line"></div>
            </div>

            <div class="terms-section">
                <h2 class="section-title">
                    <span class="section-num">I.</span>
                    Общие условия
                </h2>
                <div class="clauses-list">
                    <div class="clause" v-for="(clause, index) in generalConditions" :key="index">
                        <span class="clause-number">{{ clause.number }}</span>
                        <p class="clause-text">{{ clause.text }}</p>
                    </div>
                </div>
            </div>

            <div class="terms-section">
                <h2 class="section-title">
                    <span class="section-num">II.</span>
                    Обязательства Пользователя
                </h2>
                <div class="clauses-list">
                    <div class="clause" v-for="(clause, index) in userObligations" :key="index">
                        <span class="clause-number">{{ clause.number }}</span>
                        <p class="clause-text">{{ clause.text }}</p>
                    </div>

                    <div class="subsection">
                        <h3 class="subsection-title">2.9. Ответственность за изображения третьих лиц</h3>
                        <div class="clause">
                            <span class="clause-number">2.9.1.</span>
                            <div>
                                <p class="clause-text">Загружая фотографии, на которых изображены третьи лица (модели, участники съёмок, клиенты и др.), Пользователь гарантирует, что:</p>
                                <ul class="clause-list">
                                    <li>обладает всеми необходимыми правами на публикацию изображений указанных лиц;</li>
                                    <li>получил от каждого изображённого лица письменное согласие (модель-релиз) на публикацию их изображения в интернете, включая сторонние сайты, без ограничений по сроку, территории и целям использования;</li>
                                    <li>готов предоставить копию такого согласия по первому требованию Администрации Сайта;</li>
                                    <li>несёт полную ответственность за нарушение прав третьих лиц, включая обязанность возместить Администрации все убытки, штрафы и судебные издержки.</li>
                                </ul>
                            </div>
                        </div>
                        <div class="clause">
                            <span class="clause-number">2.9.2.</span>
                            <p class="clause-text">Процедура по жалобам. В случае поступления жалобы от самого изображённого лица (или его законного представителя) Администрация вправе: запросить документы; временно скрыть фотографию из публичного доступа до предоставления подтверждения; в случае отсутствия документов или решения суда фото может оставаться скрытым. Полное удаление производится только при очевидном нарушении законодательства либо на основании судебного акта.</p>
                        </div>
                        <div class="clause">
                            <span class="clause-number">2.9.3.</span>
                            <p class="clause-text">Пользователь осознаёт, что отсутствие согласия изображённого лица может быть признано нарушением законодательства (ст. 152.1 ГК РФ, 152-ФЗ) и повлечь удаление контента, блокировку аккаунта, а также гражданскую, административную или иную ответственность.</p>
                        </div>
                        <div class="clause">
                            <span class="clause-number">2.9.4.</span>
                            <p class="clause-text">Для фотографий, сделанных в рамках рекламных, коммерческих или профессиональных съёмок, Пользователь обязан иметь подписанный модель-релиз. При его отсутствии публикация может быть отклонена или удалена без предупреждения.</p>
                        </div>
                    </div>

                    <div class="clause">
                        <span class="clause-number">2.10.</span>
                        <p class="clause-text">Размещения, носящие рекламный характер, должны быть промаркированы; соблюдение требований 38-ФЗ и, при необходимости, передача данных в Оператора рекламных данных — обязанность автора объявления.</p>
                    </div>
                    <div class="clause">
                        <span class="clause-number">2.11.</span>
                        <p class="clause-text">Модерация. Администрация вправе скрывать/удалять материалы и блокировать аккаунты при нарушениях, по жалобам, по требованиям госорганов либо при рисках для третьих лиц.</p>
                    </div>
                    <div class="clause">
                        <span class="clause-number">2.12.</span>
                        <p class="clause-text">Запрещённый контент. Пользователю запрещается размещать материалы, распространение которых ограничено или запрещено законодательством РФ (включая, но не ограничиваясь: экстремистские материалы, пропаганду наркотиков, призывы к насилию или самоубийству, детскую порнографию, материалы, нарушающие права третьих лиц).</p>
                    </div>
                </div>
            </div>

            <div class="terms-section">
                <h2 class="section-title">
                    <span class="section-num">III.</span>
                    Прочие условия
                </h2>
                <div class="clauses-list">
                    <div class="clause" v-for="(clause, index) in otherConditions" :key="index">
                        <span class="clause-number">{{ clause.number }}</span>
                        <p class="clause-text">{{ clause.text }}</p>
                    </div>
                </div>
            </div>

            <div class="terms-footer" v-if="showAcceptance">
                <label class="accept-checkbox">
                    <input type="checkbox" v-model="accepted" @change="$emit('accept-change', accepted)">
                    <span class="checkmark"></span>
                    <span class="check-label">Я прочитал(а) и принимаю условия пользовательского соглашения</span>
                </label>
                <button class="accept-btn" :disabled="!accepted" @click="$emit('accept')">
                    <span class="btn-shine"></span>
                    <span>Принять соглашение</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    showAcceptance: {
        type: Boolean,
        default: false
    }
})

defineEmits(['accept', 'accept-change'])

const accepted = ref(false)

const generalConditions = [
    { number: '1.1.', text: 'Использование материалов и сервисов Сайта регулируется нормами действующего законодательства Российской Федерации.' },
    { number: '1.2.', text: 'Настоящее Соглашение является публичной офертой. Получая доступ к материалам Сайта, Пользователь считается присоединившимся к настоящему Соглашению.' },
    { number: '1.3.', text: 'Администрация Сайта вправе в любое время изменять условия настоящего Соглашения. Изменения вступают в силу через 3 (три) дня после публикации новой версии. При несогласии Пользователь обязан прекратить использование Сайта.' },
    { number: '1.4.', text: 'Особенности ответственности информационного посредника. Администрация Сайта действует как информационный посредник в соответствии со статьёй 1253.1 ГК РФ: не является инициатором размещаемых материалов и не несёт ответственности за нарушение интеллектуальных прав при условии своевременного реагирования на уведомления правообладателей (удаление/ограничение доступа к материалу).' },
    { number: '1.5.', text: 'Персональные данные. Регистрируясь на Сайте, создавая аккаунт или иным образом используя Сайт, Пользователь подтверждает своё согласие на обработку персональных данных по 152-ФЗ и локализацию по 242-ФЗ, включая трансграничную передачу в объёме, необходимом для работы сервисов. Согласие может быть отозвано путём направления уведомления.' },
    { number: '1.6.', text: 'Лицензия. Пользователь предоставляет Администрации неисключительную лицензию на использование загруженных фотографий исключительно для их отображения на Сайте, адаптации под интерфейс, создания превью и показа в промо-материалах Сайта с обязательным указанием авторства. Лицензия действует на период размещения.' },
    { number: '1.7.', text: 'Возрастные ограничения. Сайт может содержать материалы 16+/18+. Пользователь подтверждает, что достиг соответствующего возраста.' }
]

const userObligations = [
    { number: '2.1.', text: 'Соблюдать законодательство РФ; не нарушать авторские и смежные права, права на изображение; не размещать запрещённый контент.' },
    { number: '2.2.', text: 'Гарантировать авторство или наличие прав на загружаемые фотографии. Загрузка чужих работ без разрешения ведёт к удалению аккаунта.' },
    { number: '2.3.', text: 'Запрещено размещение: экстремистских материалов; пропаганды наркотиков, насилия, суицида; детской порнографии или обнажённых изображений лиц младше 18 лет; иных материалов, нарушающих мораль и законы РФ.' },
    { number: '2.4.', text: 'Пользователь несёт полную ответственность за комментарии и иные публикации; оскорбления и агрессивное поведение запрещены.' },
    { number: '2.5.', text: 'Пользователь предупреждён, что Сайт может содержать ссылки на внешние ресурсы; Администрация не отвечает за их содержание.' },
    { number: '2.6.', text: 'Пользователь соглашается на получение сервисных уведомлений (e-mail, push). Рекламные рассылки направляются только при отдельном согласии; отписка доступна в любой момент.' },
    { number: '2.7.', text: 'Пользователь принимает, что материалы и сервисы Сайта могут сопровождаться рекламой; Администрация не несёт ответственности по обязательствам рекламодателей.' },
    { number: '2.8.', text: 'Объявления о фототурах и мероприятиях размещаются пользователями самостоятельно. Администрация предоставляет только техническую возможность и не является организатором, посредником или участником таких мероприятий. Вся ответственность за содержание объявлений и исполнение обязательств несёт пользователь-организатор.' }
]

const otherConditions = [
    { number: '3.1.', text: 'Все споры, вытекающие из настоящего Соглашения или связанные с ним, подлежат разрешению по законодательству РФ.' },
    { number: '3.2.', text: 'Ничто в Соглашении не создаёт между Пользователем и Администрацией агентских отношений, товарищества, совместной деятельности или трудовых отношений.' },
    { number: '3.3.', text: 'Недействительность одного положения Соглашения не влечёт недействительность остальных.' },
    { number: '3.4.', text: 'Бездействие Администрации при нарушении условий Соглашения не лишает её права позднее предпринять меры защиты.' },
    { number: '3.5.', text: 'Досудебный порядок. Претензии направляются в адрес Luxury Shoot. Срок ответа — 30 дней. Споры — по месту нахождения Администрации.' },
    { number: '3.6.', text: 'Ограничение ответственности. Администрация не отвечает за упущенную выгоду и косвенные убытки. Совокупная ответственность ограничена суммой, уплаченной Пользователем за 3 последних месяца (если применимо). Ограничение не действует при умысле.' },
    { number: '3.7.', text: 'Форс-мажор. Стороны освобождаются от ответственности при обстоятельствах непреодолимой силы (стихии, блокировки, сбои ЦОД, акты госорганов и т.п.) на срок их действия.' }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

.page-wrapper {
    min-height: 100vh;
    background: #0a0a0a;
    font-family: 'Inter', sans-serif;
    color: #fff;
    padding: 60px 0 100px;
}

.content-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 32px;
}

/* ====== HEADER ====== */
.page-header {
    text-align: center;
    margin-bottom: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.header-line {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent);
}

.page-title {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: 0.02em;
    background: linear-gradient(135deg, #ffffff 30%, #d4af37 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.page-subtitle {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.3);
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.3em;
}

/* ====== SECTION ====== */
.terms-section {
    margin-bottom: 56px;
}

.section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    font-weight: 600;
    color: #fff;
    margin: 0 0 28px 0;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(212, 175, 55, 0.25);
    display: flex;
    align-items: baseline;
    gap: 14px;
}

.section-num {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 1.3rem;
    color: #d4af37;
    font-weight: 400;
}

/* ====== CLAUSES ====== */
.clauses-list {
    display: flex;
    flex-direction: column;
}

.clause {
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 0 20px;
    padding: 18px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    align-items: baseline;
}

.clause:last-child {
    border-bottom: none;
}

.clause-number {
    font-size: 0.8rem;
    font-weight: 700;
    color: #d4af37;
    letter-spacing: 0.03em;
    padding-top: 3px;
}

.clause-text {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.8;
    margin: 0;
}

.clause-list {
    margin: 14px 0 0 0;
    padding: 0 0 0 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style: none;
}

.clause-list li {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.75;
    position: relative;
    padding-left: 16px;
}

.clause-list li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: #d4af37;
    font-weight: 300;
}

/* ====== SUBSECTION ====== */
.subsection {
    border-left: 2px solid rgba(212, 175, 55, 0.3);
    padding-left: 28px;
    margin: 8px 0 8px 48px;
}

.subsection-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    margin: 16px 0 8px 0;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.subsection .clause {
    grid-template-columns: 48px 1fr;
}

/* ====== FOOTER ====== */
.terms-footer {
    margin-top: 16px;
    padding: 40px;
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-top: 2px solid rgba(212, 175, 55, 0.4);
    background: rgba(212, 175, 55, 0.03);
}

.accept-checkbox {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    cursor: pointer;
    margin-bottom: 28px;
}

.accept-checkbox input {
    display: none;
}
.checkmark {
    width: 22px;
    height: 22px;
    border: 1.5px solid rgba(212, 175, 55, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
    transition: all 0.3s ease;
    background: transparent;
}

.checkmark::after {
    content: '✓';
    font-size: 0.85rem;
    color: #0a0a0a;
    font-weight: 700;
    opacity: 0;
    transform: scale(0);
    transition: all 0.2s ease;
}

.accept-checkbox input:checked ~ .checkmark {
    background: #d4af37;
    border-color: #d4af37;
}

.accept-checkbox input:checked ~ .checkmark::after {
    opacity: 1;
    transform: scale(1);
}

.check-label {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.6;
}

.accept-btn {
    width: 100%;
    padding: 18px 32px;
    background: linear-gradient(135deg, #d4af37 0%, #c9a227 50%, #d4af37 100%);
    background-size: 200% 100%;
    color: #0a0a0a;
    border: none;
    font-size: 0.95rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    transition: all 0.4s ease;
    box-shadow: 0 4px 30px rgba(212, 175, 55, 0.25);
    position: relative;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
}

.btn-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    transition: left 0.7s ease;
}

.accept-btn:hover:not(:disabled) .btn-shine { left: 100%; }
.accept-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 40px rgba(212, 175, 55, 0.4);
    background-position: 100% 0;
}
.accept-btn:active:not(:disabled) { transform: translateY(0); }
.accept-btn:disabled { opacity: 0.25; cursor: not-allowed; }

/* ====== ADAPTIVE ====== */
@media (max-width: 1280px) {
    .content-container {
        padding-left: var(--site-gutter, 1.5rem);
        padding-right: var(--site-gutter, 1.5rem);
    }
}

@media (max-width: 768px) {
    .page-wrapper { padding: 40px 0 60px; }
    .content-container { padding: 0 20px; }
    .page-title { font-size: 2.1rem; }
    .section-title { font-size: 1.4rem; }
    .clause { grid-template-columns: 40px 1fr; gap: 0 14px; }
    .clause-text { font-size: 0.95rem; }
    .subsection { margin-left: 0; padding-left: 16px; }
    .terms-footer { padding: 28px 20px; }
}

@media (max-width: 480px) {
    .page-title { font-size: 1.75rem; }
    .accept-btn { padding: 14px 20px; font-size: 0.85rem; }
    .clause-number { font-size: 1.5rem; }
}
</style>
