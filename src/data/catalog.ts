export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDoc {
  name: string;
  size: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  article: string;
  rating: number;
  reviewCount: number;
  price: number;
  inStock: boolean;
  mainImage: string;
  images: string[];
  shortSpecs: ProductSpec[];
  fullSpecs: ProductSpec[];
  description: string;
  installationText: string;
  docs: ProductDoc[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
}

const IMG_PRODUCT = "https://cdn.poehali.dev/projects/46c7cb3b-5e75-4bb5-b15b-a474014c3285/files/a74c6fd7-a59a-47dd-bc61-dd2af15feee1.jpg";
const IMG_HERO = "https://cdn.poehali.dev/projects/46c7cb3b-5e75-4bb5-b15b-a474014c3285/files/7b1eddcb-5d38-474e-b782-869360aa68d3.jpg";

export const CATEGORIES: Category[] = [
  { id: "cat-1",  name: "Трубопроводная арматура",    slug: "truboprovodnaya-armatura",   icon: "Pipette",     count: 15 },
  { id: "cat-2",  name: "Запорная арматура",           slug: "zapornaya-armatura",         icon: "Lock",        count: 15 },
  { id: "cat-3",  name: "Насосное оборудование",       slug: "nasosnoe-oborudovanie",      icon: "Droplets",    count: 15 },
  { id: "cat-4",  name: "Теплообменники",              slug: "teploobmenniki",             icon: "Flame",       count: 15 },
  { id: "cat-5",  name: "Фланцевые соединения",        slug: "flantsevye-soedineniya",     icon: "CircleDot",   count: 15 },
  { id: "cat-6",  name: "Крепёжные элементы",          slug: "krepezhnye-elementy",        icon: "Wrench",      count: 15 },
  { id: "cat-7",  name: "Трубный прокат",              slug: "trubny-prokat",              icon: "Cylinder",    count: 15 },
  { id: "cat-8",  name: "Фильтры и сепараторы",        slug: "filtry-i-separatory",        icon: "Filter",      count: 15 },
  { id: "cat-9",  name: "Компенсаторы",                slug: "kompensatory",               icon: "ArrowLeftRight", count: 15 },
  { id: "cat-10", name: "Манометры и КИПиА",           slug: "manometry-i-kipia",          icon: "Gauge",       count: 15 },
  { id: "cat-11", name: "Задвижки стальные",           slug: "zadvizki-stalnye",           icon: "SlidersHorizontal", count: 15 },
  { id: "cat-12", name: "Обратные клапаны",            slug: "obratnye-klapany",           icon: "RotateCcw",   count: 15 },
  { id: "cat-13", name: "Регулирующая арматура",       slug: "reguliruyushchaya-armatura", icon: "Settings2",   count: 15 },
  { id: "cat-14", name: "Электроприводы",              slug: "elektroprivody",             icon: "Zap",         count: 15 },
  { id: "cat-15", name: "Монтажный инструмент",        slug: "montazhny-instrument",       icon: "Hammer",      count: 15 },
];

const SERIES: Record<string, string[]> = {
  "cat-1":  ["ПК", "КШ", "КО", "КП", "КДУ", "КРШ", "КМ", "КФ", "КН", "КГ", "КТ", "КВ", "КЭ", "КБ", "КС"],
  "cat-2":  ["ЗШУ", "ЗДШ", "ЗКЛ", "ЗМТ", "ЗМС", "ЗТЭ", "ЗКЛ2", "ЗРД", "ЗТ", "ЗМШ", "ЗП", "ЗБ", "ЗД", "ЗГ", "ЗЭ"],
  "cat-3":  ["НА", "НЦВ", "НД", "НМШ", "НМ", "КМ", "СМ", "ЦНС", "АХ", "Х", "НФ", "НВ", "НСГ", "ГВН", "КПД"],
  "cat-4":  ["ТКГ", "ПТ", "ТПГ", "ВТП", "ТАО", "ТОТ", "ГТ", "РТ", "ТПК", "МТ", "ТВ", "ТЭН", "ТТ", "БТ", "ТГ"],
  "cat-5":  ["Фл", "ФШ", "ФТ", "ФСВ", "ФСД", "ФКШ", "ФМ", "ФВ", "ФС", "ФКМ", "ФА", "ФЭ", "ФР", "ФГ", "ФК"],
  "cat-6":  ["Б", "М", "Ш", "Г", "П", "Н", "Ш", "ШГ", "К", "КМ", "ВТ", "ГМ", "ПШ", "КП", "ГШ"],
  "cat-7":  ["ТС", "ТП", "ТК", "ТЭ", "ТН", "ТВ", "ТТ", "ТБ", "ТМ", "ТЛ", "ТПР", "ТКМ", "ТСН", "ТОМ", "ТЭО"],
  "cat-8":  ["Ф", "ФС", "ФМГ", "СГ", "МС", "ФМ", "ФК", "ФВ", "ФП", "ФКШ", "СЦ", "ФТМ", "ФОГ", "ФМТ", "СФ"],
  "cat-9":  ["КСО", "КНР", "КС", "СДК", "КТ", "МКС", "РКС", "КЭ", "КСФ", "КМО", "КАС", "КОФ", "КМТ", "СТК", "КГС"],
  "cat-10": ["МТ", "МО", "МПС", "ДМ", "МГ", "МА", "МЧ", "МК", "ТМ", "ДТ", "МС", "МТФ", "МВ", "МОД", "МЕ"],
  "cat-11": ["ЗКЛ", "ЗШУ", "ЗМТ", "ЗСП", "ЗДМ", "ЗЭ", "ЗКМ", "ЗТС", "ЗВГ", "ЗМС", "ЗГТ", "ЗПМ", "ЗАТ", "ЗКФ", "ЗСМ"],
  "cat-12": ["КОМ", "КОС", "КОФ", "КОШ", "КОП", "КОБ", "КОГ", "КОЭ", "КОД", "КОН", "КОТ", "КОВ", "КОЛ", "КОА", "КОК"],
  "cat-13": ["РК", "РД", "РН", "РДС", "РДМ", "РКН", "РДФ", "РКМ", "РСТ", "РДТ", "РДНМ", "РВ", "РКФ", "РДГ", "РДЭ"],
  "cat-14": ["ЭПЦ", "ЭПМ", "МЭО", "МЭМ", "АЭО", "ЭПК", "АМЭ", "ЭМК", "ЭПД", "БЭП", "ЭКМ", "ЭПН", "МЭТ", "ЭПС", "ЭПФ"],
  "cat-15": ["КМ", "КТ", "КС", "КР", "МЛ", "КВ", "КШ", "НЗ", "КТМ", "КПМ", "КМС", "КВС", "МНК", "КФМ", "КНС"],
};

const DN_RANGE = ["DN 15", "DN 20", "DN 25", "DN 32", "DN 40", "DN 50", "DN 65", "DN 80", "DN 100", "DN 125", "DN 150", "DN 200", "DN 250", "DN 300", "DN 400"];
const PN_RANGE = ["PN 6", "PN 10", "PN 16", "PN 25", "PN 40", "PN 63", "PN 100", "PN 160", "PN 250", "PN 320", "PN 400", "PN 630", "PN 800", "PN 1000", "PN 1600"];
const MATERIALS = ["Сталь 20", "Сталь 09Г2С", "Нержавеющая 12Х18Н10Т", "Нержавеющая 10Х17Н13М2Т", "Хромомолибденовая 15ХМ", "Жаропрочная 15Х5М", "Двухфазная 08Х22Н6Т", "Углеродистая 20Л", "Легированная 12Х1МФ", "Коррозионностойкая 08Х13", "Жаростойкая 20Х23Н13", "Кислотостойкая 03Х17Н14М3", "Чугун СЧ20", "Чугун ВЧ50", "Бронза БрАЖ9-4"];
const CLIMATES = ["УХЛ1", "УХЛ2", "УХЛ3", "УХЛ4", "ХЛ1", "Т1", "Т2", "О1", "О2", "ОМ1", "ОМ2", "ТВ1", "ТВ2", "У1", "У2"];

function genPrice(catIdx: number, prodIdx: number): number {
  const base = 3000 + catIdx * 1200 + prodIdx * 340;
  return Math.round(base / 10) * 10;
}

function genSpecs(catId: string, idx: number): ProductSpec[] {
  const catNum = parseInt(catId.replace("cat-", "")) - 1;
  return [
    { label: "Артикул", value: `${SERIES[catId]?.[idx] ?? "СТ"}-${catNum + 1}${(idx + 1).toString().padStart(2, "0")}` },
    { label: "Диаметр номинальный", value: DN_RANGE[idx % DN_RANGE.length] },
    { label: "Давление номинальное", value: PN_RANGE[(idx + catNum) % PN_RANGE.length] },
    { label: "Материал корпуса", value: MATERIALS[(idx + catNum) % MATERIALS.length] },
    { label: "Климатическое исполнение", value: CLIMATES[(idx * 2 + catNum) % CLIMATES.length] },
    { label: "Температура рабочей среды", value: `от -${40 + idx * 2}°C до +${200 + catNum * 15}°C` },
  ];
}

function genFullSpecs(catId: string, idx: number): ProductSpec[] {
  const base = genSpecs(catId, idx);
  const catNum = parseInt(catId.replace("cat-", "")) - 1;
  return [
    ...base,
    { label: "Масса, кг", value: `${(8 + idx * 1.3 + catNum * 0.5).toFixed(1)}` },
    { label: "Строительная длина, мм", value: `${180 + idx * 12 + catNum * 5}` },
    { label: "Степень защиты", value: idx % 3 === 0 ? "IP54" : idx % 3 === 1 ? "IP65" : "IP68" },
    { label: "Гарантийный срок", value: "24 месяца" },
    { label: "Наработка до отказа", value: `${50000 + idx * 5000} циклов` },
    { label: "Стандарт изготовления", value: idx % 2 === 0 ? "ГОСТ 9698-86" : "ГОСТ Р 52760-2007" },
    { label: "Вид присоединения", value: idx % 3 === 0 ? "Фланцевое" : idx % 3 === 1 ? "Муфтовое" : "Сварное" },
    { label: "Привод", value: catNum > 12 ? "Электрический 220В/380В" : "Ручной маховик" },
  ];
}

function genDocs(name: string): ProductDoc[] {
  return [
    { name: `Паспорт ${name}`, size: "2.4 МБ" },
    { name: `Руководство по монтажу`, size: "1.8 МБ" },
    { name: `Сертификат соответствия ГОСТ Р`, size: "0.9 МБ" },
    { name: `Декларация о соответствии ТР ЕАЭС`, size: "0.7 МБ" },
  ];
}

function genProducts(): Product[] {
  const products: Product[] = [];

  CATEGORIES.forEach((cat, ci) => {
    const series = SERIES[cat.id] ?? [];
    for (let i = 0; i < 15; i++) {
      const ser = series[i] ?? "СТ";
      const num = `${ci + 1}${(i + 1).toString().padStart(2, "0")}`;
      const name = `${cat.name.split(" ")[0]} ${ser}-${num}`;
      const article = `${ser}-${num}`;
      const specs = genSpecs(cat.id, i);
      products.push({
        id: `prod-${cat.id}-${i + 1}`,
        categoryId: cat.id,
        name,
        article,
        rating: 3.5 + ((i + ci) % 5) * 0.3,
        reviewCount: 2 + ((i * 3 + ci * 7) % 41),
        price: genPrice(ci, i),
        inStock: (i + ci) % 7 !== 0,
        mainImage: IMG_PRODUCT,
        images: [IMG_PRODUCT, IMG_HERO, IMG_PRODUCT, IMG_HERO],
        shortSpecs: specs.slice(0, 4),
        fullSpecs: genFullSpecs(cat.id, i),
        description: `${name} — промышленное изделие серии ${ser}, предназначенное для применения в трубопроводных системах промышленных предприятий нефтегазовой, химической и энергетической отраслей. Изготовлено в соответствии с ГОСТ и требованиями ТР ЕАЭС. Обеспечивает надёжную эксплуатацию при рабочих давлениях до ${specs[2]?.value ?? "PN 40"} и температурах среды ${specs[5]?.value ?? "до +300°C"}. Корпус выполнен из ${specs[3]?.value ?? "стали 20"}. Климатическое исполнение ${specs[4]?.value ?? "УХЛ1"} по ГОСТ 15150-69.`,
        installationText: `Монтаж ${name} производится в соответствии с руководством по эксплуатации. До начала монтажа убедитесь в отсутствии давления в трубопроводе. Изделие устанавливается в любом рабочем положении, если иное не указано в паспорте. Фланцевые соединения затягиваются равномерно в крест-накрест порядке. После монтажа произведите испытание на герметичность давлением 1,5 × Pном. Все сварные швы проверяются методом ВК и УЗК по ГОСТ 14782.`,
        docs: genDocs(name),
      });
    }
  });

  return products;
}

export const PRODUCTS: Product[] = genProducts();

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return PRODUCTS.filter((p) => p.categoryId === categoryId);
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
