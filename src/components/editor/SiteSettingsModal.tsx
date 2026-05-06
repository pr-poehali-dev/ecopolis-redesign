import { useEditor, EditorState } from "@/context/EditorContext";
import Icon from "@/components/ui/icon";

interface Props {
  onClose: () => void;
}

type Settings = EditorState["siteSettings"];

const FIELDS: { key: keyof Settings; label: string; multiline?: boolean }[] = [
  { key: "companyName", label: "Название компании" },
  { key: "phone", label: "Телефон" },
  { key: "email", label: "E-mail" },
  { key: "address", label: "Адрес" },
  { key: "workHours", label: "Режим работы" },
  { key: "inn", label: "ИНН" },
  { key: "ogrn", label: "ОГРН" },
  { key: "heroTagline", label: "Hero — надпись над заголовком" },
  { key: "heroTitle", label: "Hero — заголовок (\\n = новая строка)", multiline: true },
  { key: "heroSubtitle", label: "Hero — подзаголовок", multiline: true },
  { key: "aboutText1", label: "О компании — абзац 1", multiline: true },
  { key: "aboutText2", label: "О компании — абзац 2", multiline: true },
];

export default function SiteSettingsModal({ onClose }: Props) {
  const { state, updateSettings } = useEditor();
  const s = state.siteSettings;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-navy">
          <div className="flex items-center gap-3">
            <Icon name="Settings" size={18} className="text-orange" />
            <span className="font-oswald text-lg font-medium text-white tracking-wider">НАСТРОЙКИ САЙТА</span>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          {FIELDS.map(({ key, label, multiline }) => (
            <div key={key}>
              <label className="font-ibm text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">
                {label}
              </label>
              {multiline ? (
                <textarea
                  value={s[key]}
                  onChange={(e) => updateSettings({ [key]: e.target.value })}
                  rows={3}
                  className="w-full border border-border px-3 py-2 font-ibm text-sm focus:outline-none focus:border-navy transition-colors resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={s[key]}
                  onChange={(e) => updateSettings({ [key]: e.target.value })}
                  className="w-full border border-border px-3 py-2 font-ibm text-sm focus:outline-none focus:border-navy transition-colors"
                />
              )}
            </div>
          ))}
        </div>

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
