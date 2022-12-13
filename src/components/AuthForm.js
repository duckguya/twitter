import React, { useState } from "react";
import { authService } from "fbase";
import styled from "styled-components";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // preventDefault : a태그나 submit역할을 하는 버튼을 눌러도 창이 새로고침되지 않게 막아준다.
    try {
      let data;
      if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        ></Input>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        ></Input>
        <SubmitBtn
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
        />
        {<ErrorText>{error ? error : ""}</ErrorText>}
      </Form>
      <Toggle onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </Toggle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 30px;
  padding: 15px;
  margin: 10px;
`;

const SubmitBtn = styled(Input)`
  border: 1px solid ${(props) => props.theme.white.lighter};
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.white.lighter};
`;

const Toggle = styled.span`
  padding: 10px;
  color: ${(props) => props.theme.black.darker};
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
`;

const ErrorText = styled.span`
  color: #ff4b4b;
`;
export default AuthForm;
