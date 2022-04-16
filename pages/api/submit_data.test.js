const { appendImcs } = require("../../utils/db");
const { getAuth } = require("../../utils/google");
const { submitData } = require("./submit_data");

jest.mock("../../utils/db", () => ({
  appendImcs: jest.fn(),
}));

jest.mock("../../utils/google", () => ({
  getAuth: jest.fn().mockReturnValue("authToken"),
}));

describe("Submit Data", () => {
  test("Can submit correct data", async () => {
    const birthDate = "13/04/1995";
    const name = "Jean Test";
    const size = 170;
    const weight = 55;
    const bmi = 19;

    const token = "sampleToken";

    getAuth.mockReturnValueOnce(token);
    appendImcs.mockResolvedValueOnce([[name, weight, size, birthDate, bmi]]);

    await submitData({ birthDate, name, size, weight });

    expect(getAuth).toHaveBeenCalledTimes(1);
    expect(appendImcs).toHaveBeenCalledWith(token, [
      [name, weight, size, birthDate, bmi],
    ]);
  });
});
