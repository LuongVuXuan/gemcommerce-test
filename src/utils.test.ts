import { describe, it, expect } from "vitest";
import { normalizeInputValue } from "./utils";

describe("normalizeInputValue", () => {
  it("should return 123 for '123a'", () => {
    expect(normalizeInputValue("123a", "px")).toBe("123");
  });
  it("should return 12 for '12a3'", () => {
    expect(normalizeInputValue("12a3", "px")).toBe("12");
  });
  it("should return 0 for 'a123'", () => {
    expect(normalizeInputValue("a123", "px")).toBe("0");
  });
  it("should return 12.4 for '12.4.5'", () => {
    expect(normalizeInputValue("12.4.5", "px")).toBe("12.4");
  });
  it("should clamp to 100 for '123' with %", () => {
    expect(normalizeInputValue("123", "%")).toBe("100");
  });
  it("should clamp to 0 for '-5'", () => {
    expect(normalizeInputValue("-5", "px")).toBe("0");
  });
  it("should return 0 for ''", () => {
    expect(normalizeInputValue("", "px")).toBe("0");
  });
  it("should clamp to 0 for '-100' with %", () => {
    expect(normalizeInputValue("-100", "%")).toBe("0");
  });
  it("should return 0 for 'abc'", () => {
    expect(normalizeInputValue("abc", "px")).toBe("0");
  });
});
