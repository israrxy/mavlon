import { motion } from 'motion/react';
import { useEffect, useState, type ReactNode } from 'react';
import {
  ChevronDown,
  Download,
  Eye,
  FileText,
  Github,
  Globe,
  Lock,
  Mail,
  MessageSquareText,
  Palette,
  Phone,
  RefreshCw,
  Shield,
  Smartphone,
  Store,
  TriangleAlert,
  Zap,
} from 'lucide-react';
import chatImage from '../assets/chat.png';
import messageImage from '../assets/message.png';

type RouteKey = 'home' | 'faq' | 'support' | 'privacy';
type Route = { key: RouteKey; path: string; label: string };
type FaqItem = { id: string; question: string; answer: string };

const apkLink = 'https://github.com/israrxy/mavlon/releases/download/v1.0.0/Mavlon-1.0.0-stable.apk';
const githubLink = 'https://github.com/israrxy/mavlon';
const itchLink = 'https://israrxy.itch.io/mavlon';
const portfolioLink = 'https://israrxy.k.vu';
const emailLink = 'mailto:hi@israrxy.k.vu';
const itchEmbedSrc = 'https://itch.io/embed/4369181?bg_color=e5d59f&fg_color=000000&link_color=fa5c5c&border_color=9b915f';

const routes: Route[] = [
  { key: 'home', path: '/', label: 'Home' },
  { key: 'faq', path: '/faq', label: 'FAQ' },
  { key: 'support', path: '/support', label: 'Support' },
  { key: 'privacy', path: '/privacy', label: 'Privacy' },
];

const features = [
  ['Custom Android UI', 'A cleaner Matrix client shell built for daily messaging.', <Smartphone className="h-5 w-5" />],
  ['4-digit PIN lock', 'Protect app open and resume with an on-device PIN flow.', <Lock className="h-5 w-5" />],
  ['Typing indicators', 'See when a reply is in motion without turning the UI noisy.', <Eye className="h-5 w-5" />],
  ['Per-chat appearance', 'Tune colors and atmosphere globally or room by room.', <Palette className="h-5 w-5" />],
  ['UnifiedPush ready', 'Notifications are designed around UnifiedPush support.', <Zap className="h-5 w-5" />],
  ['Native call base', 'Audio calls and call logs are present; video is disabled.', <Phone className="h-5 w-5" />],
  ['In-app web flows', 'Open links without dropping out of the conversation flow.', <Globe className="h-5 w-5" />],
  ['Stable release focus', 'The app is targeting stable day-to-day messaging now.', <RefreshCw className="h-5 w-5" />],
] as const;

const faqGroups: Array<{ id: string; title: string; items: FaqItem[] }> = [
  {
    id: 'faq-general',
    title: 'General',
    items: [
      { id: 'android', question: 'Which Android versions are supported?', answer: 'The current app build targets Android 9.0 and newer, which is API 28+.' },
      { id: 'homeserver', question: 'Does Mavlon run its own Matrix homeserver?', answer: 'No. You sign in with the homeserver you choose, and that server controls retention, moderation, and federation policy.' },
      { id: 'calling', question: 'What is the call status?', answer: 'Audio calling and call logs are present. Video calling is still intentionally disabled in the current release.' },
      { id: 'source', question: 'Is this the full open-source app release?', answer: 'No. The current Android project identifies this build as a proprietary distribution, not a public open-source release of the full app.' },
    ],
  },
  {
    id: 'faq-privacy',
    title: 'Privacy',
    items: [
      { id: 'stored', question: 'What is stored on device?', answer: 'Session data, encrypted local caches, appearance settings, call logs, downloaded update files, and temporary media or cache files.' },
      { id: 'push', question: 'What happens when notifications are enabled?', answer: 'Notification registration details can be sent to the configured UnifiedPush gateway and the transport used by your device.' },
      { id: 'ads', question: 'Does Mavlon include ads or anonymous analytics?', answer: 'The current privacy notice says this build is not intended for anonymous analytics or advertising, and it does not bundle an in-app ad network.' },
    ],
  },
  {
    id: 'faq-release',
    title: 'Release',
    items: [
      { id: 'updates', question: 'How do updates work?', answer: 'The app can check a remote update manifest for newer builds, but release builds keep in-app sideload updating disabled until signature verification is fully hardened.' },
      { id: 'directory', question: 'What is the private directory flow?', answer: 'The Android app includes a private invite-only Matrix directory room so verified Mavlon users can find each other in-app.' },
      { id: 'support', question: 'Where should users ask for help?', answer: 'Start on the support page here, then email Israrxy directly for install, release, or homeserver issues.' },
    ],
  },
];

const supportCards = [
  'Confirm Android 9.0+ and allow APK installs for the browser or file manager you used.',
  'If sign-in fails, verify the Matrix account on the homeserver side before assuming the app shell is broken.',
  'For delayed notifications, check battery restrictions and UnifiedPush setup on the device.',
  'If a call seems broken, confirm microphone permissions and remember video is disabled in this release.',
];

const releaseStatus = [
  'Current release: 1.0.0 stable',
  'Minimum Android: API 28',
  'Video calling: disabled',
  'Release updater: manifest check only, sideload update path still hardened',
];

function getRouteFromPath(pathname: string): RouteKey {
  if (pathname === '/faq') return 'faq';
  if (pathname === '/support') return 'support';
  if (pathname === '/privacy') return 'privacy';
  return 'home';
}

function PageShell({ eyebrow, title, copy, children }: { eyebrow: string; title: string; copy: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8 md:py-12">
      <div className="mb-10 max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-gold">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          {eyebrow}
        </div>
        <h1 className="mb-4 text-4xl font-display font-medium tracking-tight text-ivory md:text-6xl">{title}</h1>
        <p className="max-w-2xl text-base leading-7 text-ivory-muted md:text-lg">{copy}</p>
      </div>
      {children}
    </section>
  );
}

function FaqAccordion({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-espresso/70">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="text-base font-medium text-ivory">{item.question}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-gold transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open ? <p className="px-5 pb-5 text-sm leading-7 text-ivory-muted">{item.answer}</p> : null}
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <section id="home-hero" className="mx-auto grid max-w-7xl gap-16 px-6 pb-32 pt-20 lg:grid-cols-2 lg:items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="max-w-2xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            First Release
          </div>
          <h1 className="mb-6 text-5xl font-display font-medium leading-[1.1] tracking-tight text-ivory sm:text-6xl lg:text-7xl">
            Private conversations,
            <br />
            <span className="text-gradient-gold pr-2 font-serif italic">designed with intention.</span>
          </h1>
          <p className="mb-10 max-w-xl text-lg font-light leading-relaxed text-ivory-muted sm:text-xl">
            Mavlon is a Matrix-based messenger for Android. A warmer, cleaner, and more focused way to communicate.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a href={apkLink} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-8 py-4 font-medium text-black transition-all duration-300 shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:bg-gold-light hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] sm:w-auto">
              <Download className="h-5 w-5" />
              Download for Android
            </a>
            <a href={itchLink} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold/10 bg-espresso px-8 py-4 font-medium text-ivory transition-all duration-300 hover:bg-espresso-light sm:w-auto">
              <Store className="h-5 w-5" />
              Get on itch.io
            </a>
          </div>
          <p className="mt-4 font-mono text-xs text-ivory-muted/60">v1.0.0 • Android Only</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }} className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold/20 to-transparent blur-2xl" />
          <div className="glass-panel relative rounded-[2.5rem] border border-gold/20 p-3 shadow-2xl">
            <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] bg-espresso">
              <img src={chatImage} alt="Mavlon Home Screen" className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
            </div>
          </div>
        </motion.div>
      </section>

      <section id="home-showcase" className="relative py-24">
        <div className="absolute inset-0 border-y border-gold/5 bg-espresso/30" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-display font-medium text-ivory md:text-4xl">Crafted for clarity.</h2>
            <p className="mx-auto max-w-2xl text-ivory-muted">Every pixel is considered. Mavlon strips away the noise to focus on what matters: your conversations.</p>
          </div>

          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }} className="flex flex-col items-center">
              <div className="glass-panel mb-6 w-full max-w-[320px] rounded-[2rem] p-2 shadow-xl transition-transform duration-500 hover:-translate-y-2">
                <div className="aspect-[9/19] overflow-hidden rounded-[1.5rem] bg-black">
                  <img src={chatImage} alt="Mavlon Chat List" className="h-full w-full object-cover" />
                </div>
              </div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gold">The Inbox</p>
              <p className="max-w-xs text-center text-ivory-muted">A serene overview of your active conversations, organized and accessible.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.2 }} className="flex flex-col items-center md:mt-24">
              <div className="glass-panel mb-6 w-full max-w-[320px] rounded-[2rem] p-2 shadow-xl transition-transform duration-500 hover:-translate-y-2">
                <div className="aspect-[9/19] overflow-hidden rounded-[1.5rem] bg-black">
                  <img src={messageImage} alt="Mavlon Chat Interface" className="h-full w-full object-cover" />
                </div>
              </div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gold">The Conversation</p>
              <p className="max-w-xs text-center text-ivory-muted">Immersive, distraction-free chat interface with per-chat personalization.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="home-features" className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-16">
          <h2 className="mb-4 text-3xl font-display font-medium text-ivory md:text-4xl">Uncompromising features.</h2>
          <p className="max-w-2xl text-ivory-muted">Built on the robust Matrix protocol, enhanced with thoughtful Android-native capabilities.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(([title, desc, icon], index) => (
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="glass-panel rounded-2xl p-6 transition-colors duration-300 hover:bg-espresso/80">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">{icon}</div>
              <h3 className="mb-2 text-lg font-medium text-ivory">{title}</h3>
              <p className="text-sm leading-relaxed text-ivory-muted">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-espresso/20 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Shield className="mx-auto mb-8 h-12 w-12 text-gold opacity-80" />
          <h2 className="mb-8 text-3xl font-serif italic leading-tight text-ivory md:text-5xl">
            "Communication should feel like a private room, not a public square."
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-ivory-muted">
            Mavlon was built from a desire for a quieter, more intentional messaging experience.
            We believe your data belongs to you, your interface should respect your attention,
            and your conversations deserve a beautiful, secure home.
          </p>
        </div>
      </section>

      <section id="home-release" className="px-6 py-32">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="glass-panel relative mx-auto max-w-4xl overflow-hidden rounded-3xl p-10 text-center md:p-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-1/2 w-full -translate-x-1/2 bg-gold/10 blur-[100px]" />
          <h2 className="relative z-10 mb-6 text-3xl font-display font-medium text-ivory md:text-5xl">Ready to try Mavlon?</h2>
          <p className="relative z-10 mx-auto mb-10 max-w-xl text-ivory-muted">
            Download the app today. Experience a new standard for Android messaging.
          </p>

          <div className="relative z-10 flex flex-col items-center gap-4">
            <a href={apkLink} className="flex items-center justify-center gap-2 rounded-xl bg-gold px-10 py-5 text-lg font-medium text-black transition-all duration-300 shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:-translate-y-1 hover:bg-gold-light hover:shadow-[0_0_40px_rgba(197,160,89,0.5)]">
              <Download className="h-6 w-6" />
              Download APK
            </a>
            <div className="mt-2 flex items-center gap-3 font-mono text-sm text-ivory-muted/60">
              <span>v1.0.0</span>
              <span>•</span>
              <span>Android Only</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function FaqPage() {
  const [openItem, setOpenItem] = useState<string>('android');
  return (
    <PageShell eyebrow="FAQ" title="Answers based on the Android app you are shipping." copy="These answers reflect the current `mavlon2` project: release 1.0.0, Android 9.0+, Matrix homeserver choice, UnifiedPush-ready notifications, and a proprietary distribution model.">
      <section id="faq-intro" className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-gold/10 bg-espresso/80 p-6"><p className="mb-2 text-xs uppercase tracking-[0.24em] text-gold">Current release</p><p className="text-2xl font-medium text-ivory">1.0.0 stable</p></div>
        <div className="rounded-3xl border border-gold/10 bg-espresso/80 p-6"><p className="mb-2 text-xs uppercase tracking-[0.24em] text-gold">Minimum Android</p><p className="text-2xl font-medium text-ivory">API 28</p></div>
        <div className="rounded-3xl border border-gold/10 bg-espresso/80 p-6"><p className="mb-2 text-xs uppercase tracking-[0.24em] text-gold">Important limit</p><p className="text-2xl font-medium text-ivory">No video calling</p></div>
      </section>
      {faqGroups.map((group) => (
        <section key={group.id} id={group.id} className="mt-12">
          <h2 className="mb-5 text-2xl font-display font-medium text-ivory">{group.title}</h2>
          <div className="space-y-4">{group.items.map((item) => <FaqAccordion key={item.id} item={item} open={openItem === item.id} onToggle={() => setOpenItem((current) => (current === item.id ? '' : item.id))} />)}</div>
        </section>
      ))}
    </PageShell>
  );
}

function SupportPage() {
  return (
    <PageShell eyebrow="Support" title="Support paths that are actually useful." copy="This page focuses on likely failure points in the present Android app: installs, homeserver assumptions, notifications, calling expectations, and where to ask for help.">
      <section id="support-intro" className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-gold/10 bg-espresso/80 p-7"><h2 className="mb-4 text-2xl font-display font-medium text-ivory">Before asking for help</h2><ol className="space-y-3 text-sm leading-7 text-ivory-muted"><li>1. Confirm Android 9.0 or later.</li><li>2. Note the Mavlon version and Matrix homeserver.</li><li>3. Identify whether the issue is install, messaging, notifications, or calling.</li><li>4. Remember that video calling is intentionally disabled in this release.</li></ol></div>
        <div className="rounded-[2rem] border border-gold/10 bg-espresso/80 p-7"><h2 className="mb-4 text-2xl font-display font-medium text-ivory">Fast links</h2><div className="space-y-3 text-sm text-ivory-muted"><a href={emailLink} className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3 transition-colors hover:text-ivory"><span>Email support</span><Mail className="h-4 w-4 text-gold" /></a><a href={githubLink} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3 transition-colors hover:text-ivory"><span>GitHub release page</span><Github className="h-4 w-4 text-gold" /></a><a href="/faq" className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3 transition-colors hover:text-ivory"><span>Read FAQ first</span><MessageSquareText className="h-4 w-4 text-gold" /></a></div></div>
      </section>
      <section id="support-troubleshooting" className="mt-12"><h2 className="mb-5 text-2xl font-display font-medium text-ivory">Troubleshooting map</h2><div className="grid gap-5 md:grid-cols-2">{supportCards.map((item) => <div key={item} className="rounded-3xl border border-gold/10 bg-espresso/80 p-6 text-sm leading-7 text-ivory-muted">{item}</div>)}</div></section>
      <section id="support-contact" className="mt-12 grid gap-5 lg:grid-cols-3">
        <div className="rounded-3xl border border-gold/10 bg-espresso/80 p-6"><Mail className="mb-4 h-6 w-6 text-gold" /><h3 className="mb-3 text-xl font-medium text-ivory">Direct contact</h3><p className="mb-5 text-sm leading-7 text-ivory-muted">For install problems, homeserver access issues, or release questions that need a person, email Israrxy directly.</p><a href={emailLink} className="text-sm font-medium text-gold hover:text-gold-light">hi@israrxy.k.vu</a></div>
        <div className="rounded-3xl border border-gold/10 bg-espresso/80 p-6"><Github className="mb-4 h-6 w-6 text-gold" /><h3 className="mb-3 text-xl font-medium text-ivory">Repository and releases</h3><p className="mb-5 text-sm leading-7 text-ivory-muted">GitHub Releases remain the clearest place to verify what build is current.</p><a href={githubLink} target="_blank" rel="noreferrer" className="text-sm font-medium text-gold hover:text-gold-light">Open GitHub</a></div>
        <div className="rounded-3xl border border-gold/10 bg-espresso/80 p-6"><Globe className="mb-4 h-6 w-6 text-gold" /><h3 className="mb-3 text-xl font-medium text-ivory">Publisher profile</h3><p className="mb-5 text-sm leading-7 text-ivory-muted">For publisher context rather than app support itself, use the public portfolio profile.</p><a href={portfolioLink} target="_blank" rel="noreferrer" className="text-sm font-medium text-gold hover:text-gold-light">Open profile</a></div>
      </section>
      <section id="support-status" className="mt-12 rounded-[2rem] border border-gold/10 bg-espresso/80 p-7"><h2 className="mb-5 text-2xl font-display font-medium text-ivory">Current release status</h2><div className="grid gap-3 md:grid-cols-2">{releaseStatus.map((item) => <div key={item} className="rounded-2xl bg-black/20 px-4 py-3 text-sm leading-7 text-ivory-muted">{item}</div>)}</div></section>
    </PageShell>
  );
}

function PrivacyPage() {
  return (
    <PageShell eyebrow="Privacy" title="Privacy boundaries stated plainly." copy="This page mirrors the Android app privacy notice: what the app handles on-device, what your chosen homeserver handles on the network side, and what the current build does not include.">
      <section id="privacy-intro" className="grid gap-5 md:grid-cols-2">
        <div className="rounded-[2rem] border border-gold/10 bg-espresso/80 p-7"><h2 className="mb-4 text-2xl font-display font-medium text-ivory">What Mavlon is</h2><p className="text-sm leading-7 text-ivory-muted">Mavlon is a proprietary Matrix client for Android. It is not presented in the current codebase as a public open-source release of the full application.</p></div>
        <div className="rounded-[2rem] border border-gold/10 bg-espresso/80 p-7"><h2 className="mb-4 text-2xl font-display font-medium text-ivory">What this build avoids</h2><p className="text-sm leading-7 text-ivory-muted">The current privacy notice says the build is not intended for anonymous analytics or advertising, and it does not bundle an in-app ad network.</p></div>
      </section>
      <section id="privacy-storage" className="mt-12"><h2 className="mb-5 text-2xl font-display font-medium text-ivory">On-device storage</h2><div className="grid gap-5 md:grid-cols-2"><div className="rounded-3xl border border-gold/10 bg-espresso/80 p-6"><h3 className="mb-3 text-lg font-medium text-ivory">Stored locally for operation</h3><p className="text-sm leading-7 text-ivory-muted">Session data, encrypted local caches, appearance settings, call logs, downloaded update files, and temporary media or cache files may live on-device so the app can function correctly.</p></div><div className="rounded-3xl border border-gold/10 bg-espresso/80 p-6"><h3 className="mb-3 text-lg font-medium text-ivory">Protected access</h3><p className="text-sm leading-7 text-ivory-muted">Mavlon includes a numeric PIN app lock flow, but device-level security still matters if you actually care about privacy.</p></div></div></section>
      <section id="privacy-network" className="mt-12"><h2 className="mb-5 text-2xl font-display font-medium text-ivory">Network-side handling</h2><div className="grid gap-5 lg:grid-cols-3"><div className="rounded-3xl border border-gold/10 bg-espresso/80 p-6"><h3 className="mb-3 text-lg font-medium text-ivory">Homeserver responsibility</h3><p className="text-sm leading-7 text-ivory-muted">Messages, media, profile data, room state, and account metadata are processed through the Matrix homeserver you choose when signing in.</p></div><div className="rounded-3xl border border-gold/10 bg-espresso/80 p-6"><h3 className="mb-3 text-lg font-medium text-ivory">Notification transport</h3><p className="text-sm leading-7 text-ivory-muted">If notifications are enabled, registration details may be sent to the configured UnifiedPush gateway and your device transport.</p></div><div className="rounded-3xl border border-gold/10 bg-espresso/80 p-6"><h3 className="mb-3 text-lg font-medium text-ivory">Update checks</h3><p className="text-sm leading-7 text-ivory-muted">The app may query a remote update manifest to determine whether a newer build is available.</p></div></div></section>
      <section id="privacy-boundaries" className="mt-12 rounded-[2rem] border border-gold/10 bg-espresso/80 p-7"><h2 className="mb-5 text-2xl font-display font-medium text-ivory">Boundaries and responsibility split</h2><p className="mb-4 text-sm leading-7 text-ivory-muted">Mavlon does not operate a public Matrix homeserver as part of the app build. Retention, moderation, federation policy, and server-side security depend on the homeserver operator you choose.</p><p className="text-sm leading-7 text-ivory-muted">If the app goes into wider public or commercial distribution, the current project already notes that legal contact details and jurisdiction-specific disclosures should be finalized.</p></section>
    </PageShell>
  );
}

export default function App() {
  const [route, setRoute] = useState<RouteKey>(() => getRouteFromPath(window.location.pathname));

  useEffect(() => {
    const sync = () => setRoute(getRouteFromPath(window.location.pathname));
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  useEffect(() => {
    const current = routes.find((entry) => entry.key === route);
    document.title = current ? `Mavlon | ${current.label}` : 'Mavlon';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [route]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-black font-sans text-ivory selection:bg-gold/30 selection:text-ivory">
      <div className="pointer-events-none fixed inset-0 z-0"><div className="absolute inset-0 bg-noise opacity-[0.03]" /><div className="absolute left-[-10%] top-[-18%] h-[44rem] w-[44rem] rounded-full bg-gold/7 blur-[140px]" /><div className="absolute bottom-[-25%] right-[-8%] h-[40rem] w-[40rem] rounded-full bg-espresso-light/60 blur-[150px]" /></div>
      <header className="relative z-20 border-b border-gold/10 bg-black/65 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div><a href="/" className="text-2xl font-display font-semibold tracking-wide text-ivory">Mavlon<span className="text-gold">.</span></a><p className="mt-1 text-sm text-ivory-muted">Matrix messenger for Android. Version 1.0.0 stable.</p></div>
          <nav className="flex flex-wrap items-center gap-2">{routes.map((entry) => <a key={entry.key} href={entry.path} className={`rounded-full px-4 py-2 text-sm transition-colors ${entry.key === route ? 'bg-gold text-black' : 'bg-espresso/80 text-ivory-muted hover:text-ivory'}`}>{entry.label}</a>)}</nav>
        </div>
      </header>
      <main className="relative z-10 pb-24 pt-6">
        {route === 'home' ? <HomePage /> : null}
        {route === 'faq' ? <FaqPage /> : null}
        {route === 'support' ? <SupportPage /> : null}
        {route === 'privacy' ? <PrivacyPage /> : null}
      </main>
      <footer className="relative z-10 border-t border-gold/10 bg-black/85 px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div><div className="mb-3 text-2xl font-display font-semibold tracking-wide text-ivory">Mavlon<span className="text-gold">.</span></div><p className="max-w-md text-sm leading-7 text-ivory-muted">The website now mirrors the product structure: overview, FAQ, support, privacy, and release channels without putting a fake sitemap in the UI.</p></div>
          <div className="grid gap-3 sm:grid-cols-2">{routes.map((entry) => <a key={entry.key} href={entry.path} className="rounded-2xl border border-gold/10 bg-espresso/70 px-4 py-3 text-sm text-ivory-muted transition-colors hover:text-ivory">{entry.label}</a>)}</div>
        </div>
      </footer>
    </div>
  );
}
