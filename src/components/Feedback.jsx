export function Loading({ label = "Ładowanie danych" }) {
  return <div className="feedback" role="status"><span className="spinner" /><p>{label}…</p></div>;
}

export function ErrorState({ message = "Nie udało się pobrać danych." }) {
  return <div className="feedback feedback-error" role="alert"><span aria-hidden="true">!</span><p>{message}</p></div>;
}
