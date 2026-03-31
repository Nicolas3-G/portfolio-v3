"use client";

import { useState, FormEvent } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("sending");
        setErrorMsg("");

        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem("contact-name") as HTMLInputElement).value,
            email: (form.elements.namedItem("contact-email") as HTMLInputElement).value,
            topic: (form.elements.namedItem("contact-topic") as HTMLSelectElement).value,
            message: (form.elements.namedItem("contact-message") as HTMLTextAreaElement).value,
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
            form.reset();
        } catch (err: unknown) {
            setStatus("error");
            setErrorMsg(err instanceof Error ? err.message : "Failed to send message");
        }
    }

    return (
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
                        <option value="founding-engineer">Founding engineer / early hire</option>
                        <option value="project-help">Help shipping a project</option>
                        <option value="consulting">Consulting / advisory</option>
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

                {status === "success" && (
                    <p className="text-sm font-medium text-emerald-600">
                        Message sent! I&apos;ll get back to you soon.
                    </p>
                )}
                {status === "error" && (
                    <p className="text-sm font-medium text-red-600">
                        {errorMsg || "Something went wrong. Please try again."}
                    </p>
                )}

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
    );
}
