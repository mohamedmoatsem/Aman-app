import { describe, it, expect } from "vitest";

// Pure logic test for the consecutive low-mood detection algorithm
// Mirrors the logic in jitai.ts without importing the route (no DB dependency)

const LOW_MOOD_THRESHOLD = 2;
const CONSECUTIVE_DAYS_REQUIRED = 3;

function hasConsecutiveLowMoodDays(
  logs: { log_date: string; score: number }[]
): boolean {
  if (logs.length < CONSECUTIVE_DAYS_REQUIRED) return false;

  const sorted = [...logs].sort(
    (a, b) => new Date(b.log_date).getTime() - new Date(a.log_date).getTime()
  );

  let consecutiveCount = 0;
  let prevDate: Date | null = null;

  for (const log of sorted) {
    const currentDate = new Date(log.log_date);
    if (log.score <= LOW_MOOD_THRESHOLD) {
      if (prevDate === null) {
        consecutiveCount = 1;
      } else {
        const dayDiff = Math.round(
          (prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        consecutiveCount = dayDiff === 1 ? consecutiveCount + 1 : 1;
      }
      prevDate = currentDate;
      if (consecutiveCount >= CONSECUTIVE_DAYS_REQUIRED) return true;
    } else {
      consecutiveCount = 0;
      prevDate = null;
    }
  }
  return false;
}

describe("JITAI: hasConsecutiveLowMoodDays", () => {
  it("returns false with fewer than 3 logs", () => {
    expect(
      hasConsecutiveLowMoodDays([
        { log_date: "2024-01-01", score: 1 },
        { log_date: "2024-01-02", score: 1 },
      ])
    ).toBe(false);
  });

  it("returns true for 3 consecutive low-mood days", () => {
    expect(
      hasConsecutiveLowMoodDays([
        { log_date: "2024-01-01", score: 1 },
        { log_date: "2024-01-02", score: 2 },
        { log_date: "2024-01-03", score: 1 },
      ])
    ).toBe(true);
  });

  it("returns false when streak is broken", () => {
    expect(
      hasConsecutiveLowMoodDays([
        { log_date: "2024-01-01", score: 1 },
        { log_date: "2024-01-02", score: 4 }, // high mood breaks streak
        { log_date: "2024-01-03", score: 1 },
      ])
    ).toBe(false);
  });

  it("returns false for logs with gap of 2 days between them", () => {
    expect(
      hasConsecutiveLowMoodDays([
        { log_date: "2024-01-01", score: 1 },
        { log_date: "2024-01-03", score: 1 }, // gap of 2 days
        { log_date: "2024-01-05", score: 1 },
      ])
    ).toBe(false);
  });

  it("returns true when streak of 4 consecutive low-mood days exists", () => {
    expect(
      hasConsecutiveLowMoodDays([
        { log_date: "2024-01-01", score: 0 },
        { log_date: "2024-01-02", score: 1 },
        { log_date: "2024-01-03", score: 2 },
        { log_date: "2024-01-04", score: 1 },
      ])
    ).toBe(true);
  });

  it("handles score exactly at threshold (2) as low", () => {
    expect(
      hasConsecutiveLowMoodDays([
        { log_date: "2024-01-01", score: 2 },
        { log_date: "2024-01-02", score: 2 },
        { log_date: "2024-01-03", score: 2 },
      ])
    ).toBe(true);
  });

  it("returns false when score is above threshold (3)", () => {
    expect(
      hasConsecutiveLowMoodDays([
        { log_date: "2024-01-01", score: 3 },
        { log_date: "2024-01-02", score: 3 },
        { log_date: "2024-01-03", score: 3 },
      ])
    ).toBe(false);
  });
});
