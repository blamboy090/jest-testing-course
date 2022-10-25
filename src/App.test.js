import { render, screen } from "@testing-library/react";
import App from "./App";

// 1) rendering the component we want to test
// 2) Finding the elements
// 3) Assertion

test("inputs should be initially empty", () => {
  render(<App />);
  const emailInputElement = screen.getByLabelText(/email/i);
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});
