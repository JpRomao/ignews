import { render } from "@testing-library/react";
import ActiveLink from ".";

test("active link should renders correctly", () => {
  render(
    <ActiveLink href="/" activeClassname="active">
      <a>Home</a>
    </ActiveLink>
  );

  debug();
});
