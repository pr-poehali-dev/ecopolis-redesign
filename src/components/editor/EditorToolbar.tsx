import { useState } from "react";
import { useEditor } from "@/context/EditorContext";
import Icon from "@/components/ui/icon";
import ProductEditorModal from "./ProductEditorModal";
import SiteSettingsModal from "./SiteSettingsModal";

export default function EditorToolbar() {
  const { isEditMode, setEditMode, hasChanges, resetAll } = useEditor();
  const [showProductModal, setShowProductModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <>
      {/* Floating toggle button (always visible) */}
      {!isEditMode && (
        <button
          onClick={() => setEditMode(true)}
          className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 bg-navy text-white font-oswald font-medium text-sm tracking-wider px-4 py-3 shadow-xl hover:bg-navy/90 transition-all hover:scale-105 active:scale-95"
          title="Включить режим редактирования"
        >
          <Icon name="Pencil" size={16} />
          РЕДАКТОР
        </button>
      )}

      {/* Editor toolbar */}
      {isEditMode && (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-navy border-t-2 border-orange shadow-2xl">
          <div className="container mx-auto flex items-center gap-3 py-3 flex-wrap">
            {/* Mode indicator */}
            <div className="flex items-center gap-2 mr-2">
              <div className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              <span className="font-oswald text-sm font-medium text-white tracking-wider">РЕЖИМ РЕДАКТИРОВАНИЯ</span>
            </div>

            <div className="h-5 w-px bg-white/20 hidden md:block" />

            {/* Hint */}
            <span className="text-white/55 font-ibm text-xs hidden lg:block">
              Двойной клик на любой текст — редактировать
            </span>

            <div className="h-5 w-px bg-white/20 hidden lg:block" />

            {/* Tools */}
            <button
              onClick={() => setShowProductModal(true)}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-ibm text-xs px-3 py-2 transition-colors"
            >
              <Icon name="Package" size={14} />
              Товары и категории
            </button>

            <button
              onClick={() => setShowSettingsModal(true)}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-ibm text-xs px-3 py-2 transition-colors"
            >
              <Icon name="Settings" size={14} />
              Настройки сайта
            </button>

            {hasChanges && (
              <div className="flex items-center gap-1.5 text-orange font-ibm text-xs">
                <Icon name="Save" size={13} />
                Изменения сохранены
              </div>
            )}

            <div className="ml-auto flex items-center gap-2">
              {confirmReset ? (
                <>
                  <span className="text-orange font-ibm text-xs">Сбросить все правки?</span>
                  <button
                    onClick={() => { resetAll(); setConfirmReset(false); }}
                    className="bg-red-600 text-white font-ibm text-xs px-3 py-2 hover:bg-red-700 transition-colors"
                  >
                    Да, сбросить
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="bg-white/10 text-white font-ibm text-xs px-3 py-2 hover:bg-white/20 transition-colors"
                  >
                    Отмена
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setConfirmReset(true)}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-red-600/30 text-white/60 hover:text-white font-ibm text-xs px-3 py-2 transition-colors"
                >
                  <Icon name="RotateCcw" size={13} />
                  Сбросить
                </button>
              )}

              <button
                onClick={() => setEditMode(false)}
                className="flex items-center gap-1.5 bg-orange text-white font-oswald font-medium text-sm tracking-wider px-4 py-2 hover:bg-orange/90 transition-colors"
              >
                <Icon name="Check" size={15} />
                ГОТОВО
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showProductModal && <ProductEditorModal onClose={() => setShowProductModal(false)} />}
      {showSettingsModal && <SiteSettingsModal onClose={() => setShowSettingsModal(false)} />}
    </>
  );
}
