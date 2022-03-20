import { useState, useEffect, useRef } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { FiberManualRecord, InsertComment, Inbox, Drafts } from "@material-ui/icons";
// explicit icons
import { ExpandMore, ExpandLess, Add } from "@material-ui/icons";
import styles from "../styles/Home.module.css";
import SidebarOption from "./SidebarOption";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
    const { user } = useAuth();
    const [channels, setChannels] = useState([]);
    const [slicedChannels, setSlicedChannels] = useState([]);
    const [allChannels, setAllChannels] = useState([]);

    const getChannels = async () => {
        const q = query(collection(db, "rooms"));
        onSnapshot(q, (snap) => {
            const data = [];
            snap.forEach((doc) => {
                const obj = {
                    id: doc.id,
                    name: doc.data().name,
                };
                data.push(obj);
            });
            setChannels(data);
            setAllChannels(data);
            setSlicedChannels(data.slice(0, 2));
        });
    };
    const val = useRef(null);
    const showMoreLess = async () => {
        if (val.current.innerText == "Show Less") {
            val.current.innerText = "Show More";
            setChannels(slicedChannels);
        } else {
            val.current.innerText = "Show Less";
            setChannels(allChannels);
        }
    };

    useEffect(() => {
        getChannels();
    }, []);

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar__header}>
                <div className={styles.sidebar__info}>
                    <div className={styles.sidebar__serverName}>SHM Server</div>
                    <div className={styles.sidebar__name}>
                        <FiberManualRecord className={styles.fiberManualRecord__icon} />
                        <span className={styles.user__name}>{user?.displayName}</span>
                    </div>
                </div>
            </div>
            <div className={styles.sidebarOptions}>
                <SidebarOption Icon={InsertComment} title="Threads" />
                <SidebarOption Icon={Inbox} title="Mentions & reactions" />
                <SidebarOption Icon={Drafts} title="Saved items" />
                <hr className={styles.sidebarOption__hr} />
                <SidebarOption Icon={Add} title="Add channel" addChannelOption={true} />
                {channels.map((channel, index) => (
                    <SidebarOption title={channel.name} key={index} id={channel.id} />
                ))}
                <div className={styles.sidebarOption} onClick={showMoreLess}>
                    <h3 className={styles.sidebarOption__channel}>
                        <span className={styles.sidebarOption__hash}>
                            {val.current?.innerText === "Show Less" ? (
                                <ExpandLess className={styles.sidebarOption__icon} />
                            ) : (
                                <ExpandMore className={styles.sidebarOption__icon} />
                            )}
                        </span>
                        <div ref={val}>Show Less</div>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
