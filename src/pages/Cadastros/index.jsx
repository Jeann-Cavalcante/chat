import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import db from "../../firebase/firebase";

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
  const [photos, setPhotos] = useState([]);
  const [id, setId] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    console.log("Chegou aqui");
  }

  async function handleImagem(e) {
    e.preventDefault();
    console.log("Chegou aqui img");

    try {
      if (
        !["image/png", "image/jpg", "image/jpeg"].includes(
          e.target[4].files[0].type
        )
      ) {
        alert("tipo de arquivo não suportado");
      } else {
        const auth = getAuth();
        const res = await createUserWithEmailAndPassword(
          auth,
          e.target[1].value,
          e.target[2].value
        ).then((userCredential) => {
          const user = userCredential.user;
          setId(user.uid);
          console.log(user);
        });

        const storage = getStorage();
        const storageRef = ref(storage, e.target[1].value);

        uploadBytesResumable(storageRef, e.target[4].files[0]).then(
          (snapshot) => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              console.log("img :" + downloadURL, "sna: " + snapshot);
              setPhotos(downloadURL);
            });
          }
        );
        const col = collection(db, "users");
        await addDoc(col, {
          username: e.target[0].value,
          avatarURL: photos,
          userId: id,
          created_at: serverTimestamp(),
          email: e.target[1].value,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Form}>
        <h1>Cadastro</h1>
        <div className={styles.formCenter}>
          <form onSubmit={handleImagem}>
            {/* <form onSubmit={teste}> */}
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
