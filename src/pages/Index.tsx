import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useEditor } from "@/context/EditorContext";
import EditableText from "@/components/editor/EditableText";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О компании" },
  { id: "catalog", label: "Каталог" },
  { id: "specs", label: "Тех. характеристики" },
  { id: "certificates", label: "Сертификаты" },
  { id: "news", label: "Новости" },
  { id: "contacts", label: "Контакты" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Промышленные клапаны серии ПК-300",
    category: "Трубопроводная арматура",
    img: "https://cdn.poehali.dev/projects/46c7cb3b-5e75-4bb5-b15b-a474014c3285/files/a74c6fd7-a59a-47dd-bc61-dd2af15feee1.jpg",
    specs: ["DN 15–300 мм", "PN до 40 бар", "T до 350°C"],
    docs: ["Паспорт изделия", "Спецификация"],
  },
  {
    id: 2,
    name: "Фланцевые соединения ГОСТ 12820",
    category: "Крепёжные элементы",
    img: "https://cdn.poehali.dev/projects/46c7cb3b-5e75-4bb5-b15b-a474014c3285/files/a74c6fd7-a59a-47dd-bc61-dd2af15feee1.jpg",
    specs: ["Сталь 09Г2С", "DN 10–1200 мм", "Класс прочности 4.8–8.8"],
    docs: ["Технический паспорт", "Чертёж"],
  },
  {
    id: 3,
    name: "Задвижки клиновые ЗКЛ2",
    category: "Запорная арматура",
    img: "https://cdn.poehali.dev/projects/46c7cb3b-5e75-4bb5-b15b-a474014c3285/files/a74c6fd7-a59a-47dd-bc61-dd2af15feee1.jpg",
    specs: ["DN 50–500 мм", "PN 16–40 бар", "Нержавеющая сталь"],
    docs: ["Паспорт изделия", "Инструкция по монтажу"],
  },
  {
    id: 4,
    name: "Насосные агрегаты серии НА-1000",
    category: "Насосное оборудование",
    img: "https://cdn.poehali.dev/projects/46c7cb3b-5e75-4bb5-b15b-a474014c3285/files/a74c6fd7-a59a-47dd-bc61-dd2af15feee1.jpg",
    specs: ["Q до 1000 м³/ч", "H до 200 м", "КПД до 87%"],
    docs: ["Паспорт агрегата", "Руководство по эксплуатации"],
  },
  {
    id: 5,
    name: "Теплообменники кожухотрубные ТКГ",
    category: "Теплообменное оборудование",
    img: "https://cdn.poehali.dev/projects/46c7cb3b-5e75-4bb5-b15b-a474014c3285/files/a74c6fd7-a59a-47dd-bc61-dd2af15feee1.jpg",
    specs: ["S теплообмена до 500 м²", "T рабочая до 400°C", "P до 25 МПа"],
    docs: ["Технический паспорт", "Расчётная документация"],
  },
  {
    id: 6,
    name: "Трубы стальные бесшовные ГОСТ 8731",
    category: "Трубный прокат",
    img: "https://cdn.poehali.dev/projects/46c7cb3b-5e75-4bb5-b15b-a474014c3285/files/a74c6fd7-a59a-47dd-bc61-dd2af15feee1.jpg",
    specs: ["D 6–530 мм", "Толщина стенки 0.5–75 мм", "Сталь 20, 09Г2С"],
    docs: ["Сертификат качества", "Паспорт партии"],
  },
];

const TECH_SPECS = [
  { param: "Рабочее давление", value: "до 40 МПа", note: "согласно ГОСТ Р 52857" },
  { param: "Рабочая температура", value: "-60°C / +600°C", note: "зависит от материала" },
  { param: "Климатическое исполнение", value: "УХЛ, ХЛ, О, ОМ", note: "ГОСТ 15150-69" },
  { param: "Степень защиты", value: "IP54 / IP65 / IP68", note: "по запросу" },
  { param: "Сейсмостойкость", value: "до 9 баллов", note: "СП 14.13330" },
  { param: "Ресурс работы", value: "≥ 100 000 циклов", note: "гарантия 24 мес." },
  { param: "Материал корпуса", value: "20, 09Г2С, 12Х18Н10Т", note: "по требованию заказчика" },
  { param: "Покрытие", value: "Эпоксидное / полиуретан", note: "толщина от 60 мкм" },
];

const CERTIFICATES = [
  {
    name: "Сертификат соответствия ГОСТ Р",
    number: "№ РОСС RU.АЯ46.В02014",
    date: "Действителен до 31.12.2026",
    icon: "Award",
  },
  {
    name: "Разрешение Ростехнадзора",
    number: "РРС 00-52107",
    date: "Выдано 15.03.2023",
    icon: "ShieldCheck",
  },
  {
    name: "Сертификат ISO 9001:2015",
    number: "№ TÜV.9105.0023.2022",
    date: "Действителен до 30.06.2025",
    icon: "BadgeCheck",
  },
  {
    name: "Декларация о соответствии ТР ЕАЭС",
    number: "ЕАЭС N RU Д-RU.АЯ46.В.00214",
    date: "Действительна до 15.08.2026",
    icon: "FileCheck",
  },
  {
    name: "Сертификат ISO 14001 (экология)",
    number: "№ EMS-2023-RU-04471",
    date: "Действителен до 20.11.2025",
    icon: "Leaf",
  },
  {
    name: "Свидетельство о регистрации СМК",
    number: "СМК-2022-04-0012",
    date: "Выдано 10.04.2022",
    icon: "ScrollText",
  },
];

const NEWS = [
  {
    date: "28 апреля 2026",
    tag: "Производство",
    title: "Запуск новой линии производства трубопроводной арматуры",
    text: "Введена в эксплуатацию автоматизированная линия с объёмом выпуска до 5 000 единиц продукции в месяц. Применяется роботизированная сварка и контроль качества по стандарту ISO 3834.",
  },
  {
    date: "15 марта 2026",
    tag: "Сертификация",
    title: "Получен сертификат соответствия ТР ЕАЭС 032/2013",
    text: "Продукция насосного оборудования серии НА прошла испытания и получила декларацию о соответствии. Документы доступны в разделе «Сертификаты».",
  },
  {
    date: "2 февраля 2026",
    tag: "Выставка",
    title: "Участие в Нефтегаз-2026 в Москве",
    text: "Компания представила новейшие разработки в области трубопроводной и запорной арматуры. Подписаны контракты с партнёрами из 7 регионов России.",
  },
];

const DOCS = [
  { name: "Общий каталог продукции 2026", size: "8.4 МБ", type: "PDF", icon: "BookOpen" },
  { name: "Прайс-лист (актуальный)", size: "1.2 МБ", type: "XLSX", icon: "Table" },
  { name: "Инструкция по монтажу (общая)", size: "3.1 МБ", type: "PDF", icon: "Wrench" },
  { name: "Руководство по эксплуатации", size: "5.7 МБ", type: "PDF", icon: "BookMarked" },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Index() {
  const navigate = useNavigate();
  const { state, updateSettings, isEditMode } = useEditor();
  const s = state.siteSettings;
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogFilter, setCatalogFilter] = useState("Все");

  const categories = ["Все", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];
  const filtered = catalogFilter === "Все" ? PRODUCTS : PRODUCTS.filter((p) => p.category === catalogFilter);

  const handleNav = (id: string) => {
    setActiveSection(id);
    scrollTo(id);
    setMobileOpen(false);
  };

  return (
    <div className={`min-h-screen bg-background font-ibm ${isEditMode ? "pb-16" : ""}`}>
      {/* TOP BAR */}
      <div className="bg-navy text-white text-sm py-2 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-6 text-white/70">
            <span className="flex items-center gap-1.5">
              <Icon name="MapPin" size={13} />
              {s.address}
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="Clock" size={13} />
              {s.workHours}
            </span>
          </div>
          <div className="flex gap-6 text-white/70">
            <a href={`tel:${s.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Icon name="Phone" size={13} />
              {s.phone}
            </a>
            <a href={`mailto:${s.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Icon name="Mail" size={13} />
              {s.email}
            </a>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav("home")}>
            <div className="w-9 h-9 bg-navy flex items-center justify-center">
              <Icon name="Settings2" size={18} className="text-white" />
            </div>
            <div>
              <div className="font-oswald font-bold text-navy text-lg leading-tight tracking-wide">ПРОМТЕХ</div>
              <div className="text-xs text-muted-foreground leading-tight font-ibm">Промышленное оборудование</div>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => item.id === "catalog" ? navigate("/catalog") : handleNav(item.id)}
                className={`nav-link text-sm font-ibm font-medium tracking-wide pb-0.5 transition-colors ${
                  activeSection === item.id ? "text-navy active" : "text-steel hover:text-navy"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNav("contacts")}
              className="bg-orange text-white font-oswald font-medium text-sm tracking-wider px-5 py-2.5 hover:bg-orange/90 transition-colors"
            >
              ЗАПРОС КП
            </button>
          </div>

          {/* Mobile burger */}
          <button className="lg:hidden p-2 text-navy" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-border animate-fade-in">
            <div className="container mx-auto py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="text-left px-3 py-2.5 font-ibm text-sm font-medium text-steel hover:text-navy hover:bg-muted transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("contacts")}
                className="mt-2 bg-orange text-white font-oswald font-medium text-sm tracking-wider px-5 py-3 hover:bg-orange/90 transition-colors"
              >
                ЗАПРОС КП
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/46c7cb3b-5e75-4bb5-b15b-a474014c3285/files/7b1eddcb-5d38-474e-b782-869360aa68d3.jpg)` }}
        />
        <div className="absolute inset-0 bg-navy/78" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.04) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.04) 50px)",
          }}
        />

        <div className="relative container mx-auto py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
              <div className="h-px w-12 bg-orange" />
              <EditableText
                value={s.heroTagline}
                onSave={(v) => updateSettings({ heroTagline: v })}
                className="text-orange font-ibm text-sm font-medium tracking-[0.2em] uppercase"
              />
            </div>
            <h1 className="font-oswald text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-wide mb-6 animate-fade-in-up delay-100">
              {isEditMode ? (
                <textarea
                  value={s.heroTitle}
                  onChange={(e) => updateSettings({ heroTitle: e.target.value })}
                  rows={3}
                  className="w-full bg-transparent border-2 border-orange/60 text-white font-oswald text-4xl font-bold resize-none focus:outline-none p-2"
                />
              ) : (
                s.heroTitle.split("\n").map((line, i) => (
                  <span key={i}>{i === 1 ? <span className="text-orange">{line}</span> : line}{i < 2 && <br />}</span>
                ))
              )}
            </h1>
            <EditableText
              value={s.heroSubtitle}
              onSave={(v) => updateSettings({ heroSubtitle: v })}
              multiline
              className="text-white/75 font-ibm text-lg leading-relaxed mb-10 max-w-xl animate-fade-in-up delay-200 block"
            />
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <button
                onClick={() => navigate("/catalog")}
                className="bg-orange text-white font-oswald font-medium text-sm tracking-[0.15em] px-8 py-4 hover:bg-orange/90 transition-colors flex items-center gap-2"
              >
                <Icon name="LayoutGrid" size={16} />
                СМОТРЕТЬ КАТАЛОГ
              </button>
              <button
                onClick={() => handleNav("contacts")}
                className="border border-white/40 text-white font-oswald font-medium text-sm tracking-[0.15em] px-8 py-4 hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Icon name="FileText" size={16} />
                ЗАПРОС КП
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up delay-400">
              {[
                { val: "20+", label: "лет на рынке" },
                { val: "1200+", label: "позиций в каталоге" },
                { val: "850+", label: "клиентов по РФ" },
                { val: "ISO 9001", label: "система качества" },
              ].map((s) => (
                <div key={s.label} className="border-l border-orange/60 pl-4">
                  <div className="font-oswald text-3xl font-bold text-white">{s.val}</div>
                  <div className="text-white/60 font-ibm text-sm mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-line" />
              <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-navy mb-6 tracking-wide">
                О КОМПАНИИ
              </h2>
              <EditableText
                value={s.aboutText1}
                onSave={(v) => updateSettings({ aboutText1: v })}
                multiline
                className="text-steel font-ibm leading-relaxed mb-5 block"
              />
              <EditableText
                value={s.aboutText2}
                onSave={(v) => updateSettings({ aboutText2: v })}
                multiline
                className="text-steel font-ibm leading-relaxed mb-8 block"
              />
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: "Factory", text: "Собственное производство 12 000 м²" },
                  { icon: "FlaskConical", text: "Аккредитованная лаборатория контроля качества" },
                  { icon: "Truck", text: "Доставка по всей России и СНГ" },
                  { icon: "Headphones", text: "Техническая поддержка 24/7" },
                ].map((f) => (
                  <div key={f.text} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "hsla(215,60%,18%,0.08)" }}
                    >
                      <Icon name={f.icon} fallback="Settings2" size={16} className="text-navy" />
                    </div>
                    <span className="text-sm text-steel font-ibm leading-snug">{f.text}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleNav("contacts")}
                className="border border-navy text-navy font-oswald font-medium text-sm tracking-wider px-6 py-3 hover:bg-navy hover:text-white transition-colors"
              >
                СВЯЗАТЬСЯ С НАМИ
              </button>
            </div>
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/46c7cb3b-5e75-4bb5-b15b-a474014c3285/files/559047e1-160b-4e9a-955e-1f59174dae11.jpg"
                alt="О компании"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-orange text-white p-6 hidden md:block">
                <div className="font-oswald text-4xl font-bold">20+</div>
                <div className="font-ibm text-sm mt-1 text-white/90">лет опыта</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATALOG ===== */}
      <section id="catalog" className="py-24 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="section-line" />
              <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-navy tracking-wide">
                КАТАЛОГ ПРОДУКЦИИ
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-navy text-white font-ibm text-sm px-4 py-2.5 hover:bg-navy/90 transition-colors">
                <Icon name="Download" size={15} />
                Скачать каталог PDF
              </button>
            </div>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCatalogFilter(cat)}
                className={`font-ibm text-sm px-4 py-2 border transition-colors ${
                  catalogFilter === cat
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-steel border-border hover:border-navy hover:text-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="product-card bg-white border border-border group">
                <div className="h-52 overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-ibm font-medium text-orange uppercase tracking-wider">{product.category}</span>
                  <h3 className="font-oswald text-lg font-medium text-navy mt-2 mb-3 leading-snug">{product.name}</h3>
                  <div className="space-y-1 mb-4">
                    {product.specs.map((s) => (
                      <div key={s} className="flex items-center gap-2 text-sm text-steel font-ibm">
                        <div className="w-1.5 h-1.5 bg-orange flex-shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-4 flex flex-col gap-2">
                    {product.docs.map((doc) => (
                      <button
                        key={doc}
                        className="flex items-center gap-2 text-sm font-ibm text-steel hover:text-navy transition-colors group/doc"
                      >
                        <Icon name="FileDown" size={15} className="text-orange" />
                        <span className="group-hover/doc:underline">{doc}</span>
                      </button>
                    ))}
                  </div>
                  <button className="mt-4 w-full border border-navy text-navy font-oswald font-medium text-sm tracking-wider py-2.5 hover:bg-navy hover:text-white transition-colors">
                    ЗАПРОСИТЬ КП
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECH SPECS ===== */}
      <section id="specs" className="py-24 bg-navy">
        <div className="container mx-auto">
          <div className="mb-12">
            <div className="section-line" />
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-white tracking-wide">
              ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ
            </h2>
            <p className="text-white/60 font-ibm mt-3 max-w-xl">
              Общие технические параметры продукции. Для конкретных изделий скачайте технический паспорт из раздела каталога.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-px bg-white/10">
            {TECH_SPECS.map((row, i) => (
              <div
                key={row.param}
                className={`flex items-start justify-between p-5 ${i % 2 === 0 ? "bg-white/5" : "bg-navy"} hover:bg-white/10 transition-colors`}
              >
                <div className="flex items-start gap-3">
                  <Icon name="ChevronRight" size={16} className="text-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-ibm font-medium text-white/90">{row.param}</div>
                    <div className="text-white/45 font-ibm text-xs mt-0.5">{row.note}</div>
                  </div>
                </div>
                <div className="font-oswald text-lg font-medium text-orange text-right ml-4 flex-shrink-0">{row.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-orange text-white font-oswald font-medium text-sm tracking-wider px-6 py-3.5 hover:bg-orange/90 transition-colors">
              <Icon name="Download" size={16} />
              СКАЧАТЬ ПОЛНЫЕ СПЕЦИФИКАЦИИ
            </button>
            <button className="flex items-center gap-2 border border-white/30 text-white font-oswald font-medium text-sm tracking-wider px-6 py-3.5 hover:bg-white/10 transition-colors">
              <Icon name="Mail" size={16} />
              ЗАПРОСИТЬ РАСЧЁТ
            </button>
          </div>
        </div>
      </section>

      {/* ===== CERTIFICATES ===== */}
      <section id="certificates" className="py-24 bg-white">
        <div className="container mx-auto">
          <div className="mb-12">
            <div className="section-line" />
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-navy tracking-wide">
              СЕРТИФИКАТЫ
            </h2>
            <p className="text-steel font-ibm mt-3 max-w-xl">
              Вся продукция сертифицирована в соответствии с требованиями российского законодательства и международных стандартов.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFICATES.map((cert) => (
              <div key={cert.name} className="doc-card border border-border p-6 bg-background hover:bg-white">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                    style={{ background: "hsla(215,60%,18%,0.07)" }}
                  >
                    <Icon name={cert.icon} fallback="Award" size={22} className="text-navy" />
                  </div>
                  <div>
                    <div className="font-ibm font-medium text-navy text-sm leading-snug">{cert.name}</div>
                    <div className="text-xs text-muted-foreground font-ibm mt-1">{cert.number}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-steel font-ibm flex items-center gap-1.5">
                    <Icon name="Calendar" size={12} />
                    {cert.date}
                  </span>
                  <button className="flex items-center gap-1.5 text-orange font-ibm text-sm font-medium hover:text-orange/80 transition-colors">
                    <Icon name="Download" size={14} />
                    Скачать
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* General docs block */}
          <div className="mt-16 bg-background border border-border p-8">
            <h3 className="font-oswald text-2xl font-medium text-navy mb-6 tracking-wide">ОБЩИЕ ДОКУМЕНТЫ</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {DOCS.map((doc) => (
                <div key={doc.name} className="doc-card bg-white border border-border p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-navy flex items-center justify-center flex-shrink-0">
                      <Icon name={doc.icon} fallback="File" size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-ibm font-medium text-navy text-sm">{doc.name}</div>
                      <div className="text-xs text-muted-foreground font-ibm mt-0.5">{doc.type} · {doc.size}</div>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 bg-orange text-white font-ibm text-xs px-3 py-2 hover:bg-orange/90 transition-colors flex-shrink-0">
                    <Icon name="Download" size={13} />
                    Скачать
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWS ===== */}
      <section id="news" className="py-24 bg-background">
        <div className="container mx-auto">
          <div className="mb-12">
            <div className="section-line" />
            <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-navy tracking-wide">
              НОВОСТИ
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {NEWS.map((item) => (
              <article
                key={item.title}
                className="bg-white border border-border group cursor-pointer hover:border-navy transition-colors"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-orange/10 text-orange font-ibm text-xs font-medium px-2.5 py-1 uppercase tracking-wider">
                      {item.tag}
                    </span>
                    <span className="text-muted-foreground font-ibm text-xs">{item.date}</span>
                  </div>
                  <h3 className="font-oswald text-xl font-medium text-navy mb-3 leading-snug group-hover:text-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-steel font-ibm text-sm leading-relaxed">{item.text}</p>
                  <button className="mt-5 flex items-center gap-1.5 text-orange font-ibm text-sm font-medium hover:gap-3 transition-all">
                    Читать далее <Icon name="ArrowRight" size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACTS ===== */}
      <section id="contacts" className="py-24 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="section-line" />
              <h2 className="font-oswald text-4xl md:text-5xl font-semibold text-navy mb-6 tracking-wide">
                КОНТАКТЫ
              </h2>
              <p className="text-steel font-ibm leading-relaxed mb-10">
                Оставьте заявку на коммерческое предложение или задайте технический вопрос — наши специалисты ответят в течение двух рабочих часов.
              </p>

              <div className="space-y-5 mb-10">
                {[
                  { icon: "MapPin", label: "Адрес", val: s.address, key: "address" as const },
                  { icon: "Phone", label: "Телефон", val: s.phone, key: "phone" as const },
                  { icon: "Mail", label: "E-mail", val: s.email, key: "email" as const },
                  { icon: "Clock", label: "Режим работы", val: s.workHours, key: "workHours" as const },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-navy flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} fallback="MapPin" size={17} className="text-white" />
                    </div>
                    <div>
                      <div className="font-ibm text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{c.label}</div>
                      <EditableText
                        value={c.val}
                        onSave={(v) => updateSettings({ [c.key]: v })}
                        className="font-ibm font-medium text-navy block"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-background border border-border p-8">
              <h3 className="font-oswald text-2xl font-medium text-navy mb-6 tracking-wide">ЗАПРОС КОММЕРЧЕСКОГО ПРЕДЛОЖЕНИЯ</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-ibm text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Имя *</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      className="w-full border border-border bg-white px-4 py-3 font-ibm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-ibm text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Организация *</label>
                    <input
                      type="text"
                      placeholder="ООО «Компания»"
                      className="w-full border border-border bg-white px-4 py-3 font-ibm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-ibm text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Телефон *</label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full border border-border bg-white px-4 py-3 font-ibm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-navy transition-colors"
                  />
                </div>
                <div>
                  <label className="font-ibm text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">E-mail</label>
                  <input
                    type="email"
                    placeholder="email@company.ru"
                    className="w-full border border-border bg-white px-4 py-3 font-ibm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-navy transition-colors"
                  />
                </div>
                <div>
                  <label className="font-ibm text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Описание потребности</label>
                  <textarea
                    placeholder="Укажите наименование, количество и необходимые параметры продукции..."
                    rows={4}
                    className="w-full border border-border bg-white px-4 py-3 font-ibm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-navy transition-colors resize-none"
                  />
                </div>
                <button className="w-full bg-orange text-white font-oswald font-medium text-sm tracking-[0.15em] py-4 hover:bg-orange/90 transition-colors flex items-center justify-center gap-2">
                  <Icon name="Send" size={16} />
                  ОТПРАВИТЬ ЗАПРОС
                </button>
                <p className="text-xs text-muted-foreground font-ibm text-center">
                  Нажимая «Отправить», вы соглашаетесь с политикой обработки персональных данных
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-navy text-white py-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange flex items-center justify-center">
                  <Icon name="Settings2" size={16} className="text-white" />
                </div>
                <div className="font-oswald font-bold text-white text-lg tracking-wide">ПРОМТЕХ</div>
              </div>
              <p className="text-white/55 font-ibm text-sm leading-relaxed">
                Производство и поставка промышленного оборудования с 2003 года.
              </p>
            </div>

            {[
              {
                title: "Навигация",
                links: ["Главная", "О компании", "Каталог", "Новости", "Контакты"],
                ids: ["home", "about", "catalog", "news", "contacts"],
              },
              {
                title: "Документация",
                links: ["Каталог продукции", "Технические паспорта", "Сертификаты", "Спецификации"],
                ids: ["catalog", "catalog", "certificates", "specs"],
              },
            ].map((col) => (
              <div key={col.title}>
                <div className="font-oswald font-medium text-sm tracking-wider text-white/90 uppercase mb-4">{col.title}</div>
                <ul className="space-y-2">
                  {col.links.map((link, i) => (
                    <li key={link}>
                      <button
                        onClick={() => handleNav(col.ids[i])}
                        className="text-white/55 font-ibm text-sm hover:text-white transition-colors"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <div className="font-oswald font-medium text-sm tracking-wider text-white/90 uppercase mb-4">Контакты</div>
              <div className="space-y-3 text-white/55 font-ibm text-sm">
                <div>+7 (343) 200-12-34</div>
                <div>info@promtech.ru</div>
                <div>Екатеринбург, ул. Промышленная, 42</div>
              </div>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 font-ibm text-xs">
            <span>© 2026 ООО «ПромТех». Все права защищены.</span>
            <span>ИНН 6670001234 · ОГРН 1036603001234</span>
          </div>
        </div>
      </footer>
    </div>
  );
}