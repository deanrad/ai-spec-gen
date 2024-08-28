export function filterList(
  list: string[],
  criteria: number | string
): string[] {
  if (!Array.isArray(list) || !list.every((item) => typeof item === "string"))
    throw new Error("Invalid list: Expected an array of strings.");
  if (typeof criteria === "number")
    return list[criteria - 1] ? [list[criteria - 1]] : [];
  if (typeof criteria === "string")
    return list.filter((item) => item.includes(criteria));
  throw new Error("Invalid criteria: Expected a number or string.");
}
