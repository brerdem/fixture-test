import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

type Data = {
  success: boolean;
};

type User = {
  user: string;
  pass: string;
};

export default function Home() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const getData = async () => {
    const res = await axios.get("/api/get", {});
    if (res.data) {
      setUsers(res.data.data);
    }
  };

  const addData = async () => {
    const res = await axios.post<Data>("/api/add", {
      user,
      pass,
    });
    if (res.data.success) {
      console.log("data added :>> ");
      setUser("");
      setPass("");
      await getData();
    }
  };

  useEffect(() => {
    (async () => await getData())();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Fixture Test</title>
        <meta name="description" content="Generated description test 3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          {users.map((x) => (
            <div className={styles.row} key={x.user + x.pass}>
              <span>{x.user}</span>
              <span>{x.pass}</span>
            </div>
          ))}
        </div>

        <h1 className={styles.title}>Enter user credentials</h1>
        <div className={styles.col}>
          <input
            type={"text"}
            placeholder="Username"
            onChange={(e) => setUser(e.currentTarget.value)}
            value={user}
          />
          <input
            type={"text"}
            placeholder="Password"
            onChange={(e) => setPass(e.currentTarget.value)}
            value={pass}
          />
          <button onClick={addData}>SEND</button>
        </div>
      </main>
    </div>
  );
}
