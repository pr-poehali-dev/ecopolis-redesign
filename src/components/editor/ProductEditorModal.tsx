import { useState } from "react";
import { useEditor } from "@/context/EditorContext";
import { CATEGORIES, ProductSpec } from "@/data/catalog";
import Icon from "@/components/ui/icon";

interface Props {
  onClose: () => void;
}

export default function ProductEditorModal({ onClose }: Props) {
  const { state, updateProduct, updateCategory, getAllProducts } = useEditor();
  const [tab, setTab] = useState<"products" | "categories">("products");
  const [selectedCatId, setSelectedCatId] = useState(CATEGORIES[0].id);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const products = getAllProducts().filter((p) => p.categoryId === selectedCatId);
  const selectedProduct = selectedProductId ? state.products[selectedProductId] : null;

  const updateSpec = (idx: number, field: "label" | "value", val: string) => {
    if (!selectedProduct) return;
    const specs = selectedProduct.fullSpecs.map((s, i) =>
      i === idx ? { ...s, [field]: val } : s
    );
    updateProduct(selectedProduct.id, { fullSpecs: specs });
  };

  const addSpec = () => {
    if (!selectedProduct) return;
    updateProduct(selectedProduct.id, {
      fullSpecs: [...selectedProduct.fullSpecs, { label: "Параметр", value: "Значение" }],
    });
  };

  const removeSpec = (idx: number) => {
    if (!selectedProduct) return;
    updateProduct(selectedProduct.id, {
      fullSpecs: selectedProduct.fullSpecs.filter((_, i) => i !== idx),
    });
  };

  const updateDoc = (idx: number, field: "name" | "size", val: string) => {
    if (!selectedProduct) return;
    const docs = selectedProduct.docs.map((d, i) =>
      i === idx ? { ...d, [field]: val } : d
    );
    updateProduct(selectedProduct.id, { docs });
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-navy">
          <div className="flex items-center gap-3">
            <Icon name="Package" size={18} className="text-orange" />
            <span className="font-oswald text-lg font-medium text-white tracking-wider">ТОВАРЫ И КАТЕГОРИИ</span>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {(["products", "categories"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-ibm text-sm font-medium px-6 py-3 border-b-2 transition-colors ${
                tab === t ? "border-orange text-navy" : "border-transparent text-steel hover:text-navy"
              }`}
            >
              {t === "products" ? "Товары" : "Категории"}
            </button>
          ))}
        </div>

        <div className="flex flex-1 overflow-hidden">
          {tab === "products" && (
            <>
              {/* Category sidebar */}
              <div className="w-52 border-r border-border flex-shrink-0 overflow-y-auto bg-background">
                <div className="px-3 py-2 text-xs font-ibm text-muted-foreground uppercase tracking-wider border-b border-border">Категория</div>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCatId(cat.id); setSelectedProductId(null); }}
                    className={`w-full text-left px-3 py-2.5 font-ibm text-xs border-b border-border/40 transition-colors ${
                      selectedCatId === cat.id ? "bg-orange/10 text-orange font-medium" : "text-steel hover:bg-muted hover:text-navy"
                    }`}
                  >
                    {state.categories[cat.id]?.name ?? cat.name}
                  </button>
                ))}
              </div>

              {/* Product list */}
              <div className="w-52 border-r border-border flex-shrink-0 overflow-y-auto">
                <div className="px-3 py-2 text-xs font-ibm text-muted-foreground uppercase tracking-wider border-b border-border">Товар</div>
                {products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProductId(p.id)}
                    className={`w-full text-left px-3 py-2.5 font-ibm text-xs border-b border-border/40 transition-colors leading-snug ${
                      selectedProductId === p.id ? "bg-orange/10 text-orange font-medium" : "text-steel hover:bg-muted hover:text-navy"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              {/* Product editor */}
              <div className="flex-1 overflow-y-auto p-5">
                {!selectedProduct ? (
                  <div className="h-full flex items-center justify-center text-muted-foreground font-ibm text-sm">
                    Выберите товар для редактирования
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div>
                      <label className="font-ibm text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Название</label>
                      <input
                        type="text"
                        value={selectedProduct.name}
                        onChange={(e) => updateProduct(selectedProduct.id, { name: e.target.value })}
                        className="w-full border border-border px-3 py-2 font-ibm text-sm focus:outline-none focus:border-navy"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-ibm text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Артикул</label>
                        <input
                          type="text"
                          value={selectedProduct.article}
                          onChange={(e) => updateProduct(selectedProduct.id, { article: e.target.value })}
                          className="w-full border border-border px-3 py-2 font-ibm text-sm focus:outline-none focus:border-navy"
                        />
                      </div>
                      <div>
                        <label className="font-ibm text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Цена, руб.</label>
                        <input
                          type="number"
                          value={selectedProduct.price}
                          onChange={(e) => updateProduct(selectedProduct.id, { price: Number(e.target.value) })}
                          className="w-full border border-border px-3 py-2 font-ibm text-sm focus:outline-none focus:border-navy"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="font-ibm text-xs text-muted-foreground uppercase tracking-wider">Наличие:</label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedProduct.inStock}
                          onChange={(e) => updateProduct(selectedProduct.id, { inStock: e.target.checked })}
                          className="w-4 h-4 accent-orange"
                        />
                        <span className="font-ibm text-sm text-navy">В наличии</span>
                      </label>
                    </div>

                    <div>
                      <label className="font-ibm text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Описание</label>
                      <textarea
                        value={selectedProduct.description}
                        onChange={(e) => updateProduct(selectedProduct.id, { description: e.target.value })}
                        rows={3}
                        className="w-full border border-border px-3 py-2 font-ibm text-sm focus:outline-none focus:border-navy resize-none"
                      />
                    </div>

                    <div>
                      <label className="font-ibm text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">Текст монтажа</label>
                      <textarea
                        value={selectedProduct.installationText}
                        onChange={(e) => updateProduct(selectedProduct.id, { installationText: e.target.value })}
                        rows={3}
                        className="w-full border border-border px-3 py-2 font-ibm text-sm focus:outline-none focus:border-navy resize-none"
                      />
                    </div>

                    {/* Specs */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-ibm text-xs text-muted-foreground uppercase tracking-wider">Характеристики</label>
                        <button
                          onClick={addSpec}
                          className="flex items-center gap-1 text-orange font-ibm text-xs hover:underline"
                        >
                          <Icon name="Plus" size={12} /> Добавить
                        </button>
                      </div>
                      <div className="space-y-2">
                        {selectedProduct.fullSpecs.map((spec: ProductSpec, idx: number) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={spec.label}
                              onChange={(e) => updateSpec(idx, "label", e.target.value)}
                              placeholder="Параметр"
                              className="flex-1 border border-border px-2 py-1.5 font-ibm text-xs focus:outline-none focus:border-navy"
                            />
                            <input
                              type="text"
                              value={spec.value}
                              onChange={(e) => updateSpec(idx, "value", e.target.value)}
                              placeholder="Значение"
                              className="flex-1 border border-border px-2 py-1.5 font-ibm text-xs focus:outline-none focus:border-navy"
                            />
                            <button
                              onClick={() => removeSpec(idx)}
                              className="text-muted-foreground hover:text-red-500 transition-colors flex-shrink-0"
                            >
                              <Icon name="Trash2" size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Docs */}
                    <div>
                      <label className="font-ibm text-xs text-muted-foreground uppercase tracking-wider block mb-2">Документы</label>
                      <div className="space-y-2">
                        {selectedProduct.docs.map((doc, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={doc.name}
                              onChange={(e) => updateDoc(idx, "name", e.target.value)}
                              placeholder="Название документа"
                              className="flex-1 border border-border px-2 py-1.5 font-ibm text-xs focus:outline-none focus:border-navy"
                            />
                            <input
                              type="text"
                              value={doc.size}
                              onChange={(e) => updateDoc(idx, "size", e.target.value)}
                              placeholder="Размер"
                              className="w-20 border border-border px-2 py-1.5 font-ibm text-xs focus:outline-none focus:border-navy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {tab === "categories" && (
            <div className="flex-1 overflow-y-auto p-5">
              <div className="space-y-3">
                {CATEGORIES.map((cat) => {
                  const edited = state.categories[cat.id];
                  return (
                    <div key={cat.id} className="border border-border p-4 bg-background">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-navy flex items-center justify-center flex-shrink-0">
                          <Icon name={edited?.icon ?? cat.icon} fallback="Box" size={16} className="text-white" />
                        </div>
                        <input
                          type="text"
                          value={edited?.name ?? cat.name}
                          onChange={(e) => updateCategory(cat.id, { name: e.target.value })}
                          className="flex-1 border border-border px-3 py-2 font-ibm text-sm focus:outline-none focus:border-navy"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-border bg-background flex items-center justify-between">
          <span className="font-ibm text-xs text-muted-foreground flex items-center gap-1.5">
            <Icon name="Save" size={12} className="text-green-500" />
            Изменения сохраняются автоматически
          </span>
          <button
            onClick={onClose}
            className="bg-orange text-white font-oswald font-medium text-sm tracking-wider px-5 py-2 hover:bg-orange/90 transition-colors"
          >
            ЗАКРЫТЬ
          </button>
        </div>
      </div>
    </div>
  );
}
