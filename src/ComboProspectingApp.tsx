import { useCallback, useLayoutEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  FileText,
  Mailbox,
  Linkedin,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Share2,
  Users,
  Video,
  Voicemail,
  X,
  Zap,
} from "lucide-react"

type ViewMode = "pipeline" | "figma"

type PillarDef = {
  id: string
  title: string
  Icon: LucideIcon
  principle: string
  methodologyTactics: string
  methodologySample: string
  figmaTactics: string
  figmaSample: string
  rubric: string[]
}

const PILLARS: PillarDef[] = [
  {
    id: "trigger",
    title: "Trigger Events",
    Icon: Zap,
    principle:
      "Reach out when there is a compelling reason to reach out. Trigger events justify the interruption. Without a trigger, you are noise. With one, you are timely.",
    methodologyTactics:
      "Build a short list of account-level triggers: leadership changes, M&A, reorgs, earnings themes, major tech migrations, and public AI or efficiency commitments. Tie every first touch to one trigger so the prospect feels timing, not spray-and-pray.",
    methodologySample:
      "Saw your Q3 call emphasis on platform consolidation. That is usually the window where engineering standardization either accelerates or fragments. Worth comparing notes with two peer patterns from similar rollouts.",
    figmaTactics: `January 2026 brand consolidation (Marsh, Guy Carpenter, Mercer, Oliver Wyman → single "Marsh" brand)
New BCS (Business and Client Services) unit launched October 2025
AWS migration in flight, retiring all data centers
CEO John Doyle's public commitment to making MMC an "AI winner"
40 AI production systems shipped in 12 months under Niall Maher
LenAI deployed to all 90,000 employees (700K queries per week), but no equivalent dev productivity tool for the 5,000 engineers in MMTech
New Mercer CISO role posted (likely just filled)`,
    figmaSample:
      "Saw the BCS announcement. Standardizing the engineering platform during a brand reset is a once-in-a-decade window. Here is what we are seeing at peer F500s in the same moment.",
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
    methodologySample:
      "Subject: pattern from two peers post-reorg\n\nHi [Name], three bullets in thirty seconds.\n\n1) We see the same consolidation story you described on the last earnings call.\n2) The engineering teams that win standardize AI coding inside ninety days.\n3) I can walk a single slide on how peers did it without slowing delivery.\n\nWorth a short call Tuesday or Thursday?",
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
      "Be present in your prospect's feed before you are in their inbox. Comment substantively on their posts. Share insights they would value. Build social proof and familiarity before reaching out.",
    methodologyTactics:
      "Spend two to three weeks adding value in public before any direct ask. Comments should read like a practitioner, not a fan. Repost with a sharp one-line takeaway when it helps your credibility.",
    methodologySample: `Comment: "The part about test harness quality for agents is the bottleneck we see everywhere. Curious if you solved review throughput with a central guild or federated standards."`,
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
    methodologySample:
      "Hi [Name], your write-up on rolling guardrails to five hundred engineers mirrored a pattern we watched at [Peer]. If you are open, I would trade fifteen minutes on what broke at week six versus what held. No deck.",
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
      "Most voicemails get deleted because they sound like sales calls. Leave a voicemail that delivers a specific insight, names a peer customer, and tells the prospect you will follow up by email so they have a reason to look for it. Voicemail is not a callback request. It is a value drop.",
    methodologyTactics:
      "Keep it under sixty seconds. No pitch stack. Promise one artifact by email with an exact subject line so the thread is searchable.",
    methodologySample:
      'Hi [Name], [you] from [company]. Not expecting a callback. I am sending a one-page teardown on how [Peer] cut review latency after their agent rollout. Subject line will be "Review latency after agents." That is all. Thanks for the work you publish on this topic.',
    figmaTactics: "Direct phone outreach sequence support. Pair voicemail with email same day.",
    figmaSample: `Hi Niall, [name] from Cursor. Not expecting a callback. I'm following up to share something specific. We just published a customer story on how Coinbase scaled AI coding adoption from 150 to 500 engineers in six weeks, exactly the curve you're on at Marsh. I'm sending it via email right after this. Look for the subject line "Coinbase 150 to 500 in six weeks." That's all. Have a good one.`,
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
    methodologySample:
      "Sharing a benchmark note on AI coding throughput in regulated services. No ask. If anything is off base, tell me and I will stop at one reply.",
    figmaTactics: `Send relevant Cursor customer studies (Coinbase, NVIDIA, Stripe, Notion)
Share industry research on AI coding ROI in financial services
Curated reading on agent harness quality, semantic search, and large codebase performance
Cursor's enterprise security architecture deep-dive for the Lund / Akhawe-equivalent personas

Cadence: One insight share every 7-10 days during the warm-up period. Never paired with a direct ask.`,
    figmaSample:
      "Pair the Coinbase adoption curve story with Niall's public velocity narrative. Keep the email ask-free.",
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
    methodologySample:
      "If you are willing, a two-sentence forward that frames me as someone who studies AI coding governance in professional services would help. I will keep the ask to a single working session.",
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
      "Physical objects in a digital world cut through. For top-tier accounts, a thoughtful physical touchpoint (book, hand-written note, branded item with a specific reference) creates a memorable moment that no email achieves.",
    methodologyTactics:
      "Reserve for economic buyers and technical champions after digital warmth. The note must reference something they said publicly so it feels researched, not swag-driven.",
    methodologySample:
      "Send the book you referenced in your post with a three-sentence note on why chapter four maps to their stated bottleneck.",
    figmaTactics: `Send a relevant business or strategy book to Beswick with a hand-written note referencing his "600 AI experiments" LinkedIn post
Branded Cursor Moleskine to Niall Maher with a note about Codú
Custom-printed report on AI coding ROI in professional services for Hussey`,
    figmaSample:
      "Handwritten tie to a specific post beats generic premium items. Follow up with a light email the day it lands.",
    rubric: ["Account thesis", "Urgency"],
  },
  {
    id: "abm",
    title: "Multi-threading / ABM",
    Icon: Share2,
    principle:
      "Single-threaded deals die. Multi-thread across the account from day one. Different messages to different personas, all aligned to the same account thesis.",
    methodologyTactics:
      "Run parallel tracks across economic buyer, BU technology leaders, platform engineering, security, and procurement. Same north star narrative, different proof points.",
    methodologySample:
      "Running three threads this week: CIO pattern, platform engineering throughput, security architecture deep dive. Same ninety-day consolidation thesis on all three.",
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

/** Order starts at 12 o'clock: Research first = beginning of the plan */
const WHEEL_PILLAR_IDS_ORDER = [
  "research",
  "trigger",
  "email",
  "li-engage",
  "li-dm",
  "voicemail",
  "content",
  "referrals",
  "dmail",
  "abm",
] as const

const WHEEL_PILLARS = WHEEL_PILLAR_IDS_ORDER.map((id) => PILLARS.find((p) => p.id === id)!)
const WILD_CARD_PILLAR = PILLARS.find((p) => p.id === "video")!

const DISCO_RUBRIC_DETAILS: Record<
  "Account thesis" | "Stakeholder map",
  { intro: string; bullets: string[] }
> = {
  "Account thesis": {
    intro:
      "Your account thesis is the single narrative that explains why this customer should prioritize your motion now — pressures, initiatives, and proof woven together.",
    bullets: [
      "Anchor every outbound touch to one thesis so messaging stays coherent across personas.",
      "Refresh it as triggers change (earnings, leadership, tech migrations, AI mandates).",
      "Use it to decide which channels earn budget vs. which are supporting casts for the call.",
    ],
  },
  "Stakeholder map": {
    intro:
      "The stakeholder map is who matters, who trusts whom, and where deals accelerate or stall — not just names on an org chart.",
    bullets: [
      "Track economic buyer, champions, influencers, and blockers with last touch and sentiment.",
      "Tune proof and channel per persona so multi-threading feels coordinated, not chaotic.",
      "Expose referral paths and warm intros before you exhaust cold lanes.",
    ],
  },
}

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

function Multiline({ text }: { text: string }) {
  const lines = text.trim().split("\n")
  return (
    <ul className="list-none space-y-2 text-sm leading-relaxed text-slate-300">
      {lines.map((line, i) => (
        <li key={i} className="pl-0">
          {line.startsWith("- ") ? (
            <span className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/80" />
              <span>{line.slice(2)}</span>
            </span>
          ) : (
            line
          )}
        </li>
      ))}
    </ul>
  )
}

export default function ComboProspectingApp() {
  const [view, setView] = useState<ViewMode>("pipeline")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hubOpen, setHubOpen] = useState(false)
  const [rubricPanel, setRubricPanel] = useState<"Account thesis" | "Stakeholder map" | null>(null)
  const [spokeRadiusPx, setSpokeRadiusPx] = useState(222)

  useLayoutEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setSpokeRadiusPx(168)
      else if (w < 768) setSpokeRadiusPx(188)
      else if (w < 1024) setSpokeRadiusPx(228)
      else if (w < 1280) setSpokeRadiusPx(252)
      else setSpokeRadiusPx(268)
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

  const openRubricPanel = useCallback((key: "Account thesis" | "Stakeholder map") => {
    setHubOpen(false)
    setSelectedId(null)
    setRubricPanel(key)
  }, [])

  const closePanel = useCallback(() => {
    setSelectedId(null)
    setHubOpen(false)
    setRubricPanel(null)
  }, [])

  const activePillar = selectedId ? PILLARS.find((p) => p.id === selectedId) : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#0c1222] to-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-end md:justify-between md:py-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/90">
              Combo Prospecting
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Marsh McLennan greenfield motion
            </h1>
            <p className="max-w-xl text-lg font-medium leading-snug text-slate-200 md:text-xl">
              Generate and shape pipeline in a greenfield enterprise account — earn whitespace before RFPs and
              procurement narrow the window, and compound credibility across every touch.
            </p>
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
                onClick={() => setView("pipeline")}
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
                onClick={() => setView("figma")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  view === "figma"
                    ? "bg-amber-500 text-slate-950 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                FIGMA
              </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="relative mx-auto mb-10 max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-white md:text-4xl">Disco Rubrics</h2>
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
                  onClick={() => openRubricPanel("Stakeholder map")}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:opacity-95 md:px-6 md:py-3 md:text-base ${rubricColor("Stakeholder map")}`}
                >
                  Stakeholder map
                </button>
                <span
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold md:px-6 md:py-3 md:text-base ${rubricColor("Pipeline generation")}`}
                >
                  Pipeline generation
                </span>
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

        {view === "figma" ? (
          <div className="mx-auto flex min-h-[min(72vh,640px)] max-w-6xl flex-col rounded-2xl border-2 border-dashed border-white/20 bg-slate-900/25 p-8 shadow-inner backdrop-blur-sm">
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              FIGMA canvas
            </p>
            <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-white/5 bg-slate-950/40 px-6 py-16 text-center">
              <p className="max-w-md text-lg font-medium text-slate-300">Open workspace</p>
              <p className="max-w-lg text-sm leading-relaxed text-slate-500">
                Drop frames, exports, or notes here during your working session. This area stays separate from
                the Pipeline view.
              </p>
            </div>
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
              const r = 38
              const cx = 50 + Math.cos(a) * r
              const cy = 50 + Math.sin(a) * r
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
            const x = Math.cos(angle) * rPx
            const y = Math.sin(angle) * rPx
            const Icon = pillar.Icon
            const isStart = pillar.id === "research"
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => openPillar(pillar.id)}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
                className="group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-2xl border border-white/10 bg-slate-900/90 px-2.5 py-2 shadow-lg backdrop-blur transition hover:-translate-y-[calc(50%+2px)] hover:border-amber-400/40 hover:bg-slate-800/95 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 md:px-3 md:py-2.5"
              >
                {isStart && (
                  <span className="mb-0.5 whitespace-nowrap rounded-full bg-emerald-500/25 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-emerald-200 ring-1 ring-emerald-400/35">
                    Start here
                  </span>
                )}
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800/90 text-amber-400 transition group-hover:bg-amber-500/20 group-hover:text-amber-300 md:h-10 md:w-10">
                  <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.75} />
                </span>
                <span className="max-w-[5.5rem] text-center text-[9px] font-semibold leading-tight text-slate-200 md:max-w-[6.5rem] md:text-[10px]">
                  {pillar.title}
                </span>
              </button>
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

      {(hubOpen || activePillar || rubricPanel) && (
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

            <div className="space-y-6 px-5 py-6">
              {rubricPanel && DISCO_RUBRIC_DETAILS[rubricPanel] && (
                <>
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-400/90">
                      Disco rubric
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-300">
                      {DISCO_RUBRIC_DETAILS[rubricPanel].intro}
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-sky-400/90">
                      How to use it
                    </h4>
                    <ul className="list-none space-y-3 text-sm leading-relaxed text-slate-300">
                      {DISCO_RUBRIC_DETAILS[rubricPanel].bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/80" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
                      {view === "figma" ? "FIGMA tactic" : "How you run it"}
                    </h4>
                    {view === "figma" ? (
                      <Multiline text={HUB.figmaTactics} />
                    ) : (
                      <p className="text-sm leading-relaxed text-slate-300">{HUB.methodologyTactics}</p>
                    )}
                  </div>
                  {view === "figma" && (
                    <div>
                      <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-400/90">
                        Sample call open
                      </h4>
                      <blockquote className="rounded-lg border border-white/10 bg-slate-900/80 p-4 text-sm italic leading-relaxed text-slate-200">
                        {HUB.figmaSample}
                      </blockquote>
                    </div>
                  )}
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
                      {view === "figma" ? "FIGMA tactic" : "Framework application"}
                    </h4>
                    {view === "figma" ? (
                      <Multiline text={activePillar.figmaTactics} />
                    ) : (
                      <p className="text-sm leading-relaxed text-slate-300">
                        {activePillar.methodologyTactics}
                      </p>
                    )}
                  </div>
                  <div>
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-400/90">
                      {view === "figma" ? "Sample script or message" : "Sample pattern"}
                    </h4>
                    <blockquote className="whitespace-pre-wrap rounded-lg border border-white/10 bg-slate-900/80 p-4 text-sm leading-relaxed text-slate-200">
                      {view === "figma" ? activePillar.figmaSample : activePillar.methodologySample}
                    </blockquote>
                  </div>
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
