import { calculateBMI } from "../../utils/bmi";
import { appendImcs } from "../../utils/db";
import { getAuth } from "../../utils/google";

export function submitData({ birthDate, name, size, updatedAt, weight }) {
  const auth = getAuth();
  const bmi = calculateBMI({ weight, size });

  return appendImcs(auth, [[name, weight, size, birthDate, bmi, updatedAt]]);
}

export default function handler(req, res) {
  if (req.method === "POST") {
    const { birthDate, name, size, weight } = req.body;

    submitData({
      birthDate,
      name,
      size,
      updatedAt: new Date().toISOString(),
      weight,
    })
      .then((appenedData) => {
        res.redirect(`/result?data=${JSON.stringify(appenedData)}`);
      })
      .catch((err) => {
        res.status(503).send(err);
      });
  } else {
    res.status(404).send("Not found");
  }
}
