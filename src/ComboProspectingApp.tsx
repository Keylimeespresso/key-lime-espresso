import { useCallback, useLayoutEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Briefcase,
  Building2,
  FileText,
  Heart,
  Mailbox,
  Linkedin,
  Mail,
  MessageSquare,
  Phone,
  Repeat,
  Search,
  Share2,
  Shield,
  Users,
  Video,
  Voicemail,
  X,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

type ViewMode = "pipeline" | "roleplay"

type PillarDef = {
  id: string
  title: string
  Icon: LucideIcon
  principle: string
  methodologyTactics: string
  methodologySample: string
  methodologyLink?: string
  methodologyImageUrl?: string
  /** Long-form supplement (e.g. Boolean search string) shown in panel appendix */
  methodologyAppendix?: string
  figmaTactics: string
  figmaSample: string
  rubric: string[]
}

const ABM_MASTER_BOOLEAN_SEARCH =
  'NOT ("Retired" OR "Former" OR "Assistant" OR "Deputy" OR "Sales" OR "Marketing" OR "Underwriter" OR "Broker" OR "Claims" OR "Actuary") AND (("CIO" OR "CTO" OR "CISO" OR "CDO" OR "CAIO" OR "CIOO" OR "BISO") OR ("Chief" AND ("Information" OR "Technology" OR "Data" OR "AI" OR "Artificial Intelligence" OR "Digital" OR "Innovation" OR "Cyber" OR "Security" OR "Procurement" OR "Sourcing")) OR (("SVP" OR "Senior Vice President" OR "VP" OR "Vice President") AND ("Engineering" OR "Software Engineering" OR "Platform Engineering" OR "Developer Experience" OR "Developer Productivity" OR "Application Development" OR "Cloud" OR "Architecture" OR "Innovation" OR "AI" OR "Artificial Intelligence" OR "Generative AI" OR "Machine Learning" OR "Cybersecurity" OR "Application Security" OR "Information Security" OR "Information Technology" OR "Technology")) OR (("Head" OR "Director" OR "VP" OR "Vice President") AND ("IT Sourcing" OR "Technology Sourcing" OR "Strategic Sourcing" OR "IT Procurement")))'

const ABM_METHOD_APPENDIX = `Master Boolean (C-level, VP, plus sourcing)

Paste into LinkedIn Sales Navigator (or any search that honors Boolean). This is one working pattern to surface chiefs, senior engineering and platform leaders, and IT sourcing — while stripping assistants, alumni titles, and insurance distribution roles that clog results.

You can spin dozens or hundreds of save-worthy personas from a single query like this; the account still needs judgment, but the list-building work is deliberately unlimited.

${ABM_MASTER_BOOLEAN_SEARCH}`

type RolePlayQuote = {
  id: string
  chip: string
  title: string
  lines?: { kind: "quote" | "text"; text: string }[]
  bullets?: string[]
  source: { label: string; href?: string }
}

const ROLE_PLAY_QUOTES: RolePlayQuote[] = [
  {
    id: "jensen",
    chip: "1 · Jensen",
    title: "Jensen Huang, CEO of NVIDIA — the headline quote",
    lines: [
      {
        kind: "quote",
        text: "My favorite enterprise AI service is Cursor. Cursor is an AI coder, and every one of our engineers, 100%, is now assisted by AI coders, and our productivity has gone up incredibly.",
      },
      { kind: "text", text: "He also said:" },
      {
        kind: "quote",
        text: "If I were to realize the Cursor team was raising money before, I would have given them all of my money.",
      },
    ],
    source: { label: "CNBC Squawk Box, October 8, 2025" },
  },
  {
    id: "nvidia-study",
    chip: "2 · NVIDIA",
    title: "NVIDIA case study — the proof behind Jensen's words",
    bullets: [
      "30,000+ developers use Cursor daily, driving a 3x increase in committed code.",
      "Used across the full SDLC: code generation, reviews, test cases, debugging, QA.",
    ],
    source: { label: "cursor.com/blog/nvidia", href: "https://cursor.com/blog/nvidia" },
  },
  {
    id: "box",
    chip: "3 · Box",
    title: "Box — 85% adoption, 30-50% roadmap throughput, 80-90% faster migrations",
    lines: [
      {
        kind: "quote",
        text: 'Over 85% of developers at Box now use Cursor daily, driving a 30-50% increase in product roadmap throughput. Box is completing major migrations 80-90% faster while improving overall product quality and security.',
      },
    ],
    source: { label: "cursor.com/blog/box", href: "https://cursor.com/blog/box" },
  },
  {
    id: "coinbase",
    chip: "4 · Coinbase",
    title: "Coinbase — 150 to 500 engineers in weeks",
    lines: [
      {
        kind: "quote",
        text: "Cursor has transformed the way our engineering teams write and ship code, with adoption growing from 150 to over 500 engineers (~60% of our org) in just a few weeks.",
      },
      {
        kind: "text",
        text: "By February 2025, every Coinbase engineer had used Cursor.",
      },
    ],
    source: { label: "cursor.com/customers", href: "https://cursor.com/customers" },
  },
  {
    id: "trimble",
    chip: "5 · Trimble",
    title: "Trimble — 50% more code shipped",
    lines: [
      {
        kind: "quote",
        text: "Across roles and levels, we're seeing an increase of over 25% in PR volume and over 100% in the average PR size. Together, that means we're shipping about 50% more code.",
      },
      { kind: "text", text: "— Jonah McIntire, CPTO" },
    ],
    source: { label: "cursor.com/customers", href: "https://cursor.com/customers" },
  },
  {
    id: "bonus",
    chip: "Bonus",
    title: "Enterprise scale",
    bullets: [
      "64% of Fortune 500 companies use Cursor.",
      "93% of engineers select Cursor as their preferred AI coding tool in head-to-head evaluations.",
    ],
    source: { label: "cursor.com/enterprise", href: "https://cursor.com/enterprise" },
  },
]

function RolePlayImpactQuotes() {
  const [idx, setIdx] = useState(0)
  const n = ROLE_PLAY_QUOTES.length
  const q = ROLE_PLAY_QUOTES[idx]

  const go = (next: number) => setIdx((next + n) % n)

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
          Five Cursor Business Impact Quotes
        </h2>
        <p className="mt-2 text-xs text-slate-500">Live meeting references — click a chip or use Previous / Next</p>
      </div>

      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {ROLE_PLAY_QUOTES.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIdx(i)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              i === idx
                ? "border-amber-400/70 bg-amber-500/20 text-amber-100 shadow-[0_0_20px_-8px_rgba(251,191,36,0.5)]"
                : "border-white/15 bg-slate-950/50 text-slate-400 hover:border-white/25 hover:text-slate-200"
            }`}
          >
            {item.chip}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-inner md:p-8">
        <h3 className="text-lg font-semibold leading-snug text-amber-200/95 md:text-xl">{q.title}</h3>

        {q.lines && q.lines.length > 0 && (
          <div className="mt-5 space-y-4 text-sm leading-relaxed">
            {q.lines.map((line, i) =>
              line.kind === "quote" ? (
                <blockquote
                  key={i}
                  className="border-l-[3px] border-amber-500/55 pl-4 text-slate-200 italic"
                >
                  &ldquo;{line.text}&rdquo;
                </blockquote>
              ) : (
                <p key={i} className="text-sm text-slate-400">
                  {line.text}
                </p>
              ),
            )}
          </div>
        )}

        {q.bullets && q.bullets.length > 0 && (
          <ul className="mt-5 list-none space-y-3 text-sm leading-relaxed text-slate-300">
            {q.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/85" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-500">
          Source:{" "}
          {q.source.href ? (
            <a
              href={q.source.href}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-sky-400 underline underline-offset-2 hover:text-sky-300"
            >
              {q.source.label}
            </a>
          ) : (
            <span className="text-slate-400">{q.source.label}</span>
          )}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go(idx - 1)}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-amber-400/40 hover:bg-slate-800/90"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          Previous
        </button>
        <span className="text-xs tabular-nums text-slate-500">
          {idx + 1} / {n}
        </span>
        <button
          type="button"
          onClick={() => go(idx + 1)}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-amber-400/40 hover:bg-slate-800/90"
        >
          Next
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}

/** Silver Dollar letter — rendered inside the panel “Worked example” box for Direct Mail */
function DirectMailWorkedExampleBody() {
  return (
    <>
      <p className="mb-4 text-sm font-semibold text-slate-100">
        The Silver Dollar letter{" "}
        <span className="font-normal text-slate-500">(selling Cursor to a CTO)</span>
      </p>
      <p className="mb-3 text-xs italic text-slate-500">[Silver dollar affixed to top of page]</p>
      <p className="mb-4 text-base font-semibold leading-snug text-white">
        Your engineering investment is a silver dollar. The face value is not the real value.
      </p>
      <p className="mb-3 text-sm text-slate-300">Dear [Mr./Ms. Last Name],</p>
      <div className="space-y-3 text-sm leading-relaxed text-slate-300">
        <p>
          The coin above is worth one dollar. Melted down, the silver inside is worth many times that. Your
          engineering organization works the same way. The salaries, tools, and infrastructure already on your
          P&amp;L hold latent output most companies never extract. Cursor is how peers across the Fortune 500 are
          extracting it.
        </p>
      </div>
      <ul className="my-4 list-none space-y-2.5 text-sm leading-relaxed text-slate-300">
        <li className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/80" />
          <span>
            A University of Chicago study across 1,000 organizations found teams running Cursor&apos;s agent merge
            39% more pull requests, with no rise in revert or bug rates.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/80" />
          <span>
            Coinbase: every engineer onboarded in weeks. Single developers now refactoring legacy codebases in days
            instead of months.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/80" />
          <span>Trusted by 64% of the Fortune 500, including NVIDIA, Samsung, OpenAI, and Stripe.</span>
        </li>
      </ul>
      <p className="text-sm leading-relaxed text-slate-300">
        The question is not whether AI-assisted engineering will compress your time to market. The question is
        whether your competitors get there first.
      </p>
      <div className="mt-5 space-y-1 text-sm text-slate-300">
        <p>Respectfully,</p>
        <p>Mazen Abdu</p>
        <p>Strategic Account Executive, Cursor</p>
      </div>
      <p className="mt-6 border-l-4 border-amber-400/70 pl-4 text-base font-bold leading-snug text-slate-100 sm:text-lg">
        P.S. I will call you Tuesday, [DATE], at 10:15 a.m. ET. [EA Name] has the time held on your calendar.
      </p>
    </>
  )
}

function DirectMailVitoSection() {
  return (
    <div className="mt-6 border-t border-white/15 pt-6">
      <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-sky-400/90">
        Why this structure works (VITO v1)
      </h4>
      <ul className="list-none space-y-2.5 text-sm leading-relaxed text-slate-400">
        <li className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/70" />
          <span>
            Headline carries the letter. VITOs scan, so the first line frames the pitch in P&amp;L language before
            the eye drops to the body.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/70" />
          <span>Object becomes the metaphor. The silver dollar is not swag. It is the argument.</span>
        </li>
        <li className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/70" />
          <span>
            Three proof points, ranked: independent academic study first, peer customer outcome second, Fortune 500
            social proof third.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/70" />
          <span>
            No &quot;I&quot; in the opening. Keep the focus on the buyer&apos;s world, not the seller&apos;s
            introduction.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/70" />
          <span>
            Closing hook replaces the meeting ask. VITOs respond to competitive urgency, not calendar requests.
          </span>
        </li>
      </ul>
    </div>
  )
}

const PILLARS: PillarDef[] = [
  {
    id: "trigger",
    title: "Trigger Events",
    Icon: Zap,
    principle:
      "I reach out when I have a compelling reason to reach out. Trigger events justify the interruption. Without a trigger, I'm noise. With one, I'm timely.",
    methodologyTactics:
      "I keep a short list of account-level triggers: leadership changes, M&A, reorgs, earnings themes, major tech migrations, and public AI or efficiency commitments. I tie every first touch to one trigger so the prospect feels timing, not spray-and-pray.",
    methodologySample:
      "Saw your Q3 call emphasis on platform consolidation. That's usually the window where engineering standardization either accelerates or fragments. Happy to compare notes with two peer patterns from similar rollouts if useful.",
    figmaTactics: `January 2026 brand consolidation (Marsh, Guy Carpenter, Mercer, Oliver Wyman → single "Marsh" brand)
New BCS (Business and Client Services) unit launched October 2025
AWS migration in flight, retiring all data centers
CEO John Doyle's public commitment to making MMC an "AI winner"
40 AI production systems shipped in 12 months under Niall Maher
LenAI deployed to all 90,000 employees (700K queries per week), but no equivalent dev productivity tool for the 5,000 engineers in MMTech
New Mercer CISO role posted (likely just filled)`,
    figmaSample:
      "Saw the BCS announcement. Standardizing the engineering platform during a brand reset is a once-in-a-decade window. Here's what I'm seeing at peer F500s in the same moment.",
    rubric: ["Account thesis", "Urgency"],
  },
  {
    id: "email",
    title: "Email",
    Icon: Mail,
    principle:
      "Insight-led, not pitch-led. The email's job is to demonstrate that you have done the homework, surface a specific insight or trigger, and earn the right to a phone call. Five sentences max. No deck attachments. One CTA, and the CTA is a call.",
    methodologyTactics:
      "Match the lens to the persona: CIO sees operating pattern, engineering leader sees delivery risk, security sees governance. One proof point, one trigger, one time-bound ask for a live conversation.",
    methodologySample: `I've chosen the Leader of Innovation Engineering at Marsh Global. He's the liaison for identifying transformation opportunities and delivering measurable outcomes for the engineering team.

Outbound email to Niall

Hi Niall,

My name is Mazen with Cursor. I saw your work leading Innovation Engineering at Marsh and the focus on identifying transformation opportunities that actually deliver measurable outcomes. Just connected with you on LinkedIn too.

Over the past few months, we've been working with developer productivity leaders at global insurance and financial services firms on AI coding rollouts that actually lead to real business impact.

Given Marsh's investment in the Innovation Centre and the engineering build-out across Dublin and Phoenix, your role sits right where Cursor delivers the most leverage. We're helping dev teams ship 30% faster without compromising the security posture Jeff needs to sign off on to actually push it into production.

It would be great to connect with you and share how we just helped Optiver roll Cursor out firm-wide and what that's done for their engineering velocity. More than anything, I'd love your perspective on what you're driving at Marsh and where the real friction is for your team.

Are you open to a quick chat this week or next? Happy to work with an admin to set up time at your convenience.

Warmest,`,
    figmaTactics: `Persona-tuned emails to top-of-funnel stakeholders. Different angle per persona:
Beswick: peer F500 CIO consolidation pattern
BU CIOs: industry-specific velocity benchmark
Niall: "we work with engineering leaders running similar AI rollouts" peer reference
Engineers: technical artifact (a benchmark, a code review, a demo recording)`,
    figmaSample: `Subject: Marsh + AI coding consolidation — pattern from PwC and other peers

Hi Rob, three things in 30 seconds.

1. We work with two-thirds of the F1000, including PwC and other professional services peers.
2. Their pattern: 90 days from sprawl (Copilot + Claude Code + shadow Cursor) to standardization on Cursor for 80%+ of engineers.
3. The BCS reorg is the right window for that decision at Marsh.

Worth 30 minutes? I have Tuesday or Thursday open.`,
    rubric: ["Stakeholder map", "Pipeline generation"],
  },
  {
    id: "li-engage",
    title: "LinkedIn Engagement",
    Icon: Linkedin,
    principle:
      "I stay present in my prospect's feed before I'm in their inbox. I comment substantively on their posts. I share insights they'd value. I build social proof and familiarity before I reach out.",
    methodologyTactics:
      "I spend two to three weeks adding value in public before any direct ask. My comments read like a practitioner, not a fan. I repost with a sharp one-line takeaway when it helps my credibility.",
    methodologySample: `74% of companies plan to deploy agentic AI within two years.
Only 21% have a mature governance model for it.

That is the gap MIT Technology Review and Deloitte's Microsoft Technology Practice just flagged in the 2026 State of AI report. Top executive worries: data privacy, IP and legal exposure, and oversight.

Now look at Cursor. It is already inside most engineering orgs, often adopted developer-by-developer, with access to source code, secrets, and internal systems. No central policy, no audit trail, no kill switch.

That is not an AI strategy. That is unmanaged execution at scale.

The companies that thread the needle here will not be the ones that block Cursor. They will be the ones who give it a control plane before the rollout outpaces the guardrails.

How is your team handling it?`,
    methodologyLink:
      "https://technologyreview.com/2026/04/21/1136158/building-agent-first-governance-and-security/",
    figmaTactics: `Engage with Niall Maher's posts about AI rollouts at Marsh (he is vocal, posts Claude Code tips, runs the Codú community)
Engage with Paul Beswick's posts about AI experimentation
Comment on Brian Geoghegan's posts about AI engineering practices
Share Cursor case studies that map to professional services use cases (PwC, Accenture)

Cadence: 2-3 weeks of engagement before any direct DM.`,
    figmaSample:
      "Use the cadence above. Keep comments specific to what they shipped or argued, not generic praise.",
    rubric: ["Stakeholder map", "Pipeline generation"],
  },
  {
    id: "li-dm",
    title: "LinkedIn DM / InMail",
    Icon: MessageSquare,
    principle:
      'When you DM, be specific, brief, and human. No "I would love to connect" templates. Reference something specific they published, posted, or shipped.',
    methodologyTactics:
      "Tier messages by seniority and technical depth. Eighty to one hundred twenty words max. Name one trigger. Offer one concrete CTA, usually a short call or a peer story, not a calendar wall.",
    methodologySample: `Example 1
Hi Niall, just joined Cursor as a Strategic AE covering financial services. Reading up on Marsh has been a rabbit hole. Forty production AI systems in 12 months is nuts, especially inside a 150-year-old shop.

What you and Codú are building mirrors a lot of the bottom-up adoption patterns we see at our F500 customers. I'd love to compare notes some time, with no agenda. Curious how you're thinking about scaling consistent AI coding workflows from your 100-person team out to the wider 5,000 in MMTech.

Example 2
LinkedIn Outreach to Rob Hussey (Mercer CIO)
Different shape entirely. CIOs respond to peer references and consolidation narratives, not engineer-peer warmth.

Hi Rob, reaching out from Cursor. Niall Maher's team has been visible in the Dublin AI engineering community, and we've been seeing engineers across MMTech pulling Cursor onto their own laptops.

I'm not here to do an end run around your platform decisions. Opposite, actually. As Mercer engineers start adopting AI coding tools, I want to make sure you have the data and the architecture story to govern that adoption properly, whether you end up choosing Cursor or not.

Could we get 20 minutes? I can show you what shadow usage typically looks like at your size and what the consolidation playbook is for similar firms.

Example 3
Niall, big fan of what you've built with Codú. The Dublin engineering community is lucky to have it.

Just joined Cursor as a Strategic AE. Not reaching out to sell you anything, more genuinely curious how you balance the Marsh role with the community work, and whether AI coding tools have changed how you spend your time. I'm building my own perspective on how the bottom-up adoption playbook actually works at scale, and you've lived it.

If you ever want to swap notes over coffee or a call, the door is open. Either way, following along.

If you've got 20 minutes in the next few weeks, I'd buy the coffee. If not, no worries. Keep shipping.`,
    figmaTactics:
      "Tiered messaging. Niall Maher gets a peer-engineer tone referencing his Codú work and his Claude Code posts. Rob Hussey gets a CIO-level message referencing the BCS reorg and peer F500 patterns. Each message is 80-120 words, names a specific trigger, and offers a concrete CTA.",
    figmaSample: `Hi Niall, just joined Cursor as a Strategic AE. Reading up on Marsh has been a rabbit hole. 40 AI production systems in 12 months is nuts, especially in a 150-year-old shop. What you and Codú are building mirrors the bottom-up adoption patterns we see at our F500 customers. I'd love to compare notes some time, no agenda. Curious how you're scaling consistent AI coding workflows from your 100-person team out to the wider 5,000 in MMTech. If you've got 20 minutes, I'd buy the coffee.`,
    rubric: ["Stakeholder map", "Pipeline generation"],
  },
  {
    id: "voicemail",
    title: "Voicemail",
    Icon: Voicemail,
    principle:
      "Most voicemails get deleted because they sound like sales calls. I leave voicemails that deliver a specific insight, name a peer customer, and tell my prospect I'll follow up by email so they have a reason to look for it. For me, voicemail is not a callback request. It's a value drop.",
    methodologyTactics:
      "I keep it under sixty seconds. No pitch stack. I promise one artifact by email with an exact subject line so the thread is searchable.",
    methodologySample:
      'Hi [Name], this is [your name] from [company]. I\'m not expecting a callback. I\'m sending a one-page teardown on how [Peer] cut review latency after their agent rollout. The subject line will be "Review latency after agents." That\'s all. Thanks for the work you publish on this topic.',
    figmaTactics:
      "I run voicemail as part of my direct phone sequence — I pair each voicemail with email the same day.",
    figmaSample: `Hi Niall, this is [your name] from Cursor. I'm not expecting a callback. I'm following up to share something specific. We just published a customer story on how Coinbase scaled AI coding adoption from 150 to 500 engineers in six weeks — exactly the curve you're on at Marsh. I'm sending it via email right after this. Look for the subject line "Coinbase 150 to 500 in six weeks." That's all. Have a good one.`,
    rubric: ["Pipeline generation", "Urgency"],
  },
  {
    id: "video",
    title: "Personalized Video",
    Icon: Video,
    principle:
      "Video cuts through email noise. A sixty-second selfie video showing you have actually researched the prospect, with a personalized whiteboard or screen-share, often lifts response rates versus text-only outreach.",
    methodologyTactics:
      "Loom or Vidyard for top five to ten stakeholders. Screen-share proof of research. One insight, one peer analogy, one CTA. Sixty to ninety seconds max.",
    methodologySample:
      "Hey [Name], quick personal note. I have your last post up behind me because your point on federated guardrails matches what we saw at [Peer]. Three patterns worth fifteen minutes. Calendar in email if useful.",
    figmaTactics:
      "Loom or Vidyard videos for top 5-10 named stakeholders. Show your screen with their LinkedIn profile open and the Marsh annual report behind you. Reference a specific Marsh trigger event. End with a calendar link. 60-90 seconds max.",
    figmaSample: `Hey Paul, I'm not going to take much of your time. I'm recording this with your LinkedIn open behind me because the BCS announcement caught my eye. We work with two-thirds of the F1000 on AI coding standardization. Three patterns from peer F500 CIOs going through similar reorgs. Worth 20 minutes? Calendar link is in the email. Either way, congrats on the rebrand.`,
    rubric: ["Stakeholder map", "Urgency"],
  },
  {
    id: "content",
    title: "Content & Insight Sharing",
    Icon: FileText,
    principle:
      "Earn the right to be heard by giving first. Share research, benchmarks, and customer stories that the prospect would value, with no ask attached.",
    methodologyTactics:
      "Cadence one insight share every seven to ten days during warm-up. Never pair with a hard ask. Let the cumulative signal do the work.",
    methodologySample: `Subject: useful asset for your GTM and executive talk track

Hi [Name],

I'd like to share something with you and the team that is highly relevant for your go-to-market motion and executive talk track.

One of the laws of sales is this: you get delegated up or down to the person for whom you sound like you should be speaking with.

MIT Technology Review and Deloitte's Microsoft Technology Practice warn that enterprises are deploying AI agents faster than they can govern them. Deloitte's 2026 State of AI report finds 74% of companies plan to deploy agentic AI within two years, but only 21% have a mature governance model. Top concerns are data privacy, IP and legal compliance, and oversight gaps.

AI agents now act as non-human identities with real access to sensitive systems and data, creating a fresh attack surface. Deloitte's Andrew Rafla argues the fix is a control plane: a centralized layer governing which agents run, with what permissions, under which policies, and using which models and tools. Without it, you have unmanaged execution at scale, and deployments fail unpredictably rather than safely.

Cursor is the clearest live example. It is already inside most engineering orgs, often adopted developer-by-developer, with access to source code, secrets, and internal systems. That is exactly the unmanaged execution Deloitte is flagging.

Attached: MIT Technology Review Insights image ("Building agent-first governance and security")
Link: https://technologyreview.com/2026/04/21/1136158/building-agent-first-governance-and-security/

No ask in this note. If it's useful, happy to send a one-pager version your team can reuse in customer conversations.`,
    methodologyLink:
      "https://www.technologyreview.com/2026/04/21/1136158/building-agent-first-governance-and-security/",
    methodologyImageUrl:
      "https://image.thum.io/get/width/900/https://www.technologyreview.com/2026/04/21/1136158/building-agent-first-governance-and-security/",
    figmaTactics: `Send relevant Cursor customer studies (Coinbase, NVIDIA, Stripe, Notion)
Share industry research on AI coding ROI in financial services
Curated reading on agent harness quality, semantic search, and large codebase performance
Cursor's enterprise security architecture deep-dive for the Lund / Akhawe-equivalent personas

Cadence: One insight share every 7-10 days during the warm-up period. Never paired with a direct ask.`,
    figmaSample:
      'Share the MIT Technology Review + Deloitte governance asset as an executive narrative: "agents are scaling faster than controls; control planes are now GTM-relevant." Keep it ask-free and position it as reusable talk-track material.',
    rubric: ["Account thesis", "Stakeholder map"],
  },
  {
    id: "referrals",
    title: "Referrals & Warm Intros",
    Icon: Users,
    principle:
      "A warm intro converts at five to ten times the rate of cold outreach. Always exhaust the network before going cold.",
    methodologyTactics:
      "Map three paths: mutual LinkedIn, alumni from the account, and customer references in the same industry. Ask for a specific forwardable blurb, not a vague intro.",
    methodologySample: `Warm Intro Paths

- Board member connections: I map the target's board to my investors, advisors, and execs; one intro from a board member to the CEO or CTO carries more weight than 50 cold emails.
- Partner community connections: I tap my existing customer base for shared connections into the target; a peer CTO vouching for Cursor's impact on dev velocity is gold.
- GSI connections: Accenture, Deloitte, Slalom, and similar firms are already inside the account on transformation work, so I get them to surface Cursor as part of the modernization conversation.
- VC and investor backchannels: If the target is VC-backed, I work the portfolio because founders and operating partners share tools that move the needle on engineering output.
- Hyperscaler and cloud rep alignment: AWS, Azure, and GCP reps are in every dev shop, and I co-sell with them when Cursor accelerates cloud-native build-out.
- Dev tool ecosystem partners: GitHub, GitLab, Datadog, Snyk, and similar reps already have champions inside the account; I trade intros and co-pitch the developer productivity story.
- Alumni and former colleague intros: I mine LinkedIn for ex-coworkers now sitting at the target; a "we used to build together" note lands warmer than any cold sequence.
- Customer champion-to-peer intros: Existing Cursor power users almost always know engineering leaders at the target, and I ask directly for intros to the VP Eng or Head of Platform.
- Community and conference connections: Engineering leaders meet at re:Invent, KubeCon, and local CTO dinners, and I use shared event attendance as the warm opener.
- Internal champion-led intros: Once I land one developer or team lead inside the account, I turn them into my guide to budget owners, blockers, and next stakeholders.

Bottom Line

Cold is expensive.
Warm is leverage.
Every account has a path in.
My job is to find it before the competition does.`,
    figmaTactics: `Identify shared connections to Beswick, Fike, Hussey, and Lund via LinkedIn
Find ex-MMC technologists in your network (especially recent Dublin and Phoenix departures)
Leverage peer F500 CIO relationships from existing Cursor customers
Use Cursor customer references (PwC, Accenture peer professional services firms) for credibility intros`,
    figmaSample:
      "Use warm paths before cold parallel threads. Credibility transfers faster through peer services firms.",
    rubric: ["Stakeholder map", "Pipeline generation"],
  },
  {
    id: "dmail",
    title: "Direct Mail",
    Icon: Mailbox,
    principle:
      "Physical objects in a digital world cut through — but this bucket is high-touch, executive-level outreach only. It does not scale. I use it for a tiny set of named targets after the rest of the combo has already run and I still do not have the outcome I am pushing for. Then a thoughtful physical touchpoint (book, hand-written note, branded item with a specific reference) can create a memorable moment that no email achieves.",
    methodologyTactics:
      "I reserve senders for economic buyers and technical champions after digital warmth — never as a volume play. The note references something they said publicly so it feels researched, not swag-driven. I coordinate with the EA in advance so the call time in the PS is already held on the calendar. Few packages, high conviction.",
    methodologySample: "",
    figmaTactics: `Executive-only, same deal: high-touch, does not scale — Beswick / Niall / Hussey tier after parallel digital motion has not cracked the outcome yet.
Strategy book + handwritten tie to his "600 AI experiments" post — EA briefed so the PS slot is real.
Branded Moleskine to Niall with a Codú-specific line (not generic swag).
One-page letter + tangible metaphor when paper carries the thesis — EA aligned for the PS callback.`,
    figmaSample:
      "Day the package lands: light email so they know to look for it. PS references a specific call time already held with the EA — no surprise gatekeeping.",
    rubric: ["Account thesis", "Urgency"],
  },
  {
    id: "abm",
    title: "Multi-threading / ABM",
    Icon: Share2,
    principle:
      "Single-threaded deals die. I multi-thread across the account from day one — different messages to different personas, all aligned to the same account thesis. There is no shortage of work to be done: one strong Boolean can surface dozens or hundreds of the right titles for outreach, and it still only seeds the map. The appendix walks through my master query (C-level, VP, plus sourcing) — chiefs and senior engineering leaders, IT procurement, with noise stripped out — so I can populate Personas systematically before I sequence.",
    methodologyTactics:
      "I run parallel tracks across economic buyer, BU technology leaders, platform engineering, security, and procurement. Same north star narrative, different proof points. I pair that with saved Boolean cohorts so the named-person list scales beyond a short handwritten stack.",
    methodologySample:
      "Running three threads this week: CIO pattern, platform engineering throughput, security architecture deep dive. Same ninety-day consolidation thesis on all three.",
    methodologyAppendix: ABM_METHOD_APPENDIX,
    figmaTactics: `30-40 named individuals across MMC, hit in parallel:
1 economic buyer (Beswick)
3 BU CIOs (Hussey, Oliver Wyman digital lead, Guy Carpenter tech lead)
1 CTO (Fike)
1 Global CISO (Lund) and 1 Business CISO (Bowden)
1 AI Engineering Leader (Niall Maher)
5-7 senior engineers in Dublin, Phoenix, Cluj
2-3 Director-of-Engineering layer
Procurement / vendor management

Each gets a tuned message. All aligned to the same "BCS reorg + AI mandate + dev velocity" thesis.`,
    figmaSample:
      "Keep a living map of names and last touch. Stagger channels so the account feels coordinated, not chaotic.",
    rubric: ["Stakeholder map", "Pipeline generation"],
  },
  {
    id: "research",
    title: "Research & Personalization",
    Icon: Search,
    principle:
      "Research is not a phase. It is the substrate for everything else. Spend more time researching than messaging.",
    methodologyTactics:
      "Filings, podcasts, job posts, conference talks, and ninety days of LinkedIn activity for top stakeholders. Output is a weekly-updated dossier the whole team uses.",
    methodologySample:
      "This week I indexed twelve talks and eight job posts to infer their agent stack and review model. Next week I validate with two mutuals before outreach.",
    figmaTactics: `10-K, 10-Q, earnings transcripts (24B revenue, AI investments named)
LinkedIn profiles of all 30-40 named stakeholders
Conference talks and podcasts (Beswick on Technovation, Niall Maher on Future Form)
Job postings (reveal tech stack, pain points, urgency)
Press releases on BCS, AWS migration, brand consolidation
LinkedIn posts of all top stakeholders for the last 90 days

Output: A live research dossier that updates weekly.`,
    figmaSample:
      "Weekly dossier refresh is non-negotiable. Triggers and messages drift fast during reorgs.",
    rubric: ["Account thesis", "Stakeholder map", "Urgency"],
  },
]

/**
 * Order starts at 12 o'clock (research = start). Neighbors of slot 0 wrap to index 9 — we place
 * short-title pillars (email, dmail) beside research so long labels are never adjacent on the ring.
 */
const WHEEL_PILLAR_IDS_ORDER = [
  "research",
  "email",
  "content",
  "li-engage",
  "referrals",
  "li-dm",
  "voicemail",
  "abm",
  "trigger",
  "dmail",
] as const

/** Horizontal stretch keeps perimeter spacing more even with wide labels (matches SVG spokes). */
const ORBIT_ELLIPSE_X = 1.1
const ORBIT_ELLIPSE_Y = 1.02

const WHEEL_PILLARS = WHEEL_PILLAR_IDS_ORDER.map((id) => PILLARS.find((p) => p.id === id)!)
const WILD_CARD_PILLAR = PILLARS.find((p) => p.id === "video")!

const ACCOUNT_THESIS_APPENDIX_SECTIONS = ["People", "Company and brand", "Strategic programs"] as const

const ACCOUNT_THESIS_APPENDIX = `People

John Doyle. President and CEO of Marsh. Sets the public AI strategy on earnings calls.

Paul Beswick. Senior VP and Global Chief Information and Operations Officer. Runs the 5,000-person tech org. Author of the "ship every week" and flexibility quotes.

Niall Maher. Marsh tech leader credited with shipping 40 AI systems in 12 months. Likely internal champion for Cursor.

Company and brand

Marsh. Formerly Marsh McLennan. Renamed in January 2026 when the company consolidated its four businesses (Marsh, Guy Carpenter, Mercer, Oliver Wyman) under one brand.

MMTech. Marsh McLennan Technology. The unified IT organization Beswick built to merge the four business units' separate tech orgs. About 5,000 engineers.

LenAI. Marsh's in-house generative AI assistant, built by the Innovation Centre in Ireland. Used weekly by about 25,000 employees across 130 countries. Won the 2025 AI Ireland award for Best Application of AI in a Large Enterprise.

Strategic programs

Thrive. Marsh's efficiency and growth program announced in 2025. Public target of roughly $400 million in efficiency savings. About $500 million in expected program charges. AI productivity is one of three pillars.

Three pillars of Thrive:

1. New revenue streams from AI-enabled client offerings.

2. Colleague productivity through AI tools.

3. Back-office efficiency through BCS.

BCS. Business and Client Services. Announced on the Q4 2025 earnings call (held January 29, 2026). Consolidates operations and technology under Beswick to accelerate AI adoption.

AWS migration. Marsh selected AWS as its preferred cloud provider as part of its broader digital transformation.

Q4 2025 earnings call. Held January 29, 2026. Source for Doyle's comments on BCS, dozens of AI tools deployed, and the need for more power users.`

const DISCO_RUBRIC_DETAILS: Record<
  "Account thesis" | "Pipeline generation" | "Stakeholder map",
  { intro: string; bullets: string[]; appendix?: string }
> = {
  "Account thesis": {
    intro:
      "Marsh has publicly bet the company on AI productivity and already proved it can ship at scale. LenAI now serves 90,000 colleagues, handles 700,000 queries per week, and saves an estimated one million hours annually. CEO John Doyle named AI productivity a strategic priority on the Q4 2025 earnings call, and CIOO Paul Beswick rang the NYSE bell for the January 2026 rebrand to Marsh.",
    bullets: [
      `1. The MMTech gap

LenAI reached 70,000 employees. The 5,000 engineers in MMTech haven't seen the same step-change.

Three transformations are converging right now. BCS consolidation. AWS migration. Brand simplification to "Marsh."

Whatever tool gets picked now becomes the standard. Wait, and Copilot sprawl locks in for years.`,
      `2. Thrive puts a number on it

Marsh publicly committed to $400 million in efficiency savings through Thrive. AI productivity is one of three pillars.

Doyle on the Q4 2025 call: dozens of AI tools deployed, needs more power users.

Engineering productivity is now a board-level number.`,
      `3. Where Cursor creates leverage

Velocity. Coinbase engineers now refactor in days, not months.

Code quality. Cursor indexes the codebase and learns Marsh's patterns. Suggestions match the standard instead of polluting it.

Onboarding. Engineers ramping on migrated AWS systems and consolidated repos move faster when the AI understands the code. Copilot can't do this.`,
      `4. Governance is already there

SOC 2 Type II. SAML SSO with Okta, Azure AD, Google Workspace. SCIM, RBAC, audit logs, GDPR, CCPA.

Privacy Mode with Zero Data Retention. Code is never stored or trained on.

Already running at 64% of the Fortune 500. Stripe and Coinbase included. Short compliance lift.`,
      `5. Why Cursor fits Beswick

Model-neutral. Claude, GPT, Gemini all in. Flexibility principle holds.

Out-of-the-box fast. Matches "ship every week."

Beswick's own words: 600+ experiments shipped, 18-month strategies are dead on arrival, ship in days.

Niall Maher already shipped 40 AI systems in 12 months. The champion is identified.

The window closes as BCS settles.`,
    ],
    appendix: ACCOUNT_THESIS_APPENDIX,
  },
  "Pipeline generation": {
    intro:
      "My Sales Play. One channel gets ignored. The combo gets answered.",
    bullets: [
      "The Problem With Single-Channel: selling to senior executives breaks when you lean on one motion. Email alone gets ignored. Cold calls alone hit voicemail. Social touches alone get scrolled past.",
      "The Combo: thread the needle with a coordinated sequence across phone, email, voicemail, LinkedIn, and video, all anchored to a real business trigger and a sharp point of view.",
      "The Phone Still Wins: the phone is still my most powerful weapon, but only when paired with research, insight, and disciplined follow-up across other channels inside a tight window.",
      "Quality Beats Quantity: fewer, better-fit accounts. Tighter messaging tied to the buyer's actual pain. More courage to pick up the phone after the email lands.",
      "The Discipline: prospecting is an executive-level discipline, not a numbers game of spray-and-pray sequences. If I want meetings with the C-suite, I need a researched hypothesis, a multi-touch combo, and the consistency to run it.",
      "The Bottom Line: cut through the noise. Win the meeting. Own the conversation.",
    ],
  },
  "Stakeholder map": {
    intro:
      "Clean enterprise account map for Marsh McLennan technology leadership.",
    bullets: [
      "Optimized for account mapping and deal motion, not HR reporting precision.",
      "Use as a live map for multi-threading and warm-intro strategy.",
    ],
  },
}

type StakeholderFunction = "executive" | "security" | "ai" | "engineering"

type Stakeholder = {
  name: string
  role: string
  team: string
  linkedin: string
  fn: StakeholderFunction
  note?: string
}

const STAKEHOLDER_FUNCTION_STYLE: Record<StakeholderFunction, string> = {
  executive: "border-sky-400/45 bg-sky-500/10 text-sky-100",
  security: "border-rose-400/45 bg-rose-500/10 text-rose-100",
  ai: "border-emerald-400/45 bg-emerald-500/10 text-emerald-100",
  engineering: "border-slate-400/35 bg-slate-500/10 text-slate-100",
}

type CorporateUnit = {
  name: string
  Icon: LucideIcon
  fn: StakeholderFunction
  lines: [string, string, string]
}

const CORPORATE_UNITS: CorporateUnit[] = [
  {
    name: "Marsh",
    Icon: Shield,
    fn: "executive",
    lines: [
      "Insurance broking and risk advisory",
      "~45,000 employees",
      "Largest BU by revenue. Customer-facing risk products (Sentrisk, Ada)",
    ],
  },
  {
    name: "Mercer",
    Icon: Heart,
    fn: "executive",
    lines: [
      "Health, wealth, retirement, investments",
      "~25,000 employees",
      "Heavy software for pension and benefits. Long-lived regulated codebases",
    ],
  },
  {
    name: "Guy Carpenter",
    Icon: Repeat,
    fn: "engineering",
    lines: [
      "Reinsurance broking",
      "~3,500 employees",
      "Actuarial models and rating engines. Smaller HC with deep technical complexity",
    ],
  },
  {
    name: "Oliver Wyman",
    Icon: Briefcase,
    fn: "ai",
    lines: [
      "Management consulting",
      "~7,000 employees",
      "Bespoke client code and greenfield projects. Beswick's former home and fastest adoption profile",
    ],
  },
]

const STAKEHOLDER_MAP_WHO_I_TARGET = {
  title: "Who I Target and Why",
  paragraphs: [
    "I run a parallel motion, not a top-down or bottom-up motion in isolation. Top-down alone stalls in procurement. Bottom-up alone caps at a 50-seat Pro purchase. The motion that actually closes enterprise Cursor deals is a champion in engineering paired with executive air cover.",
    "My primary targets are the Platform and Tech Lead tiers. They feel velocity pain personally, they own a budget line for tooling, and they reply to outreach. Executives are a parallel track for air cover, not the entry point.",
  ],
} as const

const ORG_TOP: Stakeholder = {
  name: "Rob Hussey",
  role: "Global CIO, Marsh",
  team: "Executive Tier",
  linkedin: "https://www.linkedin.com/in/rob-j-hussey/",
  fn: "executive",
  note: "Leads Marsh Tech and can carry the board-level AI productivity story.",
}

const ORG_CORPORATE: Stakeholder[] = [
  {
    name: "Charlie Masters",
    role: "CTO, Mercer",
    team: "Executive Tier",
    linkedin: "https://www.linkedin.com/in/charlie-masters-a21112197/",
    fn: "executive",
    note: "Separate motion from Marsh and a potential easier first win.",
  },
  {
    name: "John Connors",
    role: "CIO, Guy Carpenter",
    team: "Executive Tier",
    linkedin: "https://www.linkedin.com/in/john-connors-548781111/",
    fn: "executive",
    note: "Sister-company entry point for parallel pilot momentum.",
  },
  {
    name: "Mercer CISO",
    role: "Open role",
    team: "Executive Tier / Security",
    linkedin: "Open role",
    fn: "security",
    note: "Track for new hire. Fresh CISOs often reset tooling and security partnerships.",
  },
]

const ORG_COACH_SOURCE: Stakeholder = {
  name: "Tushar Patel",
  role: "Former MMC Cloud & AI exec",
  team: "Coach / Intro Source",
  linkedin: "https://www.linkedin.com/in/tkakp/",
  fn: "engineering",
  note: "Warm mutuals Jonathan and Lakshman. Use for intel and intros.",
}

const ORG_TECH_CHAMPIONS: Stakeholder[] = [
  {
    name: "Niall Maher",
    role: "AI / Innovation Engineering Leader",
    team: "Innovation Centre Dublin",
    linkedin: "https://www.linkedin.com/in/nialljoemaher/",
    fn: "ai",
    note:
      "AI/Innovation Engineering Leader who scaled his team from 4 to 100+ engineers and shipped 40 production AI systems in 12 months, proving he runs the velocity playbook Cursor amplifies. He posts publicly about Claude Code and runs Codú (Ireland's largest engineering community), making him the most credible bottom-up champion candidate inside MMTech.",
  },
  {
    name: "Brian Geoghegan",
    role: "Staff Software Engineer, Innovation Center (Ireland)",
    team: "Innovation Centre Dublin",
    linkedin: "https://www.linkedin.com/in/brian-geoghegan-12935383/",
    fn: "ai",
    note:
      "Software engineer at the Marsh Innovation Centre and CIO Award winner for LenAI, who posts publicly about how senior engineers should triage code review with AI tools. He's the kind of opinionated, tooling-fluent engineer who becomes a shadow Cursor user first and a vocal internal advocate second.",
  },
]

const ORG_ADDITIONAL_ENG: Stakeholder[] = [
  {
    name: "Shravya Vorugallu",
    role: "Platform Engineer, Security & Infra (Santa Clara)",
    team: "Engineering Tier (Ranked)",
    linkedin: "https://www.linkedin.com/in/shravyavorugallu/",
    fn: "engineering",
    note: "Warm intro via Mike Grandel.",
  },
  {
    name: "Sandip Sankpal",
    role: "Senior Platform Engineer (London)",
    team: "Engineering Tier (Ranked)",
    linkedin: "https://www.linkedin.com/in/sandipsankpal/",
    fn: "engineering",
    note: "Warm intro via Lakshman Srinivasa.",
  },
  {
    name: "Doug Aird",
    role: "Senior Engineering Manager (Dublin)",
    team: "Engineering Tier (Ranked)",
    linkedin: "https://www.linkedin.com/in/airdd/",
    fn: "engineering",
  },
  {
    name: "Steve Mycock",
    role: "Global Head Platform Team (UK)",
    team: "Engineering Tier (Ranked)",
    linkedin: "https://www.linkedin.com/in/steve-mycock-11937498/",
    fn: "engineering",
  },
  {
    name: "Michael Cai",
    role: "Tech Lead AI/ML (Toronto)",
    team: "Engineering Tier (Ranked)",
    linkedin: "https://www.linkedin.com/in/caimichael/",
    fn: "ai",
  },
  {
    name: "Vinaykumar Tawale",
    role: "Platform Engineer (Oregon)",
    team: "Engineering Tier (Ranked)",
    linkedin: "https://www.linkedin.com/in/tawalevinaykumar/",
    fn: "engineering",
  },
  {
    name: "Nehal Bathani",
    role: "Tech Lead, Apps Dev (New Jersey)",
    team: "Engineering Tier (Ranked)",
    linkedin: "https://www.linkedin.com/in/nehal-bathani-34002075/",
    fn: "engineering",
  },
  {
    name: "Aman Pathak",
    role: "Senior Platform Engineer (Toronto)",
    team: "Engineering Tier (Ranked)",
    linkedin: "https://www.linkedin.com/in/aman-pathak-716882ba/",
    fn: "engineering",
  },
  {
    name: "Vrushabh Deokar",
    role: "Senior Principal Engineer, Data/ML (Mumbai)",
    team: "Engineering Tier (Ranked)",
    linkedin: "https://www.linkedin.com/in/vrushabhb4a115178/",
    fn: "engineering",
  },
]

const HUB = {
  principle:
    "The phone is the highest-conversion channel and the only one that creates real-time human connection. Every other touch in the combo exists to make the phone call land. Field teams often plan seven to twelve touches across multiple channels before the right person picks up. The phone is not just one channel among many. It is the conversion engine.",
  methodologyTactics:
    "Place the call after digital warmth and proof. Vary time of day. Prepare a respectful exit line. Treat each attempt as a scheduled conversion event, not a random dial.",
  figmaTactics: `Direct phone outreach to named stakeholders. Priority order:
Niall Maher (AI/Innovation Engineering Leader, Dublin) - Tier 1, highest leverage
Brian Geoghegan and the LenAI engineering team in Dublin - Tier 2 multi-thread
Rob Hussey (Mercer CIO) - Tier 1 economic conversation
David Fike (CTO, runs Dublin Innovation Centre) - Tier 1 architecture conversation
Jeff Lund (Global CISO, Phoenix) - Tier 2 security pre-work
Paul Beswick (CIOO, Boston) - Tier 1 but reached only after warmth has been built lower in the org`,
  figmaSample: `Hi Niall, this is [name] from Cursor. We haven't spoken before. I've been following your work on the 40 production AI systems you've shipped at Marsh and I'm calling because something specific caught my eye. Two minutes, then you tell me whether to keep going or not. Fair?`,
  rubric: ["Pipeline generation", "Stakeholder map"],
}

const CADENCE_DAYS: { day: string; label: string; isPhone: boolean }[] = [
  { day: "Day 1", label: "LinkedIn engagement (comment on his recent post)", isPhone: false },
  { day: "Day 3", label: "Personalized video with content share", isPhone: false },
  { day: "Day 5", label: "Email referencing the video and the trigger event", isPhone: false },
  { day: "Day 7", label: "Phone call (first attempt)", isPhone: true },
  { day: "Day 7", label: "Voicemail (if no answer)", isPhone: false },
  { day: "Day 8", label: "LinkedIn DM referencing the voicemail", isPhone: false },
  { day: "Day 10", label: "Insight share (no ask, just value)", isPhone: false },
  { day: "Day 12", label: "Phone call (second attempt, different time of day)", isPhone: true },
  { day: "Day 14", label: "Direct mail item arrives at his Dublin office", isPhone: false },
  { day: "Day 16", label: "Email referencing the direct mail", isPhone: false },
  { day: "Day 18", label: "Phone call (third attempt)", isPhone: true },
  { day: "Day 21", label: 'Final touch — referral path or "now is not a good time"', isPhone: false },
]

function rubricColor(tag: string): string {
  if (tag.toLowerCase().includes("thesis")) return "bg-amber-500/15 text-amber-200 border-amber-500/30"
  if (tag.toLowerCase().includes("stakeholder")) return "bg-sky-500/15 text-sky-200 border-sky-500/30"
  if (tag.toLowerCase().includes("pipeline")) return "bg-emerald-500/15 text-emerald-200 border-emerald-500/30"
  if (tag.toLowerCase().includes("urgency")) return "bg-orange-500/15 text-orange-200 border-orange-500/30"
  return "bg-white/10 text-slate-200 border-white/15"
}

const APPENDIX_SECTION_TITLE_SET = new Set<string>(ACCOUNT_THESIS_APPENDIX_SECTIONS)

function AccountThesisSupportingBlock({ text }: { text: string }) {
  const parts = text
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean)
  return (
    <div className="space-y-3 rounded-lg border border-white/10 bg-slate-950/40 p-4">
      {parts.map((para, j) => {
        const isNumberedHeading = j === 0 && /^\d+\.\s/.test(para)
        return (
          <p
            key={`${j}-${para.slice(0, 24)}`}
            className={`text-sm leading-relaxed ${
              isNumberedHeading ? "text-base font-semibold text-slate-100" : "text-slate-300"
            }`}
          >
            {para}
          </p>
        )
      })}
    </div>
  )
}

function PillarAppendixContent({ text }: { text: string }) {
  const chunks = text
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean)
  const boolIdx = chunks.findIndex((c) => c.startsWith("NOT ("))
  const preamble = boolIdx >= 0 ? chunks.slice(0, boolIdx) : chunks
  const boolStr = boolIdx >= 0 ? chunks[boolIdx] : null
  return (
    <div className="space-y-3">
      {preamble.map((para, i) => (
        <p
          key={i}
          className={`text-sm leading-relaxed ${
            i === 0 ? "font-semibold text-slate-200" : "text-slate-400"
          }`}
        >
          {para}
        </p>
      ))}
      {boolStr && (
        <pre className="overflow-x-auto rounded-lg border border-white/10 bg-slate-950/90 p-3 font-mono text-[11px] leading-relaxed text-sky-100/95">
          {boolStr}
        </pre>
      )}
    </div>
  )
}

function AccountThesisAppendixBody({ text }: { text: string }) {
  const blocks = text
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean)
  return (
    <div className="max-w-prose space-y-3 text-sm leading-relaxed">
      {blocks.map((block, i) => {
        if (APPENDIX_SECTION_TITLE_SET.has(block)) {
          return (
            <h5
              key={i}
              className="border-b border-white/10 pb-1.5 pt-4 text-xs font-bold uppercase tracking-wider text-slate-300 first:pt-0"
            >
              {block}
            </h5>
          )
        }
        if (block === "Three pillars of Thrive:") {
          return (
            <p key={i} className="font-medium text-slate-300">
              {block}
            </p>
          )
        }
        if (/^\d+\.\s/.test(block)) {
          return (
            <p key={i} className="border-l-2 border-amber-500/40 pl-3 text-slate-400">
              {block}
            </p>
          )
        }
        return (
          <p key={i} className="text-slate-400">
            {block}
          </p>
        )
      })}
    </div>
  )
}

function StructuredSample({ text }: { text: string }) {
  const lines = text.split("\n")
  return (
    <div className="space-y-2 text-sm leading-relaxed text-slate-200">
      {lines.map((raw, i) => {
        const line = raw.trim()
        if (!line) return <div key={i} className="h-1" />
        if (line === "Warm Intro Paths" || line === "Bottom Line") {
          return (
            <p key={i} className="pt-1 text-xs font-bold uppercase tracking-wider text-amber-300/95">
              {line}
            </p>
          )
        }
        if (line.startsWith("- ")) {
          const content = line.slice(2)
          const colon = content.indexOf(":")
          if (colon > 0) {
            const lead = content.slice(0, colon + 1)
            const rest = content.slice(colon + 1).trim()
            return (
              <p key={i} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/80" />
                <span>
                  <span className="font-semibold text-white">{lead}</span> {rest}
                </span>
              </p>
            )
          }
        }
        return <p key={i}>{line}</p>
      })}
    </div>
  )
}

function StakeholderCard({ person }: { person: Stakeholder }) {
  return (
    <div className={`rounded-lg border p-3 text-xs leading-relaxed ${STAKEHOLDER_FUNCTION_STYLE[person.fn]}`}>
      <p className="font-semibold text-white">{person.name}</p>
      <p className="mt-0.5">{person.role}</p>
      <p className="mt-1 text-[11px] opacity-90">Team: {person.team}</p>
      <p className="mt-1 truncate text-[11px] opacity-80">{person.linkedin}</p>
    </div>
  )
}

function ExecutiveStakeholderCard({ person }: { person: Stakeholder }) {
  const isUrl = person.linkedin.startsWith("http")
  return (
    <div className={`rounded-lg border p-3 text-xs leading-relaxed ${STAKEHOLDER_FUNCTION_STYLE[person.fn]}`}>
      <p className="font-semibold text-white">{person.name}</p>
      <p className="mt-0.5">{person.role}</p>
      <p className="mt-1 text-[11px] opacity-90">Team: {person.team}</p>
      <details className="mt-2 rounded border border-white/15 bg-slate-950/30 p-2">
        <summary className="cursor-pointer text-[11px] font-semibold uppercase tracking-wide text-slate-200">
          Why now
        </summary>
        {person.note && <p className="mt-2 text-[11px] leading-relaxed text-slate-200">{person.note}</p>}
        <p className="mt-2 text-[11px] text-slate-300">
          {isUrl ? (
            <a href={person.linkedin} target="_blank" rel="noreferrer" className="underline underline-offset-2">
              {person.linkedin}
            </a>
          ) : (
            person.linkedin
          )}
        </p>
      </details>
    </div>
  )
}

export default function ComboProspectingApp() {
  const [view, setView] = useState<ViewMode>("pipeline")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hubOpen, setHubOpen] = useState(false)
  const [rubricPanel, setRubricPanel] = useState<
    "Account thesis" | "Pipeline generation" | "Stakeholder map" | null
  >(null)
  const [spokeRadiusPx, setSpokeRadiusPx] = useState(248)

  useLayoutEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setSpokeRadiusPx(188)
      else if (w < 768) setSpokeRadiusPx(212)
      else if (w < 1024) setSpokeRadiusPx(254)
      else if (w < 1280) setSpokeRadiusPx(278)
      else setSpokeRadiusPx(298)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const openPillar = useCallback((id: string) => {
    setHubOpen(false)
    setRubricPanel(null)
    setSelectedId(id)
  }, [])

  const openHub = useCallback(() => {
    setSelectedId(null)
    setRubricPanel(null)
    setHubOpen(true)
  }, [])

  const openRubricPanel = useCallback(
    (key: "Account thesis" | "Pipeline generation" | "Stakeholder map") => {
    setHubOpen(false)
    setSelectedId(null)
    setRubricPanel(key)
    },
    []
  )

  const closePanel = useCallback(() => {
    setSelectedId(null)
    setHubOpen(false)
    setRubricPanel(null)
  }, [])

  const switchView = useCallback((next: ViewMode) => {
    setView(next)
    if (next === "roleplay") {
      setSelectedId(null)
      setHubOpen(false)
      setRubricPanel(null)
    }
  }, [])

  const activePillar = selectedId ? PILLARS.find((p) => p.id === selectedId) : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#0c1222] to-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-end md:justify-between md:py-10">
          <div className="min-w-0 max-w-2xl space-y-3 md:max-w-none md:min-w-0 md:flex-1 md:pr-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/90">
              Combo Prospecting
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Marsh McLennan greenfield motion
            </h1>
            <div className="w-full min-w-0 overflow-x-auto [scrollbar-width:thin]">
              <p className="text-lg font-medium leading-snug text-slate-200 md:text-xl whitespace-nowrap">
                The Combo Is The Unlock. Break through the noise. Earn the meeting.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 md:items-end md:pb-0.5">
            <div className="flex w-full flex-col items-center gap-2 md:w-auto">
              <span
                id="view-toggle-label"
                className="text-center text-xs font-medium uppercase tracking-wider text-slate-500"
              >
                View
              </span>
              <div
                role="group"
                aria-labelledby="view-toggle-label"
                className="inline-flex items-center rounded-full border border-white/10 bg-slate-900/80 p-1 shadow-inner"
              >
              <button
                type="button"
                onClick={() => switchView("pipeline")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  view === "pipeline"
                    ? "bg-amber-500 text-slate-950 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Pipeline
              </button>
              <button
                type="button"
                onClick={() => switchView("roleplay")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  view === "roleplay"
                    ? "bg-amber-500 text-slate-950 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Role Play
              </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10">
        {view === "pipeline" && (
        <div className="relative mx-auto mb-10 max-w-6xl">
          <aside className="mb-5 max-w-[11rem] text-left sm:absolute sm:left-0 sm:top-0 sm:z-10 sm:mb-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Rubric reference</p>
            <ul className="mt-2 space-y-1.5 text-[11px] leading-tight text-slate-300 md:text-xs">
              <li>
                <span
                  className={`inline-block rounded border px-1.5 py-0.5 ${rubricColor("Account thesis")}`}
                >
                  Account thesis
                </span>
              </li>
              <li>
                <span
                  className={`inline-block rounded border px-1.5 py-0.5 ${rubricColor("Stakeholder map")}`}
                >
                  Stakeholder map
                </span>
              </li>
              <li>
                <span
                  className={`inline-block rounded border px-1.5 py-0.5 ${rubricColor("Urgency")}`}
                >
                  Urgency
                </span>
              </li>
            </ul>
          </aside>
          <div className="text-center sm:min-h-[4.5rem] sm:pl-[12rem] md:pl-[13rem] sm:pt-0">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Who do I want to talk to?
            </h2>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
              What do I want to talk about?
            </h2>
          </div>
          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="min-w-0 flex-1 lg:pt-1">
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:mx-auto lg:max-w-3xl xl:max-w-none">
                <button
                  type="button"
                  onClick={() => openRubricPanel("Account thesis")}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:opacity-95 md:px-6 md:py-3 md:text-base ${rubricColor("Account thesis")}`}
                >
                  Account thesis
                </button>
                <button
                  type="button"
                  onClick={() => openRubricPanel("Pipeline generation")}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:opacity-95 md:px-6 md:py-3 md:text-base ${rubricColor("Pipeline generation")}`}
                >
                  Pipeline generation
                </button>
                <button
                  type="button"
                  onClick={() => openRubricPanel("Stakeholder map")}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:opacity-95 md:px-6 md:py-3 md:text-base ${rubricColor("Stakeholder map")}`}
                >
                  Stakeholder map
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openPillar(WILD_CARD_PILLAR.id)}
              className="group mx-auto flex w-full max-w-[14rem] shrink-0 flex-col items-center gap-2 rounded-2xl border border-violet-400/40 bg-gradient-to-br from-violet-950/90 to-slate-900/95 px-5 py-4 text-center shadow-lg backdrop-blur transition hover:border-violet-300/60 hover:shadow-violet-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 lg:mx-0 lg:mt-0 lg:w-[11rem] lg:self-start xl:w-[12rem] xl:py-5"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300/95">
                Wild Card
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/20 text-violet-200 transition group-hover:bg-violet-500/30 group-hover:text-white">
                <Video className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="text-xs font-semibold leading-snug text-slate-100 md:text-sm">
                {WILD_CARD_PILLAR.title}
              </span>
            </button>
          </div>
        </div>
        )}

        {view === "roleplay" ? (
          <div className="mx-auto flex min-h-[min(70vh,720px)] w-full max-w-4xl flex-col px-1 pb-6 pt-2 md:px-4">
            <RolePlayImpactQuotes />
          </div>
        ) : (
          <>
        <div className="relative mx-auto aspect-square w-full max-w-[min(100%,720px)] md:aspect-auto md:h-[min(78vh,680px)]">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            {WHEEL_PILLARS.map((_, i) => {
              const n = WHEEL_PILLARS.length
              const a = (i / n) * Math.PI * 2 - Math.PI / 2
              const rx = 38 * ORBIT_ELLIPSE_X
              const ry = 38 * ORBIT_ELLIPSE_Y
              const cx = 50 + Math.cos(a) * rx
              const cy = 50 + Math.sin(a) * ry
              return (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={cx}
                  y2={cy}
                  stroke="url(#lineGrad)"
                  strokeWidth="0.22"
                  strokeOpacity="0.55"
                />
              )
            })}
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.25" />
              </linearGradient>
            </defs>
          </svg>

          <button
            type="button"
            onClick={openHub}
            className="absolute left-1/2 top-1/2 z-10 flex h-[clamp(6.75rem,17vw,9.75rem)] w-[clamp(6.75rem,17vw,9.75rem)] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-amber-400/80 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-[0_0_52px_-10px_rgba(251,191,36,0.55)] transition hover:scale-[1.02] hover:shadow-[0_0_72px_-8px_rgba(251,191,36,0.78)] focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/50 animate-pulse-soft"
            aria-label="Open phone hub and cadence"
          >
            <Phone className="mb-1 h-8 w-8 md:h-10 md:w-10" strokeWidth={2.25} />
            <span className="px-2 text-center text-xs font-bold uppercase tracking-wide md:text-sm">
              The call
            </span>
            <span className="mt-1 hidden text-[10px] font-medium text-slate-900/80 sm:block">
              Hub · cadence
            </span>
          </button>

          {WHEEL_PILLARS.map((pillar, i) => {
            const n = WHEEL_PILLARS.length
            const angle = (i / n) * Math.PI * 2 - Math.PI / 2
            const rPx = spokeRadiusPx
            const x = Math.cos(angle) * rPx * ORBIT_ELLIPSE_X
            const y = Math.sin(angle) * rPx * ORBIT_ELLIPSE_Y
            const Icon = pillar.Icon
            const isStart = pillar.id === "research"
            return (
              <div
                key={pillar.id}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative flex flex-col items-center">
                  {isStart && (
                    <span className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-500/25 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-200 ring-1 ring-emerald-400/40 md:px-3 md:text-[10px]">
                      Start here
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => openPillar(pillar.id)}
                    className="group flex w-[7.25rem] shrink-0 flex-col items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/90 px-3 py-3 shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-slate-800/95 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 md:w-[8.125rem] md:gap-2 md:px-3.5 md:py-3.5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800/90 text-amber-400 transition group-hover:bg-amber-500/20 group-hover:text-amber-300 md:h-12 md:w-12">
                      <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.75} />
                    </span>
                    <span className="flex min-h-[3rem] w-full items-center justify-center px-0.5 text-center text-[10px] font-semibold leading-tight text-slate-100 text-balance md:min-h-[3.25rem] md:text-[11px] md:leading-snug">
                      {pillar.title}
                    </span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-14 rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur md:p-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-xl font-semibold text-white">Sample cadence · Niall Maher</h2>
          </div>
          <ol className="grid gap-3 md:grid-cols-2">
            {CADENCE_DAYS.map((step, idx) => (
              <li
                key={`${step.day}-${idx}`}
                className={`flex gap-3 rounded-xl border px-4 py-3 text-sm ${
                  step.isPhone
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-50"
                    : "border-white/10 bg-slate-950/50 text-slate-300"
                }`}
              >
                <span
                  className={`shrink-0 font-mono text-xs font-bold ${
                    step.isPhone ? "text-amber-300" : "text-slate-500"
                  }`}
                >
                  {step.day}
                </span>
                <span className="leading-snug">{step.label}</span>
              </li>
            ))}
          </ol>
        </div>
          </>
        )}
      </section>

      {(hubOpen || activePillar || rubricPanel) && view === "pipeline" && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm"
          role="presentation"
          onClick={closePanel}
        >
          <aside
            className="h-full w-full max-w-lg overflow-y-auto border-l border-white/10 bg-[#0a0f1a] shadow-2xl"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0a0f1a]/95 px-5 py-4 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">
                {hubOpen
                  ? "Phone · cadence model"
                  : rubricPanel
                    ? rubricPanel
                    : activePillar?.title}
              </h3>
              <button
                type="button"
                onClick={closePanel}
                className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div
              className={
                rubricPanel === "Stakeholder map"
                  ? "space-y-4 px-5 pb-6 pt-3"
                  : "space-y-6 px-5 py-6"
              }
            >
              {rubricPanel && DISCO_RUBRIC_DETAILS[rubricPanel] && (
                <>
                  {rubricPanel === "Stakeholder map" ? (
                    <div className="space-y-4">
                      <div className="rounded-xl border border-sky-500/35 bg-gradient-to-br from-sky-950/55 to-slate-950/50 p-4 shadow-[0_0_0_1px_rgba(14,165,233,0.12)]">
                        <h5 className="mb-3 text-sm font-semibold tracking-tight text-sky-100">
                          {STAKEHOLDER_MAP_WHO_I_TARGET.title}
                        </h5>
                        <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                          {STAKEHOLDER_MAP_WHO_I_TARGET.paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-xl border border-amber-400/35 bg-slate-950/45 p-3">
                        <h5 className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-300/95">
                          Marsh McLennan corporate org overview
                        </h5>
                        <div className="relative">
                          <div className="mx-auto w-full max-w-md rounded-lg border border-amber-400/45 bg-amber-500/10 p-3 text-center">
                            <div className="flex items-center justify-center gap-2 text-amber-200">
                              <Building2 className="h-4 w-4" />
                              <p className="text-sm font-semibold text-white">
                                Marsh McLennan (parent holding company, rebranding to "Marsh" January 2026)
                              </p>
                            </div>
                            <p className="mt-1 text-xs text-slate-200">NYSE: MMC, transitioning to MRSH</p>
                            <p className="text-xs text-slate-200">~90,000 employees globally</p>
                            <p className="text-xs text-slate-200">~$24B annual revenue</p>
                            <p className="text-xs text-slate-200">~5,000 technologists in MMTech</p>
                          </div>
                          <div className="mx-auto h-4 w-px bg-amber-400/50" />
                          <div className="mx-auto h-px w-[88%] bg-amber-400/50" />
                          <div className="mx-auto -mt-px grid w-full grid-cols-4 gap-2 pt-3">
                            {CORPORATE_UNITS.map((unit) => (
                              <div key={unit.name} className="relative">
                                <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-amber-400/50" />
                                <div
                                  className={`h-full rounded-lg border p-2 text-xs transition hover:-translate-y-0.5 ${STAKEHOLDER_FUNCTION_STYLE[unit.fn]}`}
                                >
                                  <div className="mb-1 flex items-center gap-1.5">
                                    <unit.Icon className="h-3.5 w-3.5" />
                                    <p className="font-semibold text-white">{unit.name}</p>
                                  </div>
                                  <p>{unit.lines[0]}</p>
                                  <p className="mt-0.5">{unit.lines[1]}</p>
                                  <p className="mt-0.5 opacity-90">{unit.lines[2]}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-[11px] leading-relaxed text-slate-300">
                          All four BUs unify under the "Marsh" brand January 2026. BCS (Business and Client
                          Services) is the new shared services unit consolidating tech, data, AI, and operations
                          under CIOO Paul Beswick across all four.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 text-[11px]">
                        <span className="rounded-full border border-sky-400/45 bg-sky-500/10 px-2 py-1 text-sky-100">
                          Blue = Executive Leadership
                        </span>
                        <span className="rounded-full border border-rose-400/45 bg-rose-500/10 px-2 py-1 text-rose-100">
                          Red = Security
                        </span>
                        <span className="rounded-full border border-emerald-400/45 bg-emerald-500/10 px-2 py-1 text-emerald-100">
                          Green = AI / Innovation
                        </span>
                        <span className="rounded-full border border-slate-400/35 bg-slate-500/10 px-2 py-1 text-slate-200">
                          Gray = Engineering / Operations
                        </span>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                        <h5 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-300">
                          Executive leadership / economic buyers
                        </h5>
                        <div className="flex justify-center">
                          <div className="w-full max-w-xs">
                            <ExecutiveStakeholderCard person={ORG_TOP} />
                          </div>
                        </div>
                        <div className="mx-auto mt-3 h-4 w-px bg-white/20" />
                        <div className="mx-auto h-px w-4/5 bg-white/20" />
                        <div className="mt-3 grid gap-2 sm:grid-cols-3">
                          {ORG_CORPORATE.map((p) => (
                            <ExecutiveStakeholderCard key={p.name} person={p} />
                          ))}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                        <h5 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-300">
                          Coach / intro source
                        </h5>
                        <div className="grid gap-2">
                          <ExecutiveStakeholderCard person={ORG_COACH_SOURCE} />
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                        <h5 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-300">
                          Technical champions / AI leaders
                        </h5>
                        <p className="mb-3 text-xs text-slate-500">
                          Technical champions and LenAI engineers aligned beneath Innovation Centre leadership.
                        </p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {ORG_TECH_CHAMPIONS.map((p) => (
                            <ExecutiveStakeholderCard key={p.name} person={p} />
                          ))}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                        <h5 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-300">
                          Engineering tier (ranked)
                        </h5>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {ORG_ADDITIONAL_ENG.map((p) => (
                            <StakeholderCard key={p.name} person={p} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-400/90">
                      {rubricPanel === "Account thesis"
                        ? "Core thesis"
                        : rubricPanel === "Pipeline generation"
                          ? "Core play"
                          : "Rubric detail"}
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-300">
                      {DISCO_RUBRIC_DETAILS[rubricPanel].intro}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-sky-400/90">
                      {rubricPanel === "Account thesis"
                        ? "Supporting points"
                        : rubricPanel === "Pipeline generation"
                          ? "Operating moves"
                          : "How to use it"}
                    </h4>
                    {rubricPanel === "Account thesis" ? (
                      <div className="space-y-5">
                        {DISCO_RUBRIC_DETAILS["Account thesis"].bullets.map((block, i) => (
                          <AccountThesisSupportingBlock key={i} text={block} />
                        ))}
                      </div>
                    ) : (
                      <ul className="list-none space-y-3 text-sm leading-relaxed text-slate-300">
                        {DISCO_RUBRIC_DETAILS[rubricPanel].bullets.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/80" />
                            <span
                              className={
                                rubricPanel === "Pipeline generation" && b.startsWith("The Discipline:")
                                  ? "font-semibold text-slate-100"
                                  : undefined
                              }
                            >
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {rubricPanel === "Account thesis" && DISCO_RUBRIC_DETAILS["Account thesis"].appendix && (
                    <div className="mt-8 border-t border-white/15 pt-6">
                      <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-amber-400/90">
                        Appendix
                      </h4>
                      <AccountThesisAppendixBody text={DISCO_RUBRIC_DETAILS["Account thesis"].appendix} />
                    </div>
                  )}
                    </>
                  )}
                </>
              )}

              {hubOpen && (
                <>
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-400/90">
                      Core principle
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-300">{HUB.principle}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-sky-400/90">
                      How you run it
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-300">{HUB.methodologyTactics}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Cadence model
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-300">
                      Phone attempts sit on a bed of multi-channel touches across two to three weeks. Each
                      non-phone touch earns attention, proves homework, or transfers credibility. Calls are
                      spaced with different times of day and paired with voicemail and email so the thread
                      stays coherent.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Rubric served
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {HUB.rubric.map((t) => (
                        <span
                          key={t}
                          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${rubricColor(t)}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activePillar && (
                <>
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-400/90">
                      Core principle
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-300">{activePillar.principle}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-sky-400/90">
                      Framework application
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-300">
                      {activePillar.methodologyTactics}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-400/90">
                      {activePillar.id === "dmail" ? "Worked example" : "Sample pattern"}
                    </h4>
                    {activePillar.methodologyImageUrl && (
                      <img
                        src={activePillar.methodologyImageUrl}
                        alt="Supporting content preview"
                        className="mb-3 w-full max-w-md rounded-lg border border-white/10"
                        loading="lazy"
                      />
                    )}
                    {activePillar.methodologyLink && (
                      <a
                        href={activePillar.methodologyLink}
                        target="_blank"
                        rel="noreferrer"
                        className="mb-3 inline-block text-sm font-medium text-sky-300 underline underline-offset-4 hover:text-sky-200"
                      >
                        {activePillar.methodologyLink}
                      </a>
                    )}
                    <blockquote
                      className={`rounded-lg border border-white/10 bg-slate-900/80 p-4 text-sm leading-relaxed text-slate-200 ${
                        activePillar.id === "dmail" ? "" : "whitespace-pre-wrap"
                      }`}
                    >
                      {activePillar.id === "dmail" ? (
                        <DirectMailWorkedExampleBody />
                      ) : activePillar.id === "referrals" ? (
                        <StructuredSample text={activePillar.methodologySample} />
                      ) : (
                        activePillar.methodologySample
                      )}
                    </blockquote>
                  </div>
                  {activePillar.id === "dmail" && <DirectMailVitoSection />}
                  {activePillar.methodologyAppendix && (
                    <div className="mt-6 border-t border-white/15 pt-5">
                      <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-amber-400/90">
                        Appendix
                      </h4>
                      <PillarAppendixContent text={activePillar.methodologyAppendix} />
                    </div>
                  )}
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Rubric served
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activePillar.rubric.map((t) => (
                        <span
                          key={t}
                          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${rubricColor(t)}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      )}

      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-600">
        Marsh McLennan (MMC) · Combo Prospecting visualization · interview artifact
      </footer>
    </div>
  )
}
