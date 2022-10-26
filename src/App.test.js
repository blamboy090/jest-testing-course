import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  render(<App />);
});

//helper functions
const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox", { name: /email/i });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

const clickOnSubmitBtn = () => {
  const submitBtnElement = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitBtnElement);
};
// 1) rendering the component we want to test
// 2) Finding the elements
// 3) Assertion

test("inputs should be initially empty", () => {
  const emailInputElement = screen.getByLabelText(/email/i);
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

test("should be able to type an email", () => {
  const { emailInputElement } = typeIntoForm({
    email: "annabelle@cake.com",
  });
  expect(emailInputElement.value).toBe("annabelle@cake.com");
});

test("should be able to type a password", () => {
  const { passwordInputElement } = typeIntoForm({ password: "ABC123" });
  expect(passwordInputElement.value).toBe("ABC123");
});

test("should be able to type a confirmation password", () => {
  const { confirmPasswordInputElement } = typeIntoForm({
    confirmPassword: "ABC123",
  });
  expect(confirmPasswordInputElement.value).toBe("ABC123");
});

test("should show email error message on invalid email", () => {
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );

  expect(emailErrorElement).not.toBeInTheDocument();
  typeIntoForm({ email: "annabellegmail.com" });

  clickOnSubmitBtn();
  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i
  );

  expect(emailErrorElementAgain).toBeInTheDocument();
});

test("should show password error if password is less than 5 characters", () => {
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  typeIntoForm({ email: "annabelle@gmail.com" });

  expect(passwordErrorElement).not.toBeInTheDocument();

  typeIntoForm({ password: "123" });

  clickOnSubmitBtn();

  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  );

  expect(passwordErrorElementAgain).toBeInTheDocument();
});

test("should show confirm password error if passwords dont match", () => {
  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords don't match. try again/i
  );

  typeIntoForm({ email: "annabelle@gmail.com", password: "12345" });

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  typeIntoForm({ confirmPassword: "ABCDEF" });

  clickOnSubmitBtn();

  const confirmPasswordErrorElementAgain = screen.queryByText(
    /the passwords don't match. try again/i
  );

  expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
});

test("should show no error message if every input is valid", () => {
  typeIntoForm({
    email: "annabelle@gmail.com",
    password: "12345",
    confirmPassword: "12345",
  });

  clickOnSubmitBtn();

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
