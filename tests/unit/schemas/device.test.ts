import { createDeviceSchema, deleteDeviceSchema, getDeviceByBrandSchema, getDeviceByIdSchema, updateDeviceSchema } from "../../../src/schemas/device";

describe("Device Schemas", () => {
  describe("createDeviceSchema", () => {
    it("should validate a correct device", () => {
      const data = { name: "Device1", brand: "Brand1" };
      expect(() => createDeviceSchema.parse(data)).not.toThrow();
    });

    it("should throw an error if name is missing", () => {
      const data = { brand: "Brand1" };
      expect(() => createDeviceSchema.parse(data)).toThrow();
    });

    it("should throw an error if brand is missing", () => {
      const data = { name: "Device1" };
      expect(() => createDeviceSchema.parse(data)).toThrow();
    });

    it("should throw an error if name is only spaces", () => {
      const data = { name: "   ", brand: "Brand1" };
      expect(() => createDeviceSchema.parse(data)).toThrow("Name cannot be only spaces");
    });

    it("should throw an error if brand is only spaces", () => {
      const data = { name: "Device1", brand: "   " };
      expect(() => createDeviceSchema.parse(data)).toThrow("Brand cannot be only spaces");
    });
  });

  describe("deleteDeviceSchema", () => {
    it("should validate a correct id", () => {
      const data = { id: "123" };
      expect(() => deleteDeviceSchema.parse(data)).not.toThrow();
    });

    it("should throw an error if id is not a number", () => {
      const data = { id: "abc" };
      expect(() => deleteDeviceSchema.parse(data)).toThrow("ID must be a valid number");
    });
  });

  describe("getDeviceByBrandSchema", () => {
    it("should validate a correct brand", () => {
      const data = { brand: "Brand1" };
      expect(() => getDeviceByBrandSchema.parse(data)).not.toThrow();
    });

    it("should throw an error if brand is missing", () => {
      const data = { brand: "" };
      expect(() => getDeviceByBrandSchema.parse(data)).toThrow("Brand is required");
    });

    it("should throw an error if brand does not start with a letter or number", () => {
      const data = { brand: "-Brand1" };
      expect(() => getDeviceByBrandSchema.parse(data)).toThrow("Brand must start with a letter or number");
    });
  });

  describe("getDeviceByIdSchema", () => {
    it("should validate a correct id", () => {
      const data = { id: "123" };
      expect(() => getDeviceByIdSchema.parse(data)).not.toThrow();
    });

    it("should throw an error if id is missing", () => {
      const data = { id: "" };
      expect(() => getDeviceByIdSchema.parse(data)).toThrow("ID is required");
    });

    it("should throw an error if id is not a valid number", () => {
      const data = { id: "abc" };
      expect(() => getDeviceByIdSchema.parse(data)).toThrow("ID must be a valid number");
    });
  });

  describe("updateDeviceSchema", () => {
    it("should validate a correct update", () => {
      const data = { id: "123", name: "Device1" };
      expect(() => updateDeviceSchema.parse(data)).not.toThrow();
    });

    it("should throw an error if id is not a number", () => {
      const data = { id: "abc", name: "Device1" };
      expect(() => updateDeviceSchema.parse(data)).toThrow("Invalid device ID");
    });

    it("should throw an error if neither name nor brand is provided", () => {
      const data = { id: "123" };
      expect(() => updateDeviceSchema.parse(data)).toThrow("At least one of name or brand must be provided");
    });

    it("should validate if only name is provided", () => {
      const data = { id: "123", name: "Device1" };
      expect(() => updateDeviceSchema.parse(data)).not.toThrow();
    });

    it("should validate if only brand is provided", () => {
      const data = { id: "123", brand: "Brand1" };
      expect(() => updateDeviceSchema.parse(data)).not.toThrow();
    });
  });
});