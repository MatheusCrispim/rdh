import { describe, expect, it } from "bun:test";
import { PatientNotFoundError } from "../errors";
import { getPatientById, getPatients, getPatientsByStatus } from "../service";

describe("getPatients", () => {
  it("returns all 8 mock patients", () => {
    expect(getPatients()).toHaveLength(8);
  });
});

describe("getPatientsByStatus", () => {
  it("returns only waiting patients", () => {
    const result = getPatientsByStatus("waiting");
    expect(result.every((p) => p.status === "waiting")).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("returns only done patients", () => {
    const result = getPatientsByStatus("done");
    expect(result.every((p) => p.status === "done")).toBe(true);
  });
});

describe("getPatientById", () => {
  it("returns the correct patient", () => {
    const patient = getPatientById("1");
    expect(patient.name).toBe("Alice Johnson");
  });

  it("throws PatientNotFoundError for invalid id", () => {
    expect(() => getPatientById("999")).toThrow(PatientNotFoundError);
  });
});
