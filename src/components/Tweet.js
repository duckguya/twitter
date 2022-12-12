/* eslint-disable */
import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import styled from "styled-components";

const Tweet = ({ tweetObj, isOwner }) => {
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
          <Content>{tweetObj.text}</Content>
          {tweetObj.attachmentUrl && <Img src={tweetObj.attachmentUrl} />}
          {isOwner && (
            <BtnWrapper>
              <UpdateBtn onClick={onDeleteClick}>Del</UpdateBtn>
              <UpdateBtn onClick={toggleEditing}>Edit</UpdateBtn>
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
`;

const Content = styled.div`
  border: 1px solid ${(props) => props.theme.lightColor};
  border-radius: 10px;
  background-color: ${(props) => props.theme.lightColor};
  color: #363636;
  padding: 15px;
  margin: 10px;
  /* top: 47px; */
`;

const Img = styled.img`
  max-width: 50px;
  max-height: 50px;
`;

const BtnWrapper = styled.div`
  display: flex;
  z-index: 2;
  right: 205px;
  cursor: pointer;
`;

const UpdateBtn = styled.div`
  border: 1px solid #131313;
  border-radius: 10px;
  background-color: ${(props) => props.theme.lightColor};
  color: #363636;
  padding: 5px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  &:first-child {
    border: none;
    border-radius: 10px;
    background-color: ${(props) => props.theme.lightColor};
    color: #363636;
    padding: 30px;
  }
`;
const EditInput = styled.input`
  border: 1px solid #131313;
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 5px;
`;
const FormBtn = styled.input`
  border: none;
  border-radius: 20px;
  padding: 5px;
  margin-top: 5px;
  color: ${(props) => props.theme.lightColor};
`;
const FormUpdateBtn = styled(FormBtn)`
  background-color: ${(props) => props.theme.accentColor};
`;
const FormCancelBtn = styled(FormBtn)`
  background-color: tomato;
`;
export default Tweet;
