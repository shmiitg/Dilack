import React from "react";
import styles from "../styles/Chat.module.css";
import Image from "next/image";

const Messages = ({ message, timestamp, user, userImage }) => {
    return (
        <div className={styles.message}>
            <Image src={userImage} height="50" width="50" objectFit="contain" alt="avatar" />
            <div className={styles.message__info}>
                <h4>
                    {user}
                    <span className={styles.message__timestamp}>
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                </h4>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Messages;
