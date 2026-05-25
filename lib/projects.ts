export type ProjectFit = "contain" | "cover";

export type Project = {
  title: string;
  description: string;
  image: string;
  fit: ProjectFit;
  techs: string[];
  /** Bullet points for the "My Contributions" section; omit when not yet written. */
  contributions?: string[];
  /** Public site URL for the primary link button; omit until ready. */
  siteUrl?: string;
  /** Primary link button label (defaults to "View site"). */
  siteLinkLabel?: string;
  /** Multiple link buttons (e.g. iOS and Android app stores). */
  siteLinks?: { label: string; url: string }[];
  /** Optional note shown below the "View site" button. */
  siteNote?: string;
  /** Disabled button label when the site is not yet available (no siteUrl). */
  siteButtonLabel?: string;
  /** Long-form copy for the full-width description block; separate paragraphs with blank lines. */
  fullDescription?: string;
};

/** URL slug derived from the visible project title (lowercase, hyphenated). */
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const PROJECTS: Project[] = [
  {
    image: "/projects/overview/overview.png",
    fit: "contain",
    title: "Overview World Press",
    description:
      "A news aggregation platform that has processed over 450k articles complete with iOS and Web App",
    techs: ["React", "Next.js", "Tailwind", "GCP", "Firebase", "Node.js"],
    siteUrl: "https://www.overviewpress.com/",
    siteNote: "Currently awaiting relaunch.",
    contributions: [
      "Built and maintained backend content curation and delivery systems in Node.js",
      "Developed the Next.js web application, delivering the same news experience and content available in the iOS app",
      "Designed and built an internal observability and tooling platform in Next.js",
      "Designed and implemented user facing views for the iOS application",
    ],
    fullDescription: `Overview World Press is a global news platform designed to give users access to journalism from around the world. By aggregating news sources from 55 countries, the app provides a comprehensive view of international events while allowing users to compare how trending stories are covered across different regions and perspectives. This experience is delivered through an intuitive globe based and front page interface on iOS, as well as a streamlined front page experience on the web, making it easy for users to stay informed on both country specific and global news.

I worked primarily on the backend systems responsible for gathering, processing, and surfacing this data in compelling and innovative ways. One of my most significant contributions was optimizing our translation pipeline, which represented the company's largest operational cost. Through a series of targeted improvements, I first reduced translation expenses by 33 percent and later achieved an additional 90 percent reduction. After identifying translation costs as a major blocker to future feature development, I proactively researched and implemented optimizations that significantly improved the platform's scalability.

I also built an internal tooling dashboard that provided the team with greater visibility into backend processes and system health. The dashboard enabled direct interaction with backend services and user data, substantially improving observability and reducing debugging time across a wide range of scenarios.`,
  },
  {
    image: "/projects/ai-emma/ai-emma.png",
    fit: "contain",
    title: "AI Emma",
    description:
      "AI platform that streamlines immigration case management by automating workflows and organizing case data.",
    techs: ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "PostgreSQL"],
    siteButtonLabel: "Under Development",
    contributions: [
      "Refactored legacy frontend code from Python to a modern Next.js web app",
      "Updated legacy Python backend to allow for scaling and improved output",
      "Built features integrating AI, allowing streamlined case processing and reports",
      "Implemented enterprise-level authentication and organization system",
    ],
    fullDescription: `AI Emma is a platform built for law firms handling immigration cases. Its core feature streamlines case evaluation by analyzing client documents alongside USCIS data and AAO decision patterns to generate detailed assessments for attorneys reviewing potential cases. Built for one of San Francisco's leading immigration law firms, the evaluations were reviewed by experienced legal experts and found to be highly accurate and valuable.

I was responsible for technical evaluation of the system, leading research into improvements, and implementing several enhancements to its performance and reliability. I also built additional case workflow features, including a petition drafting tool that allows attorneys to generate petition letters informed by case evaluations for submission to USCIS. In addition, I developed a client intake system that processes incoming client emails and generates structured, customizable responses to automate the intake process. As this was an enterprise-focused platform, I also implemented an authentication system enabling organizations to securely manage and isolate law firm data.`,
  },
  {
    image: "/projects/cuida/cuida.png",
    fit: "contain",
    title: "Cuida Mobile App",
    description:
      "A platform for connecting immigrants and allies to education, information, and community",
    techs: ["Tailwind", "React Native", "Node.js", "Expo", "Firebase", "TypeScript"],
    siteButtonLabel: "Under Development",
    siteNote: "Expected Release July 2026",
    contributions: [
      "Designed Cuida as a personal project focused on centralizing immigrant resources",
      "Built the mobile application for iOS and Android using React Native",
      "Developed a Node.js backend for data curation, search, and aggregation",
      "Integrated AI to analyze and summarize aggregated data",
    ],
    fullDescription: `I built Cuida with the goal of creating a single platform where immigrants and allies can access education, organizations, news, and community resources in one place. As a first generation immigrant from Colombia, the mission is personally meaningful to me. Seeing immigrant families struggle to keep up with developments in immigration enforcement motivated me to become more involved in the space, and my own difficulty staying informed highlighted a clear gap that this platform aims to address.

I built Cuida using lessons learned from my work on Overview World Press, applying a similar approach to data curation and information delivery. I developed a Node.js backend to handle search and discovery of organizations, events, and news at the city and state level. I also integrated AI to evaluate and synthesize this data over time, generating higher level insights for users.

Development is still in progress, with plans to release the app on iOS and Android within the next month.`,
  },
  {
    image: "/projects/dpd/dpd.png",
    fit: "contain",
    title: "DPDing",
    description:
      "A cross platform mobile app and admin dashboard built to improve workplace productivity and team efficiency",
    techs: ["React", "Next.js", "Expo", "React Native", "Firebase", "PostgreSQL"],
    siteLinks: [
      {
        label: "iOS App",
        url: "https://apps.apple.com/us/app/dpding-dreamer-planner-doer/id6746777165",
      },
      {
        label: "Android App",
        url: "https://play.google.com/store/apps/details?id=com.dpding.app&pcampaignid=web_share&pli=1",
      },
    ],
    contributions: [
      "Built the DPDing mobile application using React Native for both iOS and Android",
      "Developed the DPDing enterprise dashboard in Next.js for managing and analyzing team data",
      "Created the DPDing marketing website using Next.js to showcase the product",
      "Automated the team's original workflow reducing manual workload by 90%",
    ],
    fullDescription: `The DPDing app is built on top of the psychological DPD Framework, designed to improve team cohesiveness by identifying each member's dominant personas and helping teammates understand one another in a way that enhances communication and collaboration. The mobile application guides users through a survey to determine their dominant personas and provides detailed reports explaining how those personas function individually and in combination with others. It also includes DPD Meeting cards, allowing users to quickly prepare for meetings by understanding how to best communicate with different team members based on their personas. These surveys offer insights into team dynamics, highlight areas for improvement, and can indicate potential disengagement within a team. These observations have proven valuable in practice for informing management decisions and improving overall team flow.

The DPDing dashboard provides managers and leadership with a curated view of team data along with detailed team reports.

My most significant contribution to this project was automating the previously manual survey and report pipeline, reducing a process that once took 15 to 30 minutes down to just seconds. I also built the DPDing marketing website, which showcases the product and provides a concise demonstration of in app functionality.`,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => titleToSlug(p.title) === slug);
}
