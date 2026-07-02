export default function Section({ title, children, className = '' }) {
  return (
    <section className={`section ${className}`}>
      <h2 className="section__title">{title}</h2>
      {children}
    </section>
  );
}
