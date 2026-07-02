import EditableField from '../../EditableField';
import Section from '../shared/Section';

export default function CertificatesSection({ data, editable, edit }) {
  if (data.certificates.length === 0) return null;

  return (
    <Section title="Certificates">
      <ul className="certificate-list">
        {data.certificates.map((cert, index) => (
          <li key={`${cert.name}-${cert.period}-${index}`} className="certificate">
            <h3 className="certificate__name">
              <EditableField
                value={cert.name}
                onChange={(value) => edit.updateCertificate(index, { name: value })}
                editable={editable}
                placeholder="Certificate name"
              />
            </h3>
            {(editable || cert.note) && (
              <p className="certificate__note">
                <EditableField
                  value={cert.note || ''}
                  onChange={(value) => edit.updateCertificate(index, { note: value })}
                  editable={editable}
                  placeholder="Note (optional)"
                  showWhenEmpty={editable}
                />
              </p>
            )}
            <time className="certificate__period">
              <EditableField
                as="span"
                value={cert.period}
                onChange={(value) => edit.updateCertificate(index, { period: value })}
                editable={editable}
                placeholder="Period"
              />
            </time>
          </li>
        ))}
      </ul>
    </Section>
  );
}
