# CareOS v0.1

CareOS is a private prototype for home-care agency operations. It currently uses fictional demo records and an in-memory application state.

## Current demo status

The working prototype includes Command Center, Employees, Clients, Scheduling, EVV, Incidents & MUIs, Billing, AI Audit, Integrations, and Reports navigation. Demo workflows include employee/client creation, assignments, scheduling, EVV visit progression, review queues, and Billing handoff previews.

The sidebar displays `DEMO MODE`. Demo data resets when the app restarts and is not intended for real PHI.

## Architecture

```text
src/
	components/       Shared UI extraction boundary
	context/          CareOSProvider, permissions, current demo user
	data/             Demo-data boundary
	hooks/             Reusable service request/error state
	models/           Core CareOS record factories and IDs
	modules/          Module extraction boundaries
	services/         Demo-backed service adapters and future API boundary
	utils/            Audit-log helpers and cross-cutting utilities
	main.jsx          Current composed prototype shell and route screens
	styles.css        Existing premium CareOS visual system
```

The service layer exposes `employeeService`, `clientService`, `scheduleService`, `evvService`, `billingService`, `incidentService`, and `auditService`. They currently operate on in-memory demo records and can later be replaced with secure API implementations without changing module contracts.

## Security and compliance limitations

- This is prototype/private development, not a production HIPAA environment.
- Do not enter real PHI or sensitive production records.
- CareOS is not currently connected to Medicaid, Sandata, Xoomia, ADP, or payer APIs.
- CareOS does not submit claims or provide Medicaid/legal compliance determinations.
- AI findings are potential findings requiring authorized human review.
- No passwords, API keys, database credentials, or secrets belong in source control.
- The prototype does not use browser localStorage for sensitive data.
- Demo permissions are a UI foundation only; future backend authorization must enforce access server-side.

## Audit and backend plan

`src/utils/auditLog.js` defines an append-only event shape containing user ID, action, record type, record ID, original value, new value, reason, and timestamp. The current provider keeps these events in memory. A future backend should preserve original values, enforce role permissions server-side, add authentication, encrypt data in transit and at rest, and provide durable audit history.

## Run locally

1. Install Node.js.
2. Run `npm install`.
3. Copy `.env.example` to a private local `.env` only when configuration is needed.
4. Run `npm run dev`.

## Future backend

The next production-style phase should introduce a secure API and database behind the existing service interfaces, with authentication, authorization, validation, observability, backups, retention controls, vendor agreements, and compliance review. Real integrations and production data are intentionally out of scope for this phase.

## Phase 2 backend foundation

The backend lives in `/server` and follows this boundary:

```text
CareOS React frontend -> Express REST API -> PostgreSQL
```

### Backend structure

```text
server/
	migrations/001_initial_schema.sql
	src/
		app.js
		server.js
		config/env.js
		config/database.js
		middleware/errorHandler.js
		routes/health.js
		routes/index.js
	test/health.test.js
```

The initial migration defines UUID-based tables for users, employees, clients, credentials, training records, authorizations, services, care-plan tasks, assignments, shifts, EVV visits, visit tasks, documentation, EVV exceptions, incidents, billing records, audit findings, and audit logs. It is schema-only: the current React demo does not read or write PostgreSQL.

### Run the frontend

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

### Run the backend

Copy `.env.example` to `.env` and set development-only PostgreSQL values, then run:

```bash
npm run server:dev
```

Or run the production-style Node entrypoint:

```bash
npm run server:start
```

The API runs on `http://localhost:3001` by default.

Health checks:

```text
GET /api/health       API process health
GET /api/health/db    PostgreSQL connectivity health
```

Without `DATABASE_URL`, the API still starts and `/api/health` works; `/api/health/db` reports an unconfigured database with HTTP `503`. The resource routes are intentionally placeholders until secure authorization and persistence work is approved.

### Run tests and build

```bash
npm run server:test
npm run build
```

### Database migrations

The version-controlled migration system lives in `server/migrations`. It uses a `schema_migrations` table, applies migrations in filename order inside a transaction, and skips versions already recorded as applied. It does not run automatically when the API starts.

```bash
# Show pending/applied migration status
npm run db:status

# Apply pending migrations
npm run db:migrate
```

Both commands require `DATABASE_URL`. Do not run `npm run db:migrate` against the Render UAT/production database during this development phase. The migration is designed not to drop existing tables or data, but execution still requires an explicit database change review.

Do not place database passwords, API keys, PHI, or production credentials in source code. PostgreSQL must remain server-side and must never be exposed directly to the browser. CareOS is not currently HIPAA compliant or connected to Medicaid, Sandata, Xoomia, ADP, or payer systems.
