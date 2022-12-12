import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import styled from "styled-components";

export default ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    // navigate("/");
    navigate("/", { replace: true });

    // Router에서 Navigate 대신 useNaviagte를 사용할 수도 있다.
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const getMyTweets = async () => {
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get();

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    // });
  };

  useEffect(() => {
    getMyTweets();
  }, [userObj]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <EditBtn type="submit" value="Edit" />
      </Form>
      <Hr />
      <LogOutBtn onClick={onLogOutClick}>Log Out</LogOutBtn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  border: none;
  border-radius: 30px;
  padding: 15px;
  margin-bottom: 5px;
`;
const EditBtn = styled(Input)`
  background-color: ${(props) => props.theme.lightColor};
  color: ${(props) => props.theme.accentColor};
  padding: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  width: 100%;
  border: 0.5px solid white;
  margin: 20px 0;
`;

const LogOutBtn = styled.button`
  border: none;
  border-radius: 30px;
  background-color: tomato;
  color: ${(props) => props.theme.lightColor};
  padding: 5px;
  cursor: pointer;
`;
