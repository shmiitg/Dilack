import { useRouter } from "next/router";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { AuthContextProvider } from "../context/AuthContext";

const authRequired = ["/", "/room/[id]"];

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    return (
        <AuthContextProvider>
            {authRequired.includes(router.pathname) ? (
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            ) : (
                <Component {...pageProps} />
            )}
        </AuthContextProvider>
    );
}

export default MyApp;
