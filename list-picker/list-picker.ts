export function filterList(
  list: string[],
  criteria: number | string
): string[] {
  if (!Array.isArray(list) || !list.every((item) => typeof item === "string"))
    throw new Error("Invalid list: Expected an array of strings.");

  if (typeof criteria === "number") {
    const index = criteria >= 0 ? criteria - 1 : list.length + criteria;
    return list[index] ? [list[index]] : [];
  }

  if (typeof criteria === "string") {
    return list.filter((item) => item.includes(criteria));
  }

  throw new Error("Invalid criteria: Expected a number or string.");
}
