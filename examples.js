export const exampleInput = `
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

/** Note this GPT generated code is wrong - it nests everything under Profile */
const exampleOutput = describe("App", () => {
  it.todo("Should initialize correctly");
  describe("User Component", () => {
    it.todo("Can login");
    it.todo("Can logout");
    describe("Profile", () => {
      it.todo("Should display user information");
      it.todo("Should allow updating user information");
      describe("Settings Context", () => {
        it.todo("Should save user preferences");
        describe("Notifications", () => {
          it.todo("Should send email notifications");
          it.todo("Should send SMS notifications");
          it.todo("Should shut down correctly");
          describe("Database Component", () => {
            it.todo("Should connect to the server");
            describe("Queries", () => {
              it.todo("Should execute SELECT statements");
              it.todo("Should execute INSERT statements");
              it.todo("Should execute UPDATE statements");
              describe("Transactions Context", () => {
                it.todo("Should begin a transaction");
                it.todo("Should commit a transaction");
                it.todo("Should rollback a transaction");
              });
            });
          });
        });
      });
    });
  });
});
