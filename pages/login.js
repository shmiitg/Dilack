import { Button } from "@material-ui/core";
import styles from "../styles/Login.module.css";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

const Login = () => {
    const { login } = useAuth();
    return (
        <div className={styles.login}>
            <div className={styles.login__container}>
                <div className={styles.logo}>
                    <Image
                        src="https://picsum.photos/100"
                        width="100"
                        height="100"
                        objectFit="contain"
                        alt="logo"
                    />
                </div>
                <h1>Sign in to Dilack</h1>
                <p>www.github.com/shmiitg</p>
                <Button onClick={login} className={styles.signin__button}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    );
};

export default Login;
