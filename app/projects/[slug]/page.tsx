import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PROJECTS,
  getProjectBySlug,
  titleToSlug,
} from "@/lib/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: titleToSlug(project.title),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project" };
  }
  return {
    title: `${project.title} | Nicolas | Full Stack Developer`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const fitClass =
    project.fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F6F3EA]">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-accent-gold"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to projects
        </Link>

        <article className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="order-2 flex min-w-0 flex-col lg:order-1 lg:pr-4">
            <header>
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                {project.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-zinc-700 sm:text-lg">
                {project.description}
              </p>
            </header>

            <section className="mt-8" aria-labelledby="project-contributions">
              <h2
                id="project-contributions"
                className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-700"
              >
                My Contributions
              </h2>
              {project.contributions && project.contributions.length > 0 ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-zinc-700 marker:text-accent-gold">
                  {project.contributions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.techs.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="order-1 flex min-w-0 flex-col items-center lg:order-2">
            <div className="relative aspect-4/3 w-full overflow-hidden bg-[#F6F3EA]">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className={`size-full object-center ${fitClass}`}
              />
            </div>
            {project.siteLinks && project.siteLinks.length > 0 ? (
              <div className="mt-4 flex w-full flex-col items-center gap-2">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {project.siteLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 border border-zinc-200/70 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-50 shadow-[0_10px_25px_rgba(15,23,42,0.35)] transition-colors hover:border-accent-gold/70 hover:bg-zinc-950"
                    >
                      {link.label}
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
                {project.siteNote ? (
                  <p className="text-center text-xs text-zinc-500">
                    {project.siteNote}
                  </p>
                ) : null}
              </div>
            ) : project.siteUrl ? (
              <div className="mt-4 flex w-full flex-col items-center gap-2">
                <a
                  href={project.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-zinc-200/70 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-50 shadow-[0_10px_25px_rgba(15,23,42,0.35)] transition-colors hover:border-accent-gold/70 hover:bg-zinc-950"
                >
                  {project.siteLinkLabel ?? "View site"}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                {project.siteNote ? (
                  <p className="text-center text-xs text-zinc-500">
                    {project.siteNote}
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="mt-4 flex w-full flex-col items-center gap-2">
                <span
                  aria-disabled="true"
                  className="inline-flex cursor-not-allowed items-center justify-center gap-2 border border-zinc-200/70 bg-zinc-400/90 px-5 py-2.5 text-sm font-medium text-zinc-100"
                >
                  {project.siteButtonLabel ?? "View site"}
                </span>
                {project.siteNote ? (
                  <p className="text-center text-xs text-zinc-500">
                    {project.siteNote}
                  </p>
                ) : null}
              </div>
            )}
          </div>
        </article>
      </div>

      <section
        className="w-full border-t border-zinc-200/70 bg-[#EDE9DF] py-16 sm:py-20"
        aria-labelledby="project-full-description"
      >
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-8">
          <h2
            id="project-full-description"
            className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
          >
            Full description
          </h2>
          <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-zinc-700 sm:text-lg">
            {project.fullDescription?.trim() ? (
              project.fullDescription
                .split(/\n\n+/)
                .map((block) => block.trim())
                .filter(Boolean)
                .map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))
            ) : (
              <p className="text-zinc-500">Long-form details for this project will go here.</p>
            )}
          </div>
        </div>
      </section>

      <div className="h-16 sm:h-20" aria-hidden />
    </div>
  );
}
