import React from "react";
import styles from "../styles/Home.module.css";
import { Avatar } from "@material-ui/core";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <div className={styles.header}>
            <div className={styles.header__left}>
                <Avatar className={styles.avatar} alt={user?.displayName} src={user?.photoURL} />
            </div>
            <div className={styles.header__title}>Eat, Chat, Sleep, Repeat</div>
            <div className={styles.header__right}>
                <button className={styles.logout__btn} onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Header;
