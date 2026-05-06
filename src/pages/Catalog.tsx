import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Icon from "@/components/ui/icon";
import { CATEGORIES } from "@/data/catalog";
import { useEditor } from "@/context/EditorContext";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? "#f97316" : "none"} stroke="#f97316" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Catalog() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCatId = searchParams.get("cat") ?? "";
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price_asc" | "price_desc">("default");
  const { getAllProducts, getProductsByCategory, isEditMode } = useEditor();

  const displayProducts = useMemo(() => {
    let list = activeCatId ? getProductsByCategory(activeCatId) : getAllProducts();
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.article.toLowerCase().includes(q));
    }
    if (sortBy === "price_asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [activeCatId, search, sortBy, getAllProducts, getProductsByCategory]);

  const activeCat = CATEGORIES.find((c) => c.id === activeCatId);

  return (
    <div className={`min-h-screen bg-background font-ibm flex flex-col ${isEditMode ? "pb-16" : ""}`}>
      <SiteHeader />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto py-3 flex items-center gap-2 text-sm text-muted-foreground font-ibm">
          <button onClick={() => navigate("/")} className="hover:text-navy transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <button onClick={() => { setSearchParams({}); }} className="hover:text-navy transition-colors">Каталог</button>
          {activeCat && (
            <>
              <Icon name="ChevronRight" size={14} />
              <span className="text-navy font-medium">{activeCat.name}</span>
            </>
          )}
        </div>
      </div>

      <div className="container mx-auto py-10 flex-1">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white border border-border">
              <div className="px-4 py-3 border-b border-border bg-navy">
                <span className="font-oswald text-sm font-medium text-white tracking-wider uppercase">Категории</span>
              </div>
              <ul>
                <li>
                  <button
                    onClick={() => setSearchParams({})}
                    className={`w-full text-left px-4 py-3 font-ibm text-sm flex items-center justify-between border-b border-border/50 transition-colors ${
                      !activeCatId ? "bg-orange/10 text-orange font-medium" : "text-steel hover:bg-muted hover:text-navy"
                    }`}
                  >
                    <span>Все категории</span>
                    <span className="text-xs bg-muted px-1.5 py-0.5">{getAllProducts().length}</span>
                  </button>
                </li>
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSearchParams({ cat: cat.id })}
                      className={`w-full text-left px-4 py-3 font-ibm text-sm flex items-center justify-between border-b border-border/50 transition-colors ${
                        activeCatId === cat.id
                          ? "bg-orange/10 text-orange font-medium"
                          : "text-steel hover:bg-muted hover:text-navy"
                      }`}
                    >
                      <span className="leading-snug pr-2">{cat.name}</span>
                      <span className="text-xs bg-muted px-1.5 py-0.5 flex-shrink-0">{cat.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Download block */}
            <div className="mt-4 bg-navy p-5">
              <div className="font-oswald text-sm font-medium text-white tracking-wider uppercase mb-3">Документация</div>
              <p className="text-white/65 font-ibm text-xs leading-relaxed mb-4">Скачайте полный каталог продукции в формате PDF</p>
              <button className="w-full bg-orange text-white font-ibm text-xs font-medium py-2.5 flex items-center justify-center gap-2 hover:bg-orange/90 transition-colors">
                <Icon name="Download" size={13} />
                Скачать каталог
              </button>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <div className="flex-1">
                <h1 className="font-oswald text-2xl md:text-3xl font-semibold text-navy tracking-wide">
                  {activeCat ? activeCat.name : "Каталог продукции"}
                </h1>
                <p className="text-muted-foreground font-ibm text-sm mt-0.5">
                  {displayProducts.length} {displayProducts.length === 1 ? "позиция" : "позиций"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="border border-border bg-white font-ibm text-sm px-3 py-2 text-steel focus:outline-none focus:border-navy"
                >
                  <option value="default">По умолчанию</option>
                  <option value="price_asc">Цена: по возрастанию</option>
                  <option value="price_desc">Цена: по убыванию</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск по наименованию или артикулу..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-border bg-white pl-9 pr-4 py-2.5 font-ibm text-sm focus:outline-none focus:border-navy transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy">
                  <Icon name="X" size={15} />
                </button>
              )}
            </div>

            {/* Mobile categories */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 mb-4">
              <button
                onClick={() => setSearchParams({})}
                className={`flex-shrink-0 font-ibm text-xs px-3 py-1.5 border transition-colors ${
                  !activeCatId ? "bg-navy text-white border-navy" : "bg-white text-steel border-border"
                }`}
              >
                Все
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSearchParams({ cat: cat.id })}
                  className={`flex-shrink-0 font-ibm text-xs px-3 py-1.5 border transition-colors ${
                    activeCatId === cat.id ? "bg-navy text-white border-navy" : "bg-white text-steel border-border"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Products grid */}
            {displayProducts.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground font-ibm">
                <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-40" />
                <div>Ничего не найдено</div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {displayProducts.map((product) => (
                  <div
                    key={product.id}
                    className="product-card bg-white border border-border group cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {!product.inStock && (
                        <div className="absolute top-2 left-2 bg-steel text-white font-ibm text-xs px-2 py-0.5">
                          Под заказ
                        </div>
                      )}
                      {product.inStock && (
                        <div className="absolute top-2 left-2 bg-green-600 text-white font-ibm text-xs px-2 py-0.5">
                          В наличии
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-orange font-ibm font-medium uppercase tracking-wider mb-1">
                        {CATEGORIES.find((c) => c.id === product.categoryId)?.name}
                      </div>
                      <h3 className="font-oswald text-base font-medium text-navy leading-snug mb-2 group-hover:text-orange transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="text-xs text-muted-foreground font-ibm mb-2">Арт. {product.article}</div>
                      <div className="flex items-center gap-2 mb-3">
                        <StarRating rating={product.rating} />
                        <span className="text-xs text-muted-foreground font-ibm">{product.reviewCount} отзыва</span>
                      </div>
                      <div className="space-y-0.5 mb-3">
                        {product.shortSpecs.slice(1, 3).map((s) => (
                          <div key={s.label} className="text-xs text-steel font-ibm flex gap-1">
                            <span className="text-muted-foreground">{s.label}:</span>
                            <span className="font-medium">{s.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="font-oswald text-xl font-semibold text-navy">
                          {product.price.toLocaleString("ru-RU")} ₽
                        </div>
                        <button
                          className="bg-orange text-white font-ibm text-xs px-3 py-2 hover:bg-orange/90 transition-colors flex items-center gap-1.5"
                          onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                        >
                          <Icon name="Eye" size={13} />
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}