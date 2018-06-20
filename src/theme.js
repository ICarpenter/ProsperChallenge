import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff8a65',
      light: '#ffbb93',
      dark: '#c75b39',
      contrastText: '#000000',
    },
    secondary: {
      main: '#6b6a6a',
      light: '#999898',
      dark: '#403f3f',
      contrastText: '#ffffff',
    }
  },
});

export default Theme;