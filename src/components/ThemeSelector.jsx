import { themes } from '../config/themes';

export default function ThemeSelector({ value, onChange }) {
  return (
    <div className="theme-selector" role="radiogroup" aria-label="Color theme">
      {Object.entries(themes).map(([id, theme]) => {
        const isSelected = value === id;

        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={`theme-selector__option ${isSelected ? 'is-selected' : ''}`}
            onClick={() => onChange(id)}
            title={theme.name}
          >
            <span className="theme-selector__swatch">
              <span
                className="theme-selector__sidebar"
                style={{ background: theme.vars['--color-sidebar'] }}
              />
              <span
                className="theme-selector__accent"
                style={{ background: theme.vars['--color-accent'] }}
              />
            </span>
            <span className="theme-selector__name">{theme.name}</span>
          </button>
        );
      })}
    </div>
  );
}
