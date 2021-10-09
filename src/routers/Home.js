import React, { useState, useEffect } from "react";
import Tweet from "../components/Tweet";
import TweetFactory from "../components/TweetFactory";

import { dbService } from "../fbase";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);
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
      <TweetFactory userObj={userObj} />
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
