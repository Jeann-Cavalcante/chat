import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

let schema = yup.object().shape({
  nome: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "Insira pelo menos 3 caracteres"),
  email: yup.string().email().required("Campo obrigatório"),
  senha: yup.string().required("Campo obrigatório"),
  confirma: yup
    .string()
    .required("Campo obrigatório")
    .oneOf([yup.ref("senha"), null], "As senhas devem ser iguais"),
  imagem: yup.mixed().required("Campo obrigatorio"),
});

const Cadastros = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(data) {
    const auth = getAuth();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.senha
      );

      console.log(res.user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Form}>
        <h1>Cadastro</h1>
        <div className={styles.formCenter}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.Input}>
              <label>
                <span>Nome</span>
                <input type="text" {...register("nome")} />
                <span className={styles.Error}>{errors?.nome?.message}</span>
              </label>
            </div>

            <div className={styles.Input}>
              <label>
                <span>Email</span>
                <input type="email" {...register("email")} />
                <span className={styles.Error}>{errors?.email?.message}</span>
              </label>
            </div>

            <div className={styles.Input}>
              <label>
                <span>Senha</span>
                <input type="password" {...register("senha")} />
                <span className={styles.Error}>{errors?.senha?.message}</span>
              </label>
            </div>
            <div className={styles.Input}>
              <label>
                <span>Confirme a senha</span>
                <input type="password" {...register("confirma")} />
                <span className={styles.Error}>
                  {errors?.confirma?.message}
                </span>
              </label>
            </div>

            <div className={styles.Input}>
              <label className={styles.Label}>
                <span>Foto do perfil</span>
                <input type="file" id="file" {...register("imagem")} />
                <span className={styles.Error}>
                  {errors?.confirma?.message}
                </span>
              </label>
            </div>

            <button>Entrar</button>

            <div className={styles.Link}>
              <Link to="/login">
                Já possui conta ? <span>Faça seu login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastros;
