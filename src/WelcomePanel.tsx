import { useEffect, useState } from "react"

function CursorCubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M16 2L28 9v14l-12 7L4 23V9l12-7z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
        className="text-amber-400/90"
      />
      <path d="M16 2v14M16 16l12-7M16 16L4 9" stroke="currentColor" strokeWidth="1" className="text-white/35" />
      <path d="M4 9v14l12 7V16" stroke="currentColor" strokeWidth="1" className="text-white/25" />
    </svg>
  )
}

const SECTION_COUNT = 5

export default function WelcomePanel() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  return (
    <div className="relative mx-auto min-h-[min(88vh,900px)] w-full max-w-5xl px-4 pb-16 pt-6 md:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 1. Header strip */}
      <header
        className={`flex flex-col gap-4 border-b border-white/[0.08] pb-5 transition-all duration-500 sm:flex-row sm:items-center sm:justify-between ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        style={{ transitionDelay: mounted ? "0ms" : "0ms" }}
      >
        <div className="flex items-center gap-4 md:gap-5">
          <CursorCubeIcon className="h-11 w-11 shrink-0 md:h-[3.25rem] md:w-[3.25rem]" />
          <span className="font-mono text-sm font-bold uppercase tracking-[0.14em] text-slate-200 md:text-lg md:tracking-[0.13em]">
            Strategic AE / Disco
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 font-mono text-sm text-slate-400 md:gap-4 md:text-base">
          <time dateTime="2026-05-07">05.07.2026</time>
          <span className="rounded border border-amber-500/35 bg-amber-500/10 px-3 py-1.5 text-amber-200/95 md:px-3.5 md:py-2">
            60 MIN
          </span>
        </div>
      </header>

      {/* 2. Hero */}
      <section
        className={`mt-12 transition-all duration-500 md:mt-14 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        style={{ transitionDelay: mounted ? "70ms" : "0ms" }}
      >
        <h1 className="font-serif text-5xl font-normal tracking-tight text-[#f4f4f2] md:text-6xl lg:text-7xl">
          Welcome.
        </h1>
        <p className="mt-5 max-w-2xl font-sans text-lg font-normal leading-relaxed text-slate-400 md:text-xl">
          A working session on pipeline generation and discovery discipline.
        </p>
      </section>

      <div className="my-12 h-px w-full bg-white/[0.06] md:my-14" aria-hidden />

      {/* 3. Positioning — elevated, primary */}
      <section
        className={`transition-all duration-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
        style={{ transitionDelay: mounted ? "140ms" : "0ms" }}
      >
        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-2 lg:items-start lg:gap-x-6">
          <blockquote className="order-2 font-serif text-3xl font-normal italic leading-[1.15] text-[#ececea] md:text-4xl lg:order-1 lg:col-start-1 lg:row-start-1 lg:text-[2.75rem] lg:leading-[1.12]">
            Cursor wins on workflow, context, and execution.
          </blockquote>
          <div className="order-1 flex flex-col lg:order-2 lg:col-start-2 lg:row-start-1">
            <h2 className="text-center font-mono text-xs font-bold uppercase tracking-[0.22em] text-amber-400/95 md:text-sm md:tracking-[0.2em]">
              Cursor Positioning at a Glance
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:mt-8 md:gap-5">
            {[
              {
                n: "01",
                label: "Model Neutrality",
                sub: "Best model over time. No vendor lock-in.",
              },
              {
                n: "02",
                label: "Large Codebase Performance",
                sub: "Semantic Search and Dynamic Context Retrieval in real repos.",
              },
              {
                n: "03",
                label: "Faster Time to Value",
                sub: "Strong out of the box. Standardize across teams.",
              },
              {
                n: "04",
                label: "Platform Across the SDLC",
                sub:
                  "Ship as a system. Agents, human review, and automation stay tied to your repo from plan through production.",
              },
            ].map((t) => (
              <div
                key={t.n}
                className="flex min-h-[11rem] flex-col border border-white/[0.1] bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition hover:border-amber-500/25 md:min-h-[12rem] md:p-7"
              >
                <p className="font-mono text-sm font-semibold text-amber-400/95 md:text-base">{t.n}</p>
                <p className="mt-4 font-sans text-base font-semibold leading-snug text-slate-100 md:text-lg">
                  {t.label}
                </p>
                <p className="mt-auto pt-4 font-mono text-sm leading-relaxed text-slate-400 md:text-[0.95rem] md:leading-relaxed">
                  {t.sub}
                </p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-12 h-px w-full bg-white/[0.06] md:mt-14" aria-hidden />

      {/* 4. Agenda */}
      <section
        className={`-mt-1 pt-5 transition-all duration-500 md:pt-6 ${mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
        style={{ transitionDelay: mounted ? "210ms" : "0ms" }}
      >
        <h2 className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-slate-400 md:text-sm">
          Agenda
        </h2>
        <div className="mt-5 grid gap-6 md:grid-cols-3 md:gap-6">
          {[
            {
              num: "01",
              time: "20-25 MIN",
              title: "Greenfield Account Plan",
              purpose:
                "Build a Fortune 500 account thesis and show how I create momentum from zero.",
              tags: ["Account Thesis", "Stakeholder Map", "First 90 Days"],
            },
            {
              num: "02",
              time: "20-25 MIN",
              title: "Mock Discovery: Figma Inbound",
              purpose:
                "Run high-quality discovery with Marcel Weekes (VP Eng, 650 engineers) and his security leaders. Earn a specific, well-defined next step.",
              tags: ["Why Now", "Current State", "Security and Governance"],
            },
            {
              num: "03",
              time: "10-15 MIN",
              title: "Reflection and Debrief",
              purpose:
                "Walk through top insights, deal hypothesis, urgency read, champion test, deal risks, and what I would change.",
              tags: ["Insights", "Hypothesis", "Risks"],
            },
          ].map((card) => (
            <article
              key={card.num}
              className="flex flex-col border border-white/[0.07] bg-slate-950/40 p-6 transition hover:border-white/[0.12] md:p-7"
            >
              <div className="flex items-baseline justify-between gap-2 font-mono text-[11px] uppercase tracking-wider text-slate-500 md:text-xs">
                <span className="text-amber-500/90">{card.num}</span>
                <span className="text-slate-600">{card.time}</span>
              </div>
              <h3 className="mt-5 font-sans text-lg font-semibold leading-snug text-[#ececec] md:text-xl">
                {card.title}
              </h3>
              <p className="mt-4 flex-1 font-sans text-base leading-relaxed text-slate-400">{card.purpose}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-slate-500 md:text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="my-12 h-px w-full bg-white/[0.06] md:my-14" aria-hidden />

      {/* 5. Footer */}
      <footer
        className={`flex flex-col gap-3 border-t border-white/[0.08] pt-6 transition-all duration-500 sm:flex-row sm:items-center sm:justify-between ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        style={{ transitionDelay: mounted ? `${70 * (SECTION_COUNT - 1)}ms` : "0ms" }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-600">
          Cursor / Discovery Panel / 05.07.2026
        </p>
        <p className="font-mono text-[11px] text-slate-400">
          READY <span className="inline-block animate-blink text-amber-400">▊</span>
        </p>
      </footer>
    </div>
  )
}
