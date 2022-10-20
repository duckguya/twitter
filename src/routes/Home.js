/* eslint-disable */
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  console.log(userObj);

  const getTweets = async () => {
    const dbTweets = await dbService.collection("tweets").get();
    dbTweets.forEach((document) => {
      const tweetObj = {
        ...document.data(),
        id: document.id,
      };
      setTweets((prev) => [tweetObj, ...prev]);
    });
  };

  useEffect(() => {
    getTweets();
    dbService.collection("tweets").onSnapshot((snapshot) => {
      console.log("hihihih");
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      createdId: userObj.uid,
    });
    setTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweets.map((tweet, index) => (
          <div key={tweet.id}>
            <h4>{tweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
