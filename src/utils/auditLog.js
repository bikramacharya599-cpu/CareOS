import { AuditLog } from "../models";

export function createAuditEvent({ userId = "demo-admin", action, recordType, recordId, originalValue = null, newValue = null, reason = "", timestamp = new Date().toISOString() }) {
  return AuditLog({ userId, action, recordType, recordId, originalValue, newValue, reason, timestamp });
}

export function appendAuditEvent(events = [], event) {
  return [...events, createAuditEvent(event)];
}
