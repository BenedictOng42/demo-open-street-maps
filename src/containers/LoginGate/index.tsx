import React, { FC } from "react";

import LinearProgress from "@material-ui/core/LinearProgress";

import { useAuthentication } from "../../contexts/AuthenticationContext";

import SignInPage from "../../pages/SignInPage";

const LoginGate: FC = ({ children }) => {
  const [user, userLoading] = useAuthentication();
  if (userLoading) return <LinearProgress />;
  if (!user) return <SignInPage />;
  return <> {children} </>;
};

export default LoginGate;
