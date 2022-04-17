import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Button from "../../components/button";
import { bmiToSentence } from "../../utils/bmi";

import style from "./index.module.css";

export default function Result() {
  const { query } = useRouter();

  const rawData = query.data || `[[]]`;
  const parsedData = JSON.parse(rawData)[0];

  const [_name, _weight, _size, _birth, bmi] = parsedData;

  return (
    <div className={style.Result}>
      <Head>
        <title>BMI Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.Result__logo}>
        <Link href="/">
          <a>
            <Image src="/bmi.svg" alt="bmi logo" width="130" height="42.29" />
          </a>
        </Link>
      </div>

      <div className={style.Result__content}>
        <div className={style.Result__text}>
          <p className={style.Result__BMI}>Your BMI is {bmi}</p>
          <p className={style.Result__sentence}>- "{bmiToSentence(bmi)}"</p>
        </div>

        <div className={style.Result__buttons}>
          <Link href="/form">
            <a>
              <Button>
                <p>Do it again</p>
              </Button>
            </a>
          </Link>
          <Link href="/history">
            <a>
              <Button>
                <p>See history</p>
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
