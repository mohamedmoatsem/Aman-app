import { describe, expect, it } from "vitest";
import { extractFinalReply } from "../routes/chat.js";

describe("extractFinalReply", () => {
  it("removes internal think blocks from the response", () => {
    expect(
      extractFinalReply("<think>internal reasoning</think>\n\nأنا هنا معك.")
    ).toBe("أنا هنا معك.");
  });

  it("chooses the final Arabic response when English text follows it", () => {
    expect(
      extractFinalReply("الرد السابق.\n\nهذا ردّك النهائي.\n\nHere is an explanation.")
    ).toBe("هذا ردّك النهائي.");
  });

  it("preserves a complete English-only response", () => {
    expect(extractFinalReply("I am here with you. Tell me what feels hardest.")).toBe(
      "I am here with you. Tell me what feels hardest."
    );
  });

  it("returns an empty string when the response only contains a think block", () => {
    expect(extractFinalReply("<think>internal reasoning</think>")).toBe("");
  });
});
