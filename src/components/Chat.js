import { useRef, useEffect } from "react";
import styled from "styled-components";
import StartBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";

const Chat = () => {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomMessages, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          {/* Chat Box Header */}
          <ChatHeader>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StartBorderOutlinedIcon />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> Details
              </p>
            </HeaderRight>
          </ChatHeader>

          {/* Chat Messages */}
          {roomMessages?.docs.length !== 0 ? (
            <ChatMessages>
              {roomMessages?.docs.map((doc) => {
                const { message, timestamp, user, userImage } = doc.data();

                return (
                  <Message
                    key={doc.id}
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    userImage={userImage}
                  />
                );
              })}

              <ChatBottom ref={chatRef} />
            </ChatMessages>
          ) : (
            <h1 style={{textAlign:"center"}}>No Messages Found</h1>
          )}

          {/* Chat Input */}

          <ChatInput
            channelId={roomId}
            channelName={roomDetails?.data().name}
          />
        </>
      )}

      {!roomDetails && !roomMessages && (
        <h1 style={{ textAlign: "center", marginTop: "100px" }}>
          Please Select the Room
        </h1>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
