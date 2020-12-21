import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar'
import Home from './views/Home'
import Trades from './views/Trades'
import Calculator from './views/Calculator'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box'

function App() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <Router>

        <NavBar />

          <Box ml={10} mt={7}>
            <Switch>
              <Route exact path="/">
                  <Home />
              </Route>
              <Route path="/trades">
                  <Trades />
              </Route>
              <Route path="/calculator">
                  <Calculator />
              </Route>
            </Switch>
          </Box>
      
      </Router>

    </ThemeProvider>
  );
}

export default App;
