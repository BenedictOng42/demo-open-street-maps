import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import { FirebaseProvider } from "./contexts/FirebaseContext";
import { AuthenticationProvider } from "./contexts/AuthenticationContext";

import MapsPage from "./pages/MapsPage";
import EventsPage from "./pages/EventsPage";
import LoginGate from "./containers/LoginGate";

import { firebaseConfig, theme } from "./config";
import Header from "./components/Header";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FirebaseProvider firebaseConfig={firebaseConfig}>
        <AuthenticationProvider>
          <LoginGate>
            <BrowserRouter>
              <Header />
              <Switch>
                <Route exact path="/maps">
                  <MapsPage />
                </Route>
                <Route exact path="/events">
                  <EventsPage />
                </Route>
                <Route path="/">
                  <Redirect to="/events" />
                </Route>
              </Switch>
            </BrowserRouter>
          </LoginGate>
        </AuthenticationProvider>
      </FirebaseProvider>
    </ThemeProvider>
  );
};

export default App;
