CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  display_name text NOT NULL,
  role text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  employee_number text UNIQUE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  role text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  phone text,
  email text,
  hire_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_number text UNIQUE,
  display_name text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  program text,
  coordinator_user_id uuid REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id),
  credential_type text NOT NULL,
  issued_at date,
  expires_at date,
  status text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS training_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id),
  training_name text NOT NULL,
  completed_at date,
  expires_at date,
  status text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS authorizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id),
  program text NOT NULL,
  authorization_number text,
  authorized_units numeric,
  used_units numeric NOT NULL DEFAULT 0,
  effective_date date,
  expiration_date date,
  status text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  authorization_id uuid REFERENCES authorizations(id),
  service_code text,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS care_plan_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id),
  service_id uuid REFERENCES services(id),
  task_name text NOT NULL,
  frequency text,
  assistance_level text,
  effective_date date,
  end_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS employee_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id),
  client_id uuid NOT NULL REFERENCES clients(id),
  assignment_role text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS shifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id),
  employee_id uuid REFERENCES employees(id),
  service_id uuid REFERENCES services(id),
  scheduled_start timestamptz NOT NULL,
  scheduled_end timestamptz NOT NULL,
  status text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS evv_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shift_id uuid NOT NULL REFERENCES shifts(id),
  employee_id uuid REFERENCES employees(id),
  client_id uuid NOT NULL REFERENCES clients(id),
  scheduled_start timestamptz NOT NULL,
  scheduled_end timestamptz NOT NULL,
  actual_clock_in timestamptz,
  actual_clock_out timestamptz,
  status text NOT NULL,
  location_verification_status text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS visit_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  evv_visit_id uuid NOT NULL REFERENCES evv_visits(id),
  care_plan_task_id uuid REFERENCES care_plan_tasks(id),
  status text NOT NULL,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS visit_documentation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  evv_visit_id uuid NOT NULL REFERENCES evv_visits(id),
  note text,
  observations text,
  follow_up_needed boolean NOT NULL DEFAULT false,
  incident_occurred boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS evv_exceptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  evv_visit_id uuid NOT NULL REFERENCES evv_visits(id),
  exception_type text NOT NULL,
  severity text NOT NULL,
  status text NOT NULL,
  assigned_reviewer_id uuid REFERENCES users(id),
  supporting_information text,
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

CREATE TABLE IF NOT EXISTS billing_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id),
  evv_visit_id uuid REFERENCES evv_visits(id),
  status text NOT NULL,
  units numeric,
  payer_program text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_findings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  record_type text NOT NULL,
  record_id uuid NOT NULL,
  category text NOT NULL,
  severity text NOT NULL,
  description text NOT NULL,
  status text NOT NULL,
  requires_human_review boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  action text NOT NULL,
  record_type text NOT NULL,
  record_id uuid,
  original_value jsonb,
  new_value jsonb,
  reason text NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
