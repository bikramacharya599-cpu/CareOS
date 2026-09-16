import { createContext, useContext, useMemo, useState } from "react";
import { createAuditEvent } from "../utils/auditLog";

const CareOSContext = createContext(null);

export function CareOSProvider({ children }) {
  const [auditEvents, setAuditEvents] = useState([]);
  const value = useMemo(() => ({
    mode: "demo",
    currentUser: { id: "demo-admin", role: "Administrator", name: "Jordan Davis" },
    auditEvents,
    recordAuditEvent: (event) => setAuditEvents((current) => [...current, createAuditEvent(event)]),
  }), [auditEvents]);
  return <CareOSContext.Provider value={value}>{children}</CareOSContext.Provider>;
}

export function useCareOS() {
  const context = useContext(CareOSContext);
  if (!context) throw new Error("useCareOS must be used inside CareOSProvider");
  return context;
}
