import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("returns empty string when no arguments provided", () => {
    expect(cn()).toBe("");
  });

  it("handles single class string", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("merges multiple class strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters out falsy values", () => {
    expect(cn("foo", false, "bar", null, undefined, 0, "")).toBe("foo bar");
  });

  it("handles conditional classes with objects", () => {
    expect(cn("foo", { bar: true, baz: false })).toBe("foo bar");
  });

  it("handles arrays of classes", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });

  it("handles nested arrays", () => {
    expect(cn(["foo", ["bar", "baz"]])).toBe("foo bar baz");
  });

  it("merges conflicting Tailwind classes correctly", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("handles Tailwind color conflicts", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles Tailwind size conflicts", () => {
    expect(cn("w-4", "w-8")).toBe("w-8");
  });

  it("preserves non-conflicting Tailwind classes", () => {
    expect(cn("px-2", "py-4", "mx-auto")).toBe("px-2 py-4 mx-auto");
  });

  it("handles responsive Tailwind classes", () => {
    expect(cn("md:text-lg", "md:text-xl")).toBe("md:text-xl");
  });

  it("handles state variants", () => {
    expect(cn("hover:bg-blue-500", "hover:bg-red-500")).toBe(
      "hover:bg-red-500"
    );
  });

  it("combines clsx features with tailwind-merge", () => {
    const isActive = true;
    const isDisabled = false;
    expect(
      cn(
        "base-class",
        "px-2",
        {
          "active-class": isActive,
          "disabled-class": isDisabled,
        },
        "px-4"
      )
    ).toBe("base-class active-class px-4");
  });
});
