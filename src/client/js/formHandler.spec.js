import { handleSubmit } from "./formHandlers";

describe("Form Submit function tests", () => {
  test("form submit function should be defined", () => {
    expect(handleSubmit).toBeDefined();
  });
  test("submit handler should be a function", () => {
    expect(typeof handleSubmit).toBe("function");
  });
});
