import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Button from "../../components/button";

import style from "./index.module.css";

export default function Form() {
  return (
    <div className={style.Form}>
      <Head>
        <title>BMI Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/">
        <a>
          <Image src="/bmi.svg" alt="bmi logo" width="130" height="42.29" />
        </a>
      </Link>
      <p className={style.Form__instructions}>
        In order to calculate your BMI, we need the following informations:
      </p>
      <form
        action="/api/submit_data"
        className={style.Form__form}
        method="post"
      >
        <input type="text" id="name" name="name" placeholder="Name" required />
        <input
          required
          type="number"
          id="weight"
          name="weight"
          placeholder="Weight (kg)"
          min={0}
          max={1000}
        />
        <input
          required
          type="number"
          min={40}
          max={250}
          id="size"
          name="size"
          placeholder="Size (cm)"
        />
        <input
          required
          type="text"
          id="birthDate"
          name="birthDate"
          placeholder="Birthdate (dd/mm/yyyy)"
        />
        <Button type="submit">
          <p>Bring it on!!!</p>
        </Button>
      </form>
    </div>
  );
}
