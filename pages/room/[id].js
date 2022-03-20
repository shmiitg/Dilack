import { useRouter } from "next/router";
import Chat from "../../components/Chat";

const Details = () => {
    const router = useRouter();
    const { id } = router.query;
    return <Chat id={id} />;
};

export default Details;
