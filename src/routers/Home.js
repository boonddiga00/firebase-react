import React, { useState, useEffect, useRef } from "react";
import Tweet from "../components/Tweet";
import { dbService } from "../fbase";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attatchment, setAttatchment] = useState();
  const fileInput = useRef();
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      userId: userObj.uid,
    });
    setTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttatchment(result);
    };
    reader.readAsDataURL(files[0]);
  };
  const onClearAttatchment = () => {
    setAttatchment(null);
    fileInput.current.value = null;
  };
  useEffect(() => {
    dbService
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const tweetsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(tweetsArray);
      });
  }, []);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={tweet}
          type="text"
          maxLength="120"
          placeholder="What's on your mind?"
        />
        <input
          ref={fileInput}
          onChange={onFileChange}
          type="file"
          accept="image/*"
        />
        {attatchment && (
          <>
            <img
              src={attatchment}
              alt="Uploaded"
              title="Uploaded"
              width="100px"
              height="100px"
            />
            <button onClick={onClearAttatchment}>Clear</button>
          </>
        )}
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.userId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
