import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.scss";
import { app } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/login");
        setUser(null);
      }
    });
  }, []);

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.Home}>
      <Sidebar user={user} />
      <Chat user={user} />
    </div>
  );
};

export default Home;
