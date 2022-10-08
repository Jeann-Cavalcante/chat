import styles from "./styles.module.scss";
import { BiSend } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import db from "../../firebase/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useContext";

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const messagesRef = useRef();
  const auth = getAuth();
  const navigate = useNavigate();

  const { usePrimary, setUserPrimary } = useUserContext();

  useEffect(() => {
    messagesRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messagesList]);

  async function sendMessage() {
    try {
      await addDoc(collection(db, "messages"), {
        username: user?.displayName,
        avatarURL: user?.photoURL,
        userId: user?.uid,
        message: message,
        created_at: serverTimestamp(),
      });

      messagesRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function getMessages() {
    const q = query(collection(db, "messages"), orderBy("created_at"));
    const subscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        return {
          idMessage: doc.id,
          ...doc.data(),
        };
      });

      setMessagesList(data);
    });
  }

  useEffect(() => {
    getMessages();
  }, []);

  async function handleSubmitMessage(e) {
    e.preventDefault();
    await sendMessage();
    setMessage("");
  }

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        navigate("/login");
        setUserPrimary(null);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // console.log(user);

  return (
    <div className={styles.Container}>
      <header>
        {user && (
          <div key={user.uid} className={styles.Usuario}>
            <img src={user?.photoURL} />
            <span>{user.displayName}</span>
          </div>
        )}

        <div className={styles.Sair}>
          <span onClick={handleSignOut}>Sair</span>
        </div>
      </header>

      <div className={styles.Chat}>
        <ul>
          {messagesList ? (
            messagesList.map((message) => {
              return message.userId !== user?.uid ? (
                <li className={styles.UserSecondary} key={message.idMessage}>
                  <div className={styles.UserSecondaryDiv}>
                    <img src={message?.avatarURL} />
                    <div className={styles.Message}>
                      <p className={styles.UserName}>{message.username}</p>
                      <p>{message.message}</p>
                    </div>
                  </div>
                </li>
              ) : (
                <li className={styles.UserHost} key={message.idMessage}>
                  <div className={styles.UserHostDiv}>
                    <img src={message.avatarURL} alt="" />
                    <div className={styles.Message}>
                      <p className={styles.UserName}>{message.username}</p>
                      <p>{message.message}</p>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <p>Nenhuma mensagem enviada até o momento</p>
          )}
          <div ref={messagesRef} />
        </ul>
      </div>

      <form onSubmit={handleSubmitMessage} className={styles.Input}>
        <input
          type="text"
          name="message"
          id="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Digite sua mensagem aqui"
        />
        <BiSend onClick={handleSubmitMessage} />
      </form>
    </div>
  );
};

export default Chat;
