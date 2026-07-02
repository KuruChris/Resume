import themesConfig from './themes.json';

export const DEFAULT_THEME_ID = themesConfig.defaultThemeId;
export const themes = themesConfig.themes;

export function getThemeStyle(themeId) {
  const theme = themes[themeId] ?? themes[DEFAULT_THEME_ID];
  return theme.vars;
}

export function getThemeBackground(themeId) {
  return getThemeStyle(themeId)['--color-bg'];
}

export function isValidThemeId(themeId) {
  return Boolean(themes[themeId]);
}

export function listThemes() {
  return Object.entries(themes).map(([id, theme]) => ({
    id,
    name: theme.name,
    vars: theme.vars,
  }));
}
