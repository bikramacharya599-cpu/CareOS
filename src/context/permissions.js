export const ROLES = Object.freeze({
  ADMINISTRATOR: "Administrator",
  AGENCY_OWNER: "Agency Owner",
  SCHEDULER: "Scheduler",
  HR: "HR",
  BILLING: "Billing",
  CLINICAL_SUPERVISOR: "Clinical Supervisor",
  CARE_COORDINATOR: "Care Coordinator",
  CAREGIVER: "Caregiver",
  AUDITOR: "Auditor",
});

export const PERMISSIONS = Object.freeze({
  ownSchedule: "schedule:own",
  assignedClients: "clients:assigned",
  clockVisits: "evv:clock",
  documentVisits: "evv:document",
  reportIncidents: "incidents:report",
  schedules: "schedules:manage",
  assignments: "assignments:manage",
  billing: "billing:manage",
  evvReview: "evv:review",
  claims: "claims:manage",
  employees: "employees:manage",
  credentials: "credentials:manage",
  training: "training:manage",
  auditFindings: "audit:review",
  auditHistory: "audit:history",
  readOnlyRecords: "records:read",
  systemConfiguration: "system:configure",
});

export const ROLE_PERMISSIONS = Object.freeze({
  [ROLES.CAREGIVER]: [PERMISSIONS.ownSchedule, PERMISSIONS.assignedClients, PERMISSIONS.clockVisits, PERMISSIONS.documentVisits, PERMISSIONS.reportIncidents],
  [ROLES.SCHEDULER]: [PERMISSIONS.schedules, PERMISSIONS.assignments],
  [ROLES.BILLING]: [PERMISSIONS.billing, PERMISSIONS.evvReview, PERMISSIONS.claims],
  [ROLES.HR]: [PERMISSIONS.employees, PERMISSIONS.credentials, PERMISSIONS.training],
  [ROLES.AUDITOR]: [PERMISSIONS.auditFindings, PERMISSIONS.auditHistory, PERMISSIONS.readOnlyRecords],
  [ROLES.ADMINISTRATOR]: Object.values(PERMISSIONS),
  [ROLES.AGENCY_OWNER]: Object.values(PERMISSIONS),
  [ROLES.CLINICAL_SUPERVISOR]: [PERMISSIONS.assignedClients, PERMISSIONS.documentVisits, PERMISSIONS.reportIncidents, PERMISSIONS.auditFindings],
  [ROLES.CARE_COORDINATOR]: [PERMISSIONS.assignedClients, PERMISSIONS.assignments, PERMISSIONS.auditFindings],
});

export function can(role, permission) {
  return (ROLE_PERMISSIONS[role] || []).includes(permission);
}
