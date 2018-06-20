import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import Theme from './theme'
import { MuiThemeProvider } from '@material-ui/core/styles';

render(
  <MuiThemeProvider theme={Theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
