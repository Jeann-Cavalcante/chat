import styles from "./styles.module.scss";
import { BiSend } from "react-icons/bi";

const Chat = () => {
  return (
    <div className={styles.Container}>
      <header>
        <img
          src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt=""
        />
        <span>Usuários</span>
      </header>

      <div className={styles.Chat}></div>

      <div className={styles.Input}>
        <input type="text" />
        <BiSend />
      </div>
    </div>
  );
};

export default Chat;
