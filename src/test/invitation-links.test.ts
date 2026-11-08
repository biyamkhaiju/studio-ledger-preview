import { describe, it, expect } from "vitest";
import { guestSlug, parseGuestList, slugifyName, formatEventDate } from "@/lib/invitations";

describe("Guest invitation links", () => {
  it("builds the link from the guest's name", () => {
    expect(guestSlug("Sita Rai")).toMatch(/^sita-rai-[a-z2-9]{6}$/);
  });
  it("gives two guests with the same name different links", () => {
    expect(guestSlug("Ram Thapa")).not.toBe(guestSlug("Ram Thapa"));
  });
  it("keeps Nepali names readable in the link", () => {
    expect(slugifyName("सीता राई")).toBe("सीता-राई");
  });
  it("reads one guest per line with an optional relation", () => {
    expect(parseGuestList("Sita Rai, Aunt\n\nRam Thapa")).toEqual([{ name: "Sita Rai", relation: "Aunt" }, { name: "Ram Thapa", relation: "" }]);
  });
  it("shows the event date in words", () => {
    expect(formatEventDate("2027-02-14")).toBe("Sunday 14 February 2027");
  });
});
