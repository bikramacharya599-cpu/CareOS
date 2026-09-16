// Backend boundary placeholder. No network calls are made in demo mode.
export const apiClient = {
  async request() {
    throw new Error("CareOS backend API is not connected in demo mode.");
  },
};
