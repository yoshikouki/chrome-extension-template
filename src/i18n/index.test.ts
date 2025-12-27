import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock chrome.i18n API
const mockChrome = {
  i18n: {
    getMessage: vi.fn(),
    getUILanguage: vi.fn(),
    getAcceptLanguages: vi.fn(),
    detectLanguage: vi.fn(),
  },
};

vi.stubGlobal("chrome", mockChrome);

// Import after mocking
import {
  detectLanguage,
  getAcceptLanguages,
  getMessage,
  getUILanguage,
} from "./index";

describe("i18n", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getMessage", () => {
    it("should call chrome.i18n.getMessage with key only", () => {
      mockChrome.i18n.getMessage.mockReturnValue("Hello");

      const result = getMessage("hello");

      expect(mockChrome.i18n.getMessage).toHaveBeenCalledWith(
        "hello",
        undefined
      );
      expect(result).toBe("Hello");
    });

    it("should call chrome.i18n.getMessage with substitutions", () => {
      mockChrome.i18n.getMessage.mockReturnValue("count is 5");

      const result = getMessage("count", [5]);

      expect(mockChrome.i18n.getMessage).toHaveBeenCalledWith("count", ["5"]);
      expect(result).toBe("count is 5");
    });

    it("should convert number substitutions to strings", () => {
      mockChrome.i18n.getMessage.mockReturnValue("count is 42");

      getMessage("count", [42]);

      expect(mockChrome.i18n.getMessage).toHaveBeenCalledWith("count", ["42"]);
    });
  });

  describe("getUILanguage", () => {
    it("should return the UI language", () => {
      mockChrome.i18n.getUILanguage.mockReturnValue("en-US");

      const result = getUILanguage();

      expect(mockChrome.i18n.getUILanguage).toHaveBeenCalled();
      expect(result).toBe("en-US");
    });
  });

  describe("getAcceptLanguages", () => {
    it("should return accepted languages", async () => {
      const languages = ["en-US", "en", "ja"];
      mockChrome.i18n.getAcceptLanguages.mockResolvedValue(languages);

      const result = await getAcceptLanguages();

      expect(mockChrome.i18n.getAcceptLanguages).toHaveBeenCalled();
      expect(result).toEqual(languages);
    });
  });

  describe("detectLanguage", () => {
    it("should detect language of text", async () => {
      const detection = {
        isReliable: true,
        languages: [{ language: "en", percentage: 100 }],
      };
      mockChrome.i18n.detectLanguage.mockResolvedValue(detection);

      const result = await detectLanguage("Hello, world!");

      expect(mockChrome.i18n.detectLanguage).toHaveBeenCalledWith(
        "Hello, world!"
      );
      expect(result).toEqual(detection);
    });
  });
});
