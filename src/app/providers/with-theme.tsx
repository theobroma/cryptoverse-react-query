import React, { createContext, PropsWithChildren } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { ThemeEnum } from '@/enums/theme.enum';

import {
  LIGHT_THEME,
  DARK_THEME,
  DEEP_PURPLE_AMBER_THEME,
  PINK_BLUE_GREY_THEME,
} from './theme/theme';

const themeMap = {
  [ThemeEnum.Light]: LIGHT_THEME,
  [ThemeEnum.Dark]: DARK_THEME,
  [ThemeEnum.DeepPurpleAmber]: DEEP_PURPLE_AMBER_THEME,
  [ThemeEnum.PinkBlueGreyTheme]: PINK_BLUE_GREY_THEME,
};

export const ThemeContext = createContext({
  themePalette: ThemeEnum.Light,
  changeThemePalette: (palette: ThemeEnum) => {},
});

const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const [themePalette, setThemePalette] = React.useState<ThemeEnum>(
    ThemeEnum.DeepPurpleAmber,
  );

  const currentThemePalette = React.useMemo(
    () => ({
      themePalette,
      changeThemePalette: (palette: ThemeEnum) => {
        setThemePalette(palette);
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () => createTheme(themeMap[themePalette]),
    [themePalette],
  );

  return (
    <ThemeContext.Provider value={currentThemePalette}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const withTheme = (component: () => React.ReactNode) => () => (
  <AppThemeProvider>{component()}</AppThemeProvider>
);
