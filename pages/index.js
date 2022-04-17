import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import Button from "../components/Button";

import style from "./index.module.css";

export default function Home() {
  return (
    <div className={style.Home}>
      <Head>
        <title>BMI Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        className={style.Home__logo}
        src="/bmi.svg"
        alt="bmi logo"
        width="421"
        height="259"
      />
      <Link href="/form">
        <a>
          <Button>
            <p>How fat are you?</p>
          </Button>
        </a>
      </Link>
    </div>
  );
}
