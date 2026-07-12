import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  ["/", "Start"],
  ["/szukaj", "Znajdź przepis"],
  ["/produkty", "Produkty"],
  ["/minutnik", "Minutnik"],
];

export function Layout() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="site-frame">
      <header className="site-header">
        <NavLink className="brand" to="/" onClick={close} aria-label="Mobilna Książka Kucharska, strona główna">
          <img className="brand-mark" src="/cookbook-mobile.svg" alt="" aria-hidden="true" />
          <span>Książka<br /><em>Kucharska</em></span>
        </NavLink>
        <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation">
          <span className="sr-only">{open ? "Zamknij menu" : "Otwórz menu"}</span><span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <nav id="main-navigation" className={open ? "main-nav is-open" : "main-nav"} aria-label="Główna nawigacja">
          {links.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"} onClick={close}>{label}</NavLink>)}
        </nav>
      </header>
      <Outlet />
      <footer className="site-footer"><span>Mobilna Książka Kucharska by <a href="https://shellty.pl" target="_blank" rel="noreferrer">Shellty</a></span><span>Gotuj z tym, co masz pod ręką.</span></footer>
    </div>
  );
}
