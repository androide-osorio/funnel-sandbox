import { FunnelProcessorErrors } from "../services/funnel-processor";

export function getErrorText(error: FunnelProcessorErrors) {
  switch (error) {
    case FunnelProcessorErrors.FILE_PARSE_ERROR:
      return "Please upload a valid funnel file. It should be a .json file with valid JSON code.";
    case FunnelProcessorErrors.FILE_READ_ERROR:
      return "We don't have permission to read the file you uploaded. Please try again.";
    default:
      return "An unknown error occurred.";
  }
}
