import React, { Component, useState } from "react";
import { createRoot } from "react-dom/client";
import { CareOSProvider, useCareOS } from "./context/CareOSContext";
import { employeeService, clientService, scheduleService } from "./services";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BadgeDollarSign,
  Bell,
  BrainCircuit,
  CalendarDays,
  CalendarRange,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  ClockAlert,
  ClipboardList,
  Contact,
  DollarSign,
  Eye,
  FileCheck2,
  FileClock,
  FileText,
  FileWarning,
  Gauge,
  Headphones,
  HeartPulse,
  History,
  LayoutDashboard,
  Link2,
  ListFilter,
  LockKeyhole,
  MapPin,
  Menu,
  MessageSquare,
  Network,
  Percent,
  PhoneCall,
  Play,
  Receipt,
  ReceiptText,
  RefreshCw,
  ScanSearch,
  Search,
  Send,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Square,
  Timer,
  UserCheck,
  UserPlus,
  UserRound,
  UsersRound,
  WalletCards,
  XCircle,
  Zap,
} from "lucide-react";
import "./styles.css";

function AuditCenter() {
  const [filter, setFilter] = useState("All Findings");
  const [auditMessage, setAuditMessage] = useState(
    "Last audit completed today at 9:42 AM",
  );
  const [reviewedFinding, setReviewedFinding] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [assignments, setAssignments] = useState({});

  const findings = [
    {
      severity: "Critical",
      subject: "Maria Rodriguez",
      category: "Employee Compliance",
      detected: "CPR certification expires in 3 days",
      why: "Credential expiry may interrupt eligibility for scheduled services.",
      records: "Employee profile · Credential vault",
      next: "Assign credential owner and verify renewal",
      assignee: "Jordan Davis",
      team: "Credential Admin",
      due: "Sep 19, 2026",
      status: "Needs human review",
      icon: UserCheck,
    },
    {
      severity: "Warning",
      subject: "Client 0048 · A. Thompson",
      category: "Authorization",
      detected: "DODD service units are at 81% utilization",
      why: "Current pace may approach the authorized unit threshold.",
      records: "Authorization · Service plan",
      next: "Review remaining units with care coordinator",
      assignee: "Maya Patel",
      team: "Care Coordination",
      due: "Sep 24, 2026",
      status: "Open",
      icon: Gauge,
    },
    {
      severity: "Review",
      subject: "Visit EVV-1082",
      category: "EVV Audit",
      detected: "Manual EVV correction detected",
      why: "The visit record differs from the scheduled service window.",
      records: "EVV visit · Schedule · Shift note",
      next: "Compare source records before approving",
      assignee: "Unassigned",
      team: "EVV Admin",
      due: "Sep 20, 2026",
      status: "Needs review",
      icon: MapPin,
    },
    {
      severity: "Warning",
      subject: "PASSPORT batch · Sep 16",
      category: "Billing Audit",
      detected: "2 completed services are not yet staged for billing",
      why: "Completed service records have no matching billing workflow item.",
      records: "Shift notes · EVV summary",
      next: "Reconcile completed services",
      assignee: "Jordan Davis",
      team: "Billing Admin",
      due: "Sep 21, 2026",
      status: "Open",
      icon: ReceiptText,
    },
    {
      severity: "Passed",
      subject: "Agency training records",
      category: "Documentation Audit",
      detected: "Required training records sampled",
      why: "No potential gaps found in the selected sample.",
      records: "Training register · Employee documents",
      next: "Continue periodic review",
      assignee: "CareOS system",
      due: "Complete",
      status: "Resolved",
      icon: CheckCircle2,
    },
  ];
  const categories = [
    [
      "Employee Compliance",
      "Credentials, training & eligibility",
      "2 potential findings",
      UserCheck,
      "warning",
      "Credentials · CPR / First Aid · Background checks",
    ],
    [
      "Client Compliance",
      "Plans, signatures & authorizations",
      "1 needs review",
      ShieldCheck,
      "review",
      "Care plans · Signatures · Authorization expiry",
    ],
    [
      "EVV Audit",
      "Visits, corrections & location signals",
      "1 potential finding",
      MapPin,
      "warning",
      "Clock-in / out · GPS exceptions · Manual corrections",
    ],
    [
      "Billing Audit",
      "Units, EVV & payer workflow checks",
      "2 potential findings",
      ReceiptText,
      "critical",
      "Verified EVV · Duplicate billing · PASSPORT / OH Waiver / DODD",
    ],
    [
      "Documentation Audit",
      "Notes, tasks & signatures",
      "Sample passed",
      FileClock,
      "passed",
      "Shift notes · Task completion · Late documentation",
    ],
    [
      "Incident & MUI Audit",
      "Records, follow-up & escalation",
      "Human review required",
      ShieldAlert,
      "critical",
      "Required fields · Follow-up · Potential MUI review",
    ],
    [
      "Scheduling Audit",
      "Coverage, overlap & assignments",
      "No findings staged",
      CalendarDays,
      "passed",
      "Overlapping shifts · Coverage · Authorized service time",
    ],
  ];
  const visibleFindings = findings.filter(
    (finding) =>
      filter === "All Findings" ||
      (filter === "Critical" && finding.severity === "Critical") ||
      (filter === "Warnings" && finding.severity === "Warning") ||
      (filter === "Needs Review" &&
        (finding.severity === "Review" ||
          finding.status === "Needs human review" ||
          finding.status === "Needs review")) ||
      (filter === "Resolved" && finding.status === "Resolved"),
  );
  const runAudit = (scope) =>
    setAuditMessage(`${scope} audit queued for review · Demo workflow only`);
  const notifyTeam = (finding, channel) =>
    setNotificationMessage(
      `${channel} reminder queued for ${assignments[finding.subject] || finding.team} · Demo workflow only`,
    );
  const assignFinding = (subject, assignee) =>
    setAssignments((current) => ({ ...current, [subject]: assignee }));

  return (
    <section className="audit-center">
      <div className="audit-hero">
        <div>
          <div className="eyebrow audit-eyebrow">
            <BrainCircuit size={14} /> CAREOS AI AUDIT CENTER{" "}
            <span className="audit-preview">UI WORKFLOW PREVIEW</span>
          </div>
          <h1>Agency readiness, with a human in the loop.</h1>
          <p>
            Potential findings across workforce, client services, EVV, billing
            and operations. AI results are suggestions for authorized review,
            never silent record changes.
          </p>
          <div className="audit-guardrail">
            <LockKeyhole size={14} /> Original records remain unchanged · Every
            future change will retain author, timestamp, reason and audit
            history
          </div>
        </div>
        <div className="readiness-ring">
          <div>
            <strong>86%</strong>
            <span>Audit readiness</span>
          </div>
        </div>
      </div>
      <div className="audit-actions">
        <div>
          <span className="audit-live-dot" /> {auditMessage}
        </div>
        <div className="audit-buttons">
          <button
            className="audit-primary"
            onClick={() => runAudit("Full agency")}
          >
            <ScanSearch size={16} /> Run Full Agency Audit
          </button>
          <button
            className="audit-secondary"
            onClick={() => runAudit("Selected module")}
          >
            Run selected audit <ChevronRight size={15} />
          </button>
        </div>
      </div>
      {notificationMessage && (
        <div className="audit-notification">
          <Send size={15} />
          <span>{notificationMessage}</span>
          <button
            onClick={() => setNotificationMessage("")}
            aria-label="Dismiss notification"
          >
            Dismiss
          </button>
        </div>
      )}
      <div className="audit-overview">
        <div>
          <span>Records scanned</span>
          <strong>1,248</strong>
          <small>Across 7 audit domains</small>
        </div>
        <div>
          <span>Passed</span>
          <strong className="audit-good">1,104</strong>
          <small>88.5% of records</small>
        </div>
        <div>
          <span>Warnings</span>
          <strong className="audit-warn">86</strong>
          <small>Potential attention</small>
        </div>
        <div>
          <span>Critical findings</span>
          <strong className="audit-critical">4</strong>
          <small>Human review required</small>
        </div>
        <div>
          <span>Needs human review</span>
          <strong className="audit-review">14</strong>
          <small>Authorized decision needed</small>
        </div>
        <div>
          <span>Last audit time</span>
          <strong className="audit-time">9:42 AM</strong>
          <small>September 16, 2026</small>
        </div>
      </div>
      <div className="audit-section-heading">
        <div>
          <div className="eyebrow muted">AUDIT COVERAGE</div>
          <h2>Agency audit domains</h2>
          <p>Run focused reviews when a team needs a closer look.</p>
        </div>
        <div className="audit-scope-buttons">
          {[
            "Employees",
            "Clients",
            "EVV",
            "Billing",
            "Documentation",
            "Incidents & MUIs",
          ].map((scope) => (
            <button key={scope} onClick={() => runAudit(scope)}>
              <ScanSearch size={13} /> Audit {scope}
            </button>
          ))}
        </div>
      </div>
      <div className="audit-category-grid">
        {categories.map(([title, description, status, Icon, tone, checks]) => (
          <article className={`audit-category ${tone}`} key={title}>
            <div className="audit-category-top">
              <div className="audit-category-icon">
                <Icon size={18} />
              </div>
              <span className="audit-category-status">
                <i />
                {status}
              </span>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="audit-category-details">{checks}</div>
            <button onClick={() => runAudit(title)} className="text-button">
              Run focused audit <ArrowUpRight size={14} />
            </button>
          </article>
        ))}
      </div>
      <div className="audit-section-heading findings-heading">
        <div>
          <div className="eyebrow muted">WORK QUEUE</div>
          <h2>Audit findings</h2>
          <p>
            Potential findings are presented with supporting records for
            authorized review.
          </p>
        </div>
        <div className="audit-integrity">
          <ShieldCheck size={14} /> Source data protected
        </div>
      </div>
      <div className="finding-filters">
        {[
          "All Findings",
          "Critical",
          "Warnings",
          "Needs Review",
          "Resolved",
        ].map((name) => (
          <button
            className={filter === name ? "active" : ""}
            key={name}
            onClick={() => setFilter(name)}
          >
            {name}
            <span>
              {name === "All Findings"
                ? findings.length
                : name === "Critical"
                  ? 1
                  : name === "Warnings"
                    ? 2
                    : name === "Needs Review"
                      ? 2
                      : 1}
            </span>
          </button>
        ))}
      </div>
      <div className="findings-table">
        {visibleFindings.map((finding) => {
          const Icon = finding.icon;
          const isReviewed = reviewedFinding === finding.subject;
          const assignedTo = assignments[finding.subject] || finding.assignee;
          return (
            <article
              className={`finding-row ${finding.severity.toLowerCase()}`}
              key={finding.subject}
            >
              <div className="finding-main">
                <div className="finding-icon">
                  <Icon size={17} />
                </div>
                <div>
                  <div className="finding-title">
                    <strong>{finding.detected}</strong>
                    <span
                      className={`severity ${finding.severity.toLowerCase()}`}
                    >
                      {finding.severity}
                    </span>
                  </div>
                  <div className="finding-subject">
                    {finding.subject} <span>·</span> {finding.category}
                  </div>
                  <p>{finding.why}</p>
                  <div className="finding-records">
                    <FileCheck2 size={13} /> Supporting records:{" "}
                    {finding.records}
                  </div>
                </div>
              </div>
              <div className="finding-details">
                <div>
                  <span>Recommended next step</span>
                  <strong>{finding.next}</strong>
                </div>
                <div>
                  <span>Assigned admin / team</span>
                  <select
                    value={assignedTo}
                    onChange={(event) =>
                      assignFinding(finding.subject, event.target.value)
                    }
                    aria-label={`Assign ${finding.subject}`}
                  >
                    <option>{finding.assignee}</option>
                    <option>{finding.team}</option>
                    <option>Management Team</option>
                    <option>Billing Team</option>
                    <option>EVV Team</option>
                    <option>Care Coordination</option>
                  </select>
                </div>
                <div>
                  <span>Due date</span>
                  <strong>{finding.due}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong className="finding-status">
                    {isReviewed ? "Review opened" : finding.status}
                  </strong>
                </div>
              </div>
              <div className="finding-actions">
                <button
                  className="review-button"
                  onClick={() => setReviewedFinding(finding.subject)}
                >
                  <Eye size={14} /> {isReviewed ? "Review opened" : "Review"}
                </button>
                <div className="notify-actions">
                  <button
                    onClick={() => notifyTeam(finding, "SMS")}
                    title="Queue an SMS reminder"
                  >
                    <MessageSquare size={13} /> SMS
                  </button>
                  <button
                    onClick={() => notifyTeam(finding, "Call")}
                    title="Queue a call reminder"
                  >
                    <PhoneCall size={13} /> Call
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="audit-history">
        <div className="audit-history-heading">
          <div>
            <div className="eyebrow muted">TRACEABILITY</div>
            <h2>Audit history</h2>
            <p>A durable record of audit runs and future decisions.</p>
          </div>
          <History size={20} />
        </div>
        <div className="history-list">
          <div>
            <span className="history-marker complete">
              <Check size={12} />
            </span>
            <div>
              <strong>Full agency audit completed</strong>
              <small>
                Jordan Davis · 1,248 records scanned · 4 critical findings
              </small>
            </div>
            <time>Today, 9:42 AM</time>
          </div>
          <div>
            <span className="history-marker">
              <Clock3 size={13} />
            </span>
            <div>
              <strong>Billing audit queued</strong>
              <small>
                Jordan Davis · Demo workflow state · No source records changed
              </small>
            </div>
            <time>Today, 9:38 AM</time>
          </div>
          <div>
            <span className="history-marker">
              <UserCheck size={13} />
            </span>
            <div>
              <strong>Human review policy confirmed</strong>
              <small>
                CareOS system · Critical findings cannot be resolved
                automatically
              </small>
            </div>
            <time>Sep 15, 4:16 PM</time>
          </div>
        </div>
      </div>
      <div className="audit-disclaimer">
        <AlertTriangle size={16} />
        <div>
          <strong>Review before action</strong>
          <p>
            AI Audit Center identifies potential issues from available records.
            It does not determine legal, regulatory, or Medicaid compliance, and
            it never silently modifies source records.
          </p>
        </div>
      </div>
    </section>
  );
}

const demoEmployees = [
  {
    name: "Jordan Mitchell",
    id: "EMP-1042",
    role: "Direct Support Professional",
    status: "Active",
    phone: "(555) 014-2088",
    email: "jordan.mitchell@demo.careos",
    hireDate: "Mar 12, 2022",
    availability: "Mon–Fri · Flexible",
    clients: 4,
    credential: "Expiring Soon",
    training: "Current",
    supervisor: "Maya Patel",
    initials: "JM",
    tone: "orange",
    credentials: [
      ["CPR", "Mar 18, 2025", "Sep 30, 2026", "Expiring Soon"],
      ["First Aid", "Mar 18, 2025", "Sep 30, 2026", "Expiring Soon"],
      ["Background check", "Jan 05, 2025", "Jan 05, 2027", "Current"],
      ["Driver's license", "Jun 10, 2025", "Jun 10, 2029", "Current"],
      ["Auto insurance", "Aug 01, 2026", "Aug 01, 2027", "Current"],
    ],
    training: [
      ["CPR & First Aid", "Sep 30, 2026", "Completed"],
      ["Client rights & dignity", "Dec 15, 2026", "Completed"],
      ["Incident reporting", "Oct 08, 2026", "Completed"],
    ],
    documents: [
      "Employee application.pdf",
      "I-9 verification.pdf",
      "Emergency contact form.pdf",
    ],
    maxHours: "40 hours",
  },
  {
    name: "Avery Thompson",
    id: "EMP-1078",
    role: "Home Health Aide",
    status: "Active",
    phone: "(555) 016-4821",
    email: "avery.thompson@demo.careos",
    hireDate: "Jul 08, 2023",
    availability: "Weekends · 8am–6pm",
    clients: 2,
    credential: "Needs Review",
    training: "Missing",
    supervisor: "Jordan Davis",
    initials: "AT",
    tone: "teal",
    credentials: [
      ["CPR", "Jul 10, 2023", "Jul 10, 2026", "Expired"],
      ["First Aid", "Jul 10, 2023", "Jul 10, 2026", "Expired"],
      ["Background check", "Jul 08, 2023", "Missing", "Missing"],
      ["Driver's license", "May 20, 2024", "May 20, 2028", "Current"],
      ["Auto insurance", "Jan 12, 2026", "Jan 12, 2027", "Current"],
    ],
    training: [
      ["CPR & First Aid", "Overdue", "Missing"],
      ["Client rights & dignity", "Dec 15, 2026", "Completed"],
      ["Incident reporting", "Oct 08, 2026", "Due soon"],
    ],
    documents: ["Employee application.pdf", "Emergency contact form.pdf"],
    maxHours: "32 hours",
  },
  {
    name: "Morgan Lee",
    id: "EMP-1091",
    role: "Registered Nurse",
    status: "Active",
    phone: "(555) 018-7730",
    email: "morgan.lee@demo.careos",
    hireDate: "Jan 19, 2021",
    availability: "Mon–Thu · 7am–3pm",
    clients: 8,
    credential: "Current",
    training: "Current",
    supervisor: "Maya Patel",
    initials: "ML",
    tone: "blue",
    credentials: [
      ["CPR", "Feb 02, 2026", "Feb 02, 2028", "Current"],
      ["First Aid", "Feb 02, 2026", "Feb 02, 2028", "Current"],
      ["Background check", "Jan 19, 2025", "Jan 19, 2027", "Current"],
      ["Driver's license", "Apr 17, 2025", "Apr 17, 2029", "Current"],
      ["Auto insurance", "Apr 17, 2026", "Apr 17, 2027", "Current"],
    ],
    training: [
      ["CPR & First Aid", "Feb 02, 2028", "Completed"],
      ["Client rights & dignity", "Dec 15, 2026", "Completed"],
      ["Incident reporting", "Oct 08, 2026", "Completed"],
    ],
    documents: [
      "RN license.pdf",
      "Employee application.pdf",
      "I-9 verification.pdf",
    ],
    maxHours: "40 hours",
  },
  {
    name: "Casey Brooks",
    id: "EMP-1104",
    role: "Care Coordinator",
    status: "Inactive",
    phone: "(555) 013-6654",
    email: "casey.brooks@demo.careos",
    hireDate: "Nov 02, 2020",
    availability: "Not currently available",
    clients: 0,
    credential: "Current",
    training: "Current",
    supervisor: "Jordan Davis",
    initials: "CB",
    tone: "violet",
    credentials: [
      ["CPR", "Nov 02, 2025", "Nov 02, 2027", "Current"],
      ["First Aid", "Nov 02, 2025", "Nov 02, 2027", "Current"],
      ["Background check", "Nov 02, 2024", "Nov 02, 2026", "Current"],
    ],
    training: [
      ["CPR & First Aid", "Nov 02, 2027", "Completed"],
      ["Client rights & dignity", "Dec 15, 2026", "Completed"],
    ],
    documents: ["Employee application.pdf", "Separation checklist.pdf"],
    maxHours: "0 hours",
  },
];

function EmployeeStatus({ children }) {
  return (
    <span
      className={`employee-status ${children.toLowerCase().replaceAll(" ", "-")}`}
    >
      <i />
      {children}
    </span>
  );
}

function EmployeeCenter({ employees, setEmployees, onViewAudit }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All employees");
  const [credentialFilter, setCredentialFilter] = useState("All credentials");
  const [view, setView] = useState("directory");
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    role: "Direct Support Professional",
    email: "",
    phone: "",
    hireDate: "",
    availability: "Weekdays · Flexible",
    maxHours: "40 hours",
    supervisor: "Jordan Davis",
  });
  const selected = employees.find((employee) => employee.id === selectedId);
  const filteredEmployees = employees
    .filter((employee) =>
      `${employee.name} ${employee.id} ${employee.role}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
    .filter(
      (employee) =>
        statusFilter === "All employees" || employee.status === statusFilter,
    )
    .filter(
      (employee) =>
        credentialFilter === "All credentials" ||
        employee.credential === credentialFilter,
    );
  const updateForm = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const addEmployee = (event) => {
    event.preventDefault();
    const nameParts = form.name.trim().split(" ");
    const initials =
      nameParts
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "NE";
    const newEmployee = {
      ...form,
      id: `EMP-${1105 + employees.length}`,
      status: "Active",
      clients: 0,
      credential: "Needs Review",
      training: "Missing",
      initials,
      tone: "orange",
      credentials: [
        ["CPR", "Not entered", "Needs review", "Missing"],
        ["First Aid", "Not entered", "Needs review", "Missing"],
        ["Background check", "Not entered", "Needs review", "Missing"],
      ],
      training: [["Required training", "Not scheduled", "Missing"]],
      documents: [],
      hireDate: form.hireDate || "Not entered",
    };
    setEmployees((current) => [...current, newEmployee]);
    setSelectedId(newEmployee.id);
    setView("profile");
  };
  const openProfile = (id) => {
    setSelectedId(id);
    setView("profile");
  };

  if (view === "add")
    return (
      <section className="employee-center">
        <div className="employee-page-heading">
          <div>
            <button className="back-link" onClick={() => setView("directory")}>
              <ChevronRight size={15} className="back-arrow" /> Employee
              directory
            </button>
            <div className="eyebrow muted">DEMO WORKFLOW</div>
            <h1>Add employee</h1>
            <p>
              Create a demo employee record for testing the CareOS workflow.
            </p>
          </div>
          <span className="prototype-label">
            <LockKeyhole size={13} /> Prototype storage
          </span>
        </div>
        <form className="employee-form" onSubmit={addEmployee}>
          <div className="form-section">
            <div className="form-section-heading">
              <UserRound size={17} />
              <div>
                <h2>Personal &amp; contact information</h2>
                <p>
                  Use fictional data only. This prototype does not save to a
                  database.
                </p>
              </div>
            </div>
            <div className="form-grid">
              <label>
                Full name
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={updateForm}
                  placeholder="Demo employee name"
                />
              </label>
              <label>
                Phone
                <input
                  name="phone"
                  value={form.phone}
                  onChange={updateForm}
                  placeholder="(555) 000-0000"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateForm}
                  placeholder="employee@demo.careos"
                />
              </label>
              <label>
                Hire date
                <input
                  type="date"
                  name="hireDate"
                  value={form.hireDate}
                  onChange={updateForm}
                />
              </label>
            </div>
          </div>
          <div className="form-section">
            <div className="form-section-heading">
              <BriefcaseIcon />
              <div>
                <h2>Employment &amp; availability</h2>
                <p>Set role, supervisor and scheduling preferences.</p>
              </div>
            </div>
            <div className="form-grid">
              <label>
                Role
                <select name="role" value={form.role} onChange={updateForm}>
                  <option>Direct Support Professional</option>
                  <option>Home Health Aide</option>
                  <option>Registered Nurse</option>
                  <option>Care Coordinator</option>
                </select>
              </label>
              <label>
                Supervisor
                <select
                  name="supervisor"
                  value={form.supervisor}
                  onChange={updateForm}
                >
                  <option>Jordan Davis</option>
                  <option>Maya Patel</option>
                  <option>Care Coordination Team</option>
                </select>
              </label>
              <label>
                Availability
                <select
                  name="availability"
                  value={form.availability}
                  onChange={updateForm}
                >
                  <option>Weekdays · Flexible</option>
                  <option>Weekends · 8am–6pm</option>
                  <option>Evenings · 4pm–10pm</option>
                </select>
              </label>
              <label>
                Maximum weekly hours
                <select
                  name="maxHours"
                  value={form.maxHours}
                  onChange={updateForm}
                >
                  <option>40 hours</option>
                  <option>32 hours</option>
                  <option>24 hours</option>
                </select>
              </label>
            </div>
          </div>
          <div className="form-section">
            <div className="form-section-heading">
              <ShieldCheck size={17} />
              <div>
                <h2>Credentials &amp; training</h2>
                <p>
                  These demo records begin in a review state until details are
                  entered.
                </p>
              </div>
            </div>
            <div className="credential-checks">
              <label>
                <input type="checkbox" /> CPR
              </label>
              <label>
                <input type="checkbox" /> First Aid
              </label>
              <label>
                <input type="checkbox" /> Background check
              </label>
              <label>
                <input type="checkbox" /> Driver's license
              </label>
              <label>
                <input type="checkbox" /> Auto insurance
              </label>
              <label>
                <input type="checkbox" /> Required training
              </label>
            </div>
          </div>
          <div className="form-actions">
            <span>
              <LockKeyhole size={14} /> Demo storage only · no permanent
              database writes
            </span>
            <button
              type="button"
              className="audit-secondary"
              onClick={() => setView("directory")}
            >
              Cancel
            </button>
            <button type="submit" className="audit-primary">
              <Check size={15} /> Save demo employee
            </button>
          </div>
        </form>
      </section>
    );

  if (view === "profile" && selected)
    return (
      <section className="employee-center">
        <div className="employee-page-heading">
          <div>
            <button className="back-link" onClick={() => setView("directory")}>
              <ChevronRight size={15} className="back-arrow" /> Employee
              directory
            </button>
            <div className="eyebrow muted">EMPLOYEE PROFILE · DEMO DATA</div>
            <h1>{selected.name}</h1>
            <p>
              {selected.role} <span>·</span> {selected.id}
            </p>
          </div>
          <div className="profile-actions">
            <button className="audit-secondary" onClick={() => setView("add")}>
              <UsersRound size={14} /> Add employee
            </button>
            <button className="audit-primary" onClick={onViewAudit}>
              <BrainCircuit size={14} /> View Audit Findings
            </button>
          </div>
        </div>
        <div className="employee-profile-hero">
          <div className={`employee-avatar ${selected.tone}`}>
            {selected.initials}
          </div>
          <div>
            <h2>{selected.name}</h2>
            <p>
              {selected.role} · Reports to {selected.supervisor}
            </p>
            <div className="profile-badges">
              <EmployeeStatus>{selected.status}</EmployeeStatus>
              <EmployeeStatus>{selected.credential}</EmployeeStatus>
              <span className="employee-id">{selected.id}</span>
            </div>
          </div>
          <div className="profile-hero-contact">
            <span>{selected.phone}</span>
            <span>{selected.email}</span>
          </div>
        </div>
        <div className="employee-profile-grid">
          <article className="employee-panel">
            <PanelHeading
              icon={UserRound}
              title="Overview"
              subtitle="Employment and contact details"
            />
            <div className="detail-grid">
              <Detail label="Email" value={selected.email} />
              <Detail label="Phone" value={selected.phone} />
              <Detail label="Hire date" value={selected.hireDate} />
              <Detail label="Supervisor" value={selected.supervisor} />
              <Detail label="Availability" value={selected.availability} />
              <Detail label="Maximum weekly hours" value={selected.maxHours} />
            </div>
          </article>
          <article className="employee-panel compliance-panel">
            <PanelHeading
              icon={ShieldCheck}
              title="Compliance"
              subtitle="Potential status indicators"
            />
            <div className="compliance-grid">
              <div>
                <strong>Compliant</strong>
                <span className="compliance-count good">
                  {selected.credential === "Current" ? "5" : "2"}
                </span>
              </div>
              <div>
                <strong>Expiring Soon</strong>
                <span className="compliance-count soon">
                  {selected.credential === "Expiring Soon" ? "2" : "0"}
                </span>
              </div>
              <div>
                <strong>Missing</strong>
                <span className="compliance-count missing">
                  {selected.credential === "Needs Review" ? "1" : "0"}
                </span>
              </div>
              <div>
                <strong>Needs Review</strong>
                <span className="compliance-count review">
                  {selected.credential === "Needs Review"
                    ? "2"
                    : selected.credential === "Expiring Soon"
                      ? "1"
                      : "0"}
                </span>
              </div>
            </div>
            <button className="text-button" onClick={onViewAudit}>
              View AI Audit findings <ArrowUpRight size={14} />
            </button>
          </article>
          <article className="employee-panel wide-panel">
            <PanelHeading
              icon={ShieldCheck}
              title="Credentials"
              subtitle="Issue, expiration and review status"
            />
            <div className="credential-table">
              <div className="credential-table-head">
                <span>Credential</span>
                <span>Issue date</span>
                <span>Expiration</span>
                <span>Status</span>
              </div>
              {selected.credentials.map(([name, issue, expiration, status]) => (
                <div className="credential-table-row" key={name}>
                  <strong>{name}</strong>
                  <span>{issue}</span>
                  <span>{expiration}</span>
                  <EmployeeStatus>{status}</EmployeeStatus>
                </div>
              ))}
            </div>
          </article>
          <article className="employee-panel">
            <PanelHeading
              icon={CheckCircle2}
              title="Training"
              subtitle="Required learning and due dates"
            />
            <div className="training-list">
              {selected.training.map(([name, due, status]) => (
                <div key={name}>
                  <span className="training-icon">
                    <Check size={13} />
                  </span>
                  <div>
                    <strong>{name}</strong>
                    <small>Due / expires {due}</small>
                  </div>
                  <EmployeeStatus>{status}</EmployeeStatus>
                </div>
              ))}
            </div>
          </article>
          <article className="employee-panel">
            <PanelHeading
              icon={CalendarDays}
              title="Availability & assignments"
              subtitle="Schedule context"
            />
            <div className="assignment-summary">
              <div>
                <span>Assigned clients</span>
                <strong>{selected.assignedClients?.length || selected.clients}</strong>
              </div>
              <div>
                <span>Scheduled shifts</span>
                <strong>{(selected.assignedClients?.length || selected.clients) ? "3 this week" : "None"}</strong>
              </div>
              <div>
                <span>Recent visits</span>
                <strong>{(selected.assignedClients?.length || selected.clients) ? "8 completed" : "None"}</strong>
              </div>
            </div>
            <div className="assignment-note">
              <CalendarDays size={14} /> {selected.availability}
            </div>
          </article>
          <article className="employee-panel">
            <PanelHeading
              icon={FileCheck2}
              title="Documents"
              subtitle="Secure storage placeholder"
            />
            <div className="document-list">
              {selected.documents.length ? (
                selected.documents.map((document) => (
                  <div key={document}>
                    <FileCheck2 size={14} />
                    <span>{document}</span>
                    <ChevronRight size={14} />
                  </div>
                ))
              ) : (
                <div className="empty-documents">
                  <FileCheck2 size={20} />
                  <span>No demo documents added yet.</span>
                </div>
              )}
            </div>
            <span className="demo-note">
              <LockKeyhole size={12} /> Future secure document storage
            </span>
          </article>
        </div>
      </section>
    );

  return (
    <section className="employee-center">
      <div className="employee-page-heading">
        <div>
          <div className="eyebrow muted">WORKFORCE OPERATIONS · DEMO DATA</div>
          <h1>Employee directory</h1>
          <p>
            Manage fictional employee records, credentials, training and
            availability.
          </p>
        </div>
        <div className="profile-actions">
          <span className="prototype-label">
            <LockKeyhole size={13} /> Prototype storage
          </span>
          <button className="audit-primary" onClick={() => setView("add")}>
            <UsersRound size={15} /> Add employee
          </button>
        </div>
      </div>
      <div className="employee-summary">
        <div>
          <span>Total employees</span>
          <strong>{employees.length}</strong>
          <small>Demo workforce</small>
        </div>
        <div>
          <span>Active</span>
          <strong className="good-number">
            {
              employees.filter((employee) => employee.status === "Active")
                .length
            }
          </strong>
          <small>Available records</small>
        </div>
        <div>
          <span>Credential alerts</span>
          <strong className="warning-number">
            {
              employees.filter((employee) => employee.credential !== "Current")
                .length
            }
          </strong>
          <small>Potential findings</small>
        </div>
        <div>
          <span>Training review</span>
          <strong className="review-number">
            {
              employees.filter((employee) => employee.training !== "Current")
                .length
            }
          </strong>
          <small>Human review</small>
        </div>
      </div>
      <div className="credential-alerts">
        <div className="credential-alert-heading">
          <div>
            <div className="eyebrow muted">CREDENTIAL ALERTS</div>
            <h2>Review windows</h2>
          </div>
          <button className="text-button" onClick={onViewAudit}>
            View Audit Findings <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="credential-alert-grid">
          <div className="alert-window expired">
            <span>Expired</span>
            <strong>2</strong>
            <small>Requires immediate review</small>
          </div>
          <div className="alert-window soon">
            <span>Expiring in 30 days</span>
            <strong>2</strong>
            <small>Plan renewal follow-up</small>
          </div>
          <div className="alert-window sixty">
            <span>Expiring in 60 days</span>
            <strong>3</strong>
            <small>Upcoming attention</small>
          </div>
          <div className="alert-window missing">
            <span>Missing</span>
            <strong>1</strong>
            <small>Record not found</small>
          </div>
        </div>
        <div className="employee-audit-callout">
          <BrainCircuit size={16} />
          <span>
            <strong>AI Audit potential findings:</strong> CPR expires in 14 days
            · Background check missing · Driver's license expired · Required
            training incomplete
          </span>
          <button onClick={onViewAudit}>
            Review with AI Audit <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
      <div className="directory-toolbar">
        <label className="directory-search">
          <Search size={16} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, ID or role"
          />
        </label>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option>All employees</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <select
          value={credentialFilter}
          onChange={(event) => setCredentialFilter(event.target.value)}
        >
          <option>All credentials</option>
          <option>Current</option>
          <option>Expiring Soon</option>
          <option>Needs Review</option>
        </select>
      </div>
      <div className="directory-table">
        <div className="directory-table-head">
          <span>Employee</span>
          <span>Role &amp; status</span>
          <span>Contact</span>
          <span>Availability</span>
          <span>Credentials</span>
          <span>Action</span>
        </div>
        {filteredEmployees.map((employee) => (
          <div className="directory-row" key={employee.id}>
            <div className="employee-cell">
              <div className={`employee-avatar small ${employee.tone}`}>
                {employee.initials}
              </div>
              <div>
                <strong>{employee.name}</strong>
                <small>{employee.id}</small>
              </div>
            </div>
            <div>
              <strong>{employee.role}</strong>
              <EmployeeStatus>{employee.status}</EmployeeStatus>
            </div>
            <div>
              <strong>{employee.phone}</strong>
              <small>{employee.email}</small>
            </div>
            <div>
              <strong>{employee.availability}</strong>
              <small>{employee.clients} assigned clients</small>
            </div>
            <div>
              <EmployeeStatus>{employee.credential}</EmployeeStatus>
              <small
                className={`training-label ${employee.training === "Current" ? "current" : "missing"}`}
              >
                {employee.training} training
              </small>
            </div>
            <button
              className="profile-button"
              onClick={() => openProfile(employee.id)}
            >
              Profile <ArrowUpRight size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="directory-footer">
        <span>
          Showing {filteredEmployees.length} of {employees.length} demo
          employees
        </span>
        <span>
          <LockKeyhole size={12} /> Demo state resets when the app restarts
        </span>
      </div>
    </section>
  );
}

function BriefcaseIcon() {
  return <Gauge size={17} />;
}
function PanelHeading({ icon: Icon, title, subtitle }) {
  return (
    <div className="employee-panel-heading">
      <div className="employee-panel-icon">
        <Icon size={16} />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
function Detail({ label, value }) {
  return (
    <div className="detail">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const demoClients = [
  {
    name: "Alex Morgan",
    id: "CL-2048",
    status: "Active",
    program: "PASSPORT",
    service: "Personal care",
    authorization: "Current",
    staff: "Jordan Mitchell",
    employees: 2,
    hours: "28 hrs / week",
    visits: "Completed",
    documentation: "Current",
    initials: "AM",
    tone: "orange",
    coordinator: "Maya Patel",
    phone: "(555) 012-4820",
    email: "alex.morgan@demo.careos",
    emergency: "Taylor Morgan · (555) 012-9920",
    demographics: "Adult · Demo profile",
    authNumber: "AUTH-PAS-2048",
    authorized: 1456,
    used: 986,
    effective: "Jan 01, 2026",
    expires: "Dec 31, 2026",
    authStatus: "Current",
    tasks: [
      ["Personal care assistance", "Daily", "Hands-on", "Jan 01–Dec 31, 2026"],
      ["Meal preparation", "5x weekly", "Partial", "Jan 01–Dec 31, 2026"],
    ],
    visitsData: [
      [
        "Sep 16, 2026",
        "9:00 AM",
        "8:57 AM",
        "12:04 PM",
        "Verified",
        "All tasks complete",
      ],
      [
        "Sep 15, 2026",
        "9:00 AM",
        "9:02 AM",
        "12:01 PM",
        "Verified",
        "All tasks complete",
      ],
    ],
    incidents: "No open incidents",
    notes: ["Sep 16 shift note · Signed", "Sep 15 shift note · Signed"],
  },
  {
    name: "Riley Carter",
    id: "CL-2077",
    status: "Active",
    program: "Ohio Home Care Waiver",
    service: "Skilled nursing",
    authorization: "Expiring Soon",
    staff: "Morgan Lee",
    employees: 1,
    hours: "16 hrs / week",
    visits: "1 exception",
    documentation: "Needs review",
    initials: "RC",
    tone: "teal",
    coordinator: "Jordan Davis",
    phone: "(555) 017-1934",
    email: "riley.carter@demo.careos",
    emergency: "Sam Carter · (555) 017-8810",
    demographics: "Adult · Demo profile",
    authNumber: "AUTH-OHC-2077",
    authorized: 832,
    used: 721,
    effective: "Mar 01, 2026",
    expires: "Sep 28, 2026",
    authStatus: "Expiring Soon",
    tasks: [
      ["Skilled nursing visit", "3x weekly", "Clinical", "Mar 01–Sep 28, 2026"],
      ["Medication support", "Daily", "Verbal prompts", "Mar 01–Sep 28, 2026"],
    ],
    visitsData: [
      [
        "Sep 16, 2026",
        "2:00 PM",
        "2:14 PM",
        "5:00 PM",
        "Exception",
        "Clock-in differs from schedule",
      ],
      [
        "Sep 14, 2026",
        "2:00 PM",
        "2:01 PM",
        "5:03 PM",
        "Verified",
        "All tasks complete",
      ],
    ],
    incidents: "1 follow-up required",
    notes: [
      "Sep 16 shift note · Missing signature",
      "Sep 14 shift note · Signed",
    ],
  },
  {
    name: "Jamie Ellis",
    id: "CL-2112",
    status: "Active",
    program: "DODD",
    service: "Homemaker / personal care",
    authorization: "Near Unit Limit",
    staff: "Avery Thompson",
    employees: 3,
    hours: "32 hrs / week",
    visits: "Completed",
    documentation: "Current",
    initials: "JE",
    tone: "blue",
    coordinator: "Maya Patel",
    phone: "(555) 019-0064",
    email: "jamie.ellis@demo.careos",
    emergency: "Casey Ellis · (555) 019-7761",
    demographics: "Adult · Demo profile",
    authNumber: "AUTH-DOD-2112",
    authorized: 1664,
    used: 1518,
    effective: "Jan 15, 2026",
    expires: "Jan 14, 2027",
    authStatus: "Near Unit Limit",
    tasks: [
      ["Homemaker support", "Daily", "Hands-on", "Jan 15, 2026–Jan 14, 2027"],
      [
        "Community integration",
        "2x weekly",
        "Verbal prompts",
        "Jan 15, 2026–Jan 14, 2027",
      ],
    ],
    visitsData: [
      [
        "Sep 16, 2026",
        "8:00 AM",
        "8:01 AM",
        "4:00 PM",
        "Verified",
        "All tasks complete",
      ],
    ],
    incidents: "No open incidents",
    notes: ["Sep 16 shift note · Signed"],
  },
  {
    name: "Taylor Brooks",
    id: "CL-1984",
    status: "Inactive",
    program: "PASSPORT",
    service: "Respite care",
    authorization: "Expired",
    staff: "Unassigned",
    employees: 0,
    hours: "0 hrs / week",
    visits: "No recent visits",
    documentation: "Archived",
    initials: "TB",
    tone: "violet",
    coordinator: "Jordan Davis",
    phone: "(555) 011-4488",
    email: "taylor.brooks@demo.careos",
    emergency: "Demo contact · (555) 011-4422",
    demographics: "Adult · Demo profile",
    authNumber: "AUTH-PAS-1984",
    authorized: 500,
    used: 500,
    effective: "Jan 01, 2025",
    expires: "Dec 31, 2025",
    authStatus: "Expired",
    tasks: [["Respite care", "As needed", "Hands-on", "Expired"]],
    visitsData: [],
    incidents: "No open incidents",
    notes: [],
  },
];

function ClientStatus({ children }) {
  return (
    <span
      className={`client-status ${children.toLowerCase().replaceAll(" ", "-")}`}
    >
      <i />
      {children}
    </span>
  );
}
function ClientPanel({
  icon: Icon,
  title,
  subtitle,
  children,
  className = "",
}) {
  return (
    <article className={`client-panel ${className}`}>
      <div className="client-panel-heading">
        <div className="client-panel-icon">
          <Icon size={16} />
        </div>
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      {children}
    </article>
  );
}

function ClientCenter({
  clients,
  setClients,
  employees,
  setEmployees,
  shifts,
  onViewAudit,
  onViewBilling,
  onScheduleShift,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All clients");
  const [programFilter, setProgramFilter] = useState("All programs");
  const [authFilter, setAuthFilter] = useState("All authorizations");
  const [view, setView] = useState("directory");
  const [selectedId, setSelectedId] = useState(null);
  const [assignmentSearch, setAssignmentSearch] = useState("");
  const [primaryEmployeeId, setPrimaryEmployeeId] = useState("");
  const [additionalEmployeeIds, setAdditionalEmployeeIds] = useState([]);
  const [createdClient, setCreatedClient] = useState(null);
  const availableEmployees = Array.isArray(employees) ? employees : [];
  const [form, setForm] = useState({
    name: "",
    program: "PASSPORT",
    service: "Personal care",
    phone: "",
    email: "",
    coordinator: "Maya Patel",
    hours: "20 hrs / week",
  });
  const selected = clients.find((client) => client.id === selectedId);
  const filtered = clients
    .filter((client) =>
      `${client.name} ${client.id} ${client.service}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
    .filter(
      (client) =>
        statusFilter === "All clients" || client.status === statusFilter,
    )
    .filter(
      (client) =>
        programFilter === "All programs" || client.program === programFilter,
    )
    .filter(
      (client) =>
        authFilter === "All authorizations" ||
        client.authorization === authFilter,
    );
  const updateForm = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const addClient = (event) => {
    event.preventDefault();
    const initials =
      form.name
        .trim()
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "NC";
    const client = {
      ...form,
      id: `CL-${2200 + clients.length}`,
      status: "Active",
      authorization: "Needs Review",
      staff: "Unassigned",
      employees: 0,
      visits: "No recent visits",
      documentation: "Needs review",
      initials,
      tone: "orange",
      demographics: "Adult · Demo profile",
      emergency: "Not entered",
      authNumber: "Not entered",
      authorized: 0,
      used: 0,
      effective: "Not entered",
      expires: "Not entered",
      authStatus: "Missing",
      tasks: [],
      visitsData: [],
      incidents: "No open incidents",
      notes: [],
      hours: form.hours,
      assignedEmployees: [
        ...(primaryEmployeeId
          ? [
              {
                id: primaryEmployeeId,
                name: availableEmployees.find((employee) => employee.id === primaryEmployeeId)?.name,
                role: "Primary Employee",
              },
            ]
          : []),
        ...additionalEmployeeIds.map((employeeId) => ({
          id: employeeId,
          name: availableEmployees.find((employee) => employee.id === employeeId)?.name,
          role: "Additional Employee",
        })),
      ],
    };
    setClients((current) => [...current, client]);
    setEmployees((current) =>
      current.map((employee) =>
        [primaryEmployeeId, ...additionalEmployeeIds].includes(employee.id)
          ? {
              ...employee,
              assignedClients: [
                ...new Set([...(employee.assignedClients || []), client.name]),
              ],
            }
          : employee,
      ),
    );
    setSelectedId(client.id);
    setCreatedClient(client);
    setView("profile");
  };
  if (view === "add")
    return (
      <section className="client-center">
        <div className="client-page-heading">
          <div>
            <button className="back-link" onClick={() => setView("directory")}>
              <ChevronRight size={15} className="back-arrow" /> Client directory
            </button>
            <div className="eyebrow muted">DEMO WORKFLOW</div>
            <h1>Add client</h1>
            <p>
              Create a fictional client record for testing the CareOS workflow.
            </p>
          </div>
          <span className="prototype-label">
            <LockKeyhole size={13} /> Prototype storage
          </span>
        </div>
        <form className="client-form" onSubmit={addClient}>
          <ClientPanel
            icon={UserRound}
            title="Basic & contact information"
            subtitle="Use fictional information only. No permanent database writes."
          >
            <div className="client-form-grid">
              <label>
                Client name
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={updateForm}
                  placeholder="Demo client name"
                />
              </label>
              <label>
                Phone
                <input
                  name="phone"
                  value={form.phone}
                  onChange={updateForm}
                  placeholder="(555) 000-0000"
                />
              </label>
              <label>
                Email
                <input
                  name="email"
                  value={form.email}
                  onChange={updateForm}
                  placeholder="client@demo.careos"
                />
              </label>
              <label>
                Emergency contact
                <input
                  name="emergency"
                  onChange={updateForm}
                  placeholder="Demo contact · (555) 000-0000"
                />
              </label>
            </div>
          </ClientPanel>
          <ClientPanel
            icon={HeartPulse}
            title="Program & services"
            subtitle="Select the fictional program and service context."
          >
            <div className="client-form-grid">
              <label>
                Program / payer
                <select
                  name="program"
                  value={form.program}
                  onChange={updateForm}
                >
                  <option>PASSPORT</option>
                  <option>Ohio Home Care Waiver</option>
                  <option>DODD</option>
                </select>
              </label>
              <label>
                Primary service
                <select
                  name="service"
                  value={form.service}
                  onChange={updateForm}
                >
                  <option>Personal care</option>
                  <option>Skilled nursing</option>
                  <option>Homemaker / personal care</option>
                  <option>Respite care</option>
                </select>
              </label>
              <label>
                Weekly authorized hours
                <input
                  name="hours"
                  value={form.hours}
                  onChange={updateForm}
                  placeholder="20 hrs / week"
                />
              </label>
              <label>
                Case manager / coordinator
                <select
                  name="coordinator"
                  value={form.coordinator}
                  onChange={updateForm}
                >
                  <option>Maya Patel</option>
                  <option>Jordan Davis</option>
                  <option>Care Coordination Team</option>
                </select>
              </label>
            </div>
          </ClientPanel>
          <ClientPanel
            icon={ShieldCheck}
            title="Authorization, care plan & staff assignment"
            subtitle="New demo clients start in a review state until details are entered."
          >
            <div className="client-checks">
              <label>
                <input type="checkbox" /> Authorization on file
              </label>
              <label>
                <input type="checkbox" /> Approved tasks added
              </label>
              <label>
                <input type="checkbox" /> Service dates entered
              </label>
            </div>
            <div className="add-client-assignment">
              <div className="assignment-section-heading">
                <div>
                  <strong>Staff assignment</strong>
                  <small>Select actual demo employees before saving. No assignment is implied until selected.</small>
                </div>
                <UserPlus size={17} />
              </div>
              <div className="add-assignment-controls">
                <label>
                  Primary Employee
                  <select value={primaryEmployeeId} onChange={(event) => setPrimaryEmployeeId(event.target.value)}>
                    <option value="">Select primary employee</option>
                    {availableEmployees.filter((employee) => employee.status === "Active").map((employee) => <option value={employee.id} key={employee.id}>{employee.name} · {employee.role}</option>)}
                  </select>
                </label>
                <label>
                  Search employees
                  <input value={assignmentSearch} onChange={(event) => setAssignmentSearch(event.target.value)} placeholder="Search by name or role" />
                </label>
              </div>
              {assignmentSearch && <div className="employee-assignment-results">{availableEmployees.filter((employee) => `${employee.name} ${employee.role}`.toLowerCase().includes(assignmentSearch.toLowerCase())).map((employee) => <button type="button" className={additionalEmployeeIds.includes(employee.id) ? "selected" : ""} key={employee.id} onClick={() => setAdditionalEmployeeIds((current) => current.includes(employee.id) ? current.filter((id) => id !== employee.id) : [...current, employee.id])}><div className={`employee-avatar small ${employee.tone}`}>{employee.initials}</div><div><strong>{employee.name}</strong><small>{employee.role} · {employee.availability}</small><small>{employee.credential} credentials · {employee.assignedClients?.length || 0} scheduled clients</small></div><span>{additionalEmployeeIds.includes(employee.id) ? "Added" : "Add Another Employee"}</span></button>)}</div>}
              {(primaryEmployeeId || additionalEmployeeIds.length > 0) && <div className="selected-assignment-list"><span>Selected staff</span>{[primaryEmployeeId, ...additionalEmployeeIds].filter(Boolean).map((employeeId) => { const employee = employees.find((item) => item.id === employeeId); return <div key={employeeId}><strong>{employee?.name}</strong><small>{employeeId === primaryEmployeeId ? "Primary Employee" : "Additional Employee"}</small></div>; })}</div>}
              <button type="button" className="assignment-add-button" onClick={() => setAssignmentSearch(assignmentSearch || " ")}><UserPlus size={14} /> Add Another Employee</button>
            </div>
          </ClientPanel>
          <div className="client-form-actions">
            <span>
              <LockKeyhole size={14} /> Demo storage only · no PHI or permanent
              database writes
            </span>
            <button
              type="button"
              className="audit-secondary"
              onClick={() => setView("directory")}
            >
              Cancel
            </button>
            <button type="submit" className="audit-primary">
              <Check size={15} /> Save demo client
            </button>
          </div>
        </form>
      </section>
    );
  if (view === "profile" && (selected || createdClient))
    return (
      <ClientProfileActions
        client={selected || createdClient}
        employees={employees}
        shifts={shifts}
        setClients={setClients}
        setEmployees={setEmployees}
        onBack={() => setView("directory")}
        onViewAudit={onViewAudit}
        onViewBilling={onViewBilling}
        onScheduleShift={onScheduleShift}
      />
    );
  return (
    <section className="client-center">
      <div className="client-page-heading">
        <div>
          <div className="eyebrow muted">CLIENT SERVICES · DEMO DATA</div>
          <h1>Client directory</h1>
          <p>
            Fictional client records, programs, authorizations and service
            readiness.
          </p>
        </div>
        <div className="profile-actions">
          <span className="prototype-label">
            <LockKeyhole size={13} /> Prototype storage
          </span>
          <button className="audit-primary" onClick={() => setView("add")}>
            <UserRound size={15} /> Add client
          </button>
        </div>
      </div>
      <div className="client-summary">
        <div>
          <span>Total clients</span>
          <strong>{clients.length}</strong>
          <small>Demo service population</small>
        </div>
        <div>
          <span>Active</span>
          <strong className="good-number">
            {clients.filter((client) => client.status === "Active").length}
          </strong>
          <small>Current records</small>
        </div>
        <div>
          <span>Authorization alerts</span>
          <strong className="warning-number">
            {
              clients.filter((client) => client.authorization !== "Current")
                .length
            }
          </strong>
          <small>Potential review</small>
        </div>
        <div>
          <span>Documentation review</span>
          <strong className="review-number">
            {
              clients.filter((client) => client.documentation !== "Current")
                .length
            }
          </strong>
          <small>Human review</small>
        </div>
      </div>
      <div className="client-toolbar">
        <label className="directory-search">
          <Search size={16} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search client, ID or service"
          />
        </label>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option>All clients</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <select
          value={programFilter}
          onChange={(event) => setProgramFilter(event.target.value)}
        >
          <option>All programs</option>
          <option>PASSPORT</option>
          <option>Ohio Home Care Waiver</option>
          <option>DODD</option>
        </select>
        <select
          value={authFilter}
          onChange={(event) => setAuthFilter(event.target.value)}
        >
          <option>All authorizations</option>
          <option>Current</option>
          <option>Expiring Soon</option>
          <option>Near Unit Limit</option>
          <option>Expired</option>
          <option>Needs Review</option>
        </select>
      </div>
      <div className="client-table">
        <div className="client-table-head">
          <span>Client</span>
          <span>Program / service</span>
          <span>Authorization</span>
          <span>Assigned staff</span>
          <span>Visits / docs</span>
          <span>Action</span>
        </div>
        {filtered.map((client) => (
          <div className="client-row" key={client.id}>
            <div className="client-cell">
              <div className={`client-avatar ${client.tone}`}>
                {client.initials}
              </div>
              <div>
                <strong>{client.name}</strong>
                <small>{client.id}</small>
              </div>
            </div>
            <div>
              <strong>{client.program}</strong>
              <small>
                {client.service} · {client.hours}
              </small>
            </div>
            <div>
              <ClientStatus>{client.authorization}</ClientStatus>
              <small>
                {client.authorized
                  ? `${client.used} / ${client.authorized} units`
                  : "Authorization review"}
              </small>
            </div>
            <div>
              <strong>{client.staff}</strong>
              <small>{client.employees} assigned employees</small>
            </div>
            <div>
              <strong>{client.visits}</strong>
              <small
                className={
                  client.documentation === "Current"
                    ? "client-current"
                    : "client-review"
                }
              >
                {client.documentation} documentation
              </small>
            </div>
            <button
              className="profile-button"
              onClick={() => {
                setSelectedId(client.id);
                setView("profile");
              }}
            >
              Profile <ArrowUpRight size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="directory-footer">
        <span>
          Showing {filtered.length} of {clients.length} demo clients
        </span>
        <span>
          <LockKeyhole size={12} /> Demo state resets when the app restarts
        </span>
      </div>
    </section>
  );
}

function ClientProfile({ client, onBack, onViewAudit, onViewBilling }) {
  const utilization = client.authorized
    ? Math.min(100, Math.round((client.used / client.authorized) * 100))
    : 0;
  return (
    <section className="client-center">
      <div className="client-page-heading">
        <div>
          <button className="back-link" onClick={onBack}>
            <ChevronRight size={15} className="back-arrow" /> Client directory
          </button>
          <div className="eyebrow muted">CLIENT PROFILE · DEMO DATA</div>
          <h1>{client.name}</h1>
          <p>
            {client.program} <span>·</span> {client.id}
          </p>
        </div>
        <div className="profile-actions">
          <button className="audit-secondary" onClick={onViewBilling}>
            <DollarSign size={14} /> View Billing
          </button>
          <button className="audit-primary" onClick={onViewAudit}>
            <BrainCircuit size={14} /> View Audit Findings
          </button>
        </div>
      </div>
      <div className="client-profile-hero">
        <div className={`client-avatar large ${client.tone}`}>
          {client.initials}
        </div>
        <div>
          <h2>{client.name}</h2>
          <p>
            {client.demographics} · {client.service}
          </p>
          <div className="profile-badges">
            <ClientStatus>{client.status}</ClientStatus>
            <ClientStatus>{client.authorization}</ClientStatus>
            <span className="employee-id">{client.id}</span>
          </div>
        </div>
        <div className="client-hero-meta">
          <span>{client.phone}</span>
          <span>{client.email}</span>
        </div>
      </div>
      <div className="client-profile-grid">
        <ClientPanel
          icon={UserRound}
          title="Overview"
          subtitle="Demographics and care coordination"
        >
          <div className="detail-grid">
            <Detail label="Demographics" value={client.demographics} />
            <Detail label="Phone" value={client.phone} />
            <Detail label="Email" value={client.email} />
            <Detail label="Emergency contact" value={client.emergency} />
            <Detail label="Program / payer" value={client.program} />
            <Detail label="Care coordinator" value={client.coordinator} />
          </div>
        </ClientPanel>
        <ClientPanel
          icon={Gauge}
          title="Services & utilization"
          subtitle="Authorized service units"
        >
          <div className="service-summary">
            <div>
              <span>Service</span>
              <strong>{client.service}</strong>
            </div>
            <div>
              <span>Frequency</span>
              <strong>{client.hours}</strong>
            </div>
            <div>
              <span>Units used</span>
              <strong>{client.used || "—"}</strong>
            </div>
            <div>
              <span>Units remaining</span>
              <strong>
                {client.authorized ? client.authorized - client.used : "—"}
              </strong>
            </div>
          </div>
          <div className="client-utilization-label">
            <span>Authorization utilization</span>
            <strong>{utilization}%</strong>
          </div>
          <div className="client-progress">
            <span style={{ width: `${utilization}%` }} />
          </div>
          <div className="service-dates">
            <span>Effective {client.effective}</span>
            <span>Ends {client.expires}</span>
          </div>
        </ClientPanel>
        <ClientPanel
          icon={ShieldCheck}
          title="Authorizations"
          subtitle="Review status and source values"
          className="wide-client-panel"
        >
          <div className="authorization-grid">
            <Detail label="Authorization number" value={client.authNumber} />
            <Detail label="Program / payer" value={client.program} />
            <Detail label="Service" value={client.service} />
            <Detail
              label="Authorized units"
              value={client.authorized || "Not entered"}
            />
            <Detail label="Used units" value={client.used || "Not entered"} />
            <Detail
              label="Remaining units"
              value={
                client.authorized
                  ? client.authorized - client.used
                  : "Not entered"
              }
            />
            <Detail label="Effective date" value={client.effective} />
            <Detail label="Expiration date" value={client.expires} />
            <div>
              <span>Status</span>
              <ClientStatus>{client.authStatus}</ClientStatus>
            </div>
          </div>
          <div className="authorization-alert">
            <AlertTriangle size={14} />
            <span>
              Potential status indicator only. Authorization decisions require
              authorized human review.
            </span>
          </div>
        </ClientPanel>
        <ClientPanel
          icon={HeartPulse}
          title="Care plan"
          subtitle="Approved tasks and instructions"
        >
          <div className="care-plan-list">
            {client.tasks.length ? (
              client.tasks.map(([task, frequency, level, dates]) => (
                <div key={task}>
                  <strong>{task}</strong>
                  <span>{frequency}</span>
                  <span>{level}</span>
                  <small>{dates}</small>
                </div>
              ))
            ) : (
              <div className="empty-client">
                No demo care-plan tasks entered yet.
              </div>
            )}
          </div>
        </ClientPanel>
        <ClientPanel
          icon={UsersRound}
          title="Assigned staff"
          subtitle="Team and scheduling context"
        >
          <div className="staff-list">
            <div className="primary-staff">
              <div className="client-avatar small orange">
                {client.staff === "Unassigned"
                  ? "--"
                  : client.staff
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
              </div>
              <div>
                <strong>Primary caregiver</strong>
                <span>{client.staff}</span>
              </div>
              <ClientStatus>
                {client.staff === "Unassigned" ? "Needs Review" : "Current"}
              </ClientStatus>
            </div>
            <div className="staff-detail">
              <span>Scheduled hours</span>
              <strong>{client.hours}</strong>
            </div>
            <div className="staff-detail">
              <span>Availability conflicts</span>
              <strong>
                {client.staff === "Unassigned"
                  ? "Staff assignment needed"
                  : "None staged"}
              </strong>
            </div>
          </div>
        </ClientPanel>
        <ClientPanel
          icon={ClipboardCheck}
          title="Visits / EVV"
          subtitle="Recent demo visit records"
        >
          <div className="visit-list">
            {client.visitsData.length ? (
              client.visitsData.map(
                ([date, scheduled, inTime, outTime, status, task]) => (
                  <div key={`${date}-${scheduled}`}>
                    <div>
                      <strong>{date}</strong>
                      <small>
                        Scheduled {scheduled} · {inTime}–{outTime}
                      </small>
                    </div>
                    <ClientStatus>{status}</ClientStatus>
                    <span>{task}</span>
                  </div>
                ),
              )
            ) : (
              <div className="empty-client">No recent demo visits.</div>
            )}
          </div>
        </ClientPanel>
        <ClientPanel
          icon={FileText}
          title="Documentation"
          subtitle="Notes, tasks and signatures"
        >
          <div className="documentation-list">
            {client.notes.length ? (
              client.notes.map((note) => (
                <div key={note}>
                  <FileCheck2 size={14} />
                  <span>{note}</span>
                </div>
              ))
            ) : (
              <div className="empty-client">No documentation staged.</div>
            )}
          </div>
          <div className="documentation-alert">
            <FileWarning size={13} /> Missing documentation requires human
            review.
          </div>
        </ClientPanel>
        <ClientPanel
          icon={DollarSign}
          title="Billing"
          subtitle="Client billing workflow visibility"
        >
          <div className="billing-client-grid">
            <div>
              <span>Ready to bill</span>
              <strong>
                {client.visitsData.length ? "1 visit" : "0 visits"}
              </strong>
            </div>
            <div>
              <span>Unbilled</span>
              <strong>
                {client.documentation === "Current" ? "0" : "1 visit"}
              </strong>
            </div>
            <div>
              <span>Submitted</span>
              <strong>0</strong>
            </div>
            <div>
              <span>Paid</span>
              <strong>$0.00</strong>
            </div>
            <div>
              <span>Denied / rejected</span>
              <strong>0</strong>
            </div>
            <div>
              <span>Exceptions</span>
              <strong>{client.visits === "1 exception" ? "1" : "0"}</strong>
            </div>
          </div>
          <button className="text-button" onClick={onViewBilling}>
            Open Billing workflow <ArrowUpRight size={14} />
          </button>
        </ClientPanel>
        <ClientPanel
          icon={ShieldAlert}
          title="Incidents & MUIs"
          subtitle="Review queue, not a legal determination"
        >
          <div className="incident-client">
            <span className="incident-dot" />{" "}
            <strong>{client.incidents}</strong>
          </div>
          <p className="client-safety-note">
            Potential MUI indicators require authorized human review. CareOS
            does not determine whether an incident legally qualifies as an MUI.
          </p>
        </ClientPanel>
      </div>
      <div className="client-ai-callout">
        <BrainCircuit size={18} />
        <div>
          <strong>AI Audit potential findings</strong>
          <p>
            Authorization expires in 12 days · Service units approaching limit ·
            Missing shift documentation · EVV does not match schedule · Visit
            awaiting billing review
          </p>
          <small>Demo signals only · Require authorized human review</small>
        </div>
        <button className="audit-primary" onClick={onViewAudit}>
          View Audit Findings <ArrowUpRight size={14} />
        </button>
      </div>
    </section>
  );
}

function ClientProfileActions({
  client,
  employees,
  shifts,
  setClients,
  setEmployees,
  onBack,
  onViewAudit,
  onViewBilling,
  onScheduleShift,
}) {
  const [action, setAction] = useState(null);
  const [role, setRole] = useState("Primary Employee");
  const [employeeId, setEmployeeId] = useState("");
  const [actionText, setActionText] = useState("");
  const assigned = client.assignedEmployees || [];
  const upcoming = shifts.filter(
    (shift) =>
      shift.clientId === client.id &&
      shift.status !== "Completed" &&
      shift.status !== "Cancelled",
  );
  const saveAssignment = () => {
    const employee = employees.find((item) => item.id === employeeId);
    if (!employee) return;
    setClients((current) =>
      current.map((item) =>
        item.id === client.id
          ? {
              ...item,
              assignedEmployees: [
                ...(item.assignedEmployees || []).filter(
                  (item) => item.role !== role,
                ),
                { id: employee.id, name: employee.name, role },
              ],
              staff: role === "Primary Employee" ? employee.name : item.staff,
              employees: new Set([
                ...(item.assignedEmployees || []).map((item) => item.id),
                employee.id,
              ]).size,
            }
          : item,
      ),
    );
    setEmployees((current) =>
      current.map((item) =>
        item.id === employee.id
          ? {
              ...item,
              assignedClients: [
                ...new Set([...(item.assignedClients || []), client.name]),
              ],
            }
          : item,
      ),
    );
    setActionText(`${employee.name} saved as ${role} in demo state.`);
    setAction("saved");
  };
  const assignedIds = assigned.map((item) => item.id);
  return (
    <section className="client-action-layer">
      <div className="client-action-bar">
        <div>
          <button className="back-link" onClick={onBack}>
            <ChevronRight size={15} className="back-arrow" /> Client directory
          </button>
          <div className="eyebrow muted">CLIENT WORKFLOW · DEMO DATA</div>
        </div>
        <div className="client-action-buttons">
          <button onClick={() => onScheduleShift(client.id)}>
            <CalendarDays size={14} /> Schedule Shift
          </button>
          <button onClick={() => setAction("assign")}>
            <UserPlus size={14} /> Assign Employee
          </button>
          <button onClick={() => setAction("authorization")}>
            <ShieldCheck size={14} /> Add Authorization
          </button>
          <button onClick={() => setAction("service")}>
            <HeartPulse size={14} /> Add Service
          </button>
          <button onClick={() => setAction("task")}>
            <CheckCircle2 size={14} /> Add Care Plan Task
          </button>
        </div>
      </div>
      {action && (
        <div className="client-workflow-card">
          <div>
            <div className="eyebrow muted">
              {action === "assign" ? "STAFF ASSIGNMENT" : "CLIENT WORKFLOW"}
            </div>
            <h2>
              {action === "assign"
                ? "Assign employee"
                : action === "authorization"
                  ? "Add authorization"
                  : action === "service"
                    ? "Add service"
                    : action === "task"
                      ? "Add care plan task"
                      : "Assignment saved"}
            </h2>
            <p>
              {action === "assign"
                ? "Choose an existing fictional employee and role. The assignment will update this client and the Employee module."
                : action === "saved"
                  ? actionText
                  : "Demo workflow placeholder ready for authorized staff input."}
            </p>
          </div>
          {action === "assign" && (
            <>
              <div className="assignment-controls">
                <label>
                  Assignment type
                  <select
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                  >
                    <option>Primary Employee</option>
                    <option>Backup Employee</option>
                    <option>Additional Employee</option>
                  </select>
                </label>
                <label>
                  Search employees
                  <select
                    value={employeeId}
                    onChange={(event) => setEmployeeId(event.target.value)}
                  >
                    <option value="">Select employee</option>
                    {employees
                      .filter(
                        (employee) =>
                          !assignedIds.includes(employee.id) ||
                          assigned.some(
                            (item) =>
                              item.id === employee.id && item.role === role,
                          ),
                      )
                      .map((employee) => (
                        <option value={employee.id} key={employee.id}>
                          {employee.name} · {employee.role} ·{" "}
                          {employee.credential}
                        </option>
                      ))}
                  </select>
                </label>
              </div>
              {employeeId && (
                <div className="assignment-preview">
                  {(() => {
                    const employee = employees.find(
                      (item) => item.id === employeeId,
                    );
                    return employee ? (
                      <>
                        <div
                          className={`employee-avatar small ${employee.tone}`}
                        >
                          {employee.initials}
                        </div>
                        <div>
                          <strong>{employee.name}</strong>
                          <span>
                            {employee.role} · {employee.availability}
                          </span>
                          <small>
                            {employee.credential} credentials ·{" "}
                            {employee.assignedClients?.length || 0} current
                            client assignments
                          </small>
                        </div>
                      </>
                    ) : null;
                  })()}
                </div>
              )}
              <button className="audit-primary" onClick={saveAssignment}>
                <Check size={14} /> Assign Employee
              </button>
            </>
          )}
          {action !== "assign" && action !== "saved" && (
            <>
              <div className="demo-action-fields">
                <label>
                  Demo workflow note
                  <textarea
                    placeholder={`Enter ${action} details for review...`}
                  />
                </label>
              </div>
              <button
                className="audit-primary"
                onClick={() => {
                  setActionText(`${action} workflow saved as a demo draft.`);
                  setAction("saved");
                }}
              >
                <Check size={14} /> Save demo draft
              </button>
            </>
          )}
          <button className="workflow-dismiss" onClick={() => setAction(null)}>
            Close
          </button>
        </div>
      )}
      <section className="assigned-staff-summary"><div><div className="eyebrow muted">STAFFING TEAM</div><h2>Assigned employees</h2><p>Shared demo assignments also appear in Employee Profiles.</p></div><div className="assigned-staff-list">{assigned.length ? assigned.map((assignment) => <div key={`${assignment.id}-${assignment.role}`}><UserCheck size={14} /><span><strong>{assignment.name}</strong><small>{assignment.role}</small></span></div>) : <span className="no-assignment">No employee assigned yet.</span>}</div></section>
      <ClientProfile
        client={client}
        onBack={onBack}
        onViewAudit={onViewAudit}
        onViewBilling={onViewBilling}
      />
      <section className="upcoming-schedule">
        <div className="upcoming-heading">
          <div>
            <div className="eyebrow muted">SCHEDULED SERVICES</div>
            <h2>Upcoming Schedule</h2>
            <p>Shifts created here also appear in Scheduling.</p>
          </div>
          <button
            className="audit-primary"
            onClick={() => onScheduleShift(client.id)}
          >
            <CalendarDays size={14} /> Schedule Shift
          </button>
        </div>
        {upcoming.length ? (
          <div className="upcoming-list">
            {upcoming.map((shift) => (
              <div key={shift.id}>
                <div>
                  <strong>{shift.date}</strong>
                  <small>
                    {shift.employee} · {shift.service}
                  </small>
                </div>
                <span>
                  {shift.start}–{shift.end} · {shift.duration}
                </span>
                <ClientStatus>{shift.status}</ClientStatus>
                <div className="upcoming-actions">
                  <button>View</button>
                  <button>Edit</button>
                  <button>Reassign</button>
                  <button>Cancel</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-client">
            No upcoming shifts for this client yet.
          </div>
        )}
      </section>
      <div className="client-workflow-trail">
        <span>Client</span>
        <i /> <span>Authorization</span>
        <i /> <span>Assign Employee</span>
        <i /> <span>Schedule Shift</span>
        <i /> <span>EVV</span>
        <i /> <span>Documentation</span>
        <i /> <span>AI Audit</span>
        <i /> <span>Billing</span>
      </div>
    </section>
  );
}

function SchedulingCenter({
  employees,
  clients,
  shifts,
  setShifts,
  onViewAudit,
  initialClientId,
}) {
  const [view, setView] = useState("Week");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [overrideReason, setOverrideReason] = useState("");
  const [scheduleMessage, setScheduleMessage] = useState("");
  const [form, setForm] = useState({
    clientId: initialClientId || clients[0]?.id || "",
    employeeId: employees[0]?.id || "",
    service:
      clients.find((client) => client.id === initialClientId)?.service ||
      clients[0]?.service ||
      "Personal care",
    date: "2026-09-16",
    start: "09:00",
    end: "12:00",
  });
  const selectedClient =
    clients.find((client) => client.id === form.clientId) || clients[0];
  const selectedEmployee =
    employees.find((employee) => employee.id === form.employeeId) ||
    employees[0];
  const updateForm = (event) => {
    const next = { ...form, [event.target.name]: event.target.value };
    if (event.target.name === "clientId")
      next.service =
        clients.find((client) => client.id === event.target.value)?.service ||
        "Personal care";
    setForm(next);
  };
  const duration = Math.max(
    0,
    Number(form.end.split(":")[0]) +
      Number(form.end.split(":")[1]) / 60 -
      (Number(form.start.split(":")[0]) +
        Number(form.start.split(":")[1]) / 60),
  );
  const checks =
    selectedClient && selectedEmployee
      ? [
          {
            label: "Employee availability",
            ok:
              selectedEmployee.status === "Active" &&
              !selectedEmployee.availability.includes("Not"),
            detail:
              selectedEmployee.status === "Active"
                ? "Available in demo schedule"
                : "Employee is inactive",
          },
          {
            label: "Overlapping shift",
            ok: !shifts.some(
              (shift) =>
                shift.employeeId === selectedEmployee.id &&
                shift.date === form.date &&
                shift.status !== "Cancelled",
            ),
            detail: "No matching demo shift found",
          },
          {
            label: "Authorization expiration",
            ok:
              selectedClient.authorization !== "Expired" &&
              selectedClient.expires !== "Not entered",
            detail:
              selectedClient.expires === "Not entered"
                ? "Authorization needs review"
                : `Ends ${selectedClient.expires}`,
          },
          {
            label: "Remaining authorized units",
            ok: selectedClient.authorized > selectedClient.used + duration,
            detail: selectedClient.authorized
              ? `${selectedClient.authorized - selectedClient.used} units remaining`
              : "No units entered",
          },
          {
            label: "Required credentials",
            ok: selectedEmployee.credential === "Current",
            detail:
              selectedEmployee.credential === "Current"
                ? "Credential status current"
                : `${selectedEmployee.credential} · human review`,
          },
        ].map((check) => ({ ...check, potential: !check.ok }))
      : [];
  const saveShift = (event) => {
    event.preventDefault();
    const hasProblems = checks.some((check) => !check.ok);
    if (hasProblems && !overrideReason.trim()) {
      setScheduleMessage(
        "Potential workflow findings detected. Add an authorized-demo override reason before saving.",
      );
      return;
    }
    const shift = {
      id: `SHIFT-${3000 + shifts.length}`,
      clientId: selectedClient.id,
      employeeId: selectedEmployee.id,
      client: selectedClient.name,
      employee: selectedEmployee.name,
      service: form.service,
      date: form.date,
      start: form.start,
      end: form.end,
      program: selectedClient.program,
      status: "Scheduled",
      duration: `${duration.toFixed(1)} hrs`,
      override: hasProblems
        ? `${overrideReason} · Jordan Davis · Sep 16, 2026`
        : "",
    };
    setShifts((current) => [...current, shift]);
    setScheduleMessage(
      hasProblems
        ? "Shift saved with authorized-demo override. Potential findings remain for human review."
        : "Shift created in demo schedule.",
    );
    setShowCreate(false);
    setOverrideReason("");
  };
  const markOpen = (shift) =>
    setShifts((current) =>
      current.map((item) =>
        item.id === shift.id
          ? {
              ...item,
              status: "Needs Coverage",
              employeeId: "",
              employee: "Open shift",
            }
          : item,
      ),
    );
  const workflow = [
    "Scheduled",
    "Assigned",
    "EVV",
    "Documentation",
    "Audit",
    "Billing",
  ];
  const openShifts = shifts.filter(
    (shift) => shift.status === "Open" || shift.status === "Needs Coverage",
  );
  const getSuggestedStaff = (shift) =>
    employees
      .filter((employee) => employee.status === "Active")
      .map((employee) => ({
        employee,
        score:
          (employee.credential === "Current" ? 3 : 1) +
          (employee.clients ? 2 : 0) -
          (employee.name === shift.employee ? 2 : 0),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  if (showCreate)
    return (
      <section className="schedule-center">
        <div className="schedule-page-heading">
          <div>
            <button className="back-link" onClick={() => setShowCreate(false)}>
              <ChevronRight size={15} className="back-arrow" /> Scheduling
              command center
            </button>
            <div className="eyebrow muted">DEMO WORKFLOW</div>
            <h1>Create shift</h1>
            <p>
              Prototype checks surface potential workflow findings before a demo
              shift is saved.
            </p>
          </div>
          <span className="prototype-label">
            <LockKeyhole size={13} /> Demo scheduling only
          </span>
        </div>
        <form className="shift-form" onSubmit={saveShift}>
          <div className="shift-form-fields">
            <label>
              Client
              <select
                name="clientId"
                value={form.clientId}
                onChange={updateForm}
              >
                {clients.map((client) => (
                  <option value={client.id} key={client.id}>
                    {client.name} · {client.program}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Employee
              <select
                name="employeeId"
                value={form.employeeId}
                onChange={updateForm}
              >
                {employees.map((employee) => (
                  <option value={employee.id} key={employee.id}>
                    {employee.name} · {employee.role}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Service
              <select name="service" value={form.service} onChange={updateForm}>
                <option>{selectedClient?.service}</option>
                <option>Personal care</option>
                <option>Skilled nursing</option>
                <option>Homemaker / personal care</option>
              </select>
            </label>
            <label>
              Date
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={updateForm}
              />
            </label>
            <label>
              Start time
              <input
                type="time"
                name="start"
                value={form.start}
                onChange={updateForm}
              />
            </label>
            <label>
              End time
              <input
                type="time"
                name="end"
                value={form.end}
                onChange={updateForm}
              />
            </label>
          </div>
          <div className="authorization-preview">
            <div>
              <ShieldCheck size={16} />
              <div>
                <strong>Client authorization preview</strong>
                <span>
                  {selectedClient?.program} · {selectedClient?.authNumber} ·{" "}
                  {selectedClient?.authorized - selectedClient?.used} units
                  remaining
                </span>
              </div>
            </div>
            <ClientStatus>
              {selectedClient?.authorization || "Needs Review"}
            </ClientStatus>
          </div>
          <div className="prototype-checks">
            <div className="check-heading">
              <div>
                <div className="eyebrow muted">PRE-SAVE GUARDRAILS</div>
                <h2>Potential workflow checks</h2>
              </div>
              <span>Human review required</span>
            </div>
            {checks.map((check) => (
              <div className="prototype-check" key={check.label}>
                <span
                  className={`check-indicator ${check.ok ? "ok" : "problem"}`}
                >
                  {check.ok ? <Check size={12} /> : <AlertTriangle size={12} />}
                </span>
                <div>
                  <strong>{check.label}</strong>
                  <small>{check.detail}</small>
                </div>
                <b>{check.ok ? "Clear" : "Potential issue"}</b>
              </div>
            ))}
          </div>
          {checks.some((check) => !check.ok) && (
            <label className="override-field">
              Authorized-demo override reason required
              <textarea
                value={overrideReason}
                onChange={(event) => setOverrideReason(event.target.value)}
                placeholder="Explain why this demo shift should be saved for review..."
              />
            </label>
          )}
          <div className="shift-form-actions">
            <span>
              <LockKeyhole size={14} /> No real EVV, authorization, or
              compliance decision is made.
            </span>
            <button
              type="button"
              className="audit-secondary"
              onClick={() => setShowCreate(false)}
            >
              Cancel
            </button>
            <button type="submit" className="audit-primary">
              <CalendarDays size={15} /> Save demo shift
            </button>
          </div>
        </form>
      </section>
    );
  return (
    <section className="schedule-center">
      <div className="schedule-page-heading">
        <div>
          <div className="eyebrow muted">WORKFORCE OPERATIONS · DEMO DATA</div>
          <h1>Scheduling &amp; Staffing</h1>
          <p>
            Connect fictional employees, clients, authorizations and shifts in
            one planning workspace.
          </p>
        </div>
        <div className="profile-actions">
          <span className="prototype-label">
            <LockKeyhole size={13} /> Prototype storage
          </span>
          <button className="audit-primary" onClick={() => setShowCreate(true)}>
            <CalendarDays size={15} /> Create Shift
          </button>
        </div>
      </div>
      <div className="schedule-summary">
        <div>
          <span>Today's shifts</span>
          <strong>
            {shifts.filter((shift) => shift.date === "2026-09-16").length}
          </strong>
          <small>Demo schedule</small>
        </div>
        <div>
          <span>Covered shifts</span>
          <strong className="good-number">
            {
              shifts.filter(
                (shift) =>
                  shift.employeeId &&
                  shift.status !== "Open" &&
                  shift.status !== "Needs Coverage",
              ).length
            }
          </strong>
          <small>Assigned staff</small>
        </div>
        <div>
          <span>Open shifts</span>
          <strong className="warning-number">{openShifts.length}</strong>
          <small>Needs coverage</small>
        </div>
        <div>
          <span>Late / missed clock-ins</span>
          <strong className="review-number">1</strong>
          <small>Prepared alert</small>
        </div>
        <div>
          <span>Authorization conflicts</span>
          <strong className="warning-number">1</strong>
          <small>Potential finding</small>
        </div>
        <div>
          <span>Staffing conflicts</span>
          <strong className="review-number">1</strong>
          <small>Human review</small>
        </div>
      </div>
      {scheduleMessage && (
        <div className="schedule-message">
          <CheckCircle2 size={15} />
          {scheduleMessage}
          <button onClick={() => setScheduleMessage("")}>Dismiss</button>
        </div>
      )}
      <div className="schedule-layout">
        <div className="schedule-main">
          <div className="calendar-toolbar">
            <div className="calendar-tabs">
              {["Day", "Week", "Employee", "Client"].map((tab) => (
                <button
                  className={view === tab ? "active" : ""}
                  key={tab}
                  onClick={() => setView(tab)}
                >
                  <CalendarRange size={14} />
                  {tab}
                </button>
              ))}
            </div>
            <button className="filter-button">
              <ListFilter size={14} /> Filters
            </button>
          </div>
          <div className="calendar-heading">
            <div>
              <strong>September 14–20, 2026</strong>
              <span>Week of current demo schedule</span>
            </div>
            <div className="calendar-nav">
              <button>‹</button>
              <button>›</button>
            </div>
          </div>
          <div className={`shift-calendar ${view.toLowerCase()}`}>
            {shifts.map((shift) => (
              <button
                className={`shift-card ${shift.status.toLowerCase().replaceAll(" ", "-")}`}
                key={shift.id}
                onClick={() => setSelectedShift(shift)}
              >
                <span className="shift-time">
                  {shift.start}–{shift.end}
                </span>
                <strong>{shift.client}</strong>
                <span>{shift.employee}</span>
                <small>
                  {shift.service} · {shift.program}
                </small>
                <ClientStatus>{shift.status}</ClientStatus>
              </button>
            ))}
          </div>
          <div className="workflow-strip">
            <div className="workflow-heading">
              <div>
                <div className="eyebrow muted">EVV HANDOFF PREPARATION</div>
                <h2>Service workflow</h2>
              </div>
              <span>UI only</span>
            </div>
            <div className="workflow-steps">
              {workflow.map((step, index) => (
                <div key={step}>
                  <span className={index < 2 ? "complete" : ""}>
                    {index < 2 ? <Check size={12} /> : index + 1}
                  </span>
                  <strong>{step}</strong>
                  {index < workflow.length - 1 && <i />}
                </div>
              ))}
            </div>
            <p>
              <ClipboardCheck size={13} /> Scheduled service records are
              structured for a future EVV connection. No real EVV API is
              connected.
            </p>
          </div>
        </div>
        <aside className="schedule-side">
          <div className="open-shifts-panel">
            <div className="side-heading">
              <div>
                <div className="eyebrow muted">STAFFING QUEUE</div>
                <h2>Open shifts</h2>
              </div>
              <span>{openShifts.length}</span>
            </div>
            {openShifts.length ? (
              openShifts.map((shift) => (
                <div className="open-shift" key={shift.id}>
                  <div>
                    <strong>{shift.client}</strong>
                    <small>
                      {shift.service} · {shift.date}
                    </small>
                    <small>
                      {shift.start}–{shift.end} · {shift.duration}
                    </small>
                  </div>
                  <button onClick={() => setSelectedShift(shift)}>
                    Find Available Staff <UserPlus size={13} />
                  </button>
                  {selectedShift?.id === shift.id && (
                    <div className="suggested-staff">
                      <span>Suggested staff · human selection required</span>
                      {getSuggestedStaff(shift).map(({ employee }) => (
                        <button
                          key={employee.id}
                          onClick={() => {
                            setShifts((current) =>
                              current.map((item) =>
                                item.id === shift.id
                                  ? {
                                      ...item,
                                      employeeId: employee.id,
                                      employee: employee.name,
                                      status: "Scheduled",
                                    }
                                  : item,
                              ),
                            );
                            setSelectedShift(null);
                          }}
                        >
                          <div
                            className={`client-avatar small ${employee.tone}`}
                          >
                            {employee.initials}
                          </div>
                          <div>
                            <strong>{employee.name}</strong>
                            <small>
                              {employee.credential} · {employee.clients} clients
                            </small>
                          </div>
                          <ChevronRight size={14} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="empty-schedule">
                <CheckCircle2 size={20} /> No open shifts
              </div>
            )}
            <div className="suggestion-note">
              <UsersRound size={13} /> Suggestions use demo availability,
              credentials, conflicts, client relationship and weekly hours. They
              do not make staffing decisions.
            </div>
          </div>
          <div className="missed-clock-panel">
            <div className="side-heading">
              <div>
                <div className="eyebrow muted">CLOCK-IN PREPARATION</div>
                <h2>Missed clock-in alert</h2>
              </div>
              <ClockAlert size={18} />
            </div>
            <div className="clock-timeline">
              <span className="active">Shift scheduled</span>
              <i />
              <span className="active">Clock-in expected</span>
              <i />
              <span>Grace period</span>
              <i />
              <span className="alert">Missed clock-in</span>
            </div>
            <div className="automation-off">
              <PhoneCall size={14} />
              <div>
                <strong>Staff contact automation — Not Connected</strong>
                <small>
                  Future flow: contact employee → wait for response → alert
                  scheduler → search staff → escalate uncovered shift
                </small>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <div className="schedule-audit-callout">
        <BrainCircuit size={17} />
        <div>
          <strong>AI Audit connection</strong>
          <p>
            Potential findings: employee double-booked · client overlapping
            visits · shift exceeds authorization · credential expired · open
            shift uncovered · service mismatch.
          </p>
          <small>Potential findings require authorized human review.</small>
        </div>
        <button className="audit-primary" onClick={onViewAudit}>
          View Audit Findings <ArrowUpRight size={14} />
        </button>
      </div>
      {selectedShift && (
        <div className="shift-detail-drawer">
          <button onClick={() => setSelectedShift(null)}>
            <XCircle size={16} />
          </button>
          <div className="eyebrow muted">SHIFT DETAIL · {selectedShift.id}</div>
          <h2>{selectedShift.client}</h2>
          <p>
            {selectedShift.service} · {selectedShift.program}
          </p>
          <div className="detail-grid">
            <Detail label="Employee" value={selectedShift.employee} />
            <Detail
              label="Scheduled"
              value={`${selectedShift.date} · ${selectedShift.start}–${selectedShift.end}`}
            />
            <Detail label="Status" value={selectedShift.status} />
            <Detail label="EVV handoff" value="Ready for next phase" />
          </div>
          {selectedShift.status !== "Needs Coverage" && (
            <button
              className="audit-secondary"
              onClick={() => markOpen(selectedShift)}
            >
              Mark Open / Needs Coverage
            </button>
          )}
        </div>
      )}
    </section>
  );
}

class CareOsErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <section className="module-placeholder"><div className="placeholder-icon"><ShieldAlert size={22} /></div><div className="eyebrow muted">CAREOS RECOVERY</div><h1>This workspace needs attention</h1><p>The current demo view could not be rendered. Your source records were not changed.</p><button className="outline-button" onClick={() => this.setState({ hasError: false })}>Try again <RefreshCw size={15} /></button></section>;
    return this.props.children;
  }
}

function EvcStatus({ children }) { return <span className={`evv-status ${children.toLowerCase().replaceAll(" ", "-")}`}><i />{children}</span>; }

function EvcCenter({ employees, clients, shifts, setShifts, onViewAudit }) {
  const [selectedId, setSelectedId] = useState(shifts[0]?.id || "");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [exceptionFilter, setExceptionFilter] = useState("All visits");
  const [note, setNote] = useState("");
  const [incident, setIncident] = useState("No");
  const [taskStates, setTaskStates] = useState({});
  const [taskReasons, setTaskReasons] = useState({});
  const [message, setMessage] = useState("");
  const selectedShift = shifts.find((shift) => shift.id === selectedId) || shifts[0];
  const selectedClient = clients.find((client) => client.id === selectedShift?.clientId);
  const selectedEmployee = employees.find((employee) => employee.id === selectedShift?.employeeId);
  const visitTasks = selectedClient?.tasks?.length ? selectedClient.tasks.map(([task]) => task) : ["Bathing assistance", "Dressing", "Meal preparation", "Medication reminder", "Light housekeeping"];
  const updateShift = (id, changes) => setShifts((current) => current.map((shift) => shift.id === id ? { ...shift, ...changes } : shift));
  const clockIn = () => { if (!selectedShift || !selectedEmployee) return setMessage("This visit needs an assigned employee before clock-in."); const activeElsewhere = shifts.some((shift) => shift.id !== selectedShift.id && shift.employeeId === selectedShift.employeeId && shift.evvStatus === "Clocked In"); if (activeElsewhere) return setMessage("Safety warning: this employee is already clocked into another demo visit."); updateShift(selectedShift.id, { evvStatus: "Clocked In", status: "In Progress", actualClockIn: "9:04 AM", location: "Simulated location · Demo" }); setMessage("Clock In recorded at 9:04 AM. Location verification is simulated."); };
  const startServices = () => { if (selectedShift?.evvStatus !== "Clocked In") return setMessage("Clock in before starting services."); updateShift(selectedShift.id, { evvStatus: "Services In Progress" }); setMessage("Services started. Complete tasks as performed."); };
  const completeTasks = () => { if (selectedShift?.evvStatus !== "Services In Progress") return setMessage("Start services before completing tasks."); updateShift(selectedShift.id, { evvStatus: "Tasks Recorded", taskStates }); setMessage("Task results saved to this demo visit. The care plan was not changed."); };
  const clockOut = () => { if (!selectedShift?.actualClockIn) return setMessage("Safety warning: clock in before clock out."); if (!note.trim()) return setMessage("Visit documentation is required before clock out."); const incompleteTasks = visitTasks.filter((task) => !taskStates[task] || taskStates[task] === "Not started" || taskStates[task] === "Not Completed" || taskStates[task] === "Client Refused"); if (incompleteTasks.some((task) => !taskReasons[task]?.trim())) return setMessage("Add a reason for each task marked Not Completed, Client Refused, or not recorded."); const hasIncomplete = incompleteTasks.length > 0; updateShift(selectedShift.id, { evvStatus: hasIncomplete || incident === "Yes" ? "EVV Review" : "Ready to Bill", status: "Completed", actualClockOut: "12:46 PM", visitDuration: "3h 42m", documentationStatus: "Complete", note, incident, taskStates, taskReasons, exception: hasIncomplete ? "Task completion requires review" : incident === "Yes" ? "Incident report required" : "" }); setMessage(hasIncomplete || incident === "Yes" ? "Clock Out recorded. Visit routed to EVV / human review before billing." : "Clock Out recorded. Demo visit is ready for billing after review."); };
  const visibleShifts = shifts.filter((shift) => statusFilter === "All statuses" || shift.status === statusFilter).filter((shift) => exceptionFilter === "All visits" || (exceptionFilter === "Exceptions only" ? Boolean(shift.exception) : !shift.exception));
  const metrics = [["Today's visits", shifts.length, CalendarDays], ["Currently clocked in", shifts.filter((shift) => shift.evvStatus === "Clocked In" || shift.evvStatus === "Services In Progress").length, Timer], ["Completed visits", shifts.filter((shift) => shift.status === "Completed").length, CheckCircle2], ["Missed clock-ins", 1, ClockAlert], ["EVV exceptions", shifts.filter((shift) => shift.exception).length + 1, AlertTriangle], ["Ready for billing", shifts.filter((shift) => shift.evvStatus === "Ready to Bill").length, Receipt]];
  return <section className="evv-center"><div className="evv-page-heading"><div><div className="eyebrow muted">VISIT OPERATIONS · FICTIONAL DEMO DATA</div><h1>EVV Command Center</h1><p>Move each demo visit from scheduled service through documentation, audit, and billing review.</p></div><span className="prototype-label"><MapPin size={13} /> Location verification — Demo</span></div><div className="evv-metrics">{metrics.map(([label, value, Icon]) => <div key={label}><span>{label}</span><strong>{value}</strong><Icon size={17} /></div>)}</div>{message && <div className="evv-message"><CheckCircle2 size={15} />{message}<button onClick={() => setMessage("")}>Dismiss</button></div>}<div className="evv-layout"><div className="evv-main"><div className="evv-toolbar"><label className="directory-search"><Search size={16} /><input placeholder="Search client, employee or visit" /></label><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All statuses</option><option>Scheduled</option><option>In Progress</option><option>Completed</option><option>Ready to Bill</option><option>EVV Review</option></select><select value={exceptionFilter} onChange={(event) => setExceptionFilter(event.target.value)}><option>All visits</option><option>Exceptions only</option><option>No exceptions</option></select></div><div className="evv-visit-list">{visibleShifts.map((shift) => <button className={`evv-visit-row ${selectedId === shift.id ? "selected" : ""}`} key={shift.id} onClick={() => { setSelectedId(shift.id); setNote(shift.note || ""); setIncident(shift.incident || "No"); setTaskStates(shift.taskStates || {}); }}><div className="visit-date"><strong>{shift.date}</strong><small>{shift.start}–{shift.end}</small></div><div><strong>{shift.client}</strong><small>{shift.employee} · {shift.service}</small></div><div><span>{shift.program}</span><small>{shift.id}</small></div><EvcStatus>{shift.evvStatus || shift.status}</EvcStatus></button>)}</div><div className="evv-exceptions"><div className="evv-section-heading"><div><div className="eyebrow muted">WORK QUEUE</div><h2>EVV Exceptions</h2><p>Potential findings requiring authorized human review.</p></div><span className="exception-count">{shifts.filter((shift) => shift.exception).length + 1}</span></div><div className="exception-row"><span className="exception-icon critical"><ClockAlert size={15} /></span><div><strong>Late clock-in</strong><small>Jordan Mitchell · Alex Morgan · Visit SHIFT-3001</small><p>Actual clock-in differs from scheduled start by 4 minutes.</p></div><EvcStatus>Needs Review</EvcStatus><button className="review-button">Review</button></div><div className="exception-row"><span className="exception-icon warning"><FileWarning size={15} /></span><div><strong>Missing documentation</strong><small>Demo visit record · Documentation not complete</small><p>A visit cannot move to billing until required documentation is present.</p></div><EvcStatus>Open</EvcStatus><button className="review-button">Review</button></div></div></div><aside className="evv-side">{selectedShift && <div className="caregiver-view"><div className="caregiver-heading"><div><div className="eyebrow muted">CAREGIVER VISIT VIEW</div><h2>{selectedShift.client}</h2><p>{selectedShift.service} · {selectedShift.program}</p></div><EvcStatus>{selectedShift.evvStatus || selectedShift.status}</EvcStatus></div><div className="visit-info-grid"><div><span>Scheduled</span><strong>{selectedShift.start}–{selectedShift.end}</strong></div><div><span>Assigned employee</span><strong>{selectedShift.employee}</strong></div><div><span>Authorized service</span><strong>{selectedClient?.authorization || "Demo review"}</strong></div><div><span>Location</span><strong>Simulated · Demo</strong></div></div><div className="visit-actions"><button onClick={clockIn} disabled={selectedShift.evvStatus === "Clocked In" || selectedShift.status === "Completed"}><Play size={14} /> Clock In</button><button onClick={startServices}><HeartPulse size={14} /> Start Services</button><button onClick={completeTasks}><Check size={14} /> Complete Tasks</button><button onClick={() => setMessage("Incident report draft opened. Potential MUI situations require authorized review.")}><ShieldAlert size={14} /> Report Incident</button><button className="clock-out" onClick={clockOut}><Square size={14} /> Clock Out</button></div><div className="task-verification"><div className="evv-section-heading"><div><div className="eyebrow muted">TASK VERIFICATION</div><h3>Care-plan tasks</h3></div><span>Demo only</span></div>{visitTasks.map((task) => <div className="task-row" key={task}><strong>{task}</strong><select value={taskStates[task] || "Not started"} onChange={(event) => setTaskStates((current) => ({ ...current, [task]: event.target.value }))}><option>Not started</option><option>Completed</option><option>Not Completed</option><option>Client Refused</option><option>Not Applicable</option></select></div>)}</div><div className="visit-documentation"><div className="evv-section-heading"><div><div className="eyebrow muted">DOCUMENTATION</div><h3>Visit note</h3></div><span>Required before Clock Out</span></div><label>General visit note<textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Describe fictional services and observations..." /></label><label>Incident occurred?<select value={incident} onChange={(event) => setIncident(event.target.value)}><option>No</option><option>Yes</option></select></label>{incident === "Yes" && <div className="incident-warning"><ShieldAlert size={14} /> Create Incident Report · Requires authorized review</div>}</div></div>}<div className="audit-review-card"><div className="evv-section-heading"><div><div className="eyebrow muted">CAREOS AUDIT REVIEW</div><h2>Potential visit checks</h2></div><BrainCircuit size={18} /></div>{["Employee assigned to client", "Employee credential status", "Service authorized", "Visit within authorization dates", "Scheduled vs actual time", "Tasks match care plan", "Documentation complete", "No overlapping visits", "Billing units consistent"].map((check, index) => <div className="audit-check-row" key={check}><CheckCircle2 size={13} className={index === 4 && selectedShift?.exception ? "warning-icon" : ""} /><span>{check}</span><strong>{index === 4 && selectedShift?.exception ? "WARNING" : index === 6 && !selectedShift?.documentationStatus ? "NEEDS REVIEW" : "PASSED"}</strong></div>)}<p>Potential finding requiring authorized human review. CareOS does not determine Medicaid or legal compliance.</p><button className="text-button" onClick={onViewAudit}>Open AI Audit Center <ArrowUpRight size={14} /></button></div></aside></div><div className="evv-flow"><span>Scheduled</span><i /><span>Clock In</span><i /><span>Services</span><i /><span>Document</span><i /><span>Clock Out</span><i /><span>AI Audit</span><i /><span>Ready to Bill</span></div></section>;
}

function App() {
  const { mode } = useCareOS();
  const [activeModule, setActiveModule] = useState("Command Center");
  const [employees, setEmployees] = useState(() => employeeService.list(demoEmployees));
  const [clients, setClients] = useState(() => clientService.list(demoClients));
  const [scheduleClientId, setScheduleClientId] = useState(null);
  const [shifts, setShifts] = useState(() => scheduleService.list([
    {
      id: "SHIFT-3001",
      clientId: "CL-2048",
      employeeId: "EMP-1042",
      client: "Alex Morgan",
      employee: "Jordan Mitchell",
      service: "Personal care",
      date: "2026-09-16",
      start: "09:00",
      end: "12:00",
      program: "PASSPORT",
      status: "Scheduled",
      duration: "3.0 hrs",
    },
    {
      id: "SHIFT-3002",
      clientId: "CL-2077",
      employeeId: "EMP-1091",
      client: "Riley Carter",
      employee: "Morgan Lee",
      service: "Skilled nursing",
      date: "2026-09-16",
      start: "14:00",
      end: "17:00",
      program: "Ohio Home Care Waiver",
      status: "In Progress",
      duration: "3.0 hrs",
    },
    {
      id: "SHIFT-3003",
      clientId: "CL-2112",
      employeeId: "EMP-1078",
      client: "Jamie Ellis",
      employee: "Avery Thompson",
      service: "Homemaker / personal care",
      date: "2026-09-17",
      start: "08:00",
      end: "16:00",
      program: "DODD",
      status: "Needs Coverage",
      duration: "8.0 hrs",
    },
    {
      id: "SHIFT-3004",
      clientId: "CL-2048",
      employeeId: "EMP-1042",
      client: "Alex Morgan",
      employee: "Jordan Mitchell",
      service: "Personal care",
      date: "2026-09-18",
      start: "10:00",
      end: "13:00",
      program: "PASSPORT",
      status: "Completed",
      duration: "3.0 hrs",
    },
  ]));

  const modules = [
    {
      title: "Employees",
      status: "40+ active",
      description: "Staff profiles, credentials & availability",
      icon: UsersRound,
      tone: "orange",
    },
    {
      title: "Clients",
      status: "70+ active",
      description: "Care plans, services & documentation",
      icon: UserRound,
      tone: "teal",
    },
    {
      title: "EVV",
      status: "Ready",
      description: "Clock in/out, tasks & shift summaries",
      icon: ClipboardCheck,
      tone: "blue",
    },
    {
      title: "Scheduling",
      status: "Active",
      description: "Open shifts, coverage & staff matching",
      icon: CalendarDays,
      tone: "violet",
    },
    {
      title: "Incidents & MUIs",
      status: "Secure",
      description: "Incident reports, MUIs & record keeping",
      icon: FileWarning,
      tone: "rose",
    },
    {
      title: "Integrations",
      status: "Planned",
      description: "Sandata, Xoomia & ADP",
      icon: Network,
      tone: "slate",
    },
    {
      title: "Billing",
      status: "UI preview",
      description: "Claims, revenue & payer readiness",
      icon: BadgeDollarSign,
      tone: "amber",
    },
  ];
  const navItems = [
    ["Command Center", LayoutDashboard],
    ["Employees", UsersRound],
    ["Clients", UserRound],
    ["EVV", ClipboardCheck],
    ["Scheduling", CalendarDays],
    ["Incidents & MUIs", FileWarning],
    ["Billing", BadgeDollarSign],
    ["AI Audit", BrainCircuit],
    ["Integrations", Link2],
    ["Reports", Activity],
  ];
  const metrics = [
    ["Employees", "40+", "Active workforce", UsersRound, "orange"],
    ["Clients", "70+", "Active clients", UserRound, "teal"],
    ["Open Shifts", "0", "Coverage required", CalendarDays, "blue"],
    ["Alerts", "0", "Needs attention", AlertTriangle, "green"],
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="logo-mark">
            C<span>+</span>
          </div>
          <div>
            <strong>CareOS</strong>
            <small>Care Intelligence Platform</small>
            <span className="demo-mode-badge">{mode.toUpperCase()} MODE</span>
          </div>
          <span className="private-badge">PRIVATE</span>
        </div>
        <div className="nav-label">Workspace</div>
        <nav>
          {navItems.map(([label, Icon]) => (
            <button
              className={`nav-item ${activeModule === label ? "active" : ""}`}
              key={label}
              onClick={() => setActiveModule(label)}
            >
              <Icon size={17} />
              <span>{label}</span>
              {activeModule === label && <span className="nav-pulse" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item">
            <Settings size={17} />
            <span>System Settings</span>
          </button>
          <div className="profile">
            <div className="avatar">JD</div>
            <div>
              <strong>Jordan Davis</strong>
              <small>Administrator</small>
            </div>
            <ChevronRight size={15} />
          </div>
        </div>
      </aside>
      <main className="workspace">
        <header className="topbar">
          <button className="menu-button" aria-label="Open navigation">
            <Menu size={20} />
          </button>
          <div className="breadcrumb">
            <span>Workspace</span>
            <ChevronRight size={14} />
            <strong>{activeModule}</strong>
          </div>
          <div className="topbar-actions">
            <div className="system-live">
              <span className="live-dot" /> All systems normal
            </div>
            <label className="search">
              <Search size={16} />
              <input placeholder="Search CareOS" aria-label="Search CareOS" />
            </label>
            <button
              className="icon-button notification"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <i />
            </button>
            <button className="quick-action">
              <Zap size={16} /> Quick Action
            </button>
          </div>
        </header>
        <div
          className={`content ${activeModule === "Billing" ? "billing-view" : ""}`}
        >
          {activeModule === "Employees" && (
            <EmployeeCenter
              employees={employees}
              setEmployees={setEmployees}
              onViewAudit={() => setActiveModule("AI Audit")}
            />
          )}
          {activeModule === "Clients" && (
            <ClientCenter
              clients={clients}
              setClients={setClients}
              employees={employees}
              setEmployees={setEmployees}
              shifts={shifts}
              onViewAudit={() => setActiveModule("AI Audit")}
              onViewBilling={() => setActiveModule("Billing")}
              onScheduleShift={(clientId) => {
                setScheduleClientId(clientId);
                setActiveModule("Scheduling");
              }}
            />
          )}
          {activeModule === "Scheduling" && (
            <SchedulingCenter
              employees={employees}
              clients={clients}
              shifts={shifts}
              setShifts={setShifts}
              initialClientId={scheduleClientId}
              onViewAudit={() => setActiveModule("AI Audit")}
            />
          )}
          {activeModule === "EVV" && (
            <CareOsErrorBoundary>
              <EvcCenter
                employees={employees}
                clients={clients}
                shifts={shifts}
                setShifts={setShifts}
                onViewAudit={() => setActiveModule("AI Audit")}
              />
            </CareOsErrorBoundary>
          )}
          {activeModule !== "Command Center" &&
            activeModule !== "Billing" &&
            activeModule !== "AI Audit" &&
            activeModule !== "Employees" &&
            activeModule !== "Clients" &&
            activeModule !== "Scheduling" &&
            activeModule !== "EVV" && (
              <section className="module-placeholder">
                <div className="placeholder-icon">
                  <Sparkles size={22} />
                </div>
                <div className="eyebrow muted">CAREOS WORKSPACE</div>
                <h1>{activeModule}</h1>
                <p>
                  This module is part of the CareOS operating model and is being
                  prepared for the next workflow release.
                </p>
                <span className="placeholder-status">
                  <span /> Module coming next
                </span>
                <button
                  className="outline-button"
                  onClick={() => setActiveModule("Command Center")}
                >
                  Return to Command Center <ArrowUpRight size={15} />
                </button>
              </section>
            )}
          {activeModule === "AI Audit" && <AuditCenter />}
          {(activeModule === "Command Center" ||
            activeModule === "Billing") && (
            <>
              <section className="hero-panel">
                <div className="hero-copy">
                  <div className="eyebrow">
                    <span className="live-dot" /> CAREOS LIVE{" "}
                    <span className="eyebrow-line" />{" "}
                    <span>Tuesday, September 16, 2026</span>
                  </div>
                  <h1>
                    Good morning <span>👋</span>
                  </h1>
                  <p>Your agency is operating normally.</p>
                  <div className="hero-meta">
                    <ShieldCheck size={17} /> Secure private-use environment{" "}
                    <span>•</span> Last synced just now
                  </div>
                </div>
                <div className="intelligence-teaser">
                  <div className="ai-orbit">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <span>CareOS Intelligence</span>
                    <p>
                      Monitoring workforce, client services, EVV activity and
                      operational risk.
                    </p>
                  </div>
                  <button className="outline-button">
                    Ask CareOS AI <ArrowUpRight size={15} />
                  </button>
                </div>
              </section>
              <section className="metrics-grid">
                {metrics.map(([label, value, detail, Icon, tone]) => (
                  <article className={`metric-card ${tone}`} key={label}>
                    <div className="metric-head">
                      <span>{label}</span>
                      <div className="metric-icon">
                        <Icon size={18} />
                      </div>
                    </div>
                    <strong>{value}</strong>
                    <small>{detail}</small>
                    <span className="metric-status">
                      <Check size={12} /> Within normal range
                    </span>
                  </article>
                ))}
              </section>
              <div className="section-heading">
                <div>
                  <div className="eyebrow muted">OPERATIONS</div>
                  <h2>Agency operations</h2>
                  <p>Everything your team needs to deliver exceptional care.</p>
                </div>
                <button className="text-button">
                  View activity <ArrowUpRight size={15} />
                </button>
              </div>
              <section className="module-grid">
                {modules.map(
                  ({ title, status, description, icon: Icon, tone }) => (
                    <article className={`module-card ${tone}`} key={title}>
                      <div className="module-top">
                        <div className="module-icon">
                          <Icon size={20} />
                        </div>
                        <span className="module-status">
                          <span />
                          {status}
                        </span>
                      </div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                      <button
                        className="module-action"
                        onClick={() => setActiveModule(title)}
                      >
                        Open module <ChevronRight size={15} />
                      </button>
                    </article>
                  ),
                )}
              </section>
              <section className="billing-dashboard">
                <div className="billing-heading">
                  <div>
                    <div className="eyebrow muted">REVENUE OPERATIONS</div>
                    <h2>Billing &amp; Revenue</h2>
                    <p>
                      Track service readiness, claim workflow, and payer
                      visibility in one place.
                    </p>
                  </div>
                  <div className="preview-chip">
                    <span /> UI WORKFLOW PREVIEW
                  </div>
                </div>
                <div className="evv-billing-handoff"><ClipboardCheck size={15} /><div><strong>EVV handoff</strong><span>{shifts.filter((shift) => shift.evvStatus === "Ready to Bill").length} demo visit(s) ready for billing review</span></div><span>Human review required</span></div>
                <div className="billing-summary">
                  {[
                    [
                      "Ready to Bill",
                      shifts.filter((shift) => shift.evvStatus === "Ready to Bill").length ? `${shifts.filter((shift) => shift.evvStatus === "Ready to Bill").length} visit(s)` : "$0.00",
                      shifts.filter((shift) => shift.evvStatus === "Ready to Bill").length ? "EVV review complete" : "No services queued",
                      Receipt,
                      "orange",
                    ],
                    [
                      "Unbilled Services",
                      "0",
                      "Awaiting review",
                      FileCheck2,
                      "blue",
                    ],
                    [
                      "EVV Exceptions",
                      "0",
                      "Needs resolution",
                      AlertTriangle,
                      "amber",
                    ],
                    [
                      "Submitted Claims",
                      "0",
                      "This billing cycle",
                      RefreshCw,
                      "violet",
                    ],
                    [
                      "Paid Claims",
                      "$0.00",
                      "Awaiting payer activity",
                      WalletCards,
                      "green",
                    ],
                    [
                      "Denied / Rejected",
                      "0",
                      "Requires follow-up",
                      FileWarning,
                      "rose",
                    ],
                  ].map(([label, value, detail, Icon, tone]) => (
                    <article className={`billing-stat ${tone}`} key={label}>
                      <div>
                        <span>{label}</span>
                        <div className="billing-stat-icon">
                          <Icon size={16} />
                        </div>
                      </div>
                      <strong>{value}</strong>
                      <small>{detail}</small>
                    </article>
                  ))}
                </div>
                <div className="billing-grid">
                  <article className="billing-panel utilization-panel">
                    <div className="billing-panel-heading">
                      <div>
                        <span className="panel-kicker">
                          <Percent size={13} /> UTILIZATION
                        </span>
                        <h3>Authorization &amp; service units</h3>
                      </div>
                      <span className="panel-note">Current period</span>
                    </div>
                    <div className="utilization-row">
                      <div>
                        <span>PASSPORT</span>
                        <strong>
                          68% <small>used</small>
                        </strong>
                      </div>
                      <div className="progress-track">
                        <span style={{ width: "68%" }} />
                      </div>
                      <small>1,360 / 2,000 units</small>
                    </div>
                    <div className="utilization-row">
                      <div>
                        <span>Ohio Home Care Waiver</span>
                        <strong>
                          42% <small>used</small>
                        </strong>
                      </div>
                      <div className="progress-track">
                        <span style={{ width: "42%" }} />
                      </div>
                      <small>840 / 2,000 units</small>
                    </div>
                    <div className="utilization-row">
                      <div>
                        <span>DODD</span>
                        <strong>
                          81% <small>used</small>
                        </strong>
                      </div>
                      <div className="progress-track warning">
                        <span style={{ width: "81%" }} />
                      </div>
                      <small>1,620 / 2,000 units</small>
                    </div>
                    <button className="text-button">
                      Review authorizations <ArrowUpRight size={14} />
                    </button>
                  </article>
                  <article className="billing-panel reconciliation-panel">
                    <div className="billing-panel-heading">
                      <div>
                        <span className="panel-kicker">
                          <RefreshCw size={13} /> RECONCILIATION
                        </span>
                        <h3>Payroll vs billing</h3>
                      </div>
                      <span className="panel-note">UI preview</span>
                    </div>
                    <div className="reconciliation-total">
                      <span>Period alignment</span>
                      <strong>100%</strong>
                      <small>No variances staged</small>
                    </div>
                    <div className="reconciliation-legend">
                      <span>
                        <i className="legend-payroll" /> Payroll hours{" "}
                        <strong>0.0</strong>
                      </span>
                      <span>
                        <i className="legend-billing" /> Billable hours{" "}
                        <strong>0.0</strong>
                      </span>
                    </div>
                    <button className="outline-button">
                      Open reconciliation <ArrowUpRight size={14} />
                    </button>
                  </article>
                </div>
                <div className="billing-grid bottom">
                  <article className="billing-panel activity-panel">
                    <div className="billing-panel-heading">
                      <div>
                        <span className="panel-kicker">
                          <Activity size={13} /> RECENT ACTIVITY
                        </span>
                        <h3>Billing activity</h3>
                      </div>
                      <button className="text-button">
                        View all <ArrowUpRight size={14} />
                      </button>
                    </div>
                    <div className="activity-list">
                      <div>
                        <span className="activity-icon orange">
                          <Receipt size={15} />
                        </span>
                        <div>
                          <strong>Billing workspace initialized</strong>
                          <small>UI foundation ready for agency review</small>
                        </div>
                        <time>Now</time>
                      </div>
                      <div>
                        <span className="activity-icon blue">
                          <ShieldCheck size={15} />
                        </span>
                        <div>
                          <strong>EVV review queue</strong>
                          <small>No exceptions currently staged</small>
                        </div>
                        <time>Today</time>
                      </div>
                      <div>
                        <span className="activity-icon teal">
                          <BadgeDollarSign size={15} />
                        </span>
                        <div>
                          <strong>Payer workflows configured</strong>
                          <small>PASSPORT, Ohio Home Care Waiver, DODD</small>
                        </div>
                        <time>Today</time>
                      </div>
                    </div>
                  </article>
                  <article className="billing-panel payer-panel">
                    <div className="billing-panel-heading">
                      <div>
                        <span className="panel-kicker">
                          <WalletCards size={13} /> PAYER MIX
                        </span>
                        <h3>Billing by payer / program</h3>
                      </div>
                      <span className="panel-note">UI preview</span>
                    </div>
                    <div className="payer-bars">
                      <div>
                        <span>PASSPORT</span>
                        <strong>48%</strong>
                        <i>
                          <b style={{ width: "48%" }} />
                        </i>
                      </div>
                      <div>
                        <span>Ohio Home Care Waiver</span>
                        <strong>32%</strong>
                        <i>
                          <b style={{ width: "32%" }} />
                        </i>
                      </div>
                      <div>
                        <span>DODD</span>
                        <strong>20%</strong>
                        <i>
                          <b style={{ width: "20%" }} />
                        </i>
                      </div>
                    </div>
                    <p className="billing-disclaimer">
                      <CircleHelp size={14} /> Payer connections and claim
                      submission are not active.
                    </p>
                  </article>
                </div>
              </section>
              <section className="lower-grid">
                <article className="ai-panel">
                  <div className="panel-heading">
                    <div>
                      <span className="panel-kicker">
                        <Sparkles size={14} /> INTELLIGENCE LAYER
                      </span>
                      <h2>CareOS Intelligence</h2>
                      <p>A calm, clear view of operational readiness.</p>
                    </div>
                    <div className="ai-status">UI PREVIEW</div>
                  </div>
                  <div className="insight-list">
                    {[
                      ["Workforce Coverage", "Stable", "stable"],
                      ["EVV Compliance", "Monitoring", "monitoring"],
                      ["Incident Risk", "Low", "low"],
                      ["Credential Alerts", "Clear", "clear"],
                    ].map(([label, value, tone]) => (
                      <div className="insight" key={label}>
                        <span>{label}</span>
                        <strong className={tone}>
                          <i />
                          {value}
                        </strong>
                      </div>
                    ))}
                  </div>
                  <div className="ai-footer">
                    <span>
                      <CircleHelp size={15} /> AI operational insights will
                      appear here.
                    </span>
                    <button className="outline-button">
                      Open Intelligence Center <ArrowUpRight size={15} />
                    </button>
                  </div>
                </article>
                <article className="support-panel">
                  <div className="support-icon">
                    <Headphones size={20} />
                  </div>
                  <span className="panel-kicker">NEED A HAND?</span>
                  <h2>Operations support</h2>
                  <p>
                    Find guidance or connect with your CareOS administrator.
                  </p>
                  <button className="text-button">
                    Visit help center <ArrowUpRight size={15} />
                  </button>
                </article>
              </section>
              <section className="status-strip">
                <div className="status-title">
                  <Gauge size={18} />
                  <div>
                    <strong>System status</strong>
                    <span>Private environment health</span>
                  </div>
                </div>
                <div className="status-items">
                  <div>
                    <span className="status-dot green" />
                    Core Platform <strong>Operational</strong>
                  </div>
                  <div>
                    <span className="status-dot amber" />
                    EVV Integration <strong>Not Connected</strong>
                  </div>
                  <div>
                    <span className="status-dot amber" />
                    Payroll Integration <strong>Not Connected</strong>
                  </div>
                  <div>
                    <span className="status-dot amber" />
                    DODD/Xoomia <strong>Not Connected</strong>
                  </div>
                </div>
              </section>
            </>
          )}
          <footer>
            CareOS <span>•</span> Care Intelligence Platform <span>•</span> v0.1
            private preview
          </footer>
        </div>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CareOSProvider>
      <App />
    </CareOSProvider>
  </React.StrictMode>,
);
