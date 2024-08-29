// filterList.test.ts
import { describe, test, expect } from "vitest";
import { filterList } from "./list-picker"; // Adjust the import path as necessary

describe("filterList", () => {
  describe("Basic Functionality", () => {
    test("returns the item at the 1-based index when criteria is a number", () => {
      const list = ["apple", "aardvark", "banana"];
      expect(filterList(list, 1)).toEqual(["apple"]);
      expect(filterList(list, 2)).toEqual(["aardvark"]);
      expect(filterList(list, 3)).toEqual(["banana"]);
    });

    test("returns items that contain the substring when criteria is a string", () => {
      const list = ["apple", "aardvark", "banana"];
      expect(filterList(list, "aa")).toEqual(["aardvark"]);
      expect(filterList(list, "a")).toEqual(["apple", "aardvark", "banana"]);
    });
  });

  describe("Edge Cases", () => {
    test("returns an empty array when the list is empty", () => {
      expect(filterList([], 1)).toEqual([]);
      expect(filterList([], "a")).toEqual([]);
    });

    test("returns an empty array when criteria is a number out of bounds", () => {
      const list = ["apple"];
      expect(filterList(list, 0)).toEqual([]);
      expect(filterList(list, 2)).toEqual([]);
    });

    test("returns an empty array when criteria is a string not found in any item", () => {
      const list = ["apple", "banana"];
      expect(filterList(list, "z")).toEqual([]);
    });

    test("returns an empty array if the criteria number is greater than list length", () => {
      const list = ["apple", "banana"];
      expect(filterList(list, 5)).toEqual([]);
    });

    test("returns an empty array if the criteria number is less than 1", () => {
      const list = ["apple", "banana"];
      expect(filterList(list, 0)).toEqual([]);
    });
  });

  describe("Boundary Cases", () => {
    test("returns the entire list when criteria is an empty string", () => {
      const list = ["apple", "banana"];
      expect(filterList(list, "")).toEqual(["apple", "banana"]);
    });

    test("handles special characters in the criteria string", () => {
      const list = ["apple$", "banana!"];
      expect(filterList(list, "!")).toEqual(["banana!"]);
      expect(filterList(list, "$")).toEqual(["apple$"]);
    });
  });

  describe("Error Handling", () => {
    test("throws an error when the list is not an array of strings", () => {
      expect(() => filterList(123 as any, "a")).toThrow(
        "Invalid list: Expected an array of strings."
      );
      expect(() => filterList([123, 456] as any, "a")).toThrow(
        "Invalid list: Expected an array of strings."
      );
    });

    test("throws an error when the criteria is not a number or string", () => {
      const list = ["apple", "banana"];
      expect(() => filterList(list, true as any)).toThrow(
        "Invalid criteria: Expected a number or string."
      );
      expect(() => filterList(list, {} as any)).toThrow(
        "Invalid criteria: Expected a number or string."
      );
    });
  });
});
