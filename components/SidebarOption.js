import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

const SidebarOption = ({ Icon, title, id, addChannelOption }) => {
    const router = useRouter();
    const selectChannel = () => {
        if (id) {
            router.push(`/room/${id}`);
        } else {
            router.push(`/room/${title}`);
        }
    };

    const addChannel = async () => {
        const channelName = prompt("Please enter the channel name");
        if (channelName) {
            const channelRef = collection(db, "rooms");
            await addDoc(channelRef, { name: channelName });
        }
    };

    return (
        <div
            className={styles.sidebarOption}
            onClick={addChannelOption ? addChannel : selectChannel}
        >
            {Icon ? (
                <h3 className={styles.sidebarOption__channel}>
                    <span className={styles.sidebarOption__hash}>
                        <Icon className={styles.sidebarOption__icon} />
                    </span>
                    {title}
                </h3>
            ) : (
                <h3 className={styles.sidebarOption__channel}>
                    <span className={styles.sidebarOption__hash}>#</span>
                    {title}
                </h3>
            )}
        </div>
    );
};

export default SidebarOption;
