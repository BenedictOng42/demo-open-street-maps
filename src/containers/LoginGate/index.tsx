import { useAuthentication } from "../../contexts/AuthenticationContext";
import React, { FC } from "react";
import SignInPage from "../../pages/SignInPage";

const LoginGate: FC = ({ children }) => {
  const [user, userLoading] = useAuthentication();
  if (userLoading) return <div>Loading...</div>;
  if (!user) return <SignInPage />;

  return <> {children} </>;
};

export default LoginGate;
