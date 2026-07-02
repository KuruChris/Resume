import EditableField from '../../EditableField';
import ContactLink from '../shared/ContactLink';
import Section from '../shared/Section';
import { hasReferenceContent } from '../shared/contentHelpers';

export default function ReferencesSection({ data, editable, edit }) {
  if (!(data.references || []).some((ref) => editable || hasReferenceContent(ref))) {
    return null;
  }

  return (
    <Section title="References">
      <ul className="reference-list">
        {(data.references || [])
          .map((ref, index) => ({ ref, index }))
          .filter(({ ref }) => editable || hasReferenceContent(ref))
          .map(({ ref, index }) => (
            <li key={`${ref.name}-${index}`} className="reference">
              {(editable || ref.name) && (
                <span className="reference__name">
                  <EditableField
                    value={ref.name || ''}
                    onChange={(value) => edit.updateReference(index, { name: value })}
                    editable={editable}
                    placeholder="Name"
                    showWhenEmpty={editable}
                  />
                </span>
              )}
              {(editable || ref.title) && (
                <span className="reference__title">
                  <EditableField
                    value={ref.title || ''}
                    onChange={(value) => edit.updateReference(index, { title: value })}
                    editable={editable}
                    placeholder="Title (optional)"
                    showWhenEmpty={editable}
                  />
                </span>
              )}
              {(editable || ref.company) && (
                <span className="reference__company">
                  <EditableField
                    value={ref.company || ''}
                    onChange={(value) => edit.updateReference(index, { company: value })}
                    editable={editable}
                    placeholder="Company (optional)"
                    showWhenEmpty={editable}
                  />
                </span>
              )}
              {(editable || ref.phone) && (
                editable ? (
                  <EditableField
                    className="contact-link"
                    value={ref.phone || ''}
                    onChange={(value) => edit.updateReference(index, { phone: value })}
                    editable
                    placeholder="Phone (optional)"
                    inputType="tel"
                    showWhenEmpty
                  />
                ) : (
                  <ContactLink href={`tel:${ref.phone}`} label={ref.phone} />
                )
              )}
              {(editable || ref.email) && (
                editable ? (
                  <EditableField
                    className="contact-link"
                    value={ref.email || ''}
                    onChange={(value) => edit.updateReference(index, { email: value })}
                    editable
                    placeholder="Email (optional)"
                    inputType="email"
                    showWhenEmpty
                  />
                ) : (
                  <ContactLink href={`mailto:${ref.email}`} label={ref.email} />
                )
              )}
            </li>
          ))}
      </ul>
    </Section>
  );
}
