import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../fbase";

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attatchment, setAttatchment] = useState("");
  const fileInput = useRef();
  const onSubmit = async (event) => {
    event.preventDefault();
    let attatchmentUrl = "";
    if (attatchment !== "") {
      const attatchmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attatchmentRef.putString(attatchment, "data_url");
      attatchmentUrl = await response.ref.getDownloadURL();
    }
    const tweetObj = {
      text: tweet,
      attatchmentUrl,
      createdAt: Date.now(),
      userId: userObj.uid,
    };
    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setAttatchment("");
    fileInput.current.value = "";
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
  return (
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
  );
};

export default TweetFactory;
