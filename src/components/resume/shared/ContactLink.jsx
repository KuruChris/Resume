export default function ContactLink({ href, label, external, className = '' }) {
  const props = external
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { href };

  return (
    <a className={`contact-link${className ? ` ${className}` : ''}`} {...props}>
      {label}
    </a>
  );
}
