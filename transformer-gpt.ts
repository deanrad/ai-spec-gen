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

export function transform(input: string): string {
  const lines = input.split("\n");

  function processLines(lines: string[], indentLevel = 0): [string[], number] {
    const result: string[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();
      const currentIndentLevel = lines[i].match(/^ */)![0].length;
      const indent = "  ".repeat(indentLevel);

      if (currentIndentLevel < indentLevel * 2) {
        break;
      }

      if (line.startsWith("Describe:")) {
        const description = line.slice("Describe:".length).trim();
        result.push(`${indent}describe("${description}", () => {`);
        const [nestedResult, consumedLines] = processLines(
          lines.slice(i + 1),
          indentLevel + 1
        );
        result.push(...nestedResult);
        result.push(`${indent}})`);
        i += consumedLines + 1;
      } else if (line.startsWith("Component:")) {
        const component = line.slice("Component:".length).trim();
        result.push(`${indent}describe("${component} Component", () => {`);
        const [nestedResult, consumedLines] = processLines(
          lines.slice(i + 1),
          indentLevel + 1
        );
        result.push(...nestedResult);
        result.push(`${indent}})`);
        i += consumedLines + 1;
      } else if (line.startsWith("Context:")) {
        const context = line.slice("Context:".length).trim();
        result.push(`${indent}describe("${context} Context", () => {`);
        const [nestedResult, consumedLines] = processLines(
          lines.slice(i + 1),
          indentLevel + 1
        );
        result.push(...nestedResult);
        result.push(`${indent}})`);
        i += consumedLines + 1;
      } else if (line.startsWith("It:")) {
        const it = line.slice("It:".length).trim();
        result.push(`${indent}it.todo("${it}")`);
        i++;
      } else {
        i++;
      }
    }

    return [result, i];
  }

  return processLines(lines)[0].join("\n");
}

// Enable console
if (process.argv[2] === "--example") {
  console.log(transform(exampleInput));
}
