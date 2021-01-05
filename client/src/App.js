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
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

import { AuthProvider } from './context/auth/AuthState';

function App() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
          <NavBar />
            <Box ml={10} mt={7}>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <PrivateRoute path="/tradelog">
                  <TradeLog />
                </PrivateRoute>
                <PrivateRoute path="/dashboard">
                  <Dashboard />
                </PrivateRoute>
                <PrivateRoute path="/analytics">
                  <Analytics />
                </PrivateRoute>
                <PrivateRoute path="/settings">
                  <Settings />
                </PrivateRoute>
              </Switch>
            </Box>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
