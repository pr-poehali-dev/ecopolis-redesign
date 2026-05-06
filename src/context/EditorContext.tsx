import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { PRODUCTS, CATEGORIES, Product, Category } from "@/data/catalog";

export interface EditorState {
  products: Record<string, Product>;
  categories: Record<string, Category>;
  siteSettings: {
    companyName: string;
    phone: string;
    email: string;
    address: string;
    workHours: string;
    inn: string;
    ogrn: string;
    heroTitle: string;
    heroSubtitle: string;
    heroTagline: string;
    aboutText1: string;
    aboutText2: string;
  };
}

const DEFAULT_SETTINGS: EditorState["siteSettings"] = {
  companyName: "ПРОМТЕХ",
  phone: "+7 (343) 200-12-34",
  email: "info@promtech.ru",
  address: "г. Екатеринбург, ул. Промышленная, 42",
  workHours: "Пн–Пт: 8:00–18:00",
  inn: "6670001234",
  ogrn: "1036603001234",
  heroTitle: "НАДЁЖНОСТЬ\nПРОВЕРЕНА\nПРОИЗВОДСТВОМ",
  heroSubtitle: "Производство и поставка трубопроводной арматуры, насосного и теплообменного оборудования. Полная техническая документация. Работаем с 2003 года.",
  heroTagline: "Промышленное оборудование",
  aboutText1: "ООО «ПромТех» — российский производитель промышленного оборудования с полным циклом производства. Основана в 2003 году, штаб-квартира в Екатеринбурге.",
  aboutText2: "Выпускаем трубопроводную арматуру, насосное и теплообменное оборудование для нефтегазовой, металлургической, химической и энергетической промышленности. Производственная мощность — свыше 50 000 единиц продукции в год.",
};

function buildInitialState(): EditorState {
  const products: Record<string, Product> = {};
  PRODUCTS.forEach((p) => { products[p.id] = { ...p }; });
  const categories: Record<string, Category> = {};
  CATEGORIES.forEach((c) => { categories[c.id] = { ...c }; });
  return { products, categories, siteSettings: { ...DEFAULT_SETTINGS } };
}

const STORAGE_KEY = "promtech_editor_v1";

function loadFromStorage(): EditorState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return buildInitialState();
    const saved = JSON.parse(raw) as Partial<EditorState>;
    const initial = buildInitialState();
    return {
      products: { ...initial.products, ...(saved.products ?? {}) },
      categories: { ...initial.categories, ...(saved.categories ?? {}) },
      siteSettings: { ...initial.siteSettings, ...(saved.siteSettings ?? {}) },
    };
  } catch {
    return buildInitialState();
  }
}

interface EditorContextValue {
  isEditMode: boolean;
  setEditMode: (v: boolean) => void;
  state: EditorState;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  updateCategory: (id: string, patch: Partial<Category>) => void;
  updateSettings: (patch: Partial<EditorState["siteSettings"]>) => void;
  resetAll: () => void;
  hasChanges: boolean;
  getProduct: (id: string) => Product | undefined;
  getCategory: (id: string) => Category | undefined;
  getAllProducts: () => Product[];
  getProductsByCategory: (catId: string) => Product[];
}

const EditorContext = createContext<EditorContextValue | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [state, setState] = useState<EditorState>(loadFromStorage);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (hasChanges) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, hasChanges]);

  const updateProduct = useCallback((id: string, patch: Partial<Product>) => {
    setState((prev) => ({
      ...prev,
      products: { ...prev.products, [id]: { ...prev.products[id], ...patch } },
    }));
    setHasChanges(true);
  }, []);

  const updateCategory = useCallback((id: string, patch: Partial<Category>) => {
    setState((prev) => ({
      ...prev,
      categories: { ...prev.categories, [id]: { ...prev.categories[id], ...patch } },
    }));
    setHasChanges(true);
  }, []);

  const updateSettings = useCallback((patch: Partial<EditorState["siteSettings"]>) => {
    setState((prev) => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, ...patch },
    }));
    setHasChanges(true);
  }, []);

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(buildInitialState());
    setHasChanges(false);
  }, []);

  const getProduct = useCallback((id: string) => state.products[id], [state]);
  const getCategory = useCallback((id: string) => state.categories[id], [state]);
  const getAllProducts = useCallback(() => Object.values(state.products), [state]);
  const getProductsByCategory = useCallback(
    (catId: string) => Object.values(state.products).filter((p) => p.categoryId === catId),
    [state]
  );

  const setEditMode = useCallback((v: boolean) => setIsEditMode(v), []);

  return (
    <EditorContext.Provider value={{
      isEditMode, setEditMode, state,
      updateProduct, updateCategory, updateSettings, resetAll,
      hasChanges, getProduct, getCategory, getAllProducts, getProductsByCategory,
    }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used inside EditorProvider");
  return ctx;
}
