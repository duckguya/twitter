/* eslint-disable */
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";
import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // onSnapshot : 실시간으로 db데이터를 가져올 수 있다.
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  return (
    <div>
      <TweetFactory userObj={userObj} />
      <div>
        {tweets.map((tweet, index) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.createdId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
