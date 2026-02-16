import React, { useEffect, useMemo, useState, type SyntheticEvent } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Asset helper: uses /public/images in production
const ASSETS = {
  logo: "/images/ohio-eagles-logo.png",
  champs: "/images/pbr-summer-champs.png",
  monteCarlo: "/images/monte-carlo-night.jpg",
  // Sandbox fallbacks (won't exist on Netlify)
  fallbackLogo: "/mnt/data/OhioEagles_logo (3).png",
  fallbackChamps: "/mnt/data/Screenshot 2026-01-28 at 8.17.48 PM.png",
  fallbackMonteCarlo: "/mnt/data/IMG_9872.jpg",
} as const;

function imgFallback(
  e: SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string
) {
  const img = e.currentTarget;
  // prevent infinite loop
  if (img.dataset.fallbackApplied === "1") return;
  img.dataset.fallbackApplied = "1";
  img.src = fallbackSrc;
}

// -----------------------------
// Routing helpers
// -----------------------------

type RouteKey =
  | "home"
  | "roster"
  | "tournaments"
  | "coaches"
  | "fundraisers"
  | "tryouts"
  | "registration";

const ROUTES: RouteKey[] = [
  "home",
  "roster",
  "tournaments",
  "coaches",
  "fundraisers",
  "tryouts",
  "registration",
];

function parseRouteFromHash(hash: string): RouteKey {
  const key = (hash || "").replace("#", "").trim().toLowerCase();
  return ROUTES.includes(key as RouteKey) ? (key as RouteKey) : "home";
}

function getRouteFromHash(): RouteKey {
  const raw =
    (typeof window !== "undefined" ? window.location.hash : "") || "";
  return parseRouteFromHash(raw);
}

// -----------------------------
// Navigation
// -----------------------------

type NavTone = "dark" | "light";

const NavLink = ({
  label,
  to,
  onClick,
  active,
  tone = "dark",
}: {
  label: string;
  to: RouteKey;
  onClick?: () => void;
  active?: boolean;
  tone?: NavTone;
}) => {
  const base = "text-sm font-semibold transition-colors";

  // Dark tone = sits on blue/black background.
  const dark = active
    ? "text-[#FC4C02]"
    : "text-white/85 hover:text-[#FC4C02]";

  // Light tone = sits on white background.
  const light = active
    ? "text-[#FC4C02]"
    : "text-black/80 hover:text-[#FC4C02]";

  return (
    <a
      href={`#${to}`}
      onClick={onClick}
      className={`${base} ${tone === "light" ? light : dark}`}
    >
      {label}
    </a>
  );
};

// -----------------------------
// Page shell
// -----------------------------

function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#FC4C02]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 text-white/85 max-w-3xl mx-auto">{subtitle}</p>
          ) : null}
        </div>
        {children}
      </div>
    </main>
  );
}

// -----------------------------
// Pages
// -----------------------------

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative px-4 py-20 text-center overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-black/25" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(900px 500px at 50% 0%, rgba(255,255,255,0.16), rgba(255,255,255,0) 62%)," +
                "radial-gradient(900px 520px at 50% 120%, rgba(252,76,2,0.14), rgba(255,255,255,0) 65%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.h1
            style={{ textShadow: "0 6px 24px rgba(0,0,0,0.55)" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold mb-4"
          >
            Ohio Eagles Travel Baseball
          </motion.h1>
          <p className="text-lg max-w-2xl mx-auto mb-2 text-white/85">
            Elite development • Competitive tournaments • Player-focused training
          </p>
          <p className="text-sm max-w-3xl mx-auto text-white/70">
            Founded in 2025 • Partnered with Prospect Performance Academy (PPA)
          </p>

          {/* Social Links */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <a
              href="https://x.com/OhioEaglesball"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-semibold text-[#FC4C02] hover:underline"
            >
              <span className="text-lg">𝕏</span>
              <span>Follow on X</span>
            </a>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="px-4 py-12 bg-black/45 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-[#FC4C02]">
            Program Achievements
          </h2>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            <Card className="rounded-2xl bg-black/45 border border-[#FC4C02]/60">
              <CardContent className="p-6 grid gap-2">
                <h3 className="text-2xl font-bold text-[#FC4C02]">
                  🏆 PBR Summer Championship
                </h3>
                <p className="text-white/90">Tournament Champions</p>

                <div className="w-full aspect-[16/9] overflow-hidden rounded-xl border border-[#FC4C02]/60 mt-3">
                  <img
                    src={ASSETS.champs}
                    onError={(e) => imgFallback(e, ASSETS.fallbackChamps)}
                    alt="PBR Summer Championship Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl bg-black/45 border border-[#FC4C02]/60">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-[#FC4C02]">🥇 3 Top-5 Finishes</h3>
                <p className="text-white/90">Elite Regional Competition</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl bg-black/45 border border-[#FC4C02]/60">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-[#FC4C02]">📊 2025 Record</h3>
                <p className="text-3xl font-extrabold text-white mt-2">24–11</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About & Mission */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* About */}
          <Card className="rounded-2xl bg-black/45 border border-[#FC4C02]/60">
            <CardContent className="p-6">
              <h2 className="text-3xl font-bold text-[#FC4C02] mb-4">
                About Our Program
              </h2>
              <p className="mb-4 text-white/85">
                Founded in 2025, Ohio Eagles Travel Baseball was built to create a high-level developmental
                environment for committed athletes. In our inaugural season, the program posted a 24–11
                record while competing in PBR and elite regional tournaments.
              </p>
              <p className="text-white/85">
                Ohio Eagles is proudly partnered with <strong>Prospect Performance Academy (PPA)</strong>,
                giving our players access to professional-level training, performance development, and
                structured programming designed for long-term success.
              </p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="rounded-2xl bg-black/45 border border-[#FC4C02]/60">
            <CardContent className="p-6">
              <h2 className="text-3xl font-bold text-[#FC4C02] mb-4">Our Mission</h2>
              <p className="text-white/85">
                Our mission is to develop disciplined, confident, and fundamentally sound baseball players
                through elite coaching, advanced training systems, and consistent exposure to high-level
                competition. We emphasize accountability, mental toughness, and a team-first culture that
                prepares athletes for high school, collegiate, and beyond.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Highlight Video Section */}
        <div className="max-w-5xl mx-auto mt-14">
          <h2 className="text-3xl font-bold text-center text-[#FC4C02] mb-6">
            2026 Program Highlights
          </h2>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#FC4C02]/60 shadow-[0_0_50px_rgba(252,76,2,0.18)]">
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/ZlPDjvs_QYs?rel=0&modestbranding=1&playsinline=1"
              title="Ohio Eagles Program Highlights"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Subtle glow overlay */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-[#FC4C02]/40 rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <Card className="rounded-2xl bg-black/45 backdrop-blur-sm border border-[#FC4C02]/60">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold">16U Program</h3>
              <p className="text-sm text-white/70 mt-2">
                College exposure • Elite tournaments • Advanced development
              </p>
              <a href="#roster" className="inline-block mt-4">
                <Button className="bg-[#FC4C02] text-black rounded-2xl shadow-[0_0_0_3px_rgba(252,76,2,0.35)] hover:shadow-[0_0_0_4px_rgba(252,76,2,0.55)] transition-shadow">
                  View Roster
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-black/45 backdrop-blur-sm border border-[#FC4C02]/60">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold">Tryouts</h3>
              <p className="text-sm text-white/70 mt-2">
                Submit player info through the registration tab to be contacted.
              </p>
              <a href="#registration" className="inline-block mt-4">
                <Button variant="outline" className="rounded-2xl border-white/30 text-white">
                  Player Registration
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-black/45 backdrop-blur-sm border border-[#FC4C02]/60">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold">Team Store</h3>
              <p className="text-sm text-white/70 mt-2">Official Ohio Eagles apparel and gear.</p>
              <a
                href="https://www.team.shop/en-us/node/2016206/share"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4"
              >
                <Button className="bg-[#FC4C02] text-black rounded-2xl shadow-[0_0_0_3px_rgba(252,76,2,0.35)] hover:shadow-[0_0_0_4px_rgba(252,76,2,0.55)] transition-shadow">
                  Visit Store
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sponsors */}
      <section className="px-4 py-12 bg-black/45 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 text-[#FC4C02]">
            Our Sponsors
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { name: "Ken's Lawnscape" },
              { name: "Legacy Fleet and Auto" },
              { name: "Posh Sound and Lighting" },
              { name: "Sponsor Available" },
            ].map((s, i) => (
              <Card key={i} className="rounded-2xl bg-black/60 border border-[#FC4C02]/60">
                <CardContent className="p-6">
                  <div className="h-20 bg-gray-700/80 rounded" />
                  <p className="mt-2 font-semibold text-[#FC4C02]">{s.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-4 py-12 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-[#FC4C02]">Contact Us</h2>
          <p className="mb-2">📧 Ohioeaglesbaseball@gmail.com</p>
          <p className="mb-2">📞 Kolton Staskey: (330) 413-0962</p>
          <p className="mb-0">📞 Ryan Andrzejczyk: (330) 605-3340</p>
        </div>
      </section>
    </div>
  );
}

type ShowcaseMetric = {
  label: string;
  value: string;
};

type Player = {
  name: string;
  number: number;
  school: string;
  gradYear: string;
  positions: string;
  gpa?: string;
  size: string;
  // Optional showcase numbers / stats
  showcase?: {
    event?: string;
    date?: string;
    metrics: ShowcaseMetric[];
  };
  // Optional links (can be expanded later)
  videoUrl?: string;
  profileUrl?: string;
};

function RosterPage() {
  const [selected, setSelected] = useState<Player | null>(null);

  const StatPill = ({ m }: { m: ShowcaseMetric }) => (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/85">
      <span className="text-white/60">{m.label}:</span>
      <span className="font-semibold text-white">{m.value}</span>
    </span>
  );

  const PlayerModal = ({ p, onClose }: { p: Player; onClose: () => void }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-3xl"
      >
        <Card className="rounded-3xl bg-black/70 border border-[#FC4C02]/60 shadow-[0_0_0_1px_rgba(252,76,2,0.18),0_25px_90px_rgba(0,0,0,0.65)]">
          <CardContent className="p-7 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-[#FC4C02]">
                  #{p.number} {p.name}
                </div>
                <div className="mt-1 text-sm text-white/85">
                  {p.school ? `${p.school} • ` : ""}Class of {p.gradYear}
                </div>
                <div className="mt-1 text-sm text-white/85">
                  {p.positions}{p.gpa ? ` • GPA: ${p.gpa}` : ""}
                </div>
                <div className="mt-1 text-sm text-white/85">{p.size}</div>
              </div>

              <Button
                onClick={onClose}
                variant="outline"
                className="rounded-2xl border-white/25 text-white hover:bg-white/10"
              >
                Close
              </Button>
            </div>

            <div className="mt-7">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-lg font-extrabold text-white">
                  Showcase Numbers & Stats
                </h4>
                {p.showcase?.event ? (
                  <span className="rounded-full border border-[#FC4C02]/50 bg-black/40 px-3 py-1 text-xs font-bold text-[#FC4C02]">
                    {p.showcase.event}{p.showcase.date ? ` • ${p.showcase.date}` : ""}
                  </span>
                ) : null}
              </div>

              {p.showcase?.metrics?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.showcase.metrics.map((m) => (
                    <StatPill key={`${m.label}-${m.value}`} m={m} />
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
                  Stats will be posted after the next verified showcase/event.
                </div>
              )}

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Card className="rounded-2xl bg-black/40 border border-white/10">
                  <CardContent className="p-5">
                    <div className="text-sm font-bold text-white/90">Recruiting Links</div>
                    <div className="mt-3 grid gap-2 text-sm">
                      {p.videoUrl ? (
                        <a
                          className="text-[#FC4C02] font-semibold hover:underline"
                          href={p.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Highlight Video
                        </a>
                      ) : (
                        <div className="text-white/70">Highlight video: coming soon</div>
                      )}
                      {p.profileUrl ? (
                        <a
                          className="text-[#FC4C02] font-semibold hover:underline"
                          href={p.profileUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Player Profile
                        </a>
                      ) : (
                        <div className="text-white/70">Player profile link: coming soon</div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl bg-black/40 border border-white/10">
                  <CardContent className="p-5">
                    <div className="text-sm font-bold text-white/90">Coach Notes</div>
                    <div className="mt-3 text-sm text-white/70">
                      (Optional) Add a short scouting blurb here later: athletic traits, strengths, tools, and intangibles.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

    const players: Player[] = [
    {
      name: "Greysen Mickel",
      number: 13,
      school: "Archbishop Hoban High School",
      gradYear: "2027",
      positions: "C / CIF",
      gpa: "4.2",
      size: "6'1\" • 185 lbs",
      showcase: {
        event: "Eagles Showcase",
        date: "2026",
        metrics: [
          { label: "60", value: "7.10" },
          { label: "Exit Velo", value: "92.6 mph" },
          { label: "IF Velo", value: "79 mph" },
          { label: "Pop Time", value: "1.89" },
        ],
      },
    },
    {
      name: "Leo Milcetich",
      number: 8,
      school: "Hudson High School",
      gradYear: "2028",
      positions: "MIF / P",
      gpa: "4.64",
      size: "5'10\" • 170 lbs",
      showcase: {
        event: "Eagles Showcase",
        date: "2026",
        metrics: [
          { label: "60", value: "7.10" },
          { label: "Exit Velo", value: "93.2 mph" },
          { label: "IF Velo", value: "78 mph" },
        ],
      },
    },
    {
      name: "Alaunte Massrock",
      number: 1,
      school: "Southeast High School",
      gradYear: "2028",
      positions: "P / OF",
      gpa: "3.9",
      size: "5'11\" • 190 lbs",
      showcase: {
        event: "Eagles Showcase",
        date: "2026",
        metrics: [
          { label: "60", value: "6.86" },
          { label: "Exit Velo", value: "93.5 mph" },
          { label: "OF Velo", value: "88 mph" },
          { label: "Pitching", value: "84 FB • 72 CB • 77 CH" },
        ],
      },
    },
    {
      name: "Jack Williams",
      number: 21,
      school: "Hudson High School",
      gradYear: "2028",
      positions: "OF",
      gpa: "3.8",
      size: "5'8\" • 160 lbs",
      showcase: {
        event: "Eagles Showcase",
        date: "2026",
        metrics: [
          { label: "60", value: "6.69" },
          { label: "Exit Velo", value: "88.8 mph" },
          { label: "OF Velo", value: "78 mph" },
        ],
      },
    },
    {
      name: "Carson Oakes",
      number: 7,
      school: "Archbishop Hoban High School",
      gradYear: "2028",
      positions: "C / OF / Utility",
      gpa: "4.33",
      size: "5'8\" • 145 lbs",
      showcase: {
        event: "Eagles Showcase",
        date: "2026",
        metrics: [
          { label: "60", value: "7.25" },
          { label: "Exit Velo", value: "81.8 mph" },
          { label: "OF Velo", value: "76 mph" },
          { label: "Pop Time", value: "2.28" },
        ],
      },
    },
    {
      name: "Hudson Hoffman",
      number: 3,
      school: "Tuslaw High School",
      gradYear: "2028",
      positions: "IF / P",
      gpa: "3.5",
      size: "6'2\" • 175 lbs",
      showcase: {
        event: "Eagles Showcase",
        date: "2026",
        metrics: [
          { label: "60", value: "7.82" },
          { label: "Exit Velo", value: "90.3 mph" },
          { label: "IF Velo", value: "77 mph" },
          { label: "Pitching", value: "79 FB • 66 CB • 64 CH" },
        ],
      },
    },
    {
      name: "Luke Betz",
      number: 2,
      school: "Tuslaw High School",
      gradYear: "2028",
      positions: "P / C / MIF",
      gpa: "3.7",
      size: "5'8\" • 155 lbs",
      showcase: {
        event: "Eagles Showcase",
        date: "2026",
        metrics: [
          { label: "60", value: "7.74" },
          { label: "Exit Velo", value: "90.1 mph" },
          { label: "IF Velo", value: "78 mph" },
          { label: "Pitching", value: "79 FB • 65 CB • 66 SL • 73 CH" },
          { label: "Pop Time", value: "1.94" },
        ],
      },
    },
    {
      name: "Keaton Harris",
      number: 5,
      school: "Northwest High School",
      gradYear: "2028",
      positions: "CIF / P",
      gpa: "3.93",
      size: "6'1\" • 215 lbs",
      showcase: {
        event: "Eagles Showcase",
        date: "2026",
        metrics: [
          { label: "60", value: "8.02" },
          { label: "Exit Velo", value: "94.2 mph" },
          { label: "IF Velo", value: "76 mph" },
          { label: "Pitching", value: "81 FB • 74 CB • 73 CH" },
        ],
      },
    },
    {
      name: "Talon Miracle",
      number: 23,
      school: "Hudson High School",
      gradYear: "2028",
      positions: "OF / P",
      gpa: "3.73",
      size: "6'2\" • 185 lbs",
      showcase: {
        event: "Eagles Showcase",
        date: "2026",
        metrics: [
          { label: "60", value: "7.10" },
          { label: "Exit Velo", value: "90.4 mph" },
          { label: "OF Velo", value: "83 mph" },
        ],
      },
    },
    {
      name: "Scott Hartfelder",
      number: 22,
      school: "Hudson High School",
      gradYear: "2028",
      positions: "CIF / P",
      gpa: "4.0",
      size: "6'0\" • 200 lbs",
      showcase: {
        event: "Eagles Showcase",
        date: "2026",
        metrics: [
          { label: "60", value: "7.80" },
          { label: "Exit Velo", value: "89.8 mph" },
          { label: "IF Velo", value: "74 mph" },
        ],
      },
    },
    {
      name: "Logan Lee",
      number: 11,
      school: "North Canton Hoover High School",
      gradYear: "2028",
      positions: "LHP / 1B / OF",
      gpa: "4.1",
      size: "5'10\" • 155 lbs",
      showcase: {
        event: "Eagles Showcase",
        date: "2026",
        metrics: [
          { label: "60", value: "7.62" },
          { label: "Exit Velo", value: "81.1 mph" },
          { label: "IF Velo", value: "71 mph" },
          { label: "Pitching", value: "76 FB • 74 SNK • 60 CB • 64 CH" },
        ],
      },
    },
    {
      name: "Kellen Donnelly",
      number: 24,
      school: "Benedictine High School",
      gradYear: "2028",
      positions: "OF",
      gpa: "3.8",
      size: "5'11\" • 170 lbs",
      showcase: {
        event: "Eagles Showcase",
        date: "2026",
        metrics: [
          { label: "60", value: "7.20" },
          { label: "Exit Velo", value: "85.6 mph" },
          { label: "OF Velo", value: "77 mph" },
        ],
      },
    },
    {
      name: "Carl (CJ) Kreig",
      number: 35,
      school: "",
      gradYear: "2028",
      positions: "P / OF / C",
      gpa: "",
      size: "",
      showcase: {
        event: "Eagles Showcase",
        date: "2026",
        metrics: [
          { label: "60", value: "7.65" },
          { label: "Exit Velo", value: "88.4 mph" },
          { label: "OF Velo", value: "84 mph" },
          { label: "Pitching", value: "80 FB • 69 SPL • 66 CB" },
        ],
      },
    },
  ]
    .slice()
    .sort((a, b) => {
      const ya = Number(a.gradYear);
      const yb = Number(b.gradYear);
      if (ya !== yb) return ya - yb;
      return a.number - b.number;
    });

  const handlePrintRoster = (playersForPrint: Player[]) => {
    const w = window.open("", "_blank", "noopener,noreferrer,width=900,height=700");
    if (!w) return;

    const rows = playersForPrint
      .slice()
      .sort((a, b) => {
        const ya = Number(a.gradYear);
        const yb = Number(b.gradYear);
        if (ya !== yb) return ya - yb;
        return a.number - b.number;
      })
      .map(
        (p) => `
          <tr>
            <td class="c num">#${p.number}</td>
            <td class="c name">${p.name}</td>
            <td class="c">${p.school}</td>
            <td class="c">${p.gradYear}</td>
            <td class="c">${p.positions}</td>
            <td class="c">${p.gpa ?? ""}</td>
            <td class="c">${p.size}</td>
            <td class="c notes"></td>
          </tr>`
      )
      .join("");

    const logoSrc = `${window.location.origin}${ASSETS.logo}`;

    const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ohio Eagles 16U - Roster Sheet</title>
  <style>
    :root { --blue:#002D72; --orange:#FC4C02; }
    body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; margin: 0; padding: 24px; color:#111; }
    .top { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:14px; }
    .brand { display:flex; align-items:center; gap:12px; }
    .brand img { width:56px; height:56px; object-fit:contain; }
    .title { line-height:1.1; }
    .title h1 { margin:0; font-size:20px; letter-spacing:0.2px; }
    .title .sub { margin-top:4px; font-size:12px; color:#333; }
    .meta { text-align:right; font-size:12px; color:#333; }
    .bar { height:4px; background: linear-gradient(90deg, var(--blue), var(--orange)); border-radius: 999px; margin: 10px 0 16px; }
    table { width:100%; border-collapse:collapse; font-size:12px; }
    th, td { border:1px solid #ddd; padding:8px 8px; vertical-align:top; }
    th { background:#f7f7f7; text-align:left; }
    .num { width:64px; white-space:nowrap; font-weight:700; color: var(--blue); }
    .name { font-weight:700; }
    .notes { width:18%; }
    .footer { margin-top:14px; font-size:11px; color:#333; display:flex; justify-content:space-between; gap:12px; }
    .tag { font-weight:700; color: var(--orange); }

    @media print {
      body { padding: 0.35in; }
      .no-print { display:none !important; }
      th { background:#eee !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .bar { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="top">
    <div class="brand">
      <img src="${logoSrc}" alt="Ohio Eagles" />
      <div class="title">
        <h1>Ohio Eagles Baseball <span class="tag">16U</span> — Roster Sheet</h1>
        <div class="sub">Mets Royal Blue & Orange • College Exposure • Player Development</div>
      </div>
    </div>
    <div class="meta">
      <div><strong>Contact:</strong> Ohioeaglesbaseball@gmail.com</div>
      <div><strong>Kolton:</strong> (330) 413-0962 • <strong>Ryan:</strong> (330) 605-3340</div>
    </div>
  </div>
  <div class="bar"></div>

  <div class="no-print" style="display:flex; gap:10px; margin: 0 0 10px;">
    <button onclick="window.print()" style="padding:10px 14px; border-radius:10px; border:1px solid #ddd; background: var(--orange); color:#111; font-weight:700; cursor:pointer;">Print</button>
    <button onclick="window.close()" style="padding:10px 14px; border-radius:10px; border:1px solid #ddd; background:#fff; color:#111; font-weight:700; cursor:pointer;">Close</button>
  </div>

  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Player</th>
        <th>School</th>
        <th>Class</th>
        <th>Pos</th>
        <th>GPA</th>
        <th>Ht / Wt</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>

  <div class="footer">
    <div><strong>Program:</strong> Founded 2025 • Partnered with PPA • 2025 Record: <strong>24–11</strong></div>
    <div><strong>Achievements:</strong> PBR Summer Championship • 3 Top-5 Finishes</div>
  </div>
</body>
</html>`;

    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
  };

    return (
    <>
      {selected ? <PlayerModal p={selected} onClose={() => setSelected(null)} /> : null}

      <PageShell
        title="Roster"
        subtitle="16U Ohio Eagles — roster, positions, grad year, and verified showcase numbers."
      >
        <div className="flex justify-center">
          <Card className="rounded-2xl max-w-3xl w-full bg-black/45 backdrop-blur-sm border border-[#FC4C02]/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={ASSETS.logo}
                    onError={(e) => imgFallback(e, ASSETS.fallbackLogo)}
                    className="w-16 h-16 object-contain"
                    alt="Ohio Eagles"
                  />
                  <div>
                    <div className="text-2xl font-extrabold text-[#FC4C02]">
                      16U Ohio Eagles
                    </div>
                    <div className="text-sm text-white/70">
                      College exposure • Elite tournaments • Advanced development
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handlePrintRoster(players)}
                  className="bg-[#FC4C02] text-black rounded-2xl shadow-[0_0_0_3px_rgba(252,76,2,0.35)] hover:shadow-[0_0_0_4px_rgba(252,76,2,0.55)] transition-shadow print:hidden"
                >
                  Print Roster Sheet
                </Button>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                <div className="font-semibold text-white">Showcase Numbers</div>
                <div className="mt-1 text-white/75">
                  Click any player card to open the full profile and view verified metrics (Eagles Showcase / verified events).
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4 print:grid-cols-1">
                {players.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setSelected(p)}
                    className="text-left"
                  >
                    <Card className="rounded-2xl bg-black/40 border border-[#FC4C02]/60 hover:shadow-[0_0_34px_rgba(252,76,2,0.10)] transition-shadow">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-bold text-lg text-[#FC4C02]">
                              #{p.number} {p.name}
                            </div>
                            <div className="text-sm text-white/80 mt-1">
                              {p.school ? `${p.school} • ` : ""}Class of {p.gradYear}
                            </div>
                            <div className="text-sm text-white/80 mt-1">
                              {p.positions}
                              {p.gpa ? ` • GPA: ${p.gpa}` : ""}
                            </div>
                            <div className="text-sm text-white/80 mt-1">{p.size}</div>
                          </div>

                          {p.showcase?.event ? (
                            <span className="shrink-0 rounded-full border border-[#FC4C02]/50 bg-black/40 px-3 py-1 text-[11px] font-extrabold tracking-wide text-[#FC4C02]">
                              {p.showcase.event}
                            </span>
                          ) : null}
                        </div>

                        {/* Quick stats preview */}
                        {p.showcase?.metrics?.length ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {p.showcase.metrics.slice(0, 4).map((m) => (
                              <span
                                key={`${p.name}-${m.label}`}
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/85"
                              >
                                <span className="text-white/60">{m.label}:</span>
                                <span className="font-semibold text-white">{m.value}</span>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-3 text-sm text-white/70">
                            Showcase numbers coming soon
                          </div>
                        )}

                        <div className="mt-3 text-xs text-white/60">
                          Click to view full profile →
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </PageShell>
    </>
  );
}

function TournamentsPage() {
  const events = [
    {
      date: "June 4th – 10th",
      title: "College Prospect Showcase (Wood Bat)",
      location: "",
      desc:
        "High-level wood bat exposure event focused on college recruitment and advanced competition.",
      isPbr: false,
    },
    {
      date: "June 18th – 21st",
      title: "PBR Capital City Classic",
      location: "Columbus, OH",
      desc:
        "Premier Prep Baseball event featuring top regional programs competing in the capital city.",
      isPbr: true,
    },
    {
      date: "June 24th – 28th",
      title: "Akron / Kent State Invite",
      location: "Akron / Kent, OH",
      desc:
        "College-campus style event offering strong competition and recruiting visibility.",
      isPbr: false,
    },
    {
      date: "July 9th – 12th",
      title: "PBR Invite-Only",
      location: "Columbus, OH",
      desc:
        "Exclusive invite-only event showcasing elite-level regional and national talent.",
      isPbr: true,
    },
    {
      date: "July 16th – 19th",
      title: "965 BBCOR World Series",
      location: "North East Ohio",
      desc:
        "Competitive World Series event closing out the summer schedule in Northeast Ohio.",
      isPbr: false,
    },
    {
      date: "July 23rd – 26th",
      title: "PBR Great Lakes Underclassmen World Series",
      location: "Toledo, OH",
      desc:
        "Elite underclass showcase tournament featuring top prospects from across the Great Lakes region.",
      isPbr: true,
    },
  ] as const;

  const infoUrl = (title: string) =>
    `https://www.google.com/search?q=${encodeURIComponent(`${title} 2026`)}`;

  return (
    <PageShell title="Tournaments" subtitle="2026 Ohio Eagles 16U Tournament Schedule">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <a
            key={ev.title}
            href={infoUrl(ev.title)}
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <Card
              className={
                "relative overflow-hidden rounded-2xl bg-black/45 backdrop-blur-sm border transition-all " +
                (ev.isPbr
                  ? "border-[#FC4C02]/70 shadow-[0_0_0_1px_rgba(252,76,2,0.20),0_0_40px_rgba(252,76,2,0.16)] group-hover:shadow-[0_0_0_1px_rgba(252,76,2,0.28),0_0_56px_rgba(252,76,2,0.24)]"
                  : "border-[#FC4C02]/60 group-hover:shadow-[0_0_24px_rgba(0,0,0,0.45)]")
              }
            >
              {/* Subtle PBR glow */}
              {ev.isPbr ? (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-10"
                  initial={{ opacity: 0.18 }}
                  animate={{ opacity: [0.12, 0.22, 0.14] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    backgroundImage:
                      "radial-gradient(closest-side at 40% 35%, rgba(252,76,2,0.35), rgba(252,76,2,0) 62%)," +
                      "radial-gradient(closest-side at 70% 70%, rgba(252,76,2,0.22), rgba(252,76,2,0) 60%)",
                  }}
                />
              ) : null}

              {/* Stitch divider */}
              <div
                aria-hidden="true"
                className="absolute left-0 right-0 top-0 h-px opacity-60"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 6px, rgba(255,255,255,0) 6px 14px)",
                }}
              />

              <CardContent className="relative p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-white/70">
                      {ev.date}
                      {ev.location ? ` • ${ev.location}` : ""}
                    </div>
                    <div className="text-xl font-bold mt-2 text-[#FC4C02]">
                      {ev.title}
                    </div>
                  </div>

                  {ev.isPbr ? (
                    <span className="shrink-0 rounded-full border border-[#FC4C02]/60 bg-black/40 px-3 py-1 text-xs font-extrabold tracking-wide text-[#FC4C02] shadow-[0_0_18px_rgba(252,76,2,0.18)]">
                      PBR
                    </span>
                  ) : null}
                </div>

                <div className="text-sm text-white/85 mt-2">{ev.desc}</div>

                <div className="mt-5">
                  <Button
                    className={
                      "rounded-2xl transition-all " +
                      (ev.isPbr
                        ? "bg-[#FC4C02] text-black shadow-[0_0_0_3px_rgba(252,76,2,0.28)] group-hover:shadow-[0_0_0_4px_rgba(252,76,2,0.45)]"
                        : "bg-white/10 text-white border border-white/20 hover:bg-white/15")
                    }
                  >
                    View Event Info →
                  </Button>
                </div>

                <div className="mt-3 text-xs text-white/60">
                  (Opens event info in a new tab)
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </PageShell>
  );
}

function CoachesPage() {
  return (
    <PageShell
      title="Coaches"
      subtitle="Our staff is built around player development, recruiting, and preparing athletes for the next level."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl bg-[#002D72]/85 backdrop-blur border-white/15">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-[#FC4C02]">Kolton Staskey</h3>
            <p className="mt-2 font-semibold text-white">
              Co-Founder • Infield Coach • Head of Player Recruitment
            </p>
            <p className="text-sm text-white/90 mt-1">
              College Playing Experience • 10 Years Coaching Experience
            </p>
            <p className="text-base text-white/90 mt-3 leading-relaxed">
              Kolton brings collegiate playing experience to the Ohio Eagles program and
              leads all infield development and defensive fundamentals. As Head of Player
              Recruitment, he oversees talent identification, roster construction, and
              communication with prospective players and families, ensuring the program
              remains competitive and development-focused.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-[#002D72]/85 backdrop-blur border-white/15">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-[#FC4C02]">Ryan Andrzejczyk</h3>
            <p className="mt-2 font-semibold text-white">
              Co-Founder • Pitching Coordinator • Player Development
            </p>
            <p className="text-sm text-white/90 mt-1">
              3 Years College Experience • 2 Years Professional Baseball • 6 Years
              Coaching Experience
            </p>
            <p className="text-base text-white/90 mt-3 leading-relaxed">
              Ryan directs all pitching development and arm-care programs while overseeing
              long-term player development. With three years of collegiate experience and
              two years of professional baseball, he designs individualized development
              plans that prepare athletes for high school, collegiate, and
              professional-level expectations.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-[#002D72]/85 backdrop-blur border-white/15">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-black">Jacob Begue</h3>
            <p className="mt-2 font-semibold text-white">
              Head of Hitting & Player Development
            </p>
            <p className="text-sm text-white/90 mt-1">
              2 Years College Playing Experience • 7 Years Coaching Experience
            </p>
            <p className="text-base text-white/90 mt-3 leading-relaxed">
              Jacob leads the offensive philosophy for Ohio Eagles, overseeing swing
              mechanics, approach, pitch recognition, and in-game adjustments. As Head of
              Hitting and Player Development, he builds structured training plans, runs
              individualized skill development sessions, and works closely with players
              to maximize offensive performance and consistency.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-[#002D72]/85 backdrop-blur border-white/15">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-black">Chad Andrzejczyk</h3>
            <p className="mt-2 font-semibold text-white">Outfield & Pitching Coach</p>
            <p className="text-sm text-white/90 mt-1">
              College Playing Experience • 2 Years Coaching Experience
            </p>
            <p className="text-base text-white/90 mt-3 leading-relaxed">
              Chad brings collegiate playing experience to his role working with outfielders
              and pitchers. He focuses on defensive positioning, throwing mechanics, arm
              strength development, and fundamental pitching principles to help players
              compete at a higher level.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-[#002D72]/85 backdrop-blur border-white/15">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-black">Kyle Andrzejczyk</h3>
            <p className="mt-2 font-semibold text-white">Catching Coordinator</p>
            <p className="text-sm text-white/90 mt-1">
              College Playing Experience • 3 Years Assistant Coach (St. Thomas Aquinas) •
              2 Years Travel Ball
            </p>
            <p className="text-base text-white/90 mt-3 leading-relaxed">
              Kyle oversees all aspects of catcher development, including receiving,
              blocking, footwork, throwing, and game management. His collegiate background
              allows him to teach the position with an emphasis on leadership,
              communication, and defensive accountability.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl bg-[#002D72]/85 backdrop-blur border-white/15 mt-8">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-white">Training Partner</h3>
          <p className="text-white/90 mt-3 leading-relaxed">
            Ohio Eagles is proudly partnered with <strong>Prospect Performance Academy (PPA)</strong> for
            performance training, development programming, and long-term athlete preparation.
          </p>
        </CardContent>
      </Card>
    </PageShell>
  );
}

function RegistrationPage() {
  return (
    <PageShell
      title="Player Registration"
      subtitle="Submit basic baseball information to be contacted about Ohio Eagles tryouts and opportunities."
    >
      <Card className="rounded-2xl bg-[#002D72]/90 backdrop-blur border-white/15 max-w-3xl mx-auto">
        <CardContent className="p-8">
          <form
            action="https://docs.google.com/forms/d/e/1FAIpQLSd_Y8POGrPRBFF6rgMq7MSTApJ3bywzS-OSeDD4C9sJHy6JFA/formResponse"
            method="POST"
            target="_blank"
            className="grid md:grid-cols-2 gap-5"
          >
            <input
              name="entry.player_name"
              placeholder="Player Name"
              className="p-4 rounded bg-white text-black font-medium"
              required
            />
            <input
              name="entry.age"
              placeholder="Age"
              className="p-4 rounded bg-white text-black font-medium"
              required
            />
            <input
              name="entry.positions"
              placeholder="Primary Position(s)"
              className="p-4 rounded bg-white text-black font-medium"
              required
            />
            <input
              name="entry.bats"
              placeholder="Bats (R / L / S)"
              className="p-4 rounded bg-white text-black font-medium"
              required
            />
            <input
              name="entry.throws"
              placeholder="Throws (R / L)"
              className="p-4 rounded bg-white text-black font-medium"
              required
            />
            <input
              name="entry.school"
              placeholder="School"
              className="p-4 rounded bg-white text-black font-medium"
              required
            />
            <input
              name="entry.height"
              placeholder="Height"
              className="p-4 rounded bg-white text-black font-medium"
              required
            />
            <input
              name="entry.weight"
              placeholder="Weight"
              className="p-4 rounded bg-white text-black font-medium"
              required
            />
            <input
              name="entry.phone"
              placeholder="Phone Number"
              className="p-4 rounded bg-white text-black font-medium"
              required
            />
            <input
              name="entry.email"
              placeholder="Email Address"
              className="p-4 rounded bg-white text-black font-medium"
              required
            />

            <Button
              type="submit"
              className="md:col-span-2 bg-[#FC4C02] text-black rounded-2xl text-lg py-3 shadow-[0_0_0_3px_rgba(252,76,2,0.35)] hover:shadow-[0_0_0_4px_rgba(252,76,2,0.55)] transition-shadow"
            >
              Submit Registration
            </Button>

            <div className="md:col-span-2 text-center text-sm text-white/70">
              Prefer the official Google Form?{" "}
              <a
                className="text-[#FC4C02] font-semibold hover:text-orange-400"
                href="https://docs.google.com/forms/d/e/1FAIpQLSd_Y8POGrPRBFF6rgMq7MSTApJ3bywzS-OSeDD4C9sJHy6JFA/viewform?usp=header"
                target="_blank"
                rel="noreferrer"
              >
                Open the form
              </a>
              .
            </div>
          </form>

          <div className="mt-6 text-sm text-white/80">
            <div className="font-semibold text-white mb-2">Important setup note</div>
            <p className="text-white/80 leading-relaxed">
              Google Forms requires specific <span className="text-white font-semibold">entry IDs</span>
              for each field (for example:{" "}
              <span className="text-white font-semibold">entry.123456</span>). The website fields
              currently use placeholders like <span className="text-white font-semibold">entry.player_name</span>.
              To ensure submissions land correctly in your connected Google Sheet, replace each input’s{" "}
              <span className="text-white font-semibold">name=</span> value with the real entry IDs from your form.
            </p>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}

function FundraisersPage() {
  return (
    <PageShell
      title="Fundraisers"
      subtitle="Annual fundraising events that support Ohio Eagles Baseball."
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="rounded-2xl bg-[#002D72]/85 backdrop-blur border-white/15">
          <CardContent className="p-6 grid gap-4">
            <h3 className="text-2xl font-bold text-[#FC4C02]">Monte Carlo / Casino Night</h3>
            <p className="text-white/90">
              Our annual Monte Carlo Night fundraiser supporting Ohio Eagles Baseball.
            </p>
            <div className="w-full aspect-[16/9] overflow-hidden rounded-xl border border-[#FC4C02]/60">
              <img
                src={ASSETS.monteCarlo}
                onError={(e) => imgFallback(e, ASSETS.fallbackMonteCarlo)}
                alt="Ohio Eagles Monte Carlo Night Fundraiser"
                className="w-full h-full object-cover saturate-125 contrast-110"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-[#002D72]/85 backdrop-blur border-white/15">
          <CardContent className="p-6 grid gap-4">
            <h3 className="text-2xl font-bold text-[#FC4C02]">Golf Outing Fundraiser</h3>
            <p className="text-white/90">
              Annual Ohio Eagles Golf Outing supporting player development and travel.
            </p>
            <div className="w-full aspect-[16/9] flex items-center justify-center rounded-xl border border-[#FC4C02]/60 bg-black/60">
              <span className="text-white/70">Golf Outing Image Coming Soon</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

function TryoutsPage() {
  return (
    <PageShell
      title="Program Tryouts"
      subtitle="Information on upcoming Ohio Eagles tryouts and player evaluation."
    >
      <div className="max-w-4xl mx-auto grid gap-6">
        <Card className="rounded-2xl bg-[#002D72]/85 backdrop-blur border-[#FC4C02]/30">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-[#FC4C02] mb-3">Tryout Overview</h3>
            <p className="text-white/90 leading-relaxed">
              Ohio Eagles tryouts are designed to evaluate athleticism, baseball IQ,
              positional skill sets, arm strength, and overall coachability. Our staff
              places an emphasis on long-term development and competitiveness.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-[#002D72]/85 backdrop-blur border-[#FC4C02]/30">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-[#FC4C02] mb-3">How to Register</h3>
            <p className="text-white/90 mb-4">
              Players interested in Ohio Eagles should complete the Player Registration
              form. Families will be contacted with upcoming tryout dates and details.
            </p>
            <a href="#registration">
              <Button className="bg-[#FC4C02] text-black rounded-2xl shadow-[0_0_0_3px_rgba(252,76,2,0.35)] hover:shadow-[0_0_0_4px_rgba(252,76,2,0.55)] transition-shadow">
                Go to Player Registration
              </Button>
            </a>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-[#002D72]/85 backdrop-blur border-[#FC4C02]/30">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-[#FC4C02] mb-3">What We Look For</h3>
            <ul className="list-disc pl-6 text-white/90 space-y-2">
              <li>Strong fundamentals and athletic movement</li>
              <li>Coachability and competitive mindset</li>
              <li>Position-specific skill development</li>
              <li>Commitment to training and growth</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

// -----------------------------
// App
// -----------------------------

export default function TravelBaseballWebsite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [route, setRoute] = useState<RouteKey>("home");

  const nav = useMemo(
    () => [
      { label: "Home", to: "home" as const },
      { label: "Roster", to: "roster" as const },
      { label: "Tournaments", to: "tournaments" as const },
      { label: "Coaches", to: "coaches" as const },
      { label: "Fundraisers", to: "fundraisers" as const },
      { label: "Program Tryouts", to: "tryouts" as const },
      { label: "Player Registration", to: "registration" as const },
    ],
    []
  );

  useEffect(() => {
    const sync = () => setRoute(getRouteFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Field-day baseball background (more texture) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Sky gradient */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(1200px 700px at 50% -10%, rgba(255,255,255,0.28), rgba(255,255,255,0) 60%)," +
              "linear-gradient(180deg, #0b5ed7 0%, #0a4fa6 35%, #083a7c 65%, #062b63 100%)",
          }}
        />

        {/* Cloud bands */}
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(700px 260px at 18% 18%, rgba(255,255,255,0.45), rgba(255,255,255,0) 68%)," +
              "radial-gradient(820px 280px at 78% 22%, rgba(255,255,255,0.40), rgba(255,255,255,0) 70%)",
          }}
        />

        {/* Grass with mowing stripes */}
        <div
          className="absolute inset-x-0 -bottom-44 h-[560px]"
          style={{
            backgroundImage:
              "radial-gradient(closest-side at 50% 78%, rgba(46,125,50,0.38), rgba(0,0,0,0) 75%)," +
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.10) 0 22px, rgba(0,0,0,0) 22px 44px)",
          }}
        />

        {/* Infield dirt */}
        <div
          className="absolute inset-x-0 -bottom-36 h-[420px]"
          style={{
            backgroundImage:
              "radial-gradient(closest-side at 50% 60%, rgba(199,145,87,0.36), rgba(0,0,0,0) 72%)",
          }}
        />

        {/* Chalk arc */}
        <div
          className="absolute left-1/2 top-[58%] -translate-x-1/2 w-[880px] h-[420px] opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(closest-side at 50% 50%, rgba(255,255,255,0.55), rgba(255,255,255,0) 62%)",
            filter: "blur(0.25px)",
          }}
        />

        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, rgba(0,0,0,0) 1px 3px)",
          }}
        />

        {/* Backstop net overlay */}
        <div
          className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.18) 0 1px, rgba(255,255,255,0) 1px 10px)," +
              "repeating-linear-gradient(-45deg, rgba(255,255,255,0.14) 0 1px, rgba(255,255,255,0) 1px 10px)",
          }}
        />

        {/* Baseball seam / stitching accents */}
        <div
          className="absolute -left-32 top-10 h-[520px] w-[520px] opacity-[0.16]"
          style={{
            backgroundImage:
              "radial-gradient(closest-side at 55% 55%, rgba(255,255,255,0.0) 60%, rgba(255,255,255,0.22) 61%, rgba(255,255,255,0.0) 62%)," +
              "repeating-linear-gradient(135deg, rgba(252,76,2,0.22) 0 2px, rgba(0,0,0,0) 2px 12px)",
            filter: "blur(0.2px)",
            borderRadius: "999px",
          }}
        />
        <div
          className="absolute -right-44 bottom-10 h-[620px] w-[620px] opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(closest-side at 48% 48%, rgba(255,255,255,0.0) 58%, rgba(255,255,255,0.18) 59%, rgba(255,255,255,0.0) 60%)," +
              "repeating-linear-gradient(45deg, rgba(252,76,2,0.18) 0 2px, rgba(0,0,0,0) 2px 14px)",
            filter: "blur(0.25px)",
            borderRadius: "999px",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(900px 520px at 50% 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        {/* Watermark logo */}
        <div className="absolute -right-28 top-24 opacity-[0.06]">
          <img
            src={ASSETS.logo}
            onError={(e) => imgFallback(e, ASSETS.fallbackLogo)}
            alt=""
            className="w-[520px] h-auto saturate-150"
          />
        </div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Top Navigation */}
        <header className="sticky top-0 z-50 bg-[#0b5ed7]/90 backdrop-blur border-b border-[#FC4C02]/30">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="#home" className="flex items-center gap-3" onClick={closeMobile}>
              <img
                src={ASSETS.logo}
                onError={(e) => imgFallback(e, ASSETS.fallbackLogo)}
                alt="Ohio Eagles Logo"
                className="w-10 h-10 object-contain"
              />
              <div className="leading-tight">
                <div className="font-extrabold tracking-tight">Ohio Eagles</div>
                <div className="text-xs text-white/80">Travel Baseball</div>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-6">
              {nav.map((i) => (
                <NavLink key={i.to} label={i.label} to={i.to} active={route === i.to} />
              ))}
            </nav>

            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="rounded-xl border border-white/20 px-3 py-2 text-sm font-semibold"
                aria-label="Open menu"
              >
                Menu ▾
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="md:hidden border-t border-[#FC4C02]/30 bg-white/95 text-black">
              <div className="max-w-6xl mx-auto px-4 py-3 grid gap-3">
                {nav.map((i) => (
                  <NavLink
                    key={i.to}
                    label={i.label}
                    to={i.to}
                    active={route === i.to}
                    onClick={closeMobile}
                    tone="light"
                  />
                ))}
              </div>
            </div>
          )}
        </header>

        {route === "home" && <HomePage />}
        {route === "roster" && <RosterPage />}
        {route === "tournaments" && <TournamentsPage />}
        {route === "coaches" && <CoachesPage />}
        {route === "fundraisers" && <FundraisersPage />}
        {route === "tryouts" && <TryoutsPage />}
        {route === "registration" && <RegistrationPage />}

        <footer className="px-4 py-6 text-center text-sm text-white/70 border-t-4 border-[#FC4C02] bg-[#0b5ed7]/85">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-3">
            <span>© 2026 Ohio Eagles Travel Baseball. All Rights Reserved.</span>
            <a
              href="https://x.com/OhioEaglesball"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-[#FC4C02] hover:underline"
            >
              Follow us on X
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

// -----------------------------
// Minimal runtime tests (development only)
// -----------------------------

if (process.env.NODE_ENV !== "production") {
  console.assert(parseRouteFromHash("") === "home", "Empty hash should route to home");
  console.assert(parseRouteFromHash("#home") === "home", "#home should route to home");
  console.assert(parseRouteFromHash("#roster") === "roster", "#roster should route to roster");
  console.assert(
    parseRouteFromHash("#registration") === "registration",
    "#registration should route to registration"
  );
  console.assert(parseRouteFromHash("#tryouts") === "tryouts", "#tryouts should route to tryouts");
  console.assert(parseRouteFromHash("#coaches") === "coaches", "#coaches should route to coaches");
  console.assert(
    parseRouteFromHash("#Fundraisers") === "fundraisers",
    "Hash routing should be case-insensitive"
  );
  console.assert(parseRouteFromHash("#not-a-page") === "home", "Unknown route should fall back to home");

  // Roster sort test
  const _years = ["2028", "2027", "2029"].sort((a, b) => Number(a) - Number(b));
  console.assert(_years.join(",") === "2027,2028,2029", "Year sorting should be numeric ascending");
}
