import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import db, { app } from "../../firebase/firebase";
import {
  addDoc,
  collection,
  enableIndexedDbPersistence,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

const login = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSingIn(e) {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        // console.log(user);
        UsersComGoogle(user);

        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function UsersComGoogle(user) {
    if (user) {
      const col = collection(db, "users");
      const existeEmail = query(col, where("email", "==", user.email));
      const querySnapshot = await getDocs(existeEmail);

      if (querySnapshot.empty) {
        console.log("Criando usuario");
        try {
          addDoc(col, {
            username: user?.displayName,
            avatarURL: user?.photoURL,
            userId: user?.uid,
            created_at: serverTimestamp(),
            email: user?.email,
          });
          const source = user.metadata.fromCache ? "local cache" : "server";
          console.log("Data came from " + source);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  async function UsersComEmail(e) {
    e.preventDefault();
    console.log(email, senha);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const userLogado = userCredential.user;
        console.log(userLogado);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className={styles.Container}>
      <div className={styles.Form}>
        <h1>Login</h1>
        <div className={styles.formCenter}>
          <form>
            <div className={styles.Input}>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>

            <div className={styles.Input}>
              <label>
                <span>Senha</span>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </label>
            </div>

            <button onClick={UsersComEmail}>Entrar</button>
            <button className={styles.Google} onClick={handleSingIn}>
              Entrar com Google
            </button>

            <div className={styles.Link}>
              <Link to="/cadastro">
                Não possui conta ? <span>Faça seu cadastro</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
