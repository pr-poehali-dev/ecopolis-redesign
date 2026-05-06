import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function SiteFooter() {
  const navigate = useNavigate();

  return (
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

          <div>
            <div className="font-oswald font-medium text-sm tracking-wider text-white/90 uppercase mb-4">Навигация</div>
            <ul className="space-y-2">
              {[
                { label: "Главная", path: "/" },
                { label: "Каталог продукции", path: "/catalog" },
                { label: "О компании", path: "/#about" },
                { label: "Сертификаты", path: "/#certificates" },
                { label: "Контакты", path: "/#contacts" },
              ].map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => navigate(l.path)}
                    className="text-white/55 font-ibm text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-oswald font-medium text-sm tracking-wider text-white/90 uppercase mb-4">Документация</div>
            <ul className="space-y-2">
              {["Каталог продукции PDF", "Прайс-лист", "Технические паспорта", "Сертификаты качества"].map((l) => (
                <li key={l}>
                  <button className="text-white/55 font-ibm text-sm hover:text-white transition-colors">{l}</button>
                </li>
              ))}
            </ul>
          </div>

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
  );
}
