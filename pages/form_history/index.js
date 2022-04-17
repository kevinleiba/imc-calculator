import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { listImcs } from "../../utils/db";
import { getAuth } from "../../utils/google";

import style from "./index.module.css";

function formatISOStringToDDMMYYYY(isoStr) {
  const [year, month, rawDay] = isoStr.split("-");
  const day = `${rawDay[0]}${rawDay[1]}`;

  return `${day}/${month}/${year}`;
}

function Table({ name, weight, size, birth, bmi, updatedAt }) {
  return (
    <>
      <p>{name}</p>
      <p>{weight}kg</p>
      <p>{size}cm</p>
      <p>{birth}</p>
      <p>{bmi}</p>
      <p>{formatISOStringToDDMMYYYY(updatedAt)}</p>
    </>
  );
}

function Header({ name, weight, size, birth, bmi, updatedAt }) {
  return (
    <>
      <p>{name}</p>
      <p>{weight}</p>
      <p>{size}</p>
      <p>{birth}</p>
      <p>{bmi}</p>
      <p>{updatedAt}</p>
    </>
  );
}

export default function History({ bmis }) {
  return (
    <div className={style.History}>
      <Head>
        <title>BMI Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/">
        <a>
          <Image src="/bmi.svg" alt="bmi logo" width="130" height="42.29" />
        </a>
      </Link>
      <p className={style.History__title}>History of all concerned people:</p>
      {[
        ["Name", "Weight", "Size", "Birthdate", "BMI", "Created At"],
        ...bmis,
      ].map(([name, weight, size, birth, bmi, updatedAt], index) => {
        return (
          <div key={updatedAt} className={style.History__formCol}>
            {index === 0 ? (
              <Header
                name={name}
                weight={weight}
                size={size}
                birth={birth}
                bmi={bmi}
                updatedAt={updatedAt}
              />
            ) : (
              <Table
                name={name}
                weight={weight}
                size={size}
                birth={birth}
                bmi={bmi}
                updatedAt={updatedAt}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const auth = getAuth();
  const bmis = await listImcs(auth);
  return { props: { bmis } };
}
