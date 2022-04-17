import { render } from "@testing-library/react";

import Form from "../pages/form/index";

describe("Form", () => {
  test("Can get all form elements", () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<Form />);

    expect(getByPlaceholderText("Name")).toBeInTheDocument();
    expect(getByPlaceholderText("Weight (kg)")).toBeInTheDocument();
    expect(getByPlaceholderText("Size (cm)")).toBeInTheDocument();
    expect(getByPlaceholderText("Birthdate (dd/mm/yyyy)")).toBeInTheDocument();

    expect(getByRole("button")).toBeInTheDocument();
    expect(
      getByText(
        "In order to calculate your BMI, we need the following informations:"
      )
    ).toBeInTheDocument();
  });
});
