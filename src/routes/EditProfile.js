import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCamera } from "@fortawesome/free-solid-svg-icons";
import { upload } from "utils/upload";

export default ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  // const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [attachment, setAttachment] = useState("");
  const { register, handleSubmit } = useForm({
    defaultValues: { displayName: userObj.displayName },
  });

  // const onChange = (e) => {
  //   const {
  //     target: { value },
  //   } = e;
  //   setNewDisplayName(value);
  // };

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

  // 사진 미리보기
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // 2
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile); // 1 파일읽기
  };

  const onSubmit = async (data) => {
    // e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      attachmentUrl = await upload({ uid: userObj.uid, attachment });
    }

    // if (userObj.displayName !== newDisplayName) {
    await userObj.updateProfile({
      displayName: data.displayName,
      photoURL: attachmentUrl,
    });
    setAttachment("");
    refreshUser();
    // }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <UserWrapper>
          <PhotoWrapper>
            {userObj.photoURL ? (
              <img
                src={attachment ? attachment : userObj.photoURL}
                widt="50px"
                height="50px"
                style={{
                  // border: "2px solid #04AAFF",
                  borderRadius: "100px",
                  // padding: "10px",
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#000000",
                  opacity: "0.6",
                  overflow: "hidden",
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                color={"#04AAFF"}
                size="4x"
                style={{
                  // border: "1px solid #04AAFF",
                  borderRadius: "100px",
                  padding: "5px",
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#000000",
                  opacity: "0.5",
                  overflow: "hidden",
                }}
              />
            )}
            <label for="attach-file" style={{ position: "absolute" }}>
              <FontAwesomeIcon icon={faCamera} size="2x" color={"white"} />
              <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                  opacity: 0,
                }}
              />
            </label>
          </PhotoWrapper>
          <InfoWrapper>
            <InfoName
              {...register("displayName", { minLength: 2 })}
              placeholder="Display name"
              // onChange={onChange}
              type="text"
              // value={newDisplayName}
              autoFocus
            />
            <InfoEmail>{userObj.email}</InfoEmail>
          </InfoWrapper>
        </UserWrapper>
        <BtnWrapper>
          <Link to="/profile" style={{ width: "100%", textAlign: "left" }}>
            <CancelBtn type="button" value="Cancel" />
          </Link>
          <EditBtn type="submit" value="Edit" />
        </BtnWrapper>
      </Form>
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
const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const PhotoWrapper = styled.div`
  position: relative;
  label {
    left: -86px;
    top: 24px;
    cursor: pointer;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${(props) => props.theme.black.darker};
`;
const InfoName = styled.input`
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 30px;
  padding: 5px;
  margin-bottom: 5px;
  text-align: center;
`;
const InfoEmail = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.black.lighter};
`;

const BtnWrapper = styled.div`
  /* width: 100%; */
  display: flex;
  justify-content: space-between;
`;
const Btn = styled.input`
  border-radius: 30px;
  padding: 5px;
  width: 90%;
  cursor: pointer;
`;
const CancelBtn = styled(Btn)`
  border: 1px solid tomato;
  background-color: white;
  color: tomato;
`;
const EditBtn = styled(Btn)`
  border: none;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.white.lighter};
`;

const Hr = styled.hr`
  width: 100%;
  border: 0.5px solid ${(props) => props.theme.white.darker};
  margin: 20px 0;
`;
