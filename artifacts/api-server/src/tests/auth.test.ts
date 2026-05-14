import { describe, it, expect, vi, beforeEach } from "vitest";
import { signToken, verifyToken } from "../middleware/jwtAuth.js";

// Unit tests for JWT utilities — no DB required
describe("JWT utilities", () => {
  const payload = { sub: 1, username: "testuser", role: "user" };

  it("signs and verifies a token successfully", () => {
    const token = signToken(payload);
    expect(typeof token).toBe("string");

    const decoded = verifyToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.sub).toBe(1);
    expect(decoded?.username).toBe("testuser");
    expect(decoded?.role).toBe("user");
  });

  it("returns null for an invalid token", () => {
    const result = verifyToken("invalid.token.here");
    expect(result).toBeNull();
  });

  it("returns null for a tampered token", () => {
    const token = signToken(payload);
    const tampered = token.slice(0, -5) + "XXXXX";
    expect(verifyToken(tampered)).toBeNull();
  });

  it("includes expected fields in the payload", () => {
    const token = signToken({ sub: 42, username: "doctor", role: "professional" });
    const decoded = verifyToken(token);
    expect(decoded?.sub).toBe(42);
    expect(decoded?.role).toBe("professional");
  });
});
