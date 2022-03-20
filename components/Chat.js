import React, { useState, useEffect } from "react";
import Message from "./Message.js";
import ChatInput from "./ChatInput.js";
import { StarBorderOutlined, InfoOutlined } from "@material-ui/icons";
import styles from "../styles/Chat.module.css";
import { query, doc, collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";

const Chat = ({ id }) => {
    const [roomDetails, setRoomtDetails] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);

    const getChannel = async () => {
        const roomRef = doc(db, "rooms", id); //doc-ref
        onSnapshot(roomRef, (snap) => setRoomtDetails(snap.data()));

        const messagesRef = collection(db, "rooms", id, "messages"); //collection-ref
        const q = query(messagesRef, orderBy("timestamp", "asc"));
        onSnapshot(q, (snap) => {
            setRoomMessages(
                snap.docs.map((doc) => {
                    return doc.data();
                })
            );
        });
    };

    useEffect(() => {
        if (id) {
            getChannel();
        }
    }, [id]);

    return (
        <React.Fragment>
            {roomDetails ? (
                <div className={styles.chat}>
                    <div className={styles.chat__header}>
                        <div className={styles.chat__headerLeft}>
                            <h4 className={styles.chat__channelName}>
                                <strong># {roomDetails && roomDetails.name}</strong>
                                <StarBorderOutlined className={styles.starBorderOutlined__icon} />
                            </h4>
                        </div>
                        <div className={styles.chat__headerRight}>
                            <p className={styles.chat__headerRight__p}>
                                <InfoOutlined className={styles.infoOutlined__icon} />
                                Details
                            </p>
                        </div>
                    </div>
                    <div className={styles.chat__messages}>
                        {roomMessages.map((msg, index) => (
                            <Message
                                key={index}
                                message={msg.message}
                                timestamp={msg.timestamp}
                                user={msg.user}
                                userImage={msg.userimage}
                            />
                        ))}
                    </div>
                    <ChatInput channelName={roomDetails?.name} channelId={id} />
                </div>
            ) : (
                <div>Room does not exists</div>
            )}
        </React.Fragment>
    );
};

export default Chat;
