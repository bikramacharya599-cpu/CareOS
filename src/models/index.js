// CareOS domain model factories. These keep IDs and relationships explicit while the app remains demo-only.
export const createRecord = (type, values = {}) => ({
  id: values.id || `${type.toUpperCase()}-${Date.now()}`,
  recordType: type,
  createdAt: values.createdAt || new Date().toISOString(),
  updatedAt: values.updatedAt || new Date().toISOString(),
  ...values,
});

export const User = (values) => createRecord("User", values);
export const Employee = (values) => createRecord("Employee", values);
export const Client = (values) => createRecord("Client", values);
export const Authorization = (values) => createRecord("Authorization", values);
export const Service = (values) => createRecord("Service", values);
export const CarePlan = (values) => createRecord("CarePlan", values);
export const CarePlanTask = (values) => createRecord("CarePlanTask", values);
export const EmployeeAssignment = (values) => createRecord("EmployeeAssignment", values);
export const Shift = (values) => createRecord("Shift", values);
export const EVVVisit = (values) => createRecord("EVVVisit", values);
export const VisitTask = (values) => createRecord("VisitTask", values);
export const VisitDocumentation = (values) => createRecord("VisitDocumentation", values);
export const EVVException = (values) => createRecord("EVVException", values);
export const Incident = (values) => createRecord("Incident", values);
export const MUIReview = (values) => createRecord("MUIReview", values);
export const BillingRecord = (values) => createRecord("BillingRecord", values);
export const Claim = (values) => createRecord("Claim", values);
export const AuditFinding = (values) => createRecord("AuditFinding", values);
export const Credential = (values) => createRecord("Credential", values);
export const TrainingRecord = (values) => createRecord("TrainingRecord", values);
export const AuditLog = (values) => createRecord("AuditLog", values);
