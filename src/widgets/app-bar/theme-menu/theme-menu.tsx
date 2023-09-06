import { useSnackbar } from 'notistack';
import { useState, useContext } from 'react';
import * as React from 'react';
import { useUpdateEffect } from 'usehooks-ts';

import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';

import { ThemeContext } from '@/app/providers/with-theme';
import { ThemeEnum } from '@/enums/theme.enum';

import { themeOptions } from './theme-menu.options';

export const ThemeMenu = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { changeThemePalette, themePalette } = useContext(ThemeContext);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    value: ThemeEnum,
  ) => {
    changeThemePalette(value);
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useUpdateEffect(() => {
    const labelText = themeOptions.find(({ value }) => value === themePalette)
      ?.label;
    enqueueSnackbar(`Theme changed to ${labelText}`, {
      variant: 'warning',
    });
  }, [enqueueSnackbar, themePalette]);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {themeOptions.map((option) => (
        <MenuItem
          key={option.value}
          selected={option.value === themePalette}
          onClick={(event) => handleMenuItemClick(event, option.value)}
        >
          {option.value === themePalette ? (
            <RadioButtonCheckedIcon
              fontSize="small"
              color="primary"
              style={{ marginRight: '8px' }}
            />
          ) : (
            <RadioButtonUncheckedIcon
              fontSize="small"
              style={{ marginRight: '8px' }}
            />
          )}
          {option.label}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Tooltip title="Select a theme">
        <IconButton
          size="large"
          edge="end"
          aria-label="theme"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <FormatColorFillIcon />
        </IconButton>
      </Tooltip>
      {renderMenu}
    </Box>
  );
};
