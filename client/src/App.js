import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './components/layout/NavBar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TradeLog from './components/trades/TradeLog';
import Dashboard from './components/dashboard/Dashboard';
import Analytics from './components/analytics/Analytics';
import Settings from './components/settings/Settings';
import PrivateRoute from './components/routing/PrivateRoute';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors'
import '@fontsource/roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

import { AuthProvider } from './context/auth/AuthState';
import { TradeProvider } from './context/trade/TradeState';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: indigo[800]
    }
  },
});

function App() {

  return (
    <AuthProvider>
      <TradeProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Router>
            <NavBar />
              <Box ml={10} mt={7}>
                <Switch>
                  <PrivateRoute exact path="/" component={TradeLog} />
                  <Route exact path="/login">
                    <Login />
                  </Route>
                  <Route exact path="/register">
                    <Register />
                  </Route>
                  <PrivateRoute exact path="/tradelog" component={TradeLog} />
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute exact path="/analytics" component={Analytics} />
                  <PrivateRoute exact path="/settings" component={Settings} />
                </Switch>
              </Box>
          </Router>
        </ThemeProvider>
      </TradeProvider>
    </AuthProvider>
  );
};

export default App;
