import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useNavigate, Link } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newPhotoUrl, setNewPhotoUrl] = useState(userObj.PhotoUrl || "");
  const { register, handleSubmit, setValue } = useForm();

  const onLogOutClick = () => {
    authService.signOut();
    // navigate("/");
    navigate("/", { replace: true });

    // Router에서 Navigate 대신 useNaviagte를 사용할 수도 있다.
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

  return (
    <Container>
      <UserWrapper>
        {userObj.photoURL ? (
          <img
            src={userObj.photoURL}
            widt="50px"
            height="50px"
            style={{
              border: "2px solid #04AAFF",
              borderRadius: "100px",
              // padding: "10px",
              width: "80px",
              height: "80px",
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            color={"#04AAFF"}
            size="4x"
            style={{
              border: "1px solid #04AAFF",
              borderRadius: "100px",
              padding: "10px",
              width: "80px",
              height: "80px",
            }}
          />
        )}

        <InfoWrapper>
          <InfoName>{userObj.displayName}</InfoName>
          <InfoEmail>{userObj.email}</InfoEmail>
        </InfoWrapper>
        <Link to="/editProfile" style={{ marginRight: 10 }}>
          <EditBtn>
            <span>Edit</span>
          </EditBtn>
        </Link>
      </UserWrapper>
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
const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
// const Circle = styled.div`
//   position: relative;
//   width: 100px;
//   height: 100px;
//   border: 1px solid ${(props) => props.theme.accentColor};
//   border-radius: 50px;
//   padding: 30px;
// `;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${(props) => props.theme.black.darker};
`;
const InfoName = styled.div`
  font-size: 18px;
`;
const InfoEmail = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.black.lighter};
`;
const EditBtn = styled.div`
  border: 1px solid ${(props) => props.theme.black.daker};
  /* background-color: ${(props) => props.theme.accentColor}; */
  border-radius: 5px;
  /* height: 20px; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 5px;
  cursor: pointer;
  span {
    color: ${(props) => props.theme.black.daker};
    font-size: 15px;
  }
`;

const Hr = styled.hr`
  width: 100%;
  border: 0.5px solid ${(props) => props.theme.white.darker};
  margin: 20px 0;
`;

const LogOutBtn = styled.button`
  border: none;
  border-radius: 30px;
  background-color: tomato;
  color: ${(props) => props.theme.white.lighter};
  padding: 5px;
  cursor: pointer;
`;
