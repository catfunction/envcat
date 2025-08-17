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
jest.mock("@src/application/project/components/createEnvironment", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-create-environment" />,
}));

describe("Add Variables should", () => {
  const ENVIRONMENTS = [
    { id: "staging", name: "Staging" },
    { id: "production", name: "Production" },
  ];

  it.skip("Add a array of variables", async () => {
    const createVariablesMock = createVariables as jest.Mock;

    render(
      <AddVariableForm environments={ENVIRONMENTS} projectId="test-project" />
    );

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

    fireEvent.click(screen.getByLabelText("Staging"));

    await act(async () => {
      fireEvent.click(screen.getByText(/Save/i));
    });

    expect(createVariablesMock).toHaveBeenCalledWith({
      environments: ["staging"],
      variables: [
        { name: "KEY_TEST", value: "value" },
        { name: "KEY_TEST_2", value: "value_2" },
      ],
    });
  });
});
