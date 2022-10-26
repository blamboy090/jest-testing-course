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

describe("App", () => {
  test("inputs should be initially empty", () => {
    expect(screen.getByLabelText(/email/i).value).toBe("");
    expect(screen.getByLabelText("Password").value).toBe("");
    expect(screen.getByLabelText(/confirm password/i).value).toBe("");
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

  describe("Error Handling", () => {
    beforeEach(() => {
      console.log("Hello");
    });
    test("should show email error message on invalid email", () => {
      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).not.toBeInTheDocument();
      typeIntoForm({ email: "annabellegmail.com" });
      clickOnSubmitBtn();
      expect(
        // eslint-disable-next-line testing-library/prefer-presence-queries
        screen.queryByText(/the email you input is invalid/i)
      ).toBeInTheDocument();
    });

    test("should show password error if password is less than 5 characters", () => {
      typeIntoForm({ email: "annabelle@gmail.com" });
      expect(
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i
        )
      ).not.toBeInTheDocument();
      typeIntoForm({ password: "123" });
      clickOnSubmitBtn();
      expect(
        // eslint-disable-next-line testing-library/prefer-presence-queries
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i
        )
      ).toBeInTheDocument();
    });

    test("should show confirm password error if passwords dont match", () => {
      typeIntoForm({ email: "annabelle@gmail.com", password: "12345" });
      expect(
        screen.queryByText(/the passwords don't match. try again/i)
      ).not.toBeInTheDocument();
      typeIntoForm({ confirmPassword: "ABCDEF" });
      clickOnSubmitBtn();
      expect(
        // eslint-disable-next-line testing-library/prefer-presence-queries
        screen.queryByText(/the passwords don't match. try again/i)
      ).toBeInTheDocument();
    });

    test("should show no error message if every input is valid", () => {
      typeIntoForm({
        email: "annabelle@gmail.com",
        password: "12345",
        confirmPassword: "12345",
      });
      clickOnSubmitBtn();
      expect(
        screen.queryByText(/the passwords don't match. try again/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i
        )
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/the email you input is invalid/i)
      ).not.toBeInTheDocument();
    });
  });
});
