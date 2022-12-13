/* eslint-disable */
import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ tweetObj, isOwner, userObj }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const onDeleteClick = async (event) => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");

    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.attachmentUrl).delete();
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    toggleEditing();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };

  return (
    <div key={tweetObj.id}>
      {isEditing ? (
        <>
          {isOwner && (
            <>
              <Form onSubmit={onSubmit}>
                <EditInput
                  value={newTweet}
                  required
                  placeholder="Edit your tweet"
                  onChange={onChange}
                />
                <FormUpdateBtn type="submit" value="Update Tweet" />
                <FormCancelBtn
                  type="button"
                  onClick={toggleEditing}
                  value="Cancel"
                />
              </Form>
            </>
          )}
        </>
      ) : (
        <TweetListWrapper>
          {tweetObj.attachmentUrl && <Img src={tweetObj.attachmentUrl} />}
          <Content>{tweetObj.text}</Content>
          <UserImg src={userObj.photoURL} />
          {isOwner && (
            <BtnWrapper>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </BtnWrapper>
          )}
        </TweetListWrapper>
      )}
    </div>
  );
};

const TweetListWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
`;

const Content = styled.div`
  border: 1px solid ${(props) => props.theme.black.darker};
  border-radius: 10px;
  /* background-color: ${(props) => props.theme.white.lighter}; */
  color: ${(props) => props.theme.black.darker};
  padding: 15px;
  margin: 20px 0;
  width: 100%;
`;

const Img = styled.img`
  /* transform-origin: left center; */
  max-width: 50px;
  max-height: 50px;
  position: absolute;
  left: 0;
  top: 19px;
  border-radius: 10px;
`;
const UserImg = styled.img`
  max-width: 50px;
  max-height: 50px;
  position: absolute;
  right: -17px;
  top: 35px;
  border-radius: 50px;
`;
const BtnWrapper = styled.div`
  position: absolute;
  right: 21px;
  top: 36px;
  cursor: pointer;
  span {
    margin-right: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  &:first-child {
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.black.darker};
    color: #363636;
    padding: 10px;
  }
`;
const EditInput = styled.input`
  border: 1px solid #131313;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 5px;
`;
const FormBtn = styled.input`
  border: none;
  border-radius: 20px;
  padding: 5px;
  margin-top: 5px;
  color: ${(props) => props.theme.white.lighter};
  cursor: pointer;
`;
const FormUpdateBtn = styled(FormBtn)`
  background-color: ${(props) => props.theme.accentColor};
`;
const FormCancelBtn = styled(FormBtn)`
  background-color: tomato;
`;
export default Tweet;
