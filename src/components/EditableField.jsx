import { useEffect, useRef, useState } from 'react';

export default function EditableField({
  value = '',
  onChange,
  editable = false,
  as: Tag = 'span',
  className = '',
  multiline = false,
  placeholder = 'Click to edit',
  inputType = 'text',
  showWhenEmpty = false,
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!editing) {
      setDraft(value ?? '');
    }
  }, [value, editing]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select?.();
    }
  }, [editing]);

  function commit() {
    onChange?.(draft);
    setEditing(false);
  }

  function cancel() {
    setDraft(value ?? '');
    setEditing(false);
  }

  const displayValue = value ?? '';

  if (!editable) {
    if (!displayValue && !showWhenEmpty) return null;
    return displayValue ? <Tag className={className}>{displayValue}</Tag> : null;
  }

  if (editing) {
    const sharedProps = {
      ref: inputRef,
      className: `editable-field__input ${className}`.trim(),
      value: draft,
      onChange: (event) => setDraft(event.target.value),
      onBlur: commit,
      onKeyDown: (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          cancel();
        } else if (event.key === 'Enter' && !multiline) {
          event.preventDefault();
          commit();
        }
      },
    };

    if (multiline) {
      return <textarea {...sharedProps} rows={3} />;
    }

    return <input {...sharedProps} type={inputType} />;
  }

  return (
    <Tag
      className={`editable-field${displayValue ? '' : ' editable-field--empty'} ${className}`.trim()}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setEditing(true);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setEditing(true);
        }
      }}
    >
      {displayValue || placeholder}
    </Tag>
  );
}
