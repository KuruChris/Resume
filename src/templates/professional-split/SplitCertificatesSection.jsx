import EditableField from '../../components/EditableField';
import SplitSection from './SplitSection';

export default function SplitCertificatesSection({ data, editable, edit }) {
  if (data.certificates.length === 0) return null;

  return (
    <SplitSection title="Certificates">
      <div className="split-education-list">
        {data.certificates.map((cert, index) => (
          <article key={`${cert.name}-${cert.period}-${index}`} className="split-education">
            <time className="split-education__period">
              <EditableField
                as="span"
                value={cert.period}
                onChange={(value) => edit.updateCertificate(index, { period: value })}
                editable={editable}
                placeholder="Period"
              />
            </time>
            <h3 className="split-education__school">
              <EditableField
                value={cert.name}
                onChange={(value) => edit.updateCertificate(index, { name: value })}
                editable={editable}
                placeholder="Certificate name"
              />
            </h3>
            {(editable || cert.note) && (
              <p className="split-education__degree">
                <EditableField
                  value={cert.note || ''}
                  onChange={(value) => edit.updateCertificate(index, { note: value })}
                  editable={editable}
                  placeholder="Note (optional)"
                  showWhenEmpty={editable}
                />
              </p>
            )}
          </article>
        ))}
      </div>
    </SplitSection>
  );
}
