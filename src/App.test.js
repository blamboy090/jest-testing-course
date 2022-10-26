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

test("should be able to type a password", () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText("Password");
  userEvent.type(passwordInputElement, "ABC123");
  expect(passwordInputElement.value).toBe("ABC123");
});

test("shoulb be able to type a confirmation password", () => {
  render(<App />);
  const confirmPasswordInputElement = screen.getByLabelText(
    "Confirm Password",
    {
      name: /confirmPassword/i,
    }
  );
  userEvent.type(confirmPasswordInputElement, "ABC123");
  expect(confirmPasswordInputElement.value).toBe("ABC123");
});

test("should show email error message on invalid email", () => {
  render(<App />);

  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  const emailInputElement = screen.getByRole("textbox", { name: /email/i });
  const submitBtnElement = screen.getByRole("button", { name: /submit/i });

  expect(emailErrorElement).not.toBeInTheDocument();
  userEvent.type(emailInputElement, "annabellegmail.com");

  userEvent.click(submitBtnElement);
  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i
  );

  expect(emailErrorElementAgain).toBeInTheDocument();
});

test("should show password error if password is less than 5 characters", () => {
  render(<App />);

  const emailInputElement = screen.getByRole("textbox", { name: /email/i });
  const passwordInputElement = screen.getByLabelText("Password");
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  const submitBtnElement = screen.getByRole("button", { name: /submit/i });

  userEvent.type(emailInputElement, "annabelle@gmail.com");

  expect(passwordErrorElement).not.toBeInTheDocument();
  userEvent.type(passwordInputElement, "123");
  userEvent.click(submitBtnElement);

  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  expect(passwordErrorElementAgain).toBeInTheDocument();
});

test("should show confirm password error if passwords dont match", () => {
  render(<App />);

  const emailInputElement = screen.getByRole("textbox", { name: /email/i });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords don't match. try again/i
  );
  const submitBtnElement = screen.getByRole("button", { name: /submit/i });
  const confirmPasswordInputElement = screen.getByLabelText(
    "Confirm Password",
    {
      name: /confirmPassword/i,
    }
  );
  userEvent.type(emailInputElement, "annabelle@gmail.com");
  userEvent.type(passwordInputElement, "12345");

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
  
  userEvent.type(confirmPasswordInputElement, "ABCDEF")

  userEvent.click(submitBtnElement);

  const confirmPasswordErrorElementAgain = screen.queryByText(
    /the passwords don't match. try again/i
  );

  expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
});

test("should show no error message if every input is valid", () => {
  render(<App />);

  const emailInputElement = screen.getByRole("textbox", { name: /email/i });
  const passwordInputElement = screen.getByLabelText("Password");
  
  const submitBtnElement = screen.getByRole("button", { name: /submit/i });
  const confirmPasswordInputElement = screen.getByLabelText(
    "Confirm Password",
    {
      name: /confirmPassword/i,
    }
  );
  userEvent.type(emailInputElement, "annabelle@gmail.com");
  userEvent.type(passwordInputElement, "12345");
  userEvent.type(confirmPasswordInputElement, "12345")

  userEvent.click(submitBtnElement);

  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords don't match. try again/i
  );
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(emailErrorElement).not.toBeInTheDocument();
});