import "@testing-library/jest-dom/extend-expect";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({}),
}));
