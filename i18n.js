// Internationalization translations
const translations = {
    en: {
        hero_title: "Welcome to Academic Services",
        hero_subtitle: "Your Complete Solution for Academic Excellence",
        service_translation: "Translation Services",
        service_translation_desc: "Professional translation in multiple languages",
        service_editing: "Editing & Proofreading",
        service_editing_desc: "Expert editing for your academic papers",
        service_admin: "Administration Services",
        service_admin_desc: "Complete administrative support",
        service_presentation: "Presentation Design",
        service_presentation_desc: "Professional presentation creation",
        service_autocad: "AutoCAD Design",
        service_autocad_desc: "Technical and architectural designs",
        service_businesscard: "Business Card Design",
        service_businesscard_desc: "Creative business card designs",
        order_form_title: "Order Form",
        form_name: "Name:",
        form_email: "Email:",
        form_phone: "Phone:",
        form_description: "Description:",
        form_deadline: "Deadline:",
        admin_login: "Admin Login",
        form_username: "Username:",
        form_password: "Password:",
        admin_panel: "Admin Panel",
        admin_orders: "Orders",
        admin_logout: "Logout",
        order_id: "Order ID",
        customer_info: "Customer",
        service: "Service",
        status: "Status",
        actions: "Actions",
        approve: "Approve",
        reject: "Reject",
        pending: "Pending",
        completed: "Completed",
        rejected: "Rejected",
        success_order: "Order submitted successfully!",
        success_login: "Login successful!",
        error_login: "Invalid credentials!",
        error_network: "Network error. Please try again!"
    },
    ru: {
        hero_title: "Добро пожаловать в Академические услуги",
        hero_subtitle: "Ваше полное решение для академического совершенства",
        service_translation: "Услуги перевода",
        service_translation_desc: "Профессиональный перевод на несколько языков",
        service_editing: "Редактирование и корректура",
        service_editing_desc: "Профессиональное редактирование академических работ",
        service_admin: "Административные услуги",
        service_admin_desc: "Полная административная поддержка",
        service_presentation: "Дизайн презентаций",
        service_presentation_desc: "Профессиональное создание презентаций",
        service_autocad: "Проектирование AutoCAD",
        service_autocad_desc: "Технические и архитектурные проекты",
        service_businesscard: "Дизайн визитных карточек",
        service_businesscard_desc: "Творческий дизайн визитных карточек",
        order_form_title: "Форма заказа",
        form_name: "Имя:",
        form_email: "Электронная почта:",
        form_phone: "Телефон:",
        form_description: "Описание:",
        form_deadline: "Срок выполнения:",
        admin_login: "Вход администратора",
        form_username: "Имя пользователя:",
        form_password: "Пароль:",
        admin_panel: "Панель администратора",
        admin_orders: "Заказы",
        admin_logout: "Выход",
        order_id: "ID заказа",
        customer_info: "Клиент",
        service: "Услуга",
        status: "Статус",
        actions: "Действия",
        approve: "Одобрить",
        reject: "Отклонить",
        pending: "В ожидании",
        completed: "Завершено",
        rejected: "Отклонено",
        success_order: "Заказ успешно отправлен!",
        success_login: "Успешный вход!",
        error_login: "Неверные учетные данные!",
        error_network: "Ошибка сети. Пожалуйста, попробуйте снова!"
    },
    uz: {
        hero_title: "Akademik Xizmatlariga Xush Kelibsiz",
        hero_subtitle: "Akademik Takomillik Uchun To'liq Yechim",
        service_translation: "Tarjima Xizmatlari",
        service_translation_desc: "Bir nechta tillarga professional tarjima",
        service_editing: "Tahrirlash va Proofread",
        service_editing_desc: "Akademik ishlarning professional tahrirlashi",
        service_admin: "Ma'muriyat Xizmatlari",
        service_admin_desc: "To'liq ma'muriyat qo'llab-quvvatlash",
        service_presentation: "Taqdimot Dizayni",
        service_presentation_desc: "Professional taqdimot yaratish",
        service_autocad: "AutoCAD Dizayni",
        service_autocad_desc: "Texnik va arxitektura loyihalar",
        service_businesscard: "Vizitka Dizayni",
        service_businesscard_desc: "Ijodiy vizitka dizayni",
        order_form_title: "Buyurtma Shakli",
        form_name: "Ism:",
        form_email: "Email:",
        form_phone: "Telefon:",
        form_description: "Tavsifi:",
        form_deadline: "Muddati:",
        admin_login: "Admin Kiriş",
        form_username: "Foydalanuvchi Nomi:",
        form_password: "Parol:",
        admin_panel: "Admin Paneli",
        admin_orders: "Buyurtmalar",
        admin_logout: "Chiqish",
        order_id: "Buyurtma ID",
        customer_info: "Xaridor",
        service: "Xizmat",
        status: "Holat",
        actions: "Harakatlar",
        approve: "Tasdiqlash",
        reject: "Rad Etish",
        pending: "Kutilmoqda",
        completed: "Tugallandi",
        rejected: "Rad Etildi",
        success_order: "Buyurtma muvaffaqiyatli yuborildi!",
        success_login: "Kirish muvaffaqiyatli!",
        error_login: "Noto'g'ri identifikator ma'lumotlari!",
        error_network: "Tarmoq xatosi. Iltimos, qayta harakat qiling!"
    }
};

// Get translation key
function t(key) {
    const lang = localStorage.getItem('language') || 'en';
    return translations[lang]?.[key] || translations.en[key] || key;
}

// Update all elements with translations
function updatePageLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });
}

// Set active language button
function setActiveLanguageButton() {
    const lang = localStorage.getItem('language') || 'en';
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Initialize language buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        localStorage.setItem('language', lang);
        updatePageLanguage();
        setActiveLanguageButton();
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updatePageLanguage();
    setActiveLanguageButton();
});
