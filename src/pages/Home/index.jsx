import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.scss";

const Home = () => {
  return (
    <div className={styles.Home}>
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Home;
