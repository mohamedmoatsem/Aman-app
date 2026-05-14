import { describe, it, expect, vi } from "vitest";
import { z } from "zod";

// Zod schema matching the mood route validation
const MoodLogSchema = z.object({
  userId: z.string().min(1),
  moodIndex: z.number().int().min(0).max(4),
  moodLabel: z.string().min(1),
});

describe("MoodLog input validation", () => {
  it("accepts valid mood data", () => {
    const result = MoodLogSchema.safeParse({
      userId: "dev_12345_abc",
      moodIndex: 2,
      moodLabel: "محايد",
    });
    expect(result.success).toBe(true);
  });

  it("rejects moodIndex out of range", () => {
    const result = MoodLogSchema.safeParse({
      userId: "dev_12345_abc",
      moodIndex: 5,
      moodLabel: "test",
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative moodIndex", () => {
    const result = MoodLogSchema.safeParse({
      userId: "dev_12345",
      moodIndex: -1,
      moodLabel: "test",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing userId", () => {
    const result = MoodLogSchema.safeParse({ moodIndex: 0, moodLabel: "happy" });
    expect(result.success).toBe(false);
  });

  it("rejects empty userId", () => {
    const result = MoodLogSchema.safeParse({ userId: "", moodIndex: 1, moodLabel: "ok" });
    expect(result.success).toBe(false);
  });

  it("accepts all valid mood indices 0-4", () => {
    for (let i = 0; i <= 4; i++) {
      const result = MoodLogSchema.safeParse({ userId: "u1", moodIndex: i, moodLabel: "x" });
      expect(result.success).toBe(true);
    }
  });
});
