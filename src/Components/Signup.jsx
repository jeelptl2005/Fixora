import { useState, useEffect, useRef } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

/* ─── constants ─────────────────────────────────────── */

/* Admin intentionally excluded from signup */
const ROLES = [
    { id: "user", label: "User", icon: "👤", desc: "Home owner / Customer", color: "#ff6b00", grad: "linear-gradient(135deg,#ff6b00,#ff9d4d)" },
    { id: "worker", label: "Worker", icon: "🔧", desc: "Service Professional", color: "#0f8bff", grad: "linear-gradient(135deg,#0f8bff,#4db8ff)" },
    { id: "business", label: "Business", icon: "🏢", desc: "Company / Enterprise", color: "#7c3aed", grad: "linear-gradient(135deg,#7c3aed,#a855f7)" },
];

const EXPERTISE_OPTIONS = [
    "Electrician", "Plumber", "AC Repair", "Deep Cleaning",
    "Appliance Repair", "Painting", "Pest Control", "CCTV Installation",
    "Carpentry",
];

const FEATURES = ["Instant Booking", "Verified Profiles", "Secure Payments", "Live Tracking"];

/* ─── Particles ─────────────────────────────────────── */

function Particles() {
    const pts = useRef(
        Array.from({ length: 20 }, (_, i) => ({
            id: i,
            size: Math.random() * 7 + 3,
            x: Math.random() * 100,
            y: Math.random() * 100,
            dur: (Math.random() * 7 + 5).toFixed(1),
            delay: (Math.random() * 4).toFixed(1),
            color: i % 3 === 0 ? "#7c3aed" : i % 3 === 1 ? "#0f8bff" : "#ff9d4d",
            op: (Math.random() * 0.16 + 0.05).toFixed(2),
        }))
    ).current;

    return (
        <div className="particles" aria-hidden="true">
            {pts.map(p => (
                <div key={p.id} className="particle" style={{
                    width: p.size, height: p.size,
                    left: `${p.x}%`, top: `${p.y}%`,
                    background: p.color,
                    "--op": p.op, "--dur": `${p.dur}s`, "--delay": `${p.delay}s`,
                }} />
            ))}
        </div>
    );
}

/* ─── InputField ────────────────────────────────────── */

function InputField({ label, type = "text", placeholder, value, onChange, icon, name, required, animDelay = 0, hint }) {
    const [focused, setFocused] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const isPass = type === "password";
    const inputType = isPass ? (showPass ? "text" : "password") : type;

    return (
        <div className="field-wrap" style={{ animationDelay: `${animDelay}s`, animationFillMode: "forwards" }}>
            <label className={`field-label${focused ? " focused" : ""}`}>
                {label}
                {required && <span className="req"> *</span>}
                {hint && <span style={{ fontSize: 10, fontWeight: 400, opacity: 0.65, marginLeft: 5, textTransform: "none", letterSpacing: 0 }}>{hint}</span>}
            </label>
            <div className={`input-wrap${focused ? " focused" : ""}`}>
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    className={`field-input${!icon ? " no-icon" : ""}`}
                    type={inputType}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    required={required}
                    autoComplete="off"
                />
                {isPass && (
                    <button type="button" className="toggle-pass" onClick={() => setShowPass(s => !s)} tabIndex={-1}>
                        {showPass ? "🙈" : "👁️"}
                    </button>
                )}
                {focused && <div className="focus-line" />}
            </div>
        </div>
    );
}

/* ─── RoleSelector (3 roles, 3-col grid) ─────────────── */

function RoleSelector({ selected, onChange }) {
    return (
        <div style={{ marginBottom: 20 }}>
            <div className="role-label">Select your role</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 9, marginBottom: 0 }}>
                {ROLES.map((r, i) => {
                    const active = selected === r.id;
                    return (
                        <button
                            key={r.id}
                            type="button"
                            className={`role-btn${active ? " active" : ""}`}
                            onClick={() => onChange(r.id)}
                            style={{
                                animationDelay: `${i * 0.08 + 0.2}s`,
                                animationFillMode: "forwards",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 6,
                                padding: "12px 8px",
                                textAlign: "center",
                                border: active ? "2px solid transparent" : "1.5px solid rgba(0,0,0,0.08)",
                                background: active
                                    ? `linear-gradient(white,white) padding-box, ${r.grad} border-box`
                                    : "rgba(255,255,255,0.85)",
                                boxShadow: active ? `0 6px 20px ${r.color}22` : "0 1px 4px rgba(0,0,0,0.05)",
                            }}
                        >
                            <span style={{ fontSize: 22 }}>{r.icon}</span>
                            <div>
                                <div className="role-name" style={{ color: active ? r.color : "#334155" }}>{r.label}</div>
                                <div className="role-desc">{r.desc}</div>
                            </div>
                            {active && (
                                <div className="role-check" style={{ background: r.grad, position: "absolute", top: 6, right: 6, margin: 0 }}>
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <polyline points="2,5 4.2,7.2 8,3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/* ─── ExpertiseSelector ──────────────────────────────── */

function ExpertiseSelector({ selected, onChange }) {
    return (
        <div style={{ marginBottom: 14 }}>
            <span className="expertise-label">
                Expert In <span className="req">*</span>
                <span className="hint">(select multiple)</span>
            </span>
            <div className="chips-wrap">
                {EXPERTISE_OPTIONS.map((opt, i) => {
                    const sel = selected.includes(opt);
                    return (
                        <button
                            key={opt}
                            type="button"
                            className={`chip${sel ? " selected" : ""}`}
                            onClick={() => onChange(sel ? selected.filter(s => s !== opt) : [...selected, opt])}
                            style={{ animationDelay: `${i * 0.04}s`, animationFillMode: "forwards" }}
                        >
                            {sel && "✓ "}{opt}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/* ─── Password feedback ──────────────────────────────── */

function PassFeedback({ pass, confirm }) {
    if (!confirm) return null;
    const match = pass === confirm;
    return (
        <div className={`pass-feedback ${match ? "ok" : "err"}`}>
            {match ? "✓ Passwords match" : "✗ Passwords do not match"}
        </div>
    );
}

/* ─── SubmitBtn ──────────────────────────────────────── */

function SubmitBtn({ label, loading, grad }) {
    return (
        <button
            type="submit"
            disabled={loading}
            className="submit-btn"
            style={{
                background: loading ? "#e2e8f0" : grad,
                color: loading ? "#94a3b8" : "white",
                animation: loading ? "none" : "btnPulse 2.5s ease infinite",
            }}
        >
            {loading ? <><div className="btn-spinner" /> Creating account…</> : label}
        </button>
    );
}

/* ─── BrandPanel ─────────────────────────────────────── */

function BrandPanel() {
    return (
        <div className="brand-panel">
            <div className="brand-logo">Fixora</div>
            <div className="brand-tagline">Smart Home Services</div>
            <div className="brand-icon-wrap">
                <div className="brand-icon-ring" />
                <div className="brand-icon">✨</div>
            </div>
            <div className="brand-headline">Join Fixora Today</div>
            <div className="brand-sub">Register and connect with thousands of trusted home service professionals instantly.</div>
            <div className="feature-list">
                {FEATURES.map((f, i) => (
                    <div key={f} className="feature-item" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                        <div className="feature-dot">✓</div>
                        <div className="feature-text">{f}</div>
                    </div>
                ))}
            </div>
            <div className="stats-row">
                {[["15K+", "Services"], ["500+", "Experts"], ["98%", "Satisfaction"]].map(([n, l], i) => (
                    <div key={l} className="stat-item" style={{ animationDelay: `${0.6 + i * 0.12}s` }}>
                        <div className="stat-num">{n}</div>
                        <div className="stat-label">{l}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── Main Signup Component ──────────────────────────── */

export default function Signup({ onGoLogin }) {
    const navigate = useNavigate();
    const [role, setRole] = useState("user");
    const [form, setForm] = useState({
        name: "", email: "", phone: "", username: "",
        company_name: "",
        password: "", confirmPassword: "",
    });
    const [expertise, setExpertise] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formKey, setFormKey] = useState(0);

    const currentRole = ROLES.find(r => r.id === role);
    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    useEffect(() => { setFormKey(k => k + 1); }, [role]);

    const handleSubmit = e => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) return;
        if (role === "worker" && expertise.length === 0) {
            alert("Please select at least one area of expertise.");
            return;
        }
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    const base = 0.05;

    return (
        <div className="signup-page">
            <Particles />

            <button className="back-btn" onClick={() => navigate('/home')}>
                <span className="arrow">←</span> Back to Home
            </button>

            <div className="auth-card">
                <BrandPanel />

                <div className="form-panel">
                    <div className="form-title">Create Your Account</div>
                    <div className="form-subtitle">Register on Fixora's smart home platform</div>

                    <RoleSelector selected={role} onChange={setRole} />

                    <form key={formKey} onSubmit={handleSubmit} noValidate>

                        {/* ── USER ─────────────────────────────────── */}
                        {role === "user" && (
                            <>
                                <InputField label="Full Name" name="name" placeholder="Your full name" icon="👤" value={form.name} onChange={handleChange} required animDelay={base} />
                                <InputField label="Email Address" type="email" name="email" placeholder="you@email.com" icon="📧" value={form.email} onChange={handleChange} required animDelay={base + 0.14} />
                                <InputField label="Phone Number" type="tel" name="phone" placeholder="+91 98765 43210" icon="📱" value={form.phone} onChange={handleChange} required animDelay={base + 0.21} />
                            </>
                        )}

                        {/* ── WORKER ───────────────────────────────── */}
                        {role === "worker" && (
                            <>
                                <InputField label="Full Name" name="name" placeholder="Your full name" icon="👤" value={form.name} onChange={handleChange} required animDelay={base} />
                                <InputField label="Email Address" type="email" name="email" placeholder="worker@email.com" icon="📧" value={form.email} onChange={handleChange} required animDelay={base + 0.07} />
                                <InputField label="Phone Number" type="tel" name="phone" placeholder="+91 98765 43210" icon="📱" value={form.phone} onChange={handleChange} required animDelay={base + 0.14} />
                                <ExpertiseSelector selected={expertise} onChange={setExpertise} />
                            </>
                        )}

                        {/* ── BUSINESS ─────────────────────────────── */}
                        {role === "business" && (
                            <>
                                <InputField label="Full Name" name="name" placeholder="Your full name" icon="👤" value={form.name} onChange={handleChange} required animDelay={base} />
                                <InputField label="Company Name" name="company_name" placeholder="Your company name" icon="🏢" value={form.company_name} onChange={handleChange} required animDelay={base + 0.07} />
                                <InputField label="Employee ID" name="employee_id" placeholder="e.g. EMP-CORP-0042" icon="🪪" value={form.employee_id} onChange={handleChange} required animDelay={base + 0.14} />
                                <InputField label="Work Email" type="email" name="email" placeholder="you@company.com" icon="📧" value={form.email} onChange={handleChange} required animDelay={base + 0.21} />
                                <InputField label="Phone Number" type="tel" name="phone" placeholder="+91 98765 43210" icon="📱" value={form.phone} onChange={handleChange} required animDelay={base + 0.28} />
                            </>
                        )}

                        {/* ── Password (all roles) ──────────────────── */}
                        <InputField
                            label="Create Password" type="password" name="password"
                            placeholder="Min. 8 characters" icon="🔒"
                            value={form.password} onChange={handleChange}
                            required animDelay={base + 0.35}
                        />
                        <InputField
                            label="Confirm Password" type="password" name="confirmPassword"
                            placeholder="Re-enter your password" icon="🔒"
                            value={form.confirmPassword} onChange={handleChange}
                            required animDelay={base + 0.42}
                        />
                        <PassFeedback pass={form.password} confirm={form.confirmPassword} />

                        {/* ── Terms ────────────────────────────────── */}
                        <label className="terms-row">
                            <input type="checkbox" required />
                            I agree to Fixora's{" "}
                            <span className="terms-link">Terms of Service</span>
                            {" "}and{" "}
                            <span className="terms-link">Privacy Policy</span>
                        </label>

                        <SubmitBtn
                            label={`Create ${currentRole.label} Account →`}
                            loading={loading}
                            grad={currentRole.grad}
                        />
                    </form>

                    <div className="switch-text" style={{ animationFillMode: "forwards" }}>
                        Already have an account?
                        <button className="switch-btn" onClick={onGoLogin ?? (() => alert("Go to Login"))}>
                            Sign in →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}