/* eslint-disable */
import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // onSnapshot : 실시간으로 db데이터를 가져올 수 있다.
    dbService
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(tweetArray);
      });
  }, []);

  return (
    <Container>
      <TweetFactory userObj={userObj} />
      <TweetList>
        {tweets.map((tweet, index) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </TweetList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const TweetList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Home;
