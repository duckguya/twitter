import React, { useState } from "react";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";
import styled from "styled-components";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
  };

  return (
    <Container>
      <AuthForm />
      <ButtonWrapper>
        <Button onClick={onSocialClick} name="google">
          Continue with Google
        </Button>
        <Button onClick={onSocialClick} name="github">
          Continue with GitHub
        </Button>
      </ButtonWrapper>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
`;

const Button = styled.button`
  border-radius: 30px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.lightColor};
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.lightColor};
`;

export default Auth;
