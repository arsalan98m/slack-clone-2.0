import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { db, auth } from "../firebase";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatInput = ({ channelName, channelId }) => {
  const [input, setInput] = React.useState("");
  const [user] = useAuthState(auth);

 
  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

  
    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });

   
    setInput("");
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
