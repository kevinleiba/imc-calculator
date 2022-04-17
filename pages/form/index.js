import Head from "next/head";

export default function Form() {
  return (
    <div className="container">
      <Head>
        <title>BMI Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>In order to calculate your BMI, we need the following informations:</p>
      <form action="/api/submit_data" method="post">
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
        <button type="submit">Bring it on!!!</button>
      </form>
    </div>
  );
}
