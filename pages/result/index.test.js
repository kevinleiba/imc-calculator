import { render } from "@testing-library/react";
import { useRouter } from "next/router";
import { bmiToSentence } from "../../utils/bmi";

import Result from "./index";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Result page", () => {
  test("Can display correct result and links", () => {
    const bmi = 19;
    const result = `[["Jean%20Test","55","170","13/04/1995",${bmi},"2022-04-17T11:11:32.624Z"]]`;
    useRouter.mockReturnValueOnce({ query: { data: result } });

    const { getByText, getAllByRole } = render(<Result />);
    expect(getByText(`Your BMI is ${bmi}`)).toBeInTheDocument();
    expect(getByText(`- "${bmiToSentence(bmi)}"`)).toBeInTheDocument();

    const [again, history] = getAllByRole("button");
    expect(again.closest("a").href).toMatch("/form");
    expect(history.closest("a").href).toMatch("/form_history");
  });
  test("Without data page does not crash", () => {
    useRouter.mockReturnValueOnce({ query: {} });

    render(<Result />);
  });
});
