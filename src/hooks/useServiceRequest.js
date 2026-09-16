import { useState } from "react";

export function useServiceRequest(serviceCall) {
  const [state, setState] = useState({ data: null, loading: false, error: null });
  const run = async (...args) => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await serviceCall(...args);
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      setState({ data: null, loading: false, error });
      return null;
    }
  };
  return { ...state, run };
}
