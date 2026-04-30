import { FormEvent, useEffect, useMemo, useState } from "react";
import { profile } from "../data/profile.public";

type Step = "FORM" | "OTP" | "DONE";

const BLOCKED_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "yopmail.com",
  "sharklasers.com",
  "dispostable.com"
]);

const OTP_EXPIRY_MS = 2 * 60 * 1000;
const OTP_COOLDOWN_MS = 60 * 1000;
const RESEND_LIMIT_PER_HOUR = 5;
const RESEND_WINDOW_MS = 60 * 60 * 1000;

type FormState = {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
};

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function getDomain(email: string): string {
  return email.split("@")[1]?.toLowerCase().trim() ?? "";
}

function isBusinessEmail(email: string): boolean {
  const domain = getDomain(email);
  return Boolean(domain) && !BLOCKED_DOMAINS.has(domain) && domain.includes(".");
}

function formatMMSS(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const mm = String(Math.floor(safe / 60)).padStart(2, "0");
  const ss = String(safe % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export function Contact() {
  const [step, setStep] = useState<Step>("FORM");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    role: "",
    message: ""
  });

  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [otpExpiresAt, setOtpExpiresAt] = useState(0);
  const [otpSentAt, setOtpSentAt] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [resendTimestamps, setResendTimestamps] = useState<number[]>([]);

  useEffect(() => {
    if (step !== "OTP") return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [step]);

  const countdownSeconds = Math.max(0, Math.ceil((otpExpiresAt - now) / 1000));
  const canResend = useMemo(() => Date.now() - otpSentAt > OTP_COOLDOWN_MS, [otpSentAt, now]);

  const resendCountInWindow = useMemo(() => {
    const cutoff = Date.now() - RESEND_WINDOW_MS;
    return resendTimestamps.filter((ts) => ts >= cutoff).length;
  }, [resendTimestamps, now]);

  const resendLocked = resendCountInWindow >= RESEND_LIMIT_PER_HOUR;

  async function sendOtpEmail() {
    const newOtp = generateOtp();

    const body = new FormData();
    body.append("name", form.name);
    body.append("email", form.email);
    body.append("message", "OTP verification request for portfolio contact.");
    body.append("_subject", "OTP Verification Request");
    body.append("_captcha", "false");
    body.append("_template", "table");
    body.append("_replyto", form.email);
    body.append("_autoresponse", `Your OTP is ${newOtp}. It expires in 2 minutes.`);

    const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body
    });

    if (!response.ok) {
      throw new Error("Unable to send OTP right now.");
    }

    setOtp(newOtp);
    setOtpSentAt(Date.now());
    setOtpExpiresAt(Date.now() + OTP_EXPIRY_MS);
    setUserOtp("");
    setNow(Date.now());
    setStep("OTP");
  }

  async function handleStartVerification(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!isBusinessEmail(form.email)) {
      setError("Please use a recognized domain. Disposable email domains are blocked.");
      return;
    }

    setSending(true);
    try {
      await sendOtpEmail();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  async function handleVerifyAndSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (Date.now() > otpExpiresAt) {
      setError("OTP expired. Please resend OTP.");
      return;
    }

    if (userOtp.trim() !== otp) {
      setError("Invalid OTP. Please check and try again.");
      return;
    }

    setSending(true);
    try {
      const body = new FormData();
      body.append("name", form.name);
      body.append("email", form.email);
      body.append("company", form.company);
      body.append("role", form.role);
      body.append("message", form.message);
      body.append("_subject", "Verified portfolio contact message");
      body.append("_captcha", "false");
      body.append("_template", "table");
      body.append("_replyto", form.email);

      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body
      });

      if (!response.ok) {
        throw new Error("Unable to send message right now.");
      }

      setStep("DONE");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  async function handleResendOtp() {
    setError(null);

    if (resendLocked) {
      setError("Too many OTP resends. Please wait 1 hour before requesting again.");
      return;
    }

    if (!canResend) {
      setError("Please wait 60 seconds before requesting another OTP.");
      return;
    }

    setSending(true);
    try {
      await sendOtpEmail();
      setResendTimestamps((prev) => [...prev, Date.now()]);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to resend OTP.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="container-page py-14">
      <p className="section-kicker">Contact</p>
      <h2 className="section-title">Let's Build Something Meaningful</h2>
      <p className="mt-3 text-sm text-muted">
        Reach out for data engineering opportunities or project collaboration.
      </p>

      {step === "FORM" ? (
        <form onSubmit={handleStartVerification} className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-surface/80 p-5 md:grid-cols-2">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Name" className="rounded-xl border border-white/15 bg-transparent p-3 text-sm" />
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required type="email" placeholder="Work Email" className="rounded-xl border border-white/15 bg-transparent p-3 text-sm" />
          <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company" className="rounded-xl border border-white/15 bg-transparent p-3 text-sm" />
          <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role" className="rounded-xl border border-white/15 bg-transparent p-3 text-sm" />
          <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required placeholder="Message" className="md:col-span-2 min-h-28 rounded-xl border border-white/15 bg-transparent p-3 text-sm" />
          <button disabled={sending} type="submit" className="md:col-span-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-[#07111f] disabled:cursor-not-allowed disabled:opacity-70">
            {sending ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      ) : null}

      {step === "OTP" ? (
        <form onSubmit={handleVerifyAndSubmit} className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-surface/80 p-5">
          <p className="text-sm text-muted">
            OTP was sent to <span className="text-text">{form.email}</span>. Enter the 6-digit code to continue.
          </p>
          <p className="text-xs text-accent">
            OTP expires in: <span className="font-semibold">{formatMMSS(countdownSeconds)}</span>
          </p>
          <input value={userOtp} onChange={(e) => setUserOtp(e.target.value)} maxLength={6} required placeholder="Enter OTP" className="rounded-xl border border-white/15 bg-transparent p-3 text-sm" />
          <button disabled={sending || countdownSeconds === 0} type="submit" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-[#07111f] disabled:cursor-not-allowed disabled:opacity-70">
            {sending ? "Verifying..." : "Verify & Send Message"}
          </button>
          <button disabled={sending || resendLocked} type="button" onClick={handleResendOtp} className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-text disabled:cursor-not-allowed disabled:opacity-70">
            Resend OTP
          </button>
          <p className="text-xs text-muted">
            Resend limit: {resendCountInWindow}/{RESEND_LIMIT_PER_HOUR} used in last 1 hour.
          </p>
        </form>
      ) : null}

      {step === "DONE" ? <p className="mt-6 text-sm text-primary">Thanks. Your verified message was sent successfully.</p> : null}
      {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}

      <p className="mt-4 text-sm text-muted">
        Direct: <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a> |{" "}
        <a className="underline" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </p>
    </section>
  );
}

