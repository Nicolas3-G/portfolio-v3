"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";

/* ── Toast ──────────────────────────────────────────────────────── */

type ToastType = "success" | "error";

function Toast({
    message,
    type,
    onClose,
}: {
    message: string;
    type: ToastType;
    onClose: () => void;
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // trigger enter animation
        requestAnimationFrame(() => setVisible(true));

        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300); // wait for exit animation
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const isSuccess = type === "success";

    return (
        <div
            role="alert"
            className={`pointer-events-auto flex w-80 items-start gap-3 border px-4 py-3.5 shadow-[0_14px_35px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all duration-300 ${visible
                ? "translate-y-0 opacity-100"
                : "-translate-y-3 opacity-0"
                } ${isSuccess
                    ? "border-emerald-200/70 bg-emerald-50/90 text-emerald-800"
                    : "border-red-200/70 bg-red-50/90 text-red-800"
                }`}
        >
            {/* icon */}
            <span className="mt-0.5 shrink-0">
                {isSuccess ? (
                    <svg
                        className="h-5 w-5 text-emerald-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                ) : (
                    <svg
                        className="h-5 w-5 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        />
                    </svg>
                )}
            </span>

            <p className="flex-1 text-sm font-medium leading-snug">
                {message}
            </p>

            {/* dismiss */}
            <button
                onClick={() => {
                    setVisible(false);
                    setTimeout(onClose, 300);
                }}
                className="shrink-0 rounded p-0.5 transition-colors hover:bg-black/5"
                aria-label="Dismiss"
            >
                <svg
                    className="h-4 w-4 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    );
}

/* ── Contact Form ───────────────────────────────────────────────── */

type FormStatus = "idle" | "sending" | "success" | "error";

interface ToastState {
    message: string;
    type: ToastType;
}

export function ContactForm() {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [toast, setToast] = useState<ToastState | null>(null);

    const dismissToast = useCallback(() => setToast(null), []);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("sending");
        setToast(null);

        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem("contact-name") as HTMLInputElement)
                .value,
            email: (
                form.elements.namedItem("contact-email") as HTMLInputElement
            ).value,
            topic: (
                form.elements.namedItem("contact-topic") as HTMLSelectElement
            ).value,
            message: (
                form.elements.namedItem(
                    "contact-message"
                ) as HTMLTextAreaElement
            ).value,
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error || "Something went wrong");
            }

            setStatus("success");
            setToast({
                message: "Message sent! I'll get back to you soon.",
                type: "success",
            });
            form.reset();
        } catch (err: unknown) {
            setStatus("error");
            setToast({
                message: "Failed to send message. Please try again.",
                type: "error",
            });
        }
    }

    return (
        <>
            {/* Toast container — fixed top-right */}
            <div className="pointer-events-none fixed right-4 top-4 z-50 flex flex-col items-end gap-3">
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={dismissToast}
                    />
                )}
            </div>

            <div className="border border-zinc-200/80 bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.18)] backdrop-blur-sm sm:p-7">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700">
                    Send a message
                </h3>
                <form
                    className="mt-5 space-y-4"
                    aria-label="Contact form"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="contact-name"
                            className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-600"
                        >
                            Name
                        </label>
                        <input
                            id="contact-name"
                            name="contact-name"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="How should I address you?"
                            className="h-10 border border-zinc-200/80 bg-white/80 px-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-accent-gold/80 focus:ring-2 focus:ring-accent-gold/20"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="contact-email"
                            className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-600"
                        >
                            Email
                        </label>
                        <input
                            id="contact-email"
                            name="contact-email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="you@example.com"
                            className="h-10 border border-zinc-200/80 bg-white/80 px-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-accent-gold/80 focus:ring-2 focus:ring-accent-gold/20"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="contact-topic"
                            className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-600"
                        >
                            What are you interested in?
                        </label>
                        <select
                            id="contact-topic"
                            name="contact-topic"
                            className="h-10 border border-zinc-200/80 bg-white/80 px-3 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-accent-gold/80 focus:ring-2 focus:ring-accent-gold/20"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select a topic
                            </option>
                            <option value="founding-engineer">
                                Founding engineer / early hire
                            </option>
                            <option value="project-help">
                                Help shipping a project
                            </option>
                            <option value="consulting">
                                Consulting / advisory
                            </option>
                            <option value="other">Something else</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="contact-message"
                            className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-600"
                        >
                            Message
                        </label>
                        <textarea
                            id="contact-message"
                            name="contact-message"
                            rows={4}
                            required
                            placeholder="Share a bit about what you&apos;re working on and how I can help."
                            className="border border-zinc-200/80 bg-white/80 px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-accent-gold/80 focus:ring-2 focus:ring-accent-gold/20"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="mt-1 inline-flex w-full items-center justify-center gap-2 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-50 shadow-[0_10px_25px_rgba(15,23,42,0.35)] transition-colors hover:bg-zinc-950 disabled:opacity-60"
                    >
                        <span>
                            {status === "sending" ? "Sending…" : "Send"}
                        </span>
                    </button>
                </form>
            </div>
        </>
    );
}
