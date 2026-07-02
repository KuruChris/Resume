import EditableField from '../../EditableField';
import ContactLink from './ContactLink';
import { getContactLinkLabel, getVisibleContactLinks } from './contactHelpers';

function SocialLinkDisplay({ link, className = '' }) {
  const label = getContactLinkLabel(link);

  return (
    <ContactLink
      href={link.url.trim()}
      label={label}
      external
      className={className}
    />
  );
}

export default function ContactSocialLinks({
  links = [],
  editable = false,
  edit,
  variant = 'sidebar',
}) {
  const isInline = variant === 'inline';
  const visibleLinks = getVisibleContactLinks(links);

  if (!editable && visibleLinks.length === 0) {
    return null;
  }

  if (!editable) {
    if (isInline) {
      return visibleLinks.map((link, index) => (
        <span key={`${link.url}-${index}`} className="minimal-contact__pill">
          <SocialLinkDisplay link={link} />
        </span>
      ));
    }

    return visibleLinks.map((link, index) => (
      <span key={`${link.url}-${index}`}>
        <SocialLinkDisplay link={link} />
      </span>
    ));
  }

  const linkClassName = isInline
    ? 'minimal-contact__pill minimal-contact__pill--social'
    : 'contact-social-link';

  return (
    <>
      {(links || []).map((link, index) => (
        <div key={index} className={linkClassName}>
          <EditableField
            className={isInline ? '' : 'contact-link'}
            value={link.label || ''}
            onChange={(value) => edit.updateContactLink(index, { label: value })}
            editable
            placeholder="Label (e.g. LinkedIn)"
            showWhenEmpty
          />
          <EditableField
            className={isInline ? '' : 'contact-link'}
            value={link.url || ''}
            onChange={(value) => edit.updateContactLink(index, { url: value })}
            editable
            placeholder="URL"
            inputType="url"
            showWhenEmpty
          />
        </div>
      ))}
      <button
        type="button"
        className={`contact-social-link__add${isInline ? ' minimal-contact__pill minimal-contact__pill--add' : ''}`}
        onClick={() => edit.addContactLink()}
      >
        + Add link
      </button>
    </>
  );
}
