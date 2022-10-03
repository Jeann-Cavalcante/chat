import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const login = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Form}>
        <h1>Login</h1>
        <div className={styles.formCenter}>
          <form>
            <div className={styles.Input}>
              <label>
                <span>Email</span>
                <input type="email" />
              </label>
            </div>

            <div className={styles.Input}>
              <label>
                <span>Senha</span>
                <input type="password" />
              </label>
            </div>

            <button>Entrar</button>

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
