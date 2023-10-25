import { useFunnelStore } from "./index";
import {
  FunnelProcessor,
  FunnelProcessorErrors,
} from "@/services/funnel-processor";

// Mock the FunnelProcessor module
const processorMock = {
  readFunnelFromFile: jest.fn(),
};
jest.mock("@/services/funnel-processor", () => ({
  FunnelProcessor: () => processorMock,
}));

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

describe("useFunnelStore", () => {
  it("should add a funnel to the store", () => {
    useFunnelStore.getState().addFunnel(testFunnel);
    expect(useFunnelStore.getState().funnels).toContainEqual(testFunnel);
  });

  it("should remove a funnel from the store", () => {
    useFunnelStore.getState().addFunnel(testFunnel);
    useFunnelStore.getState().removeFunnel(testFunnel.id);
    expect(useFunnelStore.getState().funnels).not.toContainEqual(testFunnel);
  });

  it("should add a funnel from a file to the store", async () => {
    const json = { name: "Test Funnel" };

    // Mock the FunnelProcessor.process() method
    (processorMock.readFunnelFromFile as jest.Mock).mockResolvedValueOnce({
      name: "test.json",
      data: json,
    });

    const jsonString = JSON.stringify(json);
    const blob = new Blob([jsonString], { type: "application/json" });
    const file = new File([blob], "test.json", { type: "application/json" });
    const funnel = { id: expect.any(String), ...json };
    const id = await useFunnelStore.getState().addFunnelFromFile(file);
    expect(id).toEqual(funnel.id);
    expect(useFunnelStore.getState().funnels).toContainEqual(funnel);
  });

  it("should throw an error when adding an invalid file", async () => {
    (processorMock.readFunnelFromFile as jest.Mock).mockRejectedValueOnce(
      new Error("1"),
    );
    const file = new File([""], "test.txt", { type: "text/plain" });
    await expect(
      useFunnelStore.getState().addFunnelFromFile(file),
    ).rejects.toThrow();
  });
});
