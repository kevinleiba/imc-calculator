import Link from "next/link";
import { listImcs } from "../../utils/db";
import { getAuth } from "../../utils/google";

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
    <div>
      <Link href="/">
        <a>go back</a>
      </Link>
      {[
        ["Name", "Weight", "Size", "Birthdate", "BMI", "Created At"],
        ...bmis,
      ].map(([name, weight, size, birth, bmi, updatedAt], index) => {
        return (
          <div key={updatedAt}>
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
