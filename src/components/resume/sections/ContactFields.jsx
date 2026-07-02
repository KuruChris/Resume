import EditableField from '../../EditableField';
import ContactLink from '../shared/ContactLink';
import ContactSocialLinks from '../shared/ContactSocialLinks';
import { coreContactFields } from '../shared/contactHelpers';

function renderContactValue({ field, value }) {
  if (field === 'email') {
    return <ContactLink href={`mailto:${value}`} label={value} />;
  }

  if (field === 'phone') {
    return <ContactLink href={`tel:${value}`} label={value} />;
  }

  return <span className="contact-link">{value}</span>;
}

export default function ContactFields({
  contact,
  editable,
  edit,
  variant = 'sidebar',
}) {
  const isInline = variant === 'inline';
  const className = isInline ? 'minimal-contact' : 'sidebar__contact';
  const links = contact.links || [];

  if (editable) {
    const editableClassName = isInline
      ? 'minimal-contact minimal-contact--editable'
      : className;

    return (
      <nav className={editableClassName} aria-label="Contact information">
        {coreContactFields.map(({ field, placeholder, inputType }) => (
          <EditableField
            key={field}
            className={`contact-link${isInline ? ' minimal-contact__pill' : ''}`}
            value={contact[field] || ''}
            onChange={(value) => edit.setContact(field, value)}
            editable
            placeholder={placeholder}
            inputType={inputType}
            showWhenEmpty
          />
        ))}
        <ContactSocialLinks
          links={links}
          editable
          edit={edit}
          variant={variant}
        />
      </nav>
    );
  }

  const visibleCoreItems = coreContactFields.filter(({ field }) => contact[field]);
  const visibleSocialLinks = links.filter((link) => link.url?.trim());

  if (visibleCoreItems.length === 0 && visibleSocialLinks.length === 0) {
    return null;
  }

  if (isInline) {
    return (
      <nav className={className} aria-label="Contact information">
        {visibleCoreItems.map(({ field }) => (
          <span key={field} className="minimal-contact__pill">
            {renderContactValue({ field, value: contact[field] })}
          </span>
        ))}
        <ContactSocialLinks links={links} variant={variant} />
      </nav>
    );
  }

  return (
    <nav className={className} aria-label="Contact information">
      {visibleCoreItems.map(({ field }) => (
        <span key={field}>
          {renderContactValue({ field, value: contact[field] })}
        </span>
      ))}
      <ContactSocialLinks links={links} variant={variant} />
    </nav>
  );
}
