import { Funnel, FunnelWithId } from "../store/types";

interface ParsedFunnel {
  name: string;
  data: Funnel;
}

type FunnelProcessor = {
  readFunnelFromFile(file: File): Promise<ParsedFunnel>;
  writeFunnelToFile(json: FunnelWithId): Promise<File>;
};

export function FunnelProcessor(): FunnelProcessor {
  async function readFunnelFromFile(file: File): Promise<ParsedFunnel> {
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
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(reader.error);
      };

      reader.readAsText(file);
    });
  }

  async function writeFunnelToFile(funnel: Funnel): Promise<File> {
    const blob = new Blob([JSON.stringify(funnel)], {
      type: "application/json",
    });
    return new File([blob], `${funnel.name}.json`, {
      type: "application/json",
    });
  }

  return {
    readFunnelFromFile,
    writeFunnelToFile,
  };
}
