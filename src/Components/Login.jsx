import { useState, useEffect, useRef } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

/* ─── constants ─────────────────────────────────────── */

const ROLES = [
    { id: "user", label: "User", icon: "👤", desc: "Home owner / Customer", color: "#ff6b00", grad: "linear-gradient(135deg,#ff6b00,#ff9d4d)" },
    { id: "worker", label: "Worker", icon: "🔧", desc: "Service Professional", color: "#0f8bff", grad: "linear-gradient(135deg,#0f8bff,#4db8ff)" },
    { id: "business", label: "Business", icon: "🏢", desc: "Company / Enterprise", color: "#7c3aed", grad: "linear-gradient(135deg,#7c3aed,#a855f7)" },
    { id: "admin", label: "Admin", icon: "⚙️", desc: "Platform Administrator", color: "#059669", grad: "linear-gradient(135deg,#059669,#10b981)" },
];

const FIELD_MAP = {
    user: { name: "username", label: "Username", placeholder: "Enter your username", icon: "👤", type: "text" },
    worker: { name: "worker_id", label: "Worker ID", placeholder: "e.g. WRK-2024-001", icon: "🔧", type: "text" },
    business: { name: "employee_id", label: "Employee ID", placeholder: "e.g. EMP-CORP-0042", icon: "🏢", type: "text" },
    admin: { name: "gmail", label: "Gmail Address", placeholder: "admin@fixora.com", icon: "📧", type: "email" },
};

const FEATURES = ["Verified Experts", "Same-Day Service", "24/7 Support", "AI-Powered Matching"];

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
            color: i % 3 === 0 ? "#ff6b00" : i % 3 === 1 ? "#0f8bff" : "#ff9d4d",
            op: (Math.random() * 0.18 + 0.06).toFixed(2),
        }))
    ).current;

    return (
        <div className="particles" aria-hidden="true">
            {pts.map(p => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        width: p.size, height: p.size,
                        left: `${p.x}%`, top: `${p.y}%`,
                        background: p.color,
                        "--op": p.op,
                        "--dur": `${p.dur}s`,
                        "--delay": `${p.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}

/* ─── InputField ────────────────────────────────────── */

function InputField({ label, type = "text", placeholder, value, onChange, icon, name, required, animDelay = 0 }) {
    const [focused, setFocused] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const isPass = type === "password";
    const inputType = isPass ? (showPass ? "text" : "password") : type;

    return (
        <div className="field-wrap" style={{ animationDelay: `${animDelay}s`, animationFillMode: "forwards" }}>
            <label className={`field-label${focused ? " focused" : ""}`}>
                {label} {required && <span className="req">*</span>}
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

/* ─── RoleSelector ──────────────────────────────────── */

function RoleSelector({ selected, onChange }) {
    return (
        <div style={{ marginBottom: 22 }}>
            <div className="role-label">Select your role</div>
            <div className="roles-grid">
                {ROLES.map((r, i) => {
                    const active = selected === r.id;
                    return (
                        <button
                            key={r.id}
                            type="button"
                            className={`role-btn${active ? " active" : ""}`}
                            onClick={() => onChange(r.id)}
                            style={{
                                animationDelay: `${i * 0.07 + 0.2}s`,
                                animationFillMode: "forwards",
                                border: active ? `2px solid transparent` : "1.5px solid rgba(0,0,0,0.08)",
                                background: active
                                    ? `linear-gradient(white,white) padding-box, ${r.grad} border-box`
                                    : "rgba(255,255,255,0.85)",
                                boxShadow: active ? `0 6px 20px ${r.color}22` : "0 1px 4px rgba(0,0,0,0.05)",
                            }}
                        >
                            <span className="role-icon">{r.icon}</span>
                            <div className="role-info">
                                <div className="role-name" style={{ color: active ? r.color : "#334155" }}>{r.label}</div>
                                <div className="role-desc">{r.desc}</div>
                            </div>
                            {active && (
                                <div className="role-check" style={{ background: r.grad }}>
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

/* ─── SubmitButton ──────────────────────────────────── */

function SubmitBtn({ label, loading, grad, animDelay }) {
    return (
        <button
            type="submit"
            disabled={loading}
            className="submit-btn"
            style={{
                background: loading ? "#e2e8f0" : grad,
                color: loading ? "#94a3b8" : "white",
                animation: loading ? "none" : "btnPulse 2.5s ease infinite",
                animationDelay: `${animDelay}s`,
            }}
        >
            {loading
                ? <><div className="btn-spinner" /> Processing…</>
                : label}
        </button>
    );
}

/* ─── BrandPanel ────────────────────────────────────── */

function BrandPanel() {
    return (
        <div className="brand-panel">
            <div className="brand-logo">Fixora</div>
            <div className="brand-tagline">Smart Home Services</div>

            <div className="brand-icon-wrap">
                <div className="brand-icon-ring" />
                <div className="brand-icon">🔐</div>
            </div>

            <div className="brand-headline">Welcome Back!</div>
            <div className="brand-sub">Sign in to manage your smart home services and bookings.</div>

            <div className="feature-list">
                {FEATURES.map((f, i) => (
                    <div key={f} className="feature-item" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                        <div className="feature-dot">✓</div>
                        <div className="feature-text">{f}</div>
                    </div>
                ))}
            </div>

            <div className="stats-row">
                {[["15K+", "Services"], ["500+", "Experts"], ["98%", "Happy"]].map(([n, l], i) => (
                    <div key={l} className="stat-item" style={{ animationDelay: `${0.6 + i * 0.12}s` }}>
                        <div className="stat-num">{n}</div>
                        <div className="stat-label">{l}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── Main Login Component ──────────────────────────── */

export default function Login({ onGoSignup }) {
    const navigate = useNavigate();
    const [role, setRole] = useState("user");
    const [form, setForm] = useState({ username: "", worker_id: "", employee_id: "", gmail: "", password: "" });
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);

    const currentRole = ROLES.find(r => r.id === role);
    const fieldCfg = FIELD_MAP[role];

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 1900);
    };

    /* re-mount form fields on role change for fresh animation */
    const [formKey, setFormKey] = useState(0);
    useEffect(() => { setFormKey(k => k + 1); }, [role]);

    return (
        <div className="login-page">
            <Particles />

            <button className="back-btn" onClick={() => navigate('/home')}>
                <span className="arrow">←</span> Back to Home
            </button>

            <div className="auth-card">
                <BrandPanel />

                <div className="form-panel">
                    <div className="form-title" style={{ animationFillMode: "forwards" }}>Sign In to Fixora</div>
                    <div className="form-subtitle" style={{ animationFillMode: "forwards" }}>Choose your role and enter credentials below</div>

                    <RoleSelector selected={role} onChange={setRole} />

                    <form key={formKey} onSubmit={handleSubmit} noValidate>
                        <InputField
                            key={`id-${role}`}
                            label={fieldCfg.label}
                            type={fieldCfg.type}
                            name={fieldCfg.name}
                            placeholder={fieldCfg.placeholder}
                            icon={fieldCfg.icon}
                            value={form[fieldCfg.name]}
                            onChange={handleChange}
                            required
                            animDelay={0.05}
                        />
                        <InputField
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            icon="🔒"
                            value={form.password}
                            onChange={handleChange}
                            required
                            animDelay={0.12}
                        />

                        <div className="row-between" style={{ animationDelay: "0.18s" }}>
                            <label className="remember-label">
                                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                                Remember me
                            </label>
                            <button type="button" className="forgot-btn">Forgot password?</button>
                        </div>

                        <SubmitBtn
                            label={`Sign in as ${currentRole.label} →`}
                            loading={loading}
                            grad={currentRole.grad}
                            animDelay={0.25}
                        />
                    </form>

                    <div className="or-divider">or continue with</div>

                    <div className="social-grid">
                        {[
                            { icon: "G", label: "Google", color: "#4285F4" },
                            { icon: "📱", label: "OTP Login", color: "#ff6b00" },
                        ].map(({ icon, label, color }) => (
                            <button
                                key={label}
                                type="button"
                                className="social-btn"
                                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 4px 14px ${color}20`; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.09)"; e.currentTarget.style.boxShadow = "none"; }}
                            >
                                <span style={{ fontSize: 15, fontWeight: 800, color }}>{icon}</span>
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="switch-text" style={{ animationFillMode: "forwards" }}>
                        New to Fixora?
                        <button className="switch-btn" onClick={onGoSignup ?? (() => alert("Go to Signup"))}>
                            Create account →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}