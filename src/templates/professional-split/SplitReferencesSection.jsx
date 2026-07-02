import EditableField from '../../components/EditableField';
import ContactLink from '../../components/resume/shared/ContactLink';
import { hasReferenceContent } from '../../components/resume/shared/contentHelpers';
import SplitSection from './SplitSection';

export default function SplitReferencesSection({ data, editable, edit }) {
  if (!(data.references || []).some((ref) => editable || hasReferenceContent(ref))) {
    return null;
  }

  return (
    <SplitSection title="References">
      <div className="split-education-list">
        {(data.references || [])
          .map((ref, index) => ({ ref, index }))
          .filter(({ ref }) => editable || hasReferenceContent(ref))
          .map(({ ref, index }) => (
            <article key={`${ref.name}-${index}`} className="split-education split-reference">
              {(editable || ref.name) && (
                <h3 className="split-education__school">
                  <EditableField
                    value={ref.name || ''}
                    onChange={(value) => edit.updateReference(index, { name: value })}
                    editable={editable}
                    placeholder="Name"
                    showWhenEmpty={editable}
                  />
                </h3>
              )}
              {(editable || ref.title) && (
                <p className="split-education__degree">
                  <EditableField
                    value={ref.title || ''}
                    onChange={(value) => edit.updateReference(index, { title: value })}
                    editable={editable}
                    placeholder="Title (optional)"
                    showWhenEmpty={editable}
                  />
                </p>
              )}
              {(editable || ref.company) && (
                <p className="split-education__degree">
                  <EditableField
                    value={ref.company || ''}
                    onChange={(value) => edit.updateReference(index, { company: value })}
                    editable={editable}
                    placeholder="Company (optional)"
                    showWhenEmpty={editable}
                  />
                </p>
              )}
              {(editable || ref.phone) && (
                editable ? (
                  <p className="split-education__degree">
                    <EditableField
                      value={ref.phone || ''}
                      onChange={(value) => edit.updateReference(index, { phone: value })}
                      editable
                      placeholder="Phone (optional)"
                      inputType="tel"
                      showWhenEmpty
                    />
                  </p>
                ) : (
                  <p className="split-education__degree">
                    <ContactLink href={`tel:${ref.phone}`} label={ref.phone} />
                  </p>
                )
              )}
              {(editable || ref.email) && (
                editable ? (
                  <p className="split-education__degree">
                    <EditableField
                      value={ref.email || ''}
                      onChange={(value) => edit.updateReference(index, { email: value })}
                      editable
                      placeholder="Email (optional)"
                      inputType="email"
                      showWhenEmpty
                    />
                  </p>
                ) : (
                  <p className="split-education__degree">
                    <ContactLink href={`mailto:${ref.email}`} label={ref.email} />
                  </p>
                )
              )}
            </article>
          ))}
      </div>
    </SplitSection>
  );
}
