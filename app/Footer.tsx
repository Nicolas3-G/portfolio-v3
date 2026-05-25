export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/75 bg-[#F6F3EA]/95">
      <div className="px-4 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          <p className="text-center text-sm text-zinc-600 sm:text-left">
            <span className="font-medium text-zinc-800">Nicolas Guimont</span>
            <span className="mx-2 text-zinc-400" aria-hidden>
              ·
            </span>
            <span>
              Made with <span aria-hidden>❤️</span> {new Date().getFullYear()}
            </span>
          </p>
          <div className="flex items-center gap-5">
            <a
              href="mailto:nicguimont@gmail.com"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-accent-gold"
            >
              nicguimont@gmail.com
            </a>
            <a
              href="https://github.com/Nicolas3-G"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200/80 bg-white/80 text-zinc-700 shadow-sm transition-colors hover:border-accent-gold/60 hover:text-accent-gold"
              aria-label="GitHub"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.44c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.76.08-.74.08-.74 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.84 1.32 3.54 1.01.11-.78.42-1.32.76-1.62-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/nicolas3/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200/80 bg-white/80 text-zinc-700 shadow-sm transition-colors hover:border-accent-gold/60 hover:text-accent-gold"
              aria-label="LinkedIn"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.564v1.561h.05c.497-.94 1.71-1.931 3.522-1.931 3.767 0 4.46 2.481 4.46 5.708v6.114zM5.337 7.433C4.194 7.433 3.27 6.507 3.27 5.365c0-1.141.924-2.066 2.067-2.066 1.14 0 2.064.925 2.064 2.066 0 1.142-.924 2.068-2.064 2.068zM6.812 20.452H3.862V9h2.95v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
