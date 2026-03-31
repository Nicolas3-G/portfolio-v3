export function ExperienceCard({
  companyName,
  description,
  bullets,
  logo,
}: {
  companyName: string;
  description: string;
  bullets: string[];
  logo?: React.ReactNode;
}) {
  const [title, period] = description.split("·");

  return (
    <div className="flex w-full max-w-2xl items-start gap-4 text-left sm:gap-5">
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200/70 bg-white/80 shadow-sm sm:h-16 sm:w-16"
        aria-hidden
      >
        {logo ?? null}
      </div>
      <div>
        <p className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
          {companyName}
        </p>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-sm font-medium text-accent-gold sm:text-base">
            {title.trim()}
          </span>
          {period && (
            <span className="text-xs font-normal text-zinc-500 sm:text-[0.8rem]">
              {"· "}
              {period.trim()}
            </span>
          )}
        </p>
        {bullets.length > 0 && (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600 marker:text-accent-gold">
            {bullets.map((item, i) => {
              if (companyName === "DPD Framework") {
                const highlightsByIndex: Record<number, string> = {
                  1: "reducing manual processes by nearly 100%",
                  2: "3-month scheduled MVP in just 1 month",
                };

                const highlight = highlightsByIndex[i];

                if (highlight && item.includes(highlight)) {
                  const [before, after] = item.split(highlight);
                  return (
                    <li key={i}>
                      {before}
                      <span className="font-semibold">{highlight}</span>
                      {after}
                    </li>
                  );
                }
              }

              if (companyName === "Overview World News") {
                const highlightsByIndex: Record<number, string> = {
                  0: "35% for 450,000+ articles",
                  1: "increased daily active users by 45-60%",
                  3: "99% uptime over 2 years",
                };

                const highlight = highlightsByIndex[i];

                if (highlight && item.includes(highlight)) {
                  const [before, after] = item.split(highlight);
                  return (
                    <li key={i}>
                      {before}
                      <span className="font-semibold">{highlight}</span>
                      {after}
                    </li>
                  );
                }
              }

              if (companyName === "Pre Framing Corp") {
                const highlightsByIndex: Record<number, string> = {
                  0: "React, Next.js, and JavaScript",
                  2: "cutting manual work and processing time by 80%",
                };

                const highlight = highlightsByIndex[i];

                if (highlight && item.includes(highlight)) {
                  const [before, after] = item.split(highlight);
                  return (
                    <li key={i}>
                      {before}
                      <span className="font-semibold">{highlight}</span>
                      {after}
                    </li>
                  );
                }
              }

              if (companyName === "Fiverr") {
                if (i === 2) {
                  const highlight = "5-star contractor rating";

                  if (item.includes(highlight)) {
                    const [before, after] = item.split(highlight);
                    return (
                      <li key={i}>
                        {before}
                        <span className="font-semibold">{highlight}</span>
                        {after}
                      </li>
                    );
                  }
                }

                if (i === 3) {
                  const withHighlightedStack = item
                    .replace(
                      "Next.js",
                      '<span class="font-semibold">Next.js</span>'
                    )
                    .replace(
                      "React",
                      '<span class="font-semibold">React</span>'
                    );

                  return (
                    <li
                      key={i}
                      dangerouslySetInnerHTML={{ __html: withHighlightedStack }}
                    />
                  );
                }
              }

              return <li key={i}>{item}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
