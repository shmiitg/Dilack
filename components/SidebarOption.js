import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { db } from "../config/firebase";
import { query, onSnapshot, addDoc, collection, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const SidebarOption = ({ Icon, title, id, addChannelOption }) => {
    const router = useRouter();
    const { user } = useAuth();
    const userRef = collection(db, "users");
    const selectChannel = () => {
        if (id) {
            router.push(`/room/${id}`);
        } else {
            router.push(`/room/${title}`);
        }
    };

    const addChannel = async () => {
        const q = query(userRef, where("id", "==", user.uid));
        onSnapshot(q, async (snap) => {
            if (snap.docs[0].data().type == "admin") {
                const channelName = prompt("Please enter the channel name");
                if (channelName) {
                    const channelRef = collection(db, "rooms");
                    await addDoc(channelRef, { name: channelName });
                }
            } else {
                window.alert("Only admin can add channels");
            }
        });
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
