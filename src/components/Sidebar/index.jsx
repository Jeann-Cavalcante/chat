import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import db from "../../firebase/firebase";
import styles from "./styles.module.scss";

const Sidebar = ({ user }) => {
  const [users, setUsers] = useState([]);

  console.log(user.uid);
  useEffect(() => {
    async function getUsers() {
      try {
        const col = collection(db, "users");
        await onSnapshot(col, (snap) => {
          let lista = [];

          snap.forEach((item) => {
            lista.push({
              avatarURL: item.data().avatarURL,
              username: item.data().username,
              email: item.data().email,
              userId: item.data().userId,
            });

            let listaFilter = lista.filter((list) => list.userId != user.uid);

            setUsers(listaFilter);
            console.log(listaFilter);
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
    getUsers();
  }, []);

  return (
    <aside className={styles.Sidebar}>
      <header>
        <h1>Chat</h1>
        <div className={styles.Search}>
          <div className={styles.Icon}>
            <BsSearch />
          </div>
          <input type="text" />
        </div>
      </header>

      <div className={styles.Conversas}>
        {users?.map((item) => (
          <div key={item?.userId} className={styles.Users}>
            {item.avatarURL ? <img src={item?.avatarURL} /> : <FaUserCircle />}

            <div className={styles.Mensagem}>
              <h3>{item.username}</h3>
              <p>{item.email}</p>
            </div>
            {/* <div className={styles.HoraNotificacao}>
              <span className={styles.Hora}>11:30</span>
              <span className={styles.Notificacao}>5</span>
            </div> */}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
