import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

test("should be able to type an email", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", { name: /email/i });
  userEvent.type(emailInputElement, "annabelle@cake.com");
  expect(emailInputElement.value).toBe("annabelle@cake.com");
});

test("shoulb be able to type a password", () => {
  render(<App />);
  const passwordInputElement = screen.getByRole("textbox", {
    name: /password/i,
  });
  userEvent.type(passwordInputElement, "ABC123");
  expect(passwordInputElement.value).toBe("ABC123");
});

test("shoulb be able to type a confirmation password", () => {
  render(<App />);
  const confirmPasswordInputElement = screen.getByLabelText("Confirm Password", {
    name: /confirm-password/i,
  });
  userEvent.type(confirmPasswordInputElement, "ABC123");
  expect(confirmPasswordInputElement.value).toBe("ABC123");
});
