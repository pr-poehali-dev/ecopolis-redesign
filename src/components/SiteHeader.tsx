import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const NAV = [
  { label: "Главная", path: "/" },
  { label: "Каталог", path: "/catalog" },
  { label: "О компании", path: "/#about" },
  { label: "Сертификаты", path: "/#certificates" },
  { label: "Контакты", path: "/#contacts" },
];

export default function SiteHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (path: string) => {
    setMobileOpen(false);
    if (path.startsWith("/#")) {
      navigate("/");
      setTimeout(() => {
        const id = path.replace("/#", "");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <div className="bg-navy text-white text-sm py-2 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-6 text-white/70">
            <span className="flex items-center gap-1.5"><Icon name="MapPin" size={13} />г. Екатеринбург, ул. Промышленная, 42</span>
            <span className="flex items-center gap-1.5"><Icon name="Clock" size={13} />Пн–Пт: 8:00–18:00</span>
          </div>
          <div className="flex gap-6 text-white/70">
            <a href="tel:+73432001234" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Icon name="Phone" size={13} />+7 (343) 200-12-34
            </a>
            <a href="mailto:info@promtech.ru" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Icon name="Mail" size={13} />info@promtech.ru
            </a>
          </div>
        </div>
      </div>

      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-9 h-9 bg-navy flex items-center justify-center">
              <Icon name="Settings2" size={18} className="text-white" />
            </div>
            <div>
              <div className="font-oswald font-bold text-navy text-lg leading-tight tracking-wide">ПРОМТЕХ</div>
              <div className="text-xs text-muted-foreground leading-tight font-ibm">Промышленное оборудование</div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => {
              const isActive = item.path === "/catalog"
                ? location.pathname === "/catalog"
                : location.pathname === "/" && item.path === "/";
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`nav-link text-sm font-ibm font-medium tracking-wide pb-0.5 transition-colors ${
                    isActive ? "text-navy active" : "text-steel hover:text-navy"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNav("/#contacts")}
              className="bg-orange text-white font-oswald font-medium text-sm tracking-wider px-5 py-2.5 hover:bg-orange/90 transition-colors"
            >
              ЗАПРОС КП
            </button>
          </div>

          <button className="lg:hidden p-2 text-navy" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-border">
            <div className="container mx-auto py-4 flex flex-col gap-1">
              {NAV.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className="text-left px-3 py-2.5 font-ibm text-sm font-medium text-steel hover:text-navy hover:bg-muted transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("/#contacts")}
                className="mt-2 bg-orange text-white font-oswald font-medium text-sm tracking-wider px-5 py-3 hover:bg-orange/90 transition-colors"
              >
                ЗАПРОС КП
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
