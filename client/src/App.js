import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './components/layout/NavBar';
import TradeLog from './components/trades/TradeLog';
import Dashboard from './components/dashboard/Dashboard';
import Analytics from './components/analytics/Analytics';
import Settings from './components/settings/Settings';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

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
                <TradeLog />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/analytics">
                <Analytics />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
            </Switch>
          </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
