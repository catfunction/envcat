import { act, fireEvent, render, screen } from "@testing-library/react";
import AddVariableForm from "@src/application/project/components/addVariableForm";
import createVariables from "@src/application/project/actions/createVariables";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: jest.fn() }),
}));
jest.mock("@src/application/project/actions/createVariables", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("@src/components/ui/checkbox");

describe("Add Variables should", () => {
  const ENVIRONMENTS = ["staging", "production"];

  it("Add a array of variables", async () => {
    const createVariablesMock = createVariables as jest.Mock;

    render(<AddVariableForm environments={ENVIRONMENTS} />);

    await act(async () => {
      fireEvent.click(screen.getByText(/ADD NEW/i));
    });

    fireEvent.change(screen.getByRole("textbox", { name: /0.name/i }), {
      target: { value: "KEY_TEST" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /0.value/i }), {
      target: { value: "value" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /1.name/i }), {
      target: { value: "KEY_TEST_2" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /1.value/i }), {
      target: { value: "value_2" },
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Save/i));
    });

    expect(createVariablesMock).toHaveBeenCalledWith({
      environments: [],
      variables: [
        { name: "KEY_TEST", value: "value" },
        { name: "KEY_TEST_2", value: "value_2" },
      ],
    });
  });
});
