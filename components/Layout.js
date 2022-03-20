import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [router, user]);

    return (
        <>
            {user ? (
                <div className="content">
                    <Header />
                    <div className="app__body">
                        <Sidebar />
                        {children}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Layout;
