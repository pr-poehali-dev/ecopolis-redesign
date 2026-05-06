import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Icon from "@/components/ui/icon";
import EditableText from "@/components/editor/EditableText";
import { useEditor } from "@/context/EditorContext";
import { getCategoryById, getProductsByCategory } from "@/data/catalog";

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill={s <= Math.round(rating) ? "#f97316" : "none"} stroke="#f97316" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

const TABS = ["Описание", "Характеристики", "Монтаж", "Документация", "Фото и видео"];

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct, updateProduct, isEditMode } = useEditor();
  const product = getProduct(id ?? "");

  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("Описание");
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center flex-col gap-4 text-muted-foreground font-ibm">
          <Icon name="PackageX" size={48} className="opacity-40" />
          <div>Товар не найден</div>
          <button onClick={() => navigate("/catalog")} className="text-orange hover:underline text-sm">Вернуться в каталог</button>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const category = getCategoryById(product.categoryId);
  const related = getProductsByCategory(product.categoryId)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const updateSpec = (idx: number, field: "label" | "value", val: string) => {
    const specs = product.fullSpecs.map((s, i) => i === idx ? { ...s, [field]: val } : s);
    updateProduct(product.id, { fullSpecs: specs });
  };

  return (
    <div className={`min-h-screen bg-background font-ibm flex flex-col ${isEditMode ? "pb-16" : ""}`}>
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto py-3 flex items-center gap-2 text-sm text-muted-foreground font-ibm flex-wrap">
          <button onClick={() => navigate("/")} className="hover:text-navy transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <button onClick={() => navigate("/catalog")} className="hover:text-navy transition-colors">Каталог</button>
          {category && (
            <>
              <Icon name="ChevronRight" size={14} />
              <button onClick={() => navigate(`/catalog?cat=${category.id}`)} className="hover:text-navy transition-colors">
                {category.name}
              </button>
            </>
          )}
          <Icon name="ChevronRight" size={14} />
          <span className="text-navy font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto py-8 flex-1">
        {/* Article */}
        <div className="text-xs text-muted-foreground font-ibm mb-2 flex items-center gap-2">
          Артикул:
          <EditableText
            value={product.article}
            onSave={(v) => updateProduct(product.id, { article: v })}
            className="font-medium text-steel text-xs"
          />
        </div>

        {/* Product title */}
        <EditableText
          value={product.name}
          onSave={(v) => updateProduct(product.id, { name: v })}
          className="font-oswald text-2xl md:text-3xl font-semibold text-navy mb-3 tracking-wide leading-snug block"
        />

        {/* Rating row */}
        <div className="flex items-center gap-4 mb-6">
          <StarRating rating={product.rating} />
          <span className="text-sm text-muted-foreground font-ibm">{product.reviewCount} отзыва</span>
          <button className="text-sm text-orange font-ibm hover:underline">В избранное</button>
          <button className="text-sm text-orange font-ibm hover:underline">Сравнить</button>
        </div>

        {/* Top section */}
        <div className="grid lg:grid-cols-[1fr_1.1fr_300px] gap-8 mb-10">
          {/* Gallery */}
          <div>
            <div className="bg-white border border-border mb-3 h-64 flex items-center justify-center overflow-hidden">
              <img src={product.images[activeImg]} alt={product.name} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 border-2 overflow-hidden flex-shrink-0 transition-colors ${activeImg === i ? "border-orange" : "border-border hover:border-steel"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Short specs */}
          <div>
            <div className="bg-white border border-border p-5 mb-4">
              <div className="font-oswald text-sm font-medium text-navy uppercase tracking-wider mb-4">Характеристики</div>
              <div className="space-y-0">
                {product.fullSpecs.slice(0, 8).map((spec, i) => (
                  <div key={i} className={`flex items-baseline gap-2 py-2 ${i < 7 ? "border-b border-border/60" : ""}`}>
                    <EditableText
                      value={spec.label}
                      onSave={(v) => updateSpec(i, "label", v)}
                      className="text-sm text-muted-foreground font-ibm flex-shrink-0 w-36"
                    />
                    <span className="flex-1 border-b border-dotted border-border/80 self-end mb-1 mx-1" />
                    <EditableText
                      value={spec.value}
                      onSave={(v) => updateSpec(i, "value", v)}
                      className="text-sm font-medium text-navy font-ibm text-right"
                    />
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveTab("Характеристики")} className="mt-3 text-orange font-ibm text-sm hover:underline flex items-center gap-1">
                Все характеристики <Icon name="ChevronDown" size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "Factory", text: "Гарантия производителя" },
                { icon: "Truck", text: "Доставка по России и СНГ" },
                { icon: "BadgeCheck", text: "Сертификат качества" },
                { icon: "Headphones", text: "Техподдержка 24/7" },
              ].map((a) => (
                <div key={a.text} className="bg-white border border-border p-3 flex items-start gap-2">
                  <Icon name={a.icon} fallback="Check" size={16} className="text-navy flex-shrink-0 mt-0.5" />
                  <span className="font-ibm text-xs text-steel leading-snug">{a.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order block */}
          <div>
            <div className="bg-white border border-border p-5 sticky top-20">
              <div className={`flex items-center gap-2 mb-4 text-sm font-ibm font-medium ${product.inStock ? "text-green-600" : "text-steel"}`}>
                {isEditMode ? (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={product.inStock}
                      onChange={(e) => updateProduct(product.id, { inStock: e.target.checked })}
                      className="w-3.5 h-3.5 accent-orange"
                    />
                    <span>{product.inStock ? "В наличии" : "Под заказ"}</span>
                  </label>
                ) : (
                  <>
                    <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-steel"}`} />
                    {product.inStock ? "В наличии" : "Под заказ"}
                  </>
                )}
              </div>

              {/* Price */}
              <div className="font-oswald text-3xl font-bold text-navy mb-5 flex items-baseline gap-2">
                {isEditMode ? (
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => updateProduct(product.id, { price: Number(e.target.value) })}
                    className="w-36 border-b-2 border-orange bg-transparent font-oswald text-3xl font-bold text-navy focus:outline-none"
                  />
                ) : (
                  <span>{product.price.toLocaleString("ru-RU")}</span>
                )}
                <span className="text-2xl">руб.</span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center border border-border bg-background">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-10 flex items-center justify-center text-steel hover:text-navy transition-colors">
                    <Icon name="Minus" size={14} />
                  </button>
                  <div className="w-10 text-center font-ibm text-sm font-medium text-navy">{qty}</div>
                  <button onClick={() => setQty(qty + 1)} className="w-9 h-10 flex items-center justify-center text-steel hover:text-navy transition-colors">
                    <Icon name="Plus" size={14} />
                  </button>
                </div>
                <button className="flex-1 bg-orange text-white font-oswald font-medium text-sm tracking-wider py-2.5 hover:bg-orange/90 transition-colors flex items-center justify-center gap-2">
                  <Icon name="ShoppingCart" size={15} />В КОРЗИНУ
                </button>
              </div>
              <button className="w-full border border-navy text-navy font-oswald font-medium text-sm tracking-wider py-2.5 hover:bg-navy hover:text-white transition-colors mb-4">
                БЫСТРЫЙ ЗАКАЗ
              </button>
              <div className="space-y-2 text-xs font-ibm text-muted-foreground border-t border-border pt-4">
                <button className="flex items-center gap-2 hover:text-navy transition-colors w-full"><Icon name="Heart" size={13} className="text-orange" />Хочу скидку</button>
                <button className="flex items-center gap-2 hover:text-navy transition-colors w-full"><Icon name="MessageCircle" size={13} className="text-orange" />Нашли дешевле? Сообщите!</button>
                <button className="flex items-center gap-2 hover:text-navy transition-colors w-full"><Icon name="HelpCircle" size={13} className="text-orange" />Есть вопросы? Пишите!</button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-8">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`font-ibm text-sm font-medium px-5 py-3 border-b-2 transition-colors flex-shrink-0 ${activeTab === tab ? "border-orange text-navy" : "border-transparent text-steel hover:text-navy"}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="mb-12">
          {activeTab === "Описание" && (
            <div className="max-w-3xl">
              <EditableText
                value={product.description}
                onSave={(v) => updateProduct(product.id, { description: v })}
                multiline
                className="font-ibm text-steel leading-relaxed text-sm block"
              />
            </div>
          )}

          {activeTab === "Характеристики" && (
            <div className="max-w-3xl">
              <h2 className="font-oswald text-2xl font-semibold text-navy mb-6 tracking-wide">Характеристики</h2>
              <div className="bg-white border border-border">
                {product.fullSpecs.map((spec, i) => (
                  <div key={i} className={`flex items-baseline gap-4 px-5 py-3 ${i % 2 === 0 ? "bg-background" : "bg-white"} ${i < product.fullSpecs.length - 1 ? "border-b border-border/60" : ""}`}>
                    <EditableText
                      value={spec.label}
                      onSave={(v) => updateSpec(i, "label", v)}
                      className="font-ibm text-sm text-muted-foreground w-60 flex-shrink-0"
                    />
                    <span className="flex-1 border-b border-dotted border-border/70 self-end mb-0.5" />
                    <EditableText
                      value={spec.value}
                      onSave={(v) => updateSpec(i, "value", v)}
                      className="font-ibm text-sm font-medium text-navy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Монтаж" && (
            <div className="max-w-3xl">
              <h2 className="font-oswald text-2xl font-semibold text-navy mb-4 tracking-wide">
                Монтаж {product.name.split(" ")[0].toLowerCase()} под систему
              </h2>
              <EditableText
                value={product.installationText}
                onSave={(v) => updateProduct(product.id, { installationText: v })}
                multiline
                className="font-ibm text-steel leading-relaxed text-sm mb-4 block"
              />
              <div className="bg-background border border-border p-5">
                <p className="font-ibm text-sm text-muted-foreground leading-relaxed">
                  Для получения подробной инструкции по монтажу скачайте руководство по эксплуатации в разделе «Документация» или обратитесь к нашим техническим специалистам.
                </p>
              </div>
            </div>
          )}

          {activeTab === "Документация" && (
            <div className="max-w-2xl">
              <h2 className="font-oswald text-2xl font-semibold text-navy mb-6 tracking-wide">Документация</h2>
              <div className="space-y-3 mb-6">
                {product.docs.map((doc, idx) => (
                  <div key={idx} className="bg-white border border-border p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-oswald text-xs font-bold">PDF</span>
                      </div>
                      <div>
                        <EditableText
                          value={doc.name}
                          onSave={(v) => {
                            const docs = product.docs.map((d, i) => i === idx ? { ...d, name: v } : d);
                            updateProduct(product.id, { docs });
                          }}
                          className="font-ibm font-medium text-navy text-sm block"
                        />
                        <EditableText
                          value={doc.size}
                          onSave={(v) => {
                            const docs = product.docs.map((d, i) => i === idx ? { ...d, size: v } : d);
                            updateProduct(product.id, { docs });
                          }}
                          className="text-xs text-muted-foreground font-ibm mt-0.5 block"
                        />
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 bg-orange text-white font-ibm text-xs px-3 py-2 hover:bg-orange/90 transition-colors flex-shrink-0">
                      <Icon name="Download" size={13} />Скачать
                    </button>
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 border border-navy text-navy font-oswald font-medium text-sm tracking-wider px-5 py-2.5 hover:bg-navy hover:text-white transition-colors">
                <Icon name="FolderDown" size={16} />Скачать всю документацию
              </button>
            </div>
          )}

          {activeTab === "Фото и видео" && (
            <div>
              <h2 className="font-oswald text-2xl font-semibold text-navy mb-6 tracking-wide">Фото и видео</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <div key={i} className="aspect-square overflow-hidden border border-border cursor-pointer hover:border-orange transition-colors" onClick={() => setActiveImg(i)}>
                    <img src={img} alt={`${product.name} фото ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <div className="section-line" />
            <h2 className="font-oswald text-2xl font-semibold text-navy mb-6 tracking-wide">ПОХОЖИЕ ТОВАРЫ</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <div key={p.id} className="product-card bg-white border border-border group cursor-pointer"
                  onClick={() => { navigate(`/product/${p.id}`); window.scrollTo(0, 0); }}>
                  <div className="h-36 overflow-hidden">
                    <img src={p.mainImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-oswald text-sm font-medium text-navy leading-snug mb-1 group-hover:text-orange transition-colors line-clamp-2">{p.name}</h3>
                    <div className="font-oswald text-base font-semibold text-navy mt-2">{p.price.toLocaleString("ru-RU")} ₽</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
