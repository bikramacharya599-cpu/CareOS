CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS schema_migrations (
  version text PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text NOT NULL,
  email text UNIQUE,
  role text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE,
  phone text,
  status text NOT NULL DEFAULT 'active',
  hire_date date,
  role text NOT NULL,
  availability jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  payer_program text,
  service_type text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS employee_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id),
  credential_type text NOT NULL,
  issue_date date,
  expiration_date date,
  status text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS client_authorizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id),
  payer_program text NOT NULL,
  authorization_number text,
  service_type text NOT NULL,
  authorized_units numeric,
  used_units numeric NOT NULL DEFAULT 0,
  effective_date date,
  expiration_date date,
  status text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS client_employee_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id),
  employee_id uuid NOT NULL REFERENCES employees(id),
  assignment_role text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (client_id, employee_id, assignment_role)
);

CREATE TABLE IF NOT EXISTS shifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id),
  employee_id uuid REFERENCES employees(id),
  service_type text NOT NULL,
  scheduled_start timestamptz NOT NULL,
  scheduled_end timestamptz NOT NULL,
  actual_start timestamptz,
  actual_end timestamptz,
  status text NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (scheduled_end > scheduled_start)
);

CREATE TABLE IF NOT EXISTS evv_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shift_id uuid NOT NULL UNIQUE REFERENCES shifts(id),
  employee_id uuid NOT NULL REFERENCES employees(id),
  client_id uuid NOT NULL REFERENCES clients(id),
  clock_in_at timestamptz,
  clock_out_at timestamptz,
  latitude numeric(9,6),
  longitude numeric(9,6),
  verification_status text NOT NULL DEFAULT 'pending',
  exception_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS evv_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  evv_visit_id uuid NOT NULL REFERENCES evv_visits(id),
  task_name text NOT NULL,
  status text NOT NULL,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  employee_id uuid REFERENCES employees(id),
  evv_visit_id uuid REFERENCES evv_visits(id),
  status text NOT NULL,
  description text NOT NULL,
  requires_human_review boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mui_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_id uuid NOT NULL UNIQUE REFERENCES incidents(id),
  review_status text NOT NULL DEFAULT 'requires_authorized_review',
  reviewer_user_id uuid REFERENCES users(id),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS billing_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id),
  evv_visit_id uuid REFERENCES evv_visits(id),
  payer_program text,
  units numeric,
  status text NOT NULL,
  exception_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  action text NOT NULL,
  record_type text NOT NULL,
  record_id uuid,
  old_value jsonb,
  new_value jsonb,
  reason text NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_audit_findings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  record_type text NOT NULL,
  record_id uuid NOT NULL,
  category text NOT NULL,
  severity text NOT NULL,
  finding text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  advisory_only boolean NOT NULL DEFAULT true,
  requires_human_review boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_employee_credentials_employee_id ON employee_credentials(employee_id);
CREATE INDEX IF NOT EXISTS idx_client_authorizations_client_id ON client_authorizations(client_id);
CREATE INDEX IF NOT EXISTS idx_assignments_client_id ON client_employee_assignments(client_id);
CREATE INDEX IF NOT EXISTS idx_assignments_employee_id ON client_employee_assignments(employee_id);
CREATE INDEX IF NOT EXISTS idx_shifts_client_id ON shifts(client_id);
CREATE INDEX IF NOT EXISTS idx_shifts_employee_id ON shifts(employee_id);
CREATE INDEX IF NOT EXISTS idx_shifts_scheduled_start ON shifts(scheduled_start);
CREATE INDEX IF NOT EXISTS idx_evv_visits_client_id ON evv_visits(client_id);
CREATE INDEX IF NOT EXISTS idx_evv_visits_employee_id ON evv_visits(employee_id);
CREATE INDEX IF NOT EXISTS idx_evv_tasks_visit_id ON evv_tasks(evv_visit_id);
CREATE INDEX IF NOT EXISTS idx_incidents_client_id ON incidents(client_id);
CREATE INDEX IF NOT EXISTS idx_incidents_visit_id ON incidents(evv_visit_id);
CREATE INDEX IF NOT EXISTS idx_mui_records_incident_id ON mui_records(incident_id);
CREATE INDEX IF NOT EXISTS idx_billing_records_client_id ON billing_records(client_id);
CREATE INDEX IF NOT EXISTS idx_billing_records_visit_id ON billing_records(evv_visit_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_record ON audit_logs(record_type, record_id);
CREATE INDEX IF NOT EXISTS idx_ai_audit_findings_record ON ai_audit_findings(record_type, record_id);
CREATE INDEX IF NOT EXISTS idx_ai_audit_findings_status ON ai_audit_findings(status);
