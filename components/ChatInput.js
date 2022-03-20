import React, { useState } from "react";
import styles from "../styles/Chat.module.css";
import { db } from "../config/firebase";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const ChatInput = ({ channelName, channelId }) => {
    const { user } = useAuth();
    const [input, setInput] = useState("");
    const sendMessage = async (e) => {
        e.preventDefault();
        if (channelId) {
            const messageRef = collection(db, "rooms", channelId, "messages");
            setInput("");
            await addDoc(messageRef, {
                message: input,
                timestamp: Timestamp.fromDate(new Date()),
                user: user?.displayName,
                userimage: user?.photoURL,
            });
        }
    };

    return (
        <div className={styles.chatInput}>
            <form className={styles.input__form}>
                <input
                    className={styles.input__text}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message #${channelName?.toLowerCase()}`}
                    type="text"
                />
                <button className={styles.input__button} type="submit" onClick={sendMessage}>
                    SEND
                </button>
            </form>
        </div>
    );
};

export default ChatInput;
