export const DEFAULT_MESSAGES = {
  NETWORK_ERROR: "Neural Link connection lost. Please check your connection and try again.",
  SERVER_ERROR: "Neural Link systems experiencing technical difficulties. Please try again later.",
  AI_ERROR: "AI Core temporarily unavailable. Initiating backup response protocols.",
  CHAT_HISTORY_ERROR: "Unable to retrieve message history. Security protocols engaged.",
  CLEAR_HISTORY_ERROR: "Unable to clear message history. Please try again later."
};

export const getErrorMessage = (error: any): string => {
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }
  
  if (error?.message?.includes('Network Error')) {
    return DEFAULT_MESSAGES.NETWORK_ERROR;
  }
  
  return DEFAULT_MESSAGES.SERVER_ERROR;
};