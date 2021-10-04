import React, { useState } from "react";
import { dbService } from "../fbase";

const Tweet = ({ tweetObj, isOwner }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDelete = async () => {
    const ok = window.confirm("Do you really want to delete this Tweet?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setIsEditing((prev) => !prev);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const ok = window.confirm("Do you really want to update this Tweet?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).update({
        text: newTweet,
      });
    }
    setIsEditing(false);
  };
  return (
    <div>
      {isEditing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              type="text"
              value={newTweet}
              placeholder="Edit your Tweet"
              required
            />
            <input type="submit" value="Update" />
          </form>
          <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDelete}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
