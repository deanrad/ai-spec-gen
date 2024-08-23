import { transform } from "./transformer-gpt";
import { expect, describe, it } from "vitest";

const exampleInput = `
Describe: App
  It: Should initialize correctly
  Component: User
    It: Can login
    It: Can logout
    Describe: Profile
      It: Should display user information
      It: Should allow updating user information
  Context: Settings
    It: Should save user preferences
    Describe: Notifications
      It: Should send email notifications
      It: Should send SMS notifications
  It: Should shut down correctly
Component: Database
  It: Should connect to the server
  Describe: Queries
    It: Should execute SELECT statements
    It: Should execute INSERT statements
    It: Should execute UPDATE statements
    Context: Transactions
      It: Should begin a transaction
      It: Should commit a transaction
      It: Should rollback a transaction
`;

const expectedOutput = `
describe("App", () => {
  it.todo("Should initialize correctly")
  describe("User Component", () => {
    it.todo("Can login")
    it.todo("Can logout")
    describe("Profile", () => {
      it.todo("Should display user information")
      it.todo("Should allow updating user information")
    })
  })
  describe("Settings Context", () => {
    it.todo("Should save user preferences")
    describe("Notifications", () => {
      it.todo("Should send email notifications")
      it.todo("Should send SMS notifications")
    })
  })
  it.todo("Should shut down correctly")
})
describe("Database Component", () => {
  it.todo("Should connect to the server")
  describe("Queries", () => {
    it.todo("Should execute SELECT statements")
    it.todo("Should execute INSERT statements")
    it.todo("Should execute UPDATE statements")
    describe("Transactions Context", () => {
      it.todo("Should begin a transaction")
      it.todo("Should commit a transaction")
      it.todo("Should rollback a transaction")
    })
  })
})
`.trim();

describe("transform", () => {
  it("transforms the input correctly", () => {
    expect(transform(exampleInput.trim())).toBe(expectedOutput);
  });

  it("handles an empty input", () => {
    expect(transform("")).toBe("");
  });

  it("handles a simple input with Describe only", () => {
    const input = `
Describe: Simple
  It: Works
    `.trim();

    const output = `
describe("Simple", () => {
  it.todo("Works")
})
    `.trim();

    expect(transform(input)).toBe(output);
  });

  it("handles a simple input with Component only", () => {
    const input = `
Component: Simple
  It: Works
    `.trim();

    const output = `
describe("Simple Component", () => {
  it.todo("Works")
})
    `.trim();

    expect(transform(input)).toBe(output);
  });

  it("handles a simple input with Context only", () => {
    const input = `
Context: Simple
  It: Works
    `.trim();

    const output = `
describe("Simple Context", () => {
  it.todo("Works")
})
    `.trim();

    expect(transform(input)).toBe(output);
  });

  it("handles nested Describe, Component, and Context", () => {
    const input = `
Describe: Outer
  Component: Middle
    Context: Inner
      It: Works
    `.trim();

    const output = `
describe("Outer", () => {
  describe("Middle Component", () => {
    describe("Inner Context", () => {
      it.todo("Works")
    })
  })
})
    `.trim();

    expect(transform(input)).toBe(output);
  });
});
