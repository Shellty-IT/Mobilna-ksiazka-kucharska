import { Link } from "react-router-dom";

const highlights = [
  ["01", "Składniki", "Wybierz produkty, które masz w kuchni."],
  ["02", "Dopasowanie", "Zobacz przepisy od najlepiej dopasowanych."],
  ["03", "Gotowanie", "Skorzystaj z instrukcji i minutnika."],
];

export function HomePage() {
  return <main>
    <section className="hero section-wrap">
      <div className="hero-copy">
        <p className="eyebrow">Codzienny pomocnik w kuchni</p>
        <h1>Gotuj smacznie.<br /><i>Bez marnowania.</i></h1>
        <p className="hero-lead">Wpisz składniki, które masz pod ręką, a otrzymasz uporządkowane propozycje dań i jasne instrukcje przygotowania.</p>
        <div className="hero-actions"><Link className="button button-primary" to="/szukaj">Znajdź danie <span>→</span></Link><Link className="button button-quiet" to="/produkty">Sprawdź produkty</Link></div>
      </div>
      <div className="hero-art" aria-hidden="true"><div className="hero-orb orb-one" /><div className="hero-orb orb-two" /><div className="hero-plate">🍲</div><span className="hero-note note-one">mniej odpadów</span><span className="hero-note note-two">więcej pomysłów</span></div>
    </section>
    <section className="highlights section-wrap" aria-label="Jak działa aplikacja">
      {highlights.map(([number, title, text]) => <article className="highlight" key={number}><span>{number}</span><h2>{title}</h2><p>{text}</p></article>)}
    </section>
    <section className="callout section-wrap"><div><p className="eyebrow">Szybki start</p><h2>Nie wiesz, od czego zacząć?</h2><p>Przejdź do wyszukiwarki i zaznacz pierwsze składniki.</p></div><Link className="round-link" to="/szukaj" aria-label="Otwórz wyszukiwarkę">→</Link></section>
  </main>;
}
