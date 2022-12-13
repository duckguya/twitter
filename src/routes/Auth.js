import React, { useState } from "react";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

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
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <ButtonWrapper>
        <Button onClick={onSocialClick} name="google">
          Continue with
          <FontAwesomeIcon icon={faGoogle} style={{ paddingLeft: "5px" }} />
        </Button>
        <Button onClick={onSocialClick} name="github">
          Continue with
          <FontAwesomeIcon icon={faGithub} style={{ paddingLeft: "5px" }} />
        </Button>
      </ButtonWrapper>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  width: 80%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
  padding-top: 30px;
`;

const Button = styled.button`
  border-radius: 30px;
  width: 40%;
  padding: 5px;
  border: 1px solid ${(props) => props.theme.black.lighter};
  /* background-color: ${(props) => props.theme.accentColor}; */
  color: ${(props) => props.theme.black.darker};
  cursor: pointer;
`;

export default Auth;
