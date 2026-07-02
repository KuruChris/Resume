export default function SplitSection({ title, children, className = '' }) {
  const initial = title.trim().charAt(0).toUpperCase() || '?';

  return (
    <section className={`section section--split ${className}`.trim()}>
      <h2 className="section__title section__title--split">
        <span className="section__title-mark" aria-hidden="true">{initial}</span>
        <span className="section__title-text">{title}</span>
      </h2>
      {children}
    </section>
  );
}
