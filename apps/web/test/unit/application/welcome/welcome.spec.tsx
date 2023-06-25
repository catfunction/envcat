import Welcome from "@src/application/welcome/components/welcome";
import { act, fireEvent, render, screen } from "@testing-library/react";
import createAdminUser from "@src/application/welcome/actions/createAdminUser";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@src/application/welcome/actions/createAdminUser", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Welcome should", () => {
  it("Redirect to sign in page after successful create admin account", async () => {
    const replace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace,
    });
    (createAdminUser as jest.Mock).mockResolvedValue({});

    render(<Welcome />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "email@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(replace).toBeCalledWith("/signin");
  });

  it("Show error message on form validation", async () => {
    render(<Welcome />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(screen.getByText(/Invalid email/i)).toBeTruthy();
    expect(
      screen.getByText(/String must contain at least 6 character/i),
    ).toBeTruthy();
  });
});
