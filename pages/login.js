import { Button } from "@material-ui/core";
import styles from "../styles/Login.module.css";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { login } = useAuth();
    return (
        <div className={styles.login}>
            <div className={styles.login__container}>
                <img className={styles.logo} src="https://picsum.photos/200" alt="" />
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
