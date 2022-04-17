import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Button from "../../components/button";
import { bmiToSentence } from "../../utils/bmi";

export default function Result() {
  const { query } = useRouter();

  const rawData = query.data || `[[]]`;
  const parsedData = JSON.parse(rawData)[0];

  const [_name, _weight, _size, _birth, bmi] = parsedData;

  return (
    <div>
      <Link href="/">
        <a>
          <Image src="/bmi.svg" alt="bmi logo" width="130" height="42.29" />
        </a>
      </Link>

      <p>Your BMI is {bmi}</p>
      <p>- "{bmiToSentence(bmi)}"</p>

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
  );
}
