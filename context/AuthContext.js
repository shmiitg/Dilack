import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { db, auth, provider } from "../config/firebase";
import { addDoc, query, collection, where, onSnapshot } from "firebase/firestore";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const usersRef = collection(db, "users");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const login = () => {
        signInWithPopup(auth, provider)
            .then((res) => {
                setUser(res.user);
                router.push("/");
                const q = query(usersRef, where("id", "==", res.user.uid));
                onSnapshot(q, (snapshot) => {
                    if (!snapshot.docs.length) {
                        addDoc(usersRef, { id: res.user.uid, type: "user" });
                    }
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const logout = async () => {
        setUser(null);
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
