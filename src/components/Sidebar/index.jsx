import { collection, getDocs, query, where } from "firebase/firestore";
import { BsSearch } from "react-icons/bs";
import db from "../../firebase/firebase";
import styles from "./styles.module.scss";

const Sidebar = ({ user }) => {
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
        <div className={styles.Users}>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop" />
          <div className={styles.Mensagem}>
            <h3>Usuário</h3>
            <p>
              Ola, tudo bem ? cjsadbci jbcibsibs dcihbs dibsdc ihbchbs dihsdbi
              hsdb
            </p>
          </div>
          <div className={styles.HoraNotificacao}>
            <span className={styles.Hora}>11:30</span>
            <span className={styles.Notificacao}>5</span>
          </div>
        </div>

        <div className={styles.Users}>
          <img src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop" />
          <div className={styles.Mensagem}>
            <h3>Usuário</h3>
            <p>
              Ola, tudo bem ? cjsadbci jbcibsibs dcihbs dibsdc ihbchbs dihsdbi
              hsdb
            </p>
          </div>
          <div className={styles.HoraNotificacao}>
            <span className={styles.Hora}>11:30</span>
            <span className={styles.Notificacao}>2</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
