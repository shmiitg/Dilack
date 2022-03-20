import React from "react";
import styles from "../styles/Chat.module.css";

const Messages = ({ message, timestamp, user, userImage }) => {
    return (
        <div className={styles.message}>
            <img className={styles.userimage} src={userImage} alt="" />
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
