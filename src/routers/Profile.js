import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fbase";

const Profile = ({ userObj, refreshUser }) => {
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();
  const onLogoutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const onChange = (event) => {
    const { 
      target: { value }
	} = event;
	setNewDisplayName(value);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
	if(newDisplayName !== userObj.displayName) {
	  await userObj.updateProfile({
	    displayName: newDisplayName
	  });
	}
	refreshUser();
  }
  return (
    <>
      <button onClick={onLogoutClick}>Log Out</button>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" value={newDisplayName} placeholder="New Username" />
		<input type="submit" value="Update Profile"/>
      </form>
    </>
  );
};

export default Profile;
