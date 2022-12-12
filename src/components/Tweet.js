import { dbService } from "fbase";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const onDeleteClick = async (event) => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");

    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
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
              {" "}
              <form onSubmit={onSubmit}>
                <input
                  value={newTweet}
                  required
                  placeholder="Edit your tweet"
                  onChange={onChange}
                />
                <input type="submit" value="Update Tweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Tweet</button>
              <button onClick={toggleEditing}>Edit Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
