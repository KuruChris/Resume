import EditableField from '../../components/EditableField';
import ContactLink from '../../components/resume/shared/ContactLink';
import { coreContactFields, getContactLinkLabel } from '../../components/resume/shared/contactHelpers';
import SplitSection from './SplitSection';

const coreContactIcons = {
  phone: '☎',
  email: '✉',
  location: '⌖',
};

function renderCoreContactValue({ field, value }) {
  if (field === 'email') {
    return <ContactLink href={`mailto:${value}`} label={value} />;
  }

  if (field === 'phone') {
    return <ContactLink href={`tel:${value}`} label={value} />;
  }

  return <span>{value}</span>;
}

function SplitContactLinkItem({ link, index, editable, edit }) {
  if (editable) {
    return (
      <li className="split-contact-list__item split-contact-list__item--link">
        <span className="split-contact-list__icon" aria-hidden="true">◉</span>
        <div className="split-contact-list__link-fields">
          <EditableField
            value={link.label || ''}
            onChange={(value) => edit.updateContactLink(index, { label: value })}
            editable
            placeholder="Label (e.g. LinkedIn)"
            showWhenEmpty
          />
          <EditableField
            value={link.url || ''}
            onChange={(value) => edit.updateContactLink(index, { url: value })}
            editable
            placeholder="URL"
            inputType="url"
            showWhenEmpty
          />
        </div>
      </li>
    );
  }

  if (!link.url?.trim()) return null;

  return (
    <li className="split-contact-list__item">
      <span className="split-contact-list__icon" aria-hidden="true">◉</span>
      <span className="split-contact-list__value">
        <ContactLink
          href={link.url.trim()}
          label={getContactLinkLabel(link)}
          external
        />
      </span>
    </li>
  );
}

export default function SplitContactList({ contact, editable, edit }) {
  const links = contact.links || [];
  const coreItems = coreContactFields.map(({ field, placeholder, inputType }) => ({
    field,
    label: placeholder,
    icon: coreContactIcons[field],
    inputType,
  }));

  if (editable) {
    return (
      <SplitSection title="Contact">
        <ul className="split-contact-list">
          {coreItems.map(({ field, label, icon, inputType }) => (
            <li key={field} className="split-contact-list__item">
              <span className="split-contact-list__icon" aria-hidden="true">{icon}</span>
              <EditableField
                value={contact[field] || ''}
                onChange={(value) => edit.setContact(field, value)}
                editable
                placeholder={label}
                inputType={inputType}
                showWhenEmpty
              />
            </li>
          ))}
          {links.map((link, index) => (
            <SplitContactLinkItem
              key={index}
              link={link}
              index={index}
              editable
              edit={edit}
            />
          ))}
          <li className="split-contact-list__item split-contact-list__item--add">
            <button
              type="button"
              className="split-contact-list__add"
              onClick={() => edit.addContactLink()}
            >
              + Add link
            </button>
          </li>
        </ul>
      </SplitSection>
    );
  }

  const visibleCoreItems = coreItems.filter(({ field }) => contact[field]);
  const visibleLinks = links.filter((link) => link.url?.trim());

  if (visibleCoreItems.length === 0 && visibleLinks.length === 0) {
    return null;
  }

  return (
    <SplitSection title="Contact">
      <ul className="split-contact-list">
        {visibleCoreItems.map(({ field, icon }) => (
          <li key={field} className="split-contact-list__item">
            <span className="split-contact-list__icon" aria-hidden="true">{icon}</span>
            <span className="split-contact-list__value">
              {renderCoreContactValue({ field, value: contact[field] })}
            </span>
          </li>
        ))}
        {visibleLinks.map((link, index) => (
          <SplitContactLinkItem
            key={`${link.url}-${index}`}
            link={link}
            index={index}
          />
        ))}
      </ul>
    </SplitSection>
  );
}
