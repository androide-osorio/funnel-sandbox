import { FunnelProcessor, FunnelProcessorErrors } from "./funnel-processor";

const testFunnel = {
  id: "1",
  name: "Test Funnel",
  bgColor: "#000000",
  pages: [
    {
      id: "block1",
      blocks: [],
    },
  ],
};

describe("FunnelProcessor", () => {
  describe("readFunnelFromFile", () => {
    it("should parse a valid file and return a funnel object", async () => {
      const processor = FunnelProcessor();
      const jsonString = JSON.stringify(testFunnel);
      const blob = new Blob([jsonString], { type: "application/json" });
      const file = new File([blob], "test.json", { type: "application/json" });
      const result = await processor.readFunnelFromFile(file);
      expect(result).toEqual({ name: "test.json", data: testFunnel });
    });

    it("should reject with FILE_PARSE_ERROR when the file is not valid JSON", async () => {
      const processor = FunnelProcessor();
      const blob = new Blob(["invalid json"], { type: "application/json" });
      const file = new File([blob], "test.json", { type: "application/json" });
			expect(processor.readFunnelFromFile(file)).rejects.toThrow(FunnelProcessorErrors.FILE_PARSE_ERROR as any);
    });

    it("should reject with FILE_READ_ERROR when there is an error reading the file", async () => {
      const processor = FunnelProcessor();
      const file = new File([], "test.json", { type: "application/json" });
			expect(processor.readFunnelFromFile(file)).rejects.toThrow(
        FunnelProcessorErrors.FILE_READ_ERROR as any
      );
    });
  });
});