/* eslint-disable */
import React from 'react';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

declare module '@mui/material/styles' {
  interface Palette {
    color1: Palette['primary'],
    color2: Palette['primary'],
    color3: Palette['primary'],
    color4: Palette['primary'],
    color5: Palette['primary'],
    color6: Palette['primary'],
    color7: Palette['primary'],
    color8: Palette['primary'],
    color9: Palette['primary'],
    color10: Palette['primary'],
    color11: Palette['primary'],
    color12: Palette['primary'],
    color13: Palette['primary'],
    color14: Palette['primary'],
    color15: Palette['primary'],
    color16: Palette['primary'],
    color17: Palette['primary'],
    color18: Palette['primary'],
    color19: Palette['primary'],
    color20: Palette['primary'],
    color21: Palette['primary'],
    color22: Palette['primary'],
    color23: Palette['primary'],
    color24: Palette['primary'],
    color25: Palette['primary'],
    color26: Palette['primary'],
    color27: Palette['primary'],
    color28: Palette['primary'],
    color29: Palette['primary'],
    color30: Palette['primary'],
    color31: Palette['primary'],
    color32: Palette['primary'],
    color33: Palette['primary'],
    color34: Palette['primary'],
    color35: Palette['primary'],
    color36: Palette['primary'],
    color37: Palette['primary'],
    
  }
  interface PaletteOptions {
    color1: PaletteOptions['primary'];
    color2: PaletteOptions['primary'];
    color3: PaletteOptions['primary'];
    color4: PaletteOptions['primary'];
    color5: PaletteOptions['primary'];
    color6: PaletteOptions['primary'];
    color7: PaletteOptions['primary'];
    color8: PaletteOptions['primary'];
    color9: PaletteOptions['primary'];
    color10: PaletteOptions['primary'];
    color11: PaletteOptions['primary'];
    color12: PaletteOptions['primary'];
    color13: PaletteOptions['primary'];
    color14: PaletteOptions['primary'];
    color15: PaletteOptions['primary'];
    color16: PaletteOptions['primary'];
    color17: PaletteOptions['primary'];
    color18: PaletteOptions['primary'];
    color19: PaletteOptions['primary'];
    color20: PaletteOptions['primary'];
    color21: PaletteOptions['primary'];
    color22: PaletteOptions['primary'];
    color23: PaletteOptions['primary'];
    color24: PaletteOptions['primary'];
    color25: PaletteOptions['primary'];
    color26: PaletteOptions['primary'];
    color27: PaletteOptions['primary'];
    color28: PaletteOptions['primary'];
    color29: PaletteOptions['primary'];
    color30: PaletteOptions['primary'];
    color31: PaletteOptions['primary'];
    color32: PaletteOptions['primary'];
    color33: PaletteOptions['primary'];
    color34: PaletteOptions['primary'];
    color35: PaletteOptions['primary'];
    color36: PaletteOptions['primary'];
    color37: PaletteOptions['primary'],
  }
}

let baseTheme = createTheme({
  palette: {
    primary: {
      main: '#1D4580',
      dark: '#171717'
    },
    secondary: {
      main: '#FFA326'
    },
    color1: {
        main :'#F4F7FC'
    },
    color2: {
        main :'#171725'
    },
    color3: {
        main :'#FFFFFF'
    },
    color4: {
        main :'#E2E2E2'
    },
    color5: {
        main :'#7E84A3'
    },
    color6: {
        main :'#626469'
    },
    color7: {
        main :'#333070'
    },
    color8: {
        main :'#455A6401'
    },
    color9: {
        main :'#FFC700'
    },
    color10: {
        main :'#D48851'
    },
    color11: {
        main :'#D5D5D5'
    },
    color12: {
        main :'#FF0A00'
    },
    color13: {
        main :'#B6B5BC'
    },
    color14: {
        main :'#5A607F'
    },
    color15: {
        main :'#00000029'
    },
    color16: {
        main :'#FFA326'
    },
    color17: {
        main :'#02BC77'
    },
    color18: {
        main :'#1A5DDD' // shade of blue
    },
    color19: {
        main :'#B6B5BC5A' //grey
    },
    color20: {
        main :'#E6E9F4' // grey
    },
    color21: {
        main :'#000000' //pure black
    },
    color22: {
        main :'#B5B4BB' //grey
    },
    color23: {
        main :'#EBEBEB'
    },
    color24: {
        main :'#707070' // dark grey
    },
    color25: {
        main :'#FAFAFA'
    },
    color26: {
        main :'#646464'
    },
    color27: {
        main :'#F0142F' //red
    },
    color28: {
        main :'#0058FF' // blue
    },
    color29: {
        main :'#131523'
    },
    color30: {
        main :'#E08444'
    },
    color31: {
        main :'#0062FF'
    },
    color32: {
        main :'#707383'
    },
    color33: {
        main :'#D7DBEC'
    },
    color34: {
        main :'#E9E9EF'
    },
    color35: {
        main :'#D7DBEC'
    },
    color36: {
        main :'#E9E9EF'
    },
    color37: {
      main: '#1d4580'
    }
  },
  typography: {
    fontFamily: 'Poppins, Helvetica, "sans-serif"',
    fontSize: 12
  },
  components: {
    
  }
});

baseTheme = responsiveFontSizes(baseTheme);

export const lightTheme = createTheme(
  deepmerge(baseTheme, {
    palette: {
      mode: 'light'
    }
  })
);

export const darkTheme = createTheme(
  deepmerge(baseTheme, {
    palette: {
      mode: 'dark',
      background: {
        paper: '#171717',
        default: '#171717'
      },
      text: {
        primary: baseTheme.palette.grey[400]
      }
    }
  })
);

export interface ThemeContextProps {
  themeMode?: string | undefined;
  toggleThemeMode?: () => void;
}

export const ThemeContext = React.createContext({
  themeMode: 'light',
  toggleThemeMode: () => {}
});

export default { baseTheme };
