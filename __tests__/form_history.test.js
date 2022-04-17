import { render } from "@testing-library/react";
import History from "../pages/form_history/index";

describe("History page", () => {
  test("Can render all data", () => {
    const bmis = [
      [
        "Sample Test",
        "123",
        "456",
        "12/12/2012",
        "78",
        "2022-04-16T21:44:03.998Z",
      ],
    ];

    const { getByText } = render(<History bmis={bmis} />);

    // Header
    expect(getByText("Name"));
    expect(getByText("Weight"));
    expect(getByText("Size"));
    expect(getByText("Birthdate"));
    expect(getByText("BMI"));
    expect(getByText("Created At"));

    // Results
    const [bmi] = bmis;
    expect(getByText(bmi[0])).toBeInTheDocument();
    expect(getByText(`${bmi[1]}kg`)).toBeInTheDocument();
    expect(getByText(`${bmi[2]}cm`)).toBeInTheDocument();
    expect(getByText(bmi[3])).toBeInTheDocument();
    expect(getByText(bmi[4])).toBeInTheDocument();
    expect(getByText("16/04/2022")).toBeInTheDocument();
  });
});
