import React, { FC } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import { FirebaseProvider } from "./contexts/FirebaseContext";
import { AuthenticationProvider } from "./contexts/AuthenticationContext";

import LoginGate from "./containers/LoginGate";
import Header from "./components/Header";

import MapsPage from "./pages/MapsPage";
import EventsPage from "./pages/EventsPage";

import { firebaseConfig, theme } from "./config";

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FirebaseProvider firebaseConfig={firebaseConfig}>
        <AuthenticationProvider>
          <LoginGate>
            <BrowserRouter>
              <div
                style={{ height: "100vh", display: "flex", flexFlow: "column" }}
              >
                <Header />
                <Switch>
                  <Route exact path="/maps/:id?">
                    <MapsPage />
                  </Route>
                  <Route exact path="/events">
                    <EventsPage />
                  </Route>
                  <Route path="/">
                    <Redirect to="/events" />
                  </Route>
                </Switch>
              </div>
            </BrowserRouter>
          </LoginGate>
        </AuthenticationProvider>
      </FirebaseProvider>
    </ThemeProvider>
  );
};

export default App;
