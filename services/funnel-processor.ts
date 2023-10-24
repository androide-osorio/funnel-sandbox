import { Funnel } from "@/types";

export type ParsedFunnel = {
  name: string;
  data: Funnel;
}

type FunnelProcessor = {
  readFunnelFromFile(file: File): Promise<ParsedFunnel | FunnelProcessorErrors>;
};

export enum FunnelProcessorErrors {
  FILE_READ_ERROR,
  FILE_PARSE_ERROR,
}

export function FunnelProcessor(): FunnelProcessor {
  async function readFunnelFromFile(file: File): Promise<ParsedFunnel | FunnelProcessorErrors> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string) as Funnel;
          const parsedFile: ParsedFunnel = {
            name: file.name,
            data,
          };
          resolve(parsedFile);
        } catch (error) {
          reject(FunnelProcessorErrors.FILE_PARSE_ERROR);
        }
      };

      reader.onerror = () => {
        reject(FunnelProcessorErrors.FILE_READ_ERROR);
      };

      reader.readAsText(file);
    });
  }

  return {
    readFunnelFromFile,
  };
}
