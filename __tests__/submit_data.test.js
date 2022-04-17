const { appendImcs } = require("../utils/db");
const { getAuth } = require("../utils/google");
const { submitData } = require("../pages/api/submit_data");

jest.mock("../utils/db", () => ({
  appendImcs: jest.fn(),
}));

jest.mock("../utils/google", () => ({
  getAuth: jest.fn().mockReturnValue("authToken"),
}));

describe("Submit Data", () => {
  test("Can submit correct data", async () => {
    const birthDate = "13/04/1995";
    const name = "Jean Test";
    const size = 170;
    const weight = 55;
    const bmi = 19;
    const updatedAt = "2022-04-16T21:44:03.998Z";

    const token = "sampleToken";

    getAuth.mockReturnValueOnce(token);
    appendImcs.mockResolvedValueOnce([
      [name, weight, size, birthDate, bmi, updatedAt],
    ]);

    await submitData({ birthDate, name, size, updatedAt, weight });

    expect(getAuth).toHaveBeenCalledTimes(1);
    expect(appendImcs).toHaveBeenCalledWith(token, [
      [name, weight, size, birthDate, bmi, updatedAt],
    ]);
  });
});
