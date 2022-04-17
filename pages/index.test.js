import { render } from "@testing-library/react";

import Home from "./index";

describe("Index", () => {
  test("Has button", () => {
    const { getByRole } = render(<Home />);

    const button = getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button.closest("a").href).toMatch("/form");
    expect(getByRole("button")).toBeInTheDocument();
  });
});
