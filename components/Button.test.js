import { render } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  test("Can render a button", () => {
    const str = "Hello Button";
    const { getByText, getByRole } = render(
      <Button>
        <p>{str}</p>
      </Button>
    );

    expect(getByRole("button")).toBeInTheDocument();
    expect(getByText(str)).toBeInTheDocument();
  });
});
