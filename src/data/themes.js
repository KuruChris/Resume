export const DEFAULT_THEME_ID = 'gold';

export const themes = {
  gold: {
    name: 'Classic Gold',
    vars: {
      '--color-bg': '#f5f3ef',
      '--color-surface': '#ffffff',
      '--color-sidebar': '#1a1a1d',
      '--color-sidebar-text': '#e8e6e3',
      '--color-sidebar-muted': '#9b9893',
      '--color-accent': '#c4a35a',
      '--color-accent-soft': 'rgba(196, 163, 90, 0.15)',
      '--color-accent-ring': 'rgba(196, 163, 90, 0.2)',
      '--color-text': '#2c2c2e',
      '--color-text-muted': '#6b6b6f',
      '--color-border': '#e5e2dc',
    },
  },
  ocean: {
    name: 'Ocean Blue',
    vars: {
      '--color-bg': '#f0f5f8',
      '--color-surface': '#ffffff',
      '--color-sidebar': '#0c2340',
      '--color-sidebar-text': '#e3edf5',
      '--color-sidebar-muted': '#8fa8bc',
      '--color-accent': '#2a9d8f',
      '--color-accent-soft': 'rgba(42, 157, 143, 0.15)',
      '--color-accent-ring': 'rgba(42, 157, 143, 0.22)',
      '--color-text': '#1c2b36',
      '--color-text-muted': '#5c6f7d',
      '--color-border': '#d8e4ec',
    },
  },
  forest: {
    name: 'Forest Green',
    vars: {
      '--color-bg': '#f2f5f0',
      '--color-surface': '#ffffff',
      '--color-sidebar': '#1a2e1f',
      '--color-sidebar-text': '#e4ebe5',
      '--color-sidebar-muted': '#93a899',
      '--color-accent': '#6b9b5e',
      '--color-accent-soft': 'rgba(107, 155, 94, 0.15)',
      '--color-accent-ring': 'rgba(107, 155, 94, 0.22)',
      '--color-text': '#243028',
      '--color-text-muted': '#5f6f62',
      '--color-border': '#dce5d8',
    },
  },
  berry: {
    name: 'Berry Rose',
    vars: {
      '--color-bg': '#f8f2f4',
      '--color-surface': '#ffffff',
      '--color-sidebar': '#2a1a22',
      '--color-sidebar-text': '#efe6ea',
      '--color-sidebar-muted': '#a8949e',
      '--color-accent': '#c76b8a',
      '--color-accent-soft': 'rgba(199, 107, 138, 0.15)',
      '--color-accent-ring': 'rgba(199, 107, 138, 0.22)',
      '--color-text': '#2e2228',
      '--color-text-muted': '#6f5f66',
      '--color-border': '#eadde3',
    },
  },
  slate: {
    name: 'Modern Slate',
    vars: {
      '--color-bg': '#f3f4f6',
      '--color-surface': '#ffffff',
      '--color-sidebar': '#1e293b',
      '--color-sidebar-text': '#e8edf3',
      '--color-sidebar-muted': '#94a3b8',
      '--color-accent': '#3b82f6',
      '--color-accent-soft': 'rgba(59, 130, 246, 0.15)',
      '--color-accent-ring': 'rgba(59, 130, 246, 0.22)',
      '--color-text': '#1e293b',
      '--color-text-muted': '#64748b',
      '--color-border': '#e2e8f0',
    },
  },
};

export function getThemeStyle(themeId) {
  const theme = themes[themeId] ?? themes[DEFAULT_THEME_ID];
  return theme.vars;
}

export function getThemeBackground(themeId) {
  return getThemeStyle(themeId)['--color-bg'];
}
