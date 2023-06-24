import SignIn from "@src/application/signIn";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { signIn as SignInAuth } from "next-auth/react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("Sign In should", () => {
  it("Redirect to home page after successful login", async () => {
    const replace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace,
    });
    (SignInAuth as jest.Mock).mockResolvedValue({});

    render(<SignIn />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "email@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(replace).toBeCalledWith("/");
  });

  it("Show error if the credentials are invalid", async () => {
    (SignInAuth as jest.Mock).mockResolvedValue({
      error: "InvalidCredentials",
    });

    render(<SignIn />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "email@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(screen.getByText(/Email or password does not match/i)).toBeTruthy();
  });

  it("Show error if the server returns an error", async () => {
    (SignInAuth as jest.Mock).mockRejectedValue({});

    render(<SignIn />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "email@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(screen.getByText(/Email or password does not match/i)).toBeTruthy();
  });

  it("Show error message on form validation", async () => {
    render(<SignIn />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(screen.getByText(/Invalid email/i)).toBeTruthy();
    expect(
      screen.getByText(/String must contain at least 6 character/i),
    ).toBeTruthy();
  });
});
