import React, { useState, useCallback } from "react";
import firebase from "firebase/app";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { useAuth } from "../../contexts/FirebaseContext";

import useStyles from "./styles";

const SignInPage = () => {
  const classes = useStyles();
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const onSignInHandler = useCallback(() => {
    setLoading(true);
    auth?.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }, [auth, setLoading]);

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Typography variant="h6" className={classes.title}>
        Event Planner
      </Typography>
      <Button onClick={onSignInHandler} disabled={loading}>
        Sign in
      </Button>
    </Container>
  );
};

export default SignInPage;
