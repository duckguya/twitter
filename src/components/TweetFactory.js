import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { upload } from "utils/upload";

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (tweet === "") {
      return;
    }
    let attachmentUrl = "";
    if (attachment !== "") {
      attachmentUrl = await upload({ uid: userObj.uid, attachment });
    }
    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

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

  const onClearAttachmentClick = () => setAttachment(null);

  return (
    <Form onSubmit={onSubmit}>
      <ContentWrapper>
        <ContentInput
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <ContentSubmit type="submit" value="&rarr;" />
      </ContentWrapper>

      <label for="attach-file">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />

      {attachment && (
        <div>
          <img src={attachment} widt="50px" height="50px" />
          <button onClick={onClearAttachmentClick}>Clear</button>
        </div>
      )}
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  label {
    cursor: pointer;
    color: ${(props) => props.theme.accentColor};
    font-size: 12px;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 20px;
  width: 100%;
`;
const ContentInput = styled.input`
  flex-grow: 1;
  height: 40px;
  padding: 0px 20px;
  color: ${(props) => props.theme.black.darker};
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 20px;
  font-weight: 500;
  font-size: 12px;
  &::placeholder {
    color: white;
    font-style: italic;
  }
`;
const ContentSubmit = styled.input`
  position: absolute;
  right: 0;
  border: none;
  background-color: ${(props) => props.theme.accentColor};
  height: 40px;
  width: 40px;
  padding: 10px 0px;
  text-align: center;
  border-radius: 20px;
  color: white;
  cursor: pointer;
`;

export default TweetFactory;
